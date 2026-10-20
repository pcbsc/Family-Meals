// Recipe text logic with no browser dependencies, so it can be unit-tested in
// Node: reading ingredient lines, scaling them to a number of servings,
// merging a week of ingredients into one shopping list, spotting timers in
// steps, and pulling a recipe out of pasted text when there's no AI key.

const FRACTIONS = { "¼": 0.25, "½": 0.5, "¾": 0.75, "⅓": 1 / 3, "⅔": 2 / 3, "⅛": 0.125, "⅜": 0.375, "⅝": 0.625, "⅞": 0.875, "⅕": 0.2 };
const FRACTION_CHARS = Object.keys(FRACTIONS).join("");

// kind: "volume" (base: teaspoons), "weight" (base: grams), "count" (kept as is).
const UNITS = [
  { key: "tsp", kind: "volume", factor: 1, names: ["teaspoons", "teaspoon", "tsps", "tsp.", "tsp"] },
  { key: "tbsp", kind: "volume", factor: 3, names: ["tablespoons", "tablespoon", "tbsps", "tbsp.", "tbsp", "tbs.", "tbs"] },
  { key: "cup", kind: "volume", factor: 48, names: ["cups", "cup", "c."] },
  { key: "fl oz", kind: "volume", factor: 6, names: ["fluid ounces", "fluid ounce", "fl. oz.", "fl oz", "fl. oz"] },
  { key: "pint", kind: "volume", factor: 96, names: ["pints", "pint", "pt."] },
  { key: "quart", kind: "volume", factor: 192, names: ["quarts", "quart", "qt.", "qt"] },
  { key: "gallon", kind: "volume", factor: 768, names: ["gallons", "gallon", "gal"] },
  { key: "ml", kind: "volume", factor: 0.202884, names: ["milliliters", "milliliter", "millilitres", "millilitre", "ml"] },
  { key: "l", kind: "volume", factor: 202.884, names: ["liters", "liter", "litres", "litre", "l"] },
  { key: "oz", kind: "weight", factor: 28.3495, names: ["ounces", "ounce", "oz.", "oz"] },
  { key: "lb", kind: "weight", factor: 453.592, names: ["pounds", "pound", "lbs.", "lbs", "lb.", "lb"] },
  { key: "g", kind: "weight", factor: 1, names: ["grams", "gram", "g"] },
  { key: "kg", kind: "weight", factor: 1000, names: ["kilograms", "kilogram", "kg"] },
  ...[
    ["clove", "cloves"], ["can", "cans"], ["package", "packages", "pkg", "pkgs"], ["bunch", "bunches"],
    ["slice", "slices"], ["stalk", "stalks"], ["sheet", "sheets"], ["piece", "pieces", "pcs"],
    ["head", "heads"], ["sprig", "sprigs"], ["stick", "sticks"], ["pinch", "pinches"], ["dash", "dashes"],
    ["handful", "handfuls"], ["block", "blocks"], ["bag", "bags"], ["jar", "jars"], ["bottle", "bottles"],
    ["box", "boxes"], ["fillet", "fillets"], ["strip", "strips"], ["inch", "inches"], ["leaf", "leaves"],
  ].map(([key, ...plural]) => ({ key, kind: "count", factor: 1, names: [...plural, key] })),
];

// Longest names first so "fl oz" wins over "oz" and "tablespoons" over "tablespoon".
const UNIT_NAMES = UNITS.flatMap((u) => u.names.map((n) => ({ name: n, unit: u }))).sort(
  (a, b) => b.name.length - a.name.length,
);
const UNIT_BY_KEY = Object.fromEntries(UNITS.map((u) => [u.key, u]));

const NUMBER = `(?:\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d*\\s*[${FRACTION_CHARS}]|\\d+(?:\\.\\d+)?)`;
const QTY_RE = new RegExp(`^(${NUMBER})(?:\\s*(?:-|–|—|to)\\s*(${NUMBER}))?`);

export function parseNumber(text) {
  const s = text.trim();
  let m;
  let value = null;
  if ((m = s.match(/^(\d+)\s+(\d+)\/(\d+)$/))) value = +m[1] + +m[2] / +m[3];
  else if ((m = s.match(/^(\d+)\/(\d+)$/))) value = +m[1] / +m[2];
  else if ((m = s.match(new RegExp(`^(\\d*)\\s*([${FRACTION_CHARS}])$`)))) value = (m[1] ? +m[1] : 0) + FRACTIONS[m[2]];
  else if (/^\d+(?:\.\d+)?$/.test(s)) value = +s;
  // "3/0" or a 400-digit number isn't an amount.
  return Number.isFinite(value) ? value : null;
}

/** Splits "1 1/2 cups rice, rinsed" into its parts. Lines ending in ":" are headers. */
export function parseIngredient(line) {
  const raw = String(line ?? "").trim();
  const out = { raw, header: false, qty: null, qtyMax: null, qtyText: "", unit: null, item: raw, note: "" };
  if (!raw) return out;
  if (/:\s*$/.test(raw) && raw.length < 60) {
    out.header = true;
    out.item = raw.replace(/:\s*$/, "");
    return out;
  }
  let rest = raw.replace(/^[-•*▢☐□✓✔·]\s*/, "");
  const q = rest.match(QTY_RE);
  if (q) {
    const value = parseNumber(q[1]);
    if (value != null) {
      out.qty = value;
      out.qtyMax = q[2] ? parseNumber(q[2]) : null;
      out.qtyText = q[0];
      rest = rest.slice(q[0].length).trim();
    }
  }
  if (out.qty != null) {
    // "T" and "t" are the old cookbook shorthands for tablespoon and teaspoon.
    const shorthand = rest.match(/^(T|t)\b\.?\s+/);
    if (shorthand) {
      out.unit = shorthand[1] === "T" ? "tbsp" : "tsp";
      rest = rest.slice(shorthand[0].length);
    } else {
      const lower = rest.toLowerCase();
      for (const { name, unit } of UNIT_NAMES) {
        if (lower.startsWith(name) && !/[a-z]/.test(lower.charAt(name.length))) {
          out.unit = unit.key;
          rest = rest.slice(name.length).trim();
          break;
        }
      }
    }
    rest = rest.replace(/^of\s+/i, "");
  }
  // The note starts at the first comma outside brackets: "1 can (15 oz, drained) chickpeas".
  let depth = 0;
  let comma = -1;
  for (let i = 0; i < rest.length && comma < 0; i++) {
    if (rest[i] === "(" || rest[i] === "[") depth++;
    else if ((rest[i] === ")" || rest[i] === "]") && depth > 0) depth--;
    else if (rest[i] === "," && depth === 0) comma = i;
  }
  if (comma > 0) {
    out.item = rest.slice(0, comma).trim();
    out.note = rest.slice(comma + 1).trim();
  } else {
    out.item = rest.trim();
  }
  return out;
}

const NICE = [
  [0, ""], [1 / 8, "⅛"], [1 / 4, "¼"], [1 / 3, "⅓"], [1 / 2, "½"], [2 / 3, "⅔"], [3 / 4, "¾"], [1, ""],
];

/** 1.5 → "1½", 0.333 → "⅓", 12.4 → "12", 250.3 g → "250". */
export function formatQty(n, unit) {
  if (n == null || !isFinite(n)) return "";
  if (unit === "g" || unit === "ml") {
    if (n >= 100) return String(Math.round(n / 5) * 5);
    return String(Math.max(1, Math.round(n)));
  }
  if (unit === "kg" || unit === "l") return String(Math.round(n * 10) / 10);
  if (n >= 10) return String(Math.round(n));
  let whole = Math.floor(n);
  const frac = n - whole;
  let best = NICE[0];
  for (const cand of NICE) if (Math.abs(cand[0] - frac) < Math.abs(best[0] - frac)) best = cand;
  if (best[0] === 1) whole += 1;
  if (whole === 0 && !best[1]) return n > 0 ? "⅛" : "0";
  return `${whole || ""}${best[1]}`;
}

/** Rewrites a line's quantity for a different number of servings. */
export function scaleIngredient(line, factor) {
  const p = parseIngredient(line);
  if (p.header || p.qty == null || !factor || Math.abs(factor - 1) < 1e-9) return p.raw;
  const lead = p.raw.match(/^[-•*▢☐□✓✔·]\s*/)?.[0] ?? "";
  const body = p.raw.slice(lead.length);
  const qty = formatQty(p.qty * factor, p.unit);
  const range = p.qtyMax != null ? `–${formatQty(p.qtyMax * factor, p.unit)}` : "";
  return `${lead}${qty}${range}${body.slice(p.qtyText.length)}`;
}

const DROP_WORDS = new Set(
  ("fresh large medium small big extra chopped minced diced sliced thinly thickly finely roughly coarsely " +
    "grated shredded peeled crushed boneless skinless cooked uncooked ripe optional softened melted beaten " +
    "packed heaping level whole halved quartered cubed julienned trimmed rinsed drained divided about approx " +
    "approximately cold warm hot room temperature lightly freshly good quality organic plain")
    .split(" "),
);
const SYNONYMS = [
  [/\b(scallions?|spring onions?|green onions?)\b/, "green onion"],
  [/\bgarlic cloves?\b|\bcloves? (of )?garlic\b/, "garlic"],
  [/\b(soybean|bean) sprouts?\b/, "bean sprouts"],
  [/\b(korean )?(chili|chile|red pepper) (flakes|powder)\b|\bgochugaru\b/, "gochugaru"],
  [/\b(toasted )?sesame oil\b/, "sesame oil"],
  [/\b(toasted )?sesame seeds?\b/, "sesame seeds"],
  [/\b(low[- ]sodium |regular |dark |light )?soy sauce\b/, "soy sauce"],
  // Not rice syrup, rice cereal or sweet (glutinous) rice: those are other things to buy.
  [/(?<!(?:glutinous|sweet|wild|brown|puffed) )\b(cooked |steamed |short[- ]grain |white )*rice\b(?! (cakes?|paper|vinegar|wine|flour|noodles?|syrup|cereal|krispies|balls?|seasoning|crackers?|porridge))/, "rice"],
  [/\bground black pepper\b|\bblack pepper\b/, "black pepper"],
  [/\b(kosher |sea |fine |table )salt\b/, "salt"],
];

function singular(word) {
  if (/(ss|us|is)$/.test(word) || word.length < 4) return word;
  if (/ies$/.test(word)) return word.slice(0, -3) + "y";
  if (/(tomato|potato|mango)es$/.test(word)) return word.slice(0, -2);
  if (/(ch|sh|x)es$/.test(word)) return word.slice(0, -2);
  if (/s$/.test(word) && !/(leaves|sprouts|noodles|oats|greens|flakes|seeds|chips|crumbs)$/.test(word)) return word.slice(0, -1);
  return word;
}

// Words that describe a food rather than name one, for "X or Y food" lines.
const DESCRIBING = new Set(("soft medium firm silken plain vanilla greek fresh frozen dried canned low-sodium korean persian " +
  "english japanese red green yellow white brown sweet unsalted salted whole light dark pizza marinara tomato regular " +
  "large small baby thin thick boneless skinless").split(" "));

/** "2 large Yellow Onions (about 1 lb), diced" → "yellow onion" */
export function normalizeItemName(item) {
  let s = String(item || "").toLowerCase();
  s = s.replace(/\([^)]*\)/g, " ").split(/,| - | – |;/)[0];
  s = s.replace(/\b(for (garnish|serving|topping|drizzling)|to taste|or more|as needed|if you like|plus more.*)$/g, " ");
  // "soft or medium tofu" is soft tofu, but "beef or pork" is beef.
  const either = s.match(/^\s*([a-z-]+) or (.+)$/);
  if (either && DESCRIBING.has(either[1])) s = [either[1], ...either[2].trim().split(/\s+/).slice(1)].join(" ");
  else s = s.replace(/\bor\b.*$/, " ");
  for (const [re, name] of SYNONYMS) if (re.test(s)) return name;
  const words = s.replace(/[^a-z0-9가-힣\s-]/g, " ").split(/\s+/).filter((w) => w && !DROP_WORDS.has(w));
  if (!words.length) return s.trim();
  words[words.length - 1] = singular(words[words.length - 1]);
  return words.join(" ").trim();
}

export const AISLES = [
  { key: "produce", label: "Fruits & veggies", emoji: "🥬" },
  { key: "meat", label: "Meat & fish", emoji: "🥩" },
  { key: "dairy", label: "Eggs, milk & cheese", emoji: "🥚" },
  { key: "asian", label: "Asian market", emoji: "🥢" },
  { key: "grains", label: "Rice, noodles & bread", emoji: "🍚" },
  { key: "pantry", label: "Cans, sauces & baking", emoji: "🥫" },
  { key: "frozen", label: "Frozen", emoji: "🧊" },
  { key: "other", label: "Other things", emoji: "🛍️" },
];

const AISLE_WORDS = [
  ["frozen", /\bfrozen\b/],
  // Checked before the meat and produce words they contain ("chicken broth", "garlic powder").
  ["pantry", /broth|\bstock\b|powder|peanut butter|sunflower butter|almond butter|\bdried (italian )?(thyme|oregano|basil|parsley|rosemary|dill|herbs?)\b|italian (herbs?|seasoning)|bay lea|canned|marinara|pizza sauce|enchilada|tomato sauce|tomato paste|crushed tomato|sun-dried|starch|worcestershire/],
  ["asian", /tofu|kimchi|gochujang|doenjang|gochugaru|fish sauce|mirin|rice wine|rice cake|tteok|dangmyeon|glass noodle|sweet potato noodle|seaweed|\bgim\b|miyeok|nori|dashima|kelp|anchov|soup soy|oyster sauce|perilla|danmuji|pickled radish|eomuk|fish cake|sesame oil|korean radish|rice vinegar|plum extract|corn syrup|rice syrup|jocheong|oligo|jjajang|udon|black bean paste|chunjang|jujube|ginseng|\bdashi\b|miso|curry roux|curry paste|tamarind|coconut (milk|cream)|chili crisp|chili oil|rice paper|dumpling wrapper|wonton wrapper|yubu|tofu pocket/],
  ["meat", /beef|pork|chicken|turkey|ribeye|sirloin|short rib|brisket|bacon|sausage|\bham\b|pepperoni|salami|salmon|mackerel|\bfish\b|\bcod\b|shrimp|prawn|squid|clam|mussel|steak|lamb|drumstick|imitation crab|\bhens?\b/],
  ["grains", /\brice\b|noodle|pasta|spaghetti|macaroni|fettuccine|penne|bread|tortilla|\bflour\b|oats|oatmeal|flatbread|pita|naan|pizza dough|cereal|granola|\bbuns?\b|bagel|cracker/],
  ["dairy", /\beggs?\b|milk|half-and-half|butter|ghee|cheese|feta|yogurt|yoghurt|cream|mozzarella|parmesan|cheddar|hummus/],
  ["produce", /onion|garlic|ginger|carrot|spinach|zucchini|squash|potato|cabbage|lettuce|cucumber|tomato|pepper(?!corn)|jalape|\bchil(?:i|e)s?\b|mushroom|sprout|radish|apple|banana|berr|lemon|lime|orange|avocado|cilantro|parsley|basil|broccoli|celery|pear|fruit|kale|corn|\bpeas?\b|chive|herb|grape|melon|mango|peach|kiwi|eggplant|asparagus|green bean|bok choy|napa|leek|shallot|scallion|thyme|rosemary|mint|dill/],
  ["pantry", /\boil\b|sugar|\bsalt\b|soy sauce|vinegar|honey|sesame seed|spice|cumin|paprika|oregano|cinnamon|vanilla|syrup|ketchup|mustard|mayo|cornstarch|starch|bouillon|salsa|beans|tuna|nut|raisin|chocolate|jam|seasoning|baking|\bbeans?\b|chickpea|lentil|almond|yeast|sriracha|masala|turmeric|coriander|cardamom|\bolives?\b/],
];

/** Things most kitchens already have; the list shows them apart so nobody buys a fifth bottle of soy sauce. */
const PANTRY_STAPLES = /^(salt|black pepper|pepper|sugar|brown sugar|(vegetable |olive |canola |neutral |cooking )?oil|sesame oil|soy sauce|vinegar|rice vinegar|flour|all-purpose flour|baking powder|baking soda|garlic powder|onion powder|sesame seeds|honey|gochujang|doenjang|gochugaru|fish sauce|mirin|cinnamon|vanilla extract|cornstarch|ketchup|mayonnaise|mustard|maple syrup|ground cumin|paprika|chili powder|dried oregano|oregano|butter)$/;

export function aisleFor(name) {
  const s = String(name || "").toLowerCase();
  if (/\bblack pepper\b|^pepper$|peppercorn/.test(s)) return "pantry";
  for (const [aisle, re] of AISLE_WORDS) if (re.test(s)) return aisle;
  return "other";
}

export function isPantryStaple(name) {
  return PANTRY_STAPLES.test(name);
}

function cleanName(item) {
  return item
    .replace(/\([^)]*\)/g, "")
    .replace(/\b(to taste|for (garnish|serving|topping|dipping)|as needed|or more)\b.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function amountText(bucket, metric = false) {
  const parts = [];
  if (metric) {
    // Spoons stay spoons; cups and pints become ml, ounces and pounds grams.
    if (bucket.volume >= 12) parts.push(bucket.volume * 4.92892 >= 1000 ? `${formatQty(bucket.volume * 4.92892 / 1000, "l")} l` : `${formatQty(bucket.volume * 4.92892, "ml")} ml`);
    else if (bucket.volume) parts.push(bucket.volume >= 3 ? `${formatQty(bucket.volume / 3, "tbsp")} tbsp` : `${formatQty(bucket.volume, "tsp")} tsp`);
    bucket = { ...bucket, volume: 0, weightMetric: bucket.weightMetric + bucket.weightImperial, weightImperial: 0 };
  }
  if (bucket.volume) {
    const tsp = bucket.volume;
    if (tsp >= 12) parts.push(`${formatQty(tsp / 48, "cup")} cup${tsp / 48 > 1.01 ? "s" : ""}`);
    else if (tsp >= 3) parts.push(`${formatQty(tsp / 3, "tbsp")} tbsp`);
    else parts.push(`${formatQty(tsp, "tsp")} tsp`);
  }
  if (bucket.weightImperial) {
    const oz = bucket.weightImperial / 28.3495;
    parts.push(oz >= 16 ? `${formatQty(oz / 16, "lb")} lb` : `${formatQty(oz, "oz")} oz`);
  }
  if (bucket.weightMetric) {
    const g = bucket.weightMetric;
    parts.push(g >= 1000 ? `${formatQty(g / 1000, "kg")} kg` : `${formatQty(g, "g")} g`);
  }
  // You can't buy ¾ of an avocado: whole things round up on the shopping list.
  const whole = (n) => String(Math.max(1, Math.ceil(n - 0.05)));
  for (const [unit, n] of Object.entries(bucket.counts)) {
    const plural = n > 1.01 ? (unit.endsWith("ch") || unit.endsWith("sh") || unit === "box" ? "es" : unit === "leaf" ? "" : "s") : "";
    const word = unit === "leaf" && n > 1.01 ? "leaves" : unit + plural;
    parts.push(`${unit === "pinch" || unit === "dash" || unit === "inch" ? formatQty(n) : whole(n)} ${word}`);
  }
  if (bucket.plain) parts.push(whole(bucket.plain));
  return parts.join(" + ");
}

/**
 * Builds a shopping list from planned dishes.
 * entries: [{ dish: { name, servings, ingredients: [string] }, servings }]
 * Returns items sorted by aisle, each { key, name, amount, aisle, pantry, dishes }.
 */
export function buildGroceryList(entries, { metric = false } = {}) {
  const byKey = new Map();
  for (const { dish, servings } of entries) {
    if (!dish || !Array.isArray(dish.ingredients)) continue;
    const factor = dish.servings > 0 && servings > 0 ? servings / dish.servings : 1;
    for (const line of dish.ingredients) {
      const p = parseIngredient(line);
      if (p.header || !p.item) continue;
      const key = normalizeItemName(p.item);
      if (!key || /^(water|ice|ice cube|cold water|hot water|warm water|boiling water)$/.test(key)) continue;
      let entry = byKey.get(key);
      if (!entry) {
        entry = {
          key,
          name: cleanName(p.item),
          hasQty: false,
          bucket: { volume: 0, weightImperial: 0, weightMetric: 0, counts: {}, plain: 0 },
          dishes: new Set(),
        };
        byKey.set(key, entry);
      }
      entry.dishes.add(dish.name);
      if (p.qty != null && !entry.hasQty) {
        entry.hasQty = true;
        entry.name = cleanName(p.item);
      }
      if (p.qty == null) continue;
      const amount = (p.qtyMax ?? p.qty) * factor;
      const unit = p.unit ? UNIT_BY_KEY[p.unit] : null;
      const b = entry.bucket;
      if (!unit) b.plain += amount;
      else if (unit.kind === "volume") b.volume += amount * unit.factor;
      else if (unit.kind === "weight") {
        if (unit.key === "g" || unit.key === "kg") b.weightMetric += amount * unit.factor;
        else b.weightImperial += amount * unit.factor;
      } else b.counts[unit.key] = (b.counts[unit.key] || 0) + amount;
    }
  }
  const order = Object.fromEntries(AISLES.map((a, i) => [a.key, i]));
  return [...byKey.values()]
    .map((e) => ({
      key: e.key,
      name: e.name.charAt(0).toUpperCase() + e.name.slice(1),
      amount: amountText(e.bucket, metric),
      aisle: aisleFor(e.key + " " + e.name),
      pantry: isPantryStaple(e.key),
      dishes: [...e.dishes],
    }))
    .sort((a, b) => order[a.aisle] - order[b.aisle] || a.name.localeCompare(b.name));
}

/** Finds "10 minutes", "1-2 hours", "30 seconds" in a step so cook-along can offer a timer. */
export function findTimers(step) {
  const re = /(\d+(?:\.\d+)?|[½¼¾])(?:\s*(?:-|–|to)\s*(\d+(?:\.\d+)?))?\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)\b/gi;
  const found = [];
  let m;
  while ((m = re.exec(String(step || "")))) {
    const n = FRACTIONS[m[1]] ?? parseFloat(m[1]);
    const unit = m[3].toLowerCase();
    const mult = unit.startsWith("h") ? 3600 : unit.startsWith("s") ? 1 : 60;
    const seconds = Math.round(n * mult);
    if (seconds > 0 && seconds <= 12 * 3600) found.push({ seconds, label: m[0].trim() });
  }
  return found;
}

// "1. Mix", "Step 2: Stir", "3) Bake", "4 - Serve", but not "3-4 minutes" or "1.5 cups".
const STEP_NUMBER = /^\s*(?:step\s*)?\d{1,2}\s*(?:[.)](?!\d)|:|\s-\s)\s*/i;

/** Removes the "1." someone typed in front of a step. */
export function stripStepNumber(step) {
  return String(step ?? "").replace(STEP_NUMBER, "").trim();
}

/**
 * Makes a link safe to put behind a button: adds https:// when someone typed
 * "www.site.com/…", and refuses anything that isn't a web address (javascript:, data:…).
 */
/** The first web link in some text, without the punctuation around it: "(see https://youtu.be/x)." */
export function findLink(text) {
  let url = String(text ?? "").match(/https?:\/\/[^\s"'<>]+/i)?.[0] || "";
  for (;;) {
    const last = url.at(-1);
    const unopened = last === ")" && url.split("(").length < url.split(")").length;
    if (url && (".,;:!?]}".includes(last) || unopened)) url = url.slice(0, -1);
    else return url;
  }
}

export function cleanLink(text) {
  let s = String(text ?? "").trim();
  if (!s) return "";
  if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) {
    if (!/^[\w-]+(\.[\w-]+)+([/?#:]|$)/.test(s)) return "";
    s = `https://${s}`;
  }
  try {
    const url = new URL(s);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

const INGREDIENT_HEAD = /^(ingredients?|what you('ll)? need|you('ll)? need|for the [a-z ]+|shopping list)\b[:\s]*$/i;
const STEP_HEAD = /^(instructions?|directions?|method|steps?|how to( make)?( it)?|preparation|to make)\b[:\s]*$/i;

/**
 * Best-effort reading of a pasted recipe (website text, an Instagram caption)
 * without AI. Returns { name, servings, ingredients, steps }.
 */
export function parseRecipeText(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !/^(#\w+\s*)+$/.test(l));
  let name = "";
  let servings = 0;
  const ingredients = [];
  const steps = [];
  let mode = null;
  for (const line of lines) {
    const serves = line.match(/\b(?:serves|servings?|yield|makes)\s*:?\s*(\d+)|(\d+)\s*servings?\b/i);
    if (serves && line.length < 40) {
      servings = +(serves[1] || serves[2]);
      continue;
    }
    if (INGREDIENT_HEAD.test(line)) {
      mode = "ingredients";
      if (/^for the/i.test(line)) ingredients.push(line.replace(/:?\s*$/, ":"));
      continue;
    }
    if (STEP_HEAD.test(line)) {
      mode = "steps";
      continue;
    }
    const cleaned = stripStepNumber(line.replace(/^[-•*▢☐□✓✔·]\s*/, ""));
    const looksLikeIngredient = parseIngredient(cleaned).qty != null && cleaned.length < 90;
    const numbered = STEP_NUMBER.test(line);
    if (!name && !mode && !looksLikeIngredient && !numbered && line.length < 80) {
      name = line.replace(/[#*_]/g, "").trim();
      continue;
    }
    if (mode === "steps" || numbered) steps.push(cleaned);
    else if (mode === "ingredients" || looksLikeIngredient || /^[-•*▢☐□]/.test(line)) ingredients.push(cleaned);
    else if (cleaned.length > 40) steps.push(cleaned);
  }
  return { name, servings, ingredients, steps };
}

// ---------- What can we make? ----------

// Basics most kitchens have, which "What can I make?" doesn't ask about.
const SEASONING = /\b(spice|seasoning|powder|masala|turmeric|cumin|paprika|oregano|thyme|rosemary|bay lea|cinnamon|cardamom|coriander|seeds?|extract|dried herbs?|italian herbs?|chili flakes|red pepper flakes|sauce|ketchup|mustard|mayonnaise|honey|syrup|vinegar|oil|sugar|starch|broth|stock|bouillon|yeast|baking)\b/;
// Foods named by a part: "chicken" means you have chicken thighs, breasts, tenders…
const WHOLE_FOODS = new Set(["chicken", "beef", "pork", "turkey", "lamb", "salmon", "fish", "shrimp", "tofu", "egg", "ham", "bacon", "sausage", "mushroom", "potato", "tomato"]);
// Words that cover a family of things on a recipe.
const FAMILIES = {
  beef: ["ribeye", "sirloin", "brisket", "short rib", "flank steak", "steak", "chuck"],
  cheese: ["cheese", "mozzarella", "cheddar", "parmesan", "feta", "ricotta", "cotija"],
  pasta: ["pasta", "spaghetti", "fettuccine", "macaroni", "penne", "fusilli", "lasagna noodle", "ditalini"],
  noodle: ["noodle", "udon", "somyeon", "spaghetti"],
  bread: ["bread", "bun", "pita", "naan", "toast"],
  fish: ["fish", "salmon", "cod", "mackerel", "tuna"],
  greens: ["spinach", "lettuce", "cabbage", "kale", "bok choy"],
};

// Words in front of a food that make it a different thing: onion isn't green onion,
// potatoes aren't sweet potatoes, fish isn't fish sauce.
const OTHER_FOOD = new Set(["green", "spring", "sweet", "sea", "fish", "rice", "coconut", "peanut", "almond", "oat", "soy", "bean", "glass", "egg", "napa", "bok", "pickled", "dried", "brown", "whole-wheat"]);
// Parts of a food, so "chicken" covers chicken thighs but not chicken broth.
const CUTS = new Set(["thigh", "breast", "wing", "drumstick", "tender", "tenderloin", "leg", "fillet", "loin", "belly", "shoulder", "chop", "steak", "cutlet", "strip", "yolk", "white", "rib", "mince"]);

export function haveCovers(have, need) {
  if (have === need) return true;
  const hw = have.split(" ");
  const nw = need.split(" ");
  const at = nw.lastIndexOf(hw.at(-1));
  if (at >= 0 && hw.every((w) => nw.includes(w))) {
    const before = nw.slice(0, at).filter((w) => !hw.includes(w));
    const after = nw.slice(at + 1);
    if (before.some((w) => OTHER_FOOD.has(w))) return false;
    // "rice" covers "short-grain rice"; "chicken" covers "chicken thigh", not "chicken bouillon".
    if (!after.length) return true;
    if (WHOLE_FOODS.has(have) && after.every((w) => CUTS.has(w))) return true;
  }
  return (FAMILIES[have] || []).some((f) => need === f || need.endsWith(` ${f}`));
}

/** The ingredients worth asking about for a dish (not salt, oil, sauces, spices or garnishes). */
export function keyIngredients(dish) {
  const out = new Set();
  for (const line of dish?.ingredients || []) {
    const p = parseIngredient(line);
    if (p.header || !p.item) continue;
    if (/\boptional\b|\bfor (serving|topping|garnish|dipping|the top)\b|\bto taste\b/i.test(line)) continue;
    const key = normalizeItemName(p.item);
    if (!key || /^(water|ice|ice cube)$|water$/.test(key) || isPantryStaple(key) || SEASONING.test(key)) continue;
    out.add(key);
  }
  return out;
}

/**
 * Which dishes can be made with what we have. Returns the dishes that use at
 * least one thing we have, best first: [{ dish, missing: [names], have: n, need: n }].
 */
export function whatCanIMake(dishes, haveList) {
  const haves = [...new Set((haveList || []).map((x) => normalizeItemName(x)).filter(Boolean))];
  if (!haves.length) return [];
  const out = [];
  for (const dish of dishes) {
    const need = keyIngredients(dish);
    if (!need.size) continue;
    const missing = [];
    let have = 0;
    for (const key of need) {
      if (haves.some((h) => haveCovers(h, key))) have++;
      else missing.push(key);
    }
    if (have) out.push({ dish, missing, have, need: need.size });
  }
  return out.sort((a, b) => a.missing.length - b.missing.length || b.have - a.have || a.dish.name.localeCompare(b.dish.name));
}

// ---------- Healthier, milder or spicier, and metric ----------

// Each swap: what it finds in a line, lines it leaves alone, and how it rewrites them.
// label is the short name the dish page shows ("brown rice").
const HEALTHY_SWAPS = [
  {
    label: "brown rice",
    find: /\b(?:white\s+)?((?:short|long|medium)[- ]grain\s+)?rice\b(?!\s*(?:cakes?|paper|vinegar|wine|noodles?|flour|syrup|cereal|krispies|balls?|seasoning))/i,
    keep: /\bbrown\b|multigrain|sushi|glutinous|sweet rice|tteok|\bmochi/i,
    to: (m, grain = "") => `${grain}brown rice`,
    tip: "Brown rice takes longer (about 45 minutes), so start it first. Half white, half brown is a good first step.",
  },
  {
    label: "low-sodium soy sauce",
    find: /\b(?:regular\s+)?soy sauce\b/i,
    keep: /low[- ]sodium|reduced[- ]sodium|less[- ]sodium|lite|soup soy|dark soy/i,
    to: () => "low-sodium soy sauce",
  },
  {
    label: "whole-wheat pasta",
    find: /\b(elbow macaroni|macaroni|spaghetti|penne|fettuccine|linguine|rotini|fusilli|ditalini|lasagna noodles|pasta)\b/i,
    keep: /whole[- ]?(wheat|grain)|pasta sauce|pasta water|gluten|rice noodle|fresh pasta/i,
    to: (m) => `whole-wheat ${m}`,
  },
  {
    label: "whole-wheat bread",
    find: /\b(white bread|sandwich bread|bread|brioche buns|hamburger buns|burger buns|hot dog buns|buns|flour tortillas|tortillas|pitas?|pizza dough|bagels?|english muffins?)\b/i,
    keep: /whole[- ]?(wheat|grain)|crumb|corn tortilla|rice paper|naan|banana bread|bread flour|bread dough/i,
    to: (m) => `whole-wheat ${m.replace(/^(white|brioche)\s+/i, "")}`,
  },
  { label: "lean ground meat", find: /\bground (beef|pork)\b/i, keep: /\blean\b|\d+\/\d+\s*%?\s*lean/i, to: (m, meat) => `lean ground ${meat}` },
  { label: "light mayo", find: /\b(kewpie mayonnaise|kewpie mayo|kewpie|mayonnaise|mayo)\b/i, keep: /light|greek|yogurt|sriracha mayo/i, to: () => "light mayo (or half plain Greek yogurt)" },
  { label: "Greek yogurt", find: /\bsour cream\b/i, keep: /yogurt/i, to: () => "plain Greek yogurt" },
  { label: "half-and-half", find: /\b(heavy whipping cream|heavy cream|whipping cream|double cream)\b/i, keep: /half-and-half/i, to: () => "half-and-half" },
  { label: "Spam Lite", find: /\bspam\b/i, keep: /lite|less sodium|25%/i, to: () => "Spam Lite (less salt)" },
  { label: "chicken hot dogs", find: /\b(hot dogs?|frankfurters?|vienna sausages?|sausages?)\b/i, keep: /chicken|turkey|plant|veggie|italian sausage|breakfast sausage/i, to: (m) => `chicken ${m}` },
  { label: "turkey bacon", find: /\bbacon\b/i, keep: /turkey/i, to: () => "turkey bacon" },
];

// Sweet things get halved instead of swapped.
const SWEET = /^(sugar|white sugar|granulated sugar|brown sugar|light brown sugar|honey|corn syrup|rice syrup|maple syrup|oligodang|agave|oligo syrup)$/;
const DEEP_FRY = /\bfor (deep[- ])?frying\b|\bdeep[- ]fry/i;
const RAMEN = /\b(instant ramen|ramyeon|ramen noodles?|ramen)\b/i;

/**
 * A healthier version of one ingredient line, or null if it's fine as is.
 * Returns { line, label, tip? }.
 */
export function healthierLine(line, { baking = false, glaze = false, stickyRice = false } = {}) {
  const p = parseIngredient(line);
  if (p.header || !p.item) return null;
  // A pot of oil, not "2 tbsp oil, plus more for frying" in a pan.
  const potOfOil = /deep[- ]?fr/i.test(line) || (p.unit && UNIT_BY_KEY[p.unit].kind === "volume" && p.qty * UNIT_BY_KEY[p.unit].factor >= 48);
  if (DEEP_FRY.test(line) && potOfOil && /\boil\b/i.test(p.item)) {
    return { line: "2 tbsp oil (air-fry or bake instead of deep-frying)", label: "air-fried", tip: "Air-fry at 400°F for about 15 to 20 minutes, turning once, instead of deep-frying. Or bake at 425°F on a rack." };
  }
  if (p.qty != null && SWEET.test(normalizeItemName(p.item))) {
    // A glaze needs its sugar to turn sticky; cakes and muffins take a quarter less and stay soft.
    if (glaze) return null;
    if (baking) return { line: `${scaleIngredient(line, 0.75)} (a quarter less)`, label: "less sugar" };
    return { line: `${scaleIngredient(line, 0.5)} (half the usual)`, label: "less sugar" };
  }
  if (RAMEN.test(p.item) && !/seasoning|half/i.test(line)) {
    return { line: `${line} (use half the seasoning packet)`, label: "half the ramen seasoning" };
  }
  for (const swap of HEALTHY_SWAPS) {
    if (swap.keep.test(line)) continue;
    // Kimbap, rice balls and musubi need sticky white rice to hold together.
    if (stickyRice && swap.label === "brown rice") continue;
    const m = line.match(swap.find);
    if (!m) continue;
    return { line: line.slice(0, m.index) + swap.to(m[0], m[1]) + line.slice(m.index + m[0].length), label: swap.label, tip: swap.tip };
  }
  return null;
}

// Hot things: chili flakes, fresh chilies, hot sauces. Gochujang is also sweet and
// savory, so mild halves it instead of leaving it out.
const CHILI = /\b(gochugaru|korean (?:red )?(?:chili|chile|pepper) (?:flakes|powder)|red chil(?:i|e) powder|hot pepper (?:flakes|powder)|red pepper flakes|chili flakes|chile flakes|crushed red pepper|cayenne|jalape(?:ñ|n)os?|serranos?|thai chil(?:i|e)s?|bird'?s eye chil(?:i|e)s?|green chil(?:i|e)s?|red chil(?:i|e)s?|chil(?:i|e) peppers?|cheongyang|sriracha|chili oil|chili crisp|hot sauce|buldak sauce)\b/i;
// Gochujang and the other red pastes are sweet and savory too, so mild halves them.
const HOT_PASTE = /\b(gochujang|(?:korean )?(?:hot|red) pepper paste|korean chil(?:i|e) paste)\b/i;
// Kimchi is the dish, so mild rinses it; spicy ramyun keeps half its soup packet.
const KIMCHI = /\bkimchi\b/i;
const NOT_KIMCHI = /\b(white|baek|water|mul|dongchimi)[ -]?kimchi\b|\bkimchi juice\b|\bnabak\b/i;
const HOT_RAMYUN = /\b(shin|buldak|jjamppong|spicy) (?:ramyun|ramyeon|ramen|noodles?)\b|\bshin ramyun\b/i;
// Things that sound hot but aren't. Korean or red chili powder is gochugaru, so that stays hot.
const NOT_HOT = /sweet chil(?:i|e)(?: sauce)?|(?<!(?:korean|red|hot) )chil(?:i|e) powder|bell peppers?|(?<!hot )paprika/gi;

function heatKind(line) {
  const s = String(line || "").replace(NOT_HOT, " ");
  if (HOT_PASTE.test(s)) return "paste";
  if (CHILI.test(s)) return "chili";
  if (HOT_RAMYUN.test(s)) return "ramyun";
  if (KIMCHI.test(s) && !NOT_KIMCHI.test(s)) return "kimchi";
  return "";
}

export const SPICE_LEVELS = [
  { key: "mild", label: "Mild", emoji: "😊" },
  { key: "medium", label: "Medium", emoji: "🌶️" },
  { key: "spicy", label: "Spicy", emoji: "🔥" },
];

export function isChiliLine(line) {
  return !!heatKind(line);
}

/** One line at a spice level: { line, off } where off means "leave it out". */
export function spiceLine(line, level) {
  const kind = heatKind(line);
  if (level === "medium" || !kind) return { line, off: false };
  const p = parseIngredient(line);
  if (p.header) return { line, off: false };
  if (level === "spicy") {
    // More kimchi or noodles isn't more heat; more chili and paste is.
    if (kind === "kimchi" || kind === "ramyun" || p.qty == null) return { line, off: false };
    return { line: `${scaleIngredient(line, 1.5)} (extra for spice lovers)`, off: false };
  }
  if (kind === "paste") return { line: p.qty != null ? `${scaleIngredient(line, 0.5)} (half for mild)` : line, off: false };
  if (kind === "kimchi") return { line: `${line} (rinse it in water for mild)`, off: false };
  if (kind === "ramyun") return { line: `${line} (use half the soup packet for mild)`, off: false };
  return { line, off: true };
}

const SAVORY_MEALS = /\b(korean|meat|rice|noodles|soup|seafood|veggie)\b/;
const BAKING = /\bbaking (powder|soda)\b|\byeast\b|\bcake mix\b/i;
const GLAZE_SECTION = /glaze|syrup|caramel|candied|coating|frosting|icing|sauce for coating/i;
const GLAZED_DISH = /gangjeong|glazed|candied|caramel|hotteok|yaksik|tanghulu/i;
const STICKY_RICE_DISH = /kimbap|gimbap|sushi|onigiri|jumeokbap|musubi|rice ball|triangle/i;
// Steps that deep-fry, which the healthy way air-fries instead.
const FRY_STEP = /\bdeep[- ]?fr(?:y|ied)\b|\bfry (?:them |it |everything |the [a-z]+ )?(?:in batches|until|again)\b|\bheat (?:the |about )?(?:[\d½¼"'-]+ (?:inches?|cups?) (?:of )?)?oil\b|\boil (?:to|reaches) \d{3}|\bhot oil\b/i;

/**
 * A dish's ingredients the way this family cooks it: healthier swaps, spice
 * level. Returns { lines: [{ line, was, label, off }], swaps: [labels], tips: [text],
 * stepNotes: [text or ""] } (one note per step).
 * Lines keep their order (headers included) so the dish page and shopping list agree.
 * mildFor names people who want it mild when the family cooks it hotter.
 */
export function cookedLines(dish, { healthy = false, spice = "medium", mildFor = [] } = {}) {
  const lines = [];
  const swaps = [];
  const tips = [];
  let hasChili = false;
  let section = "";
  const ingredients = dish?.ingredients || [];
  const context = {
    baking: (dish?.categories || []).includes("treat") || ingredients.some((l) => BAKING.test(l)),
    stickyRice: STICKY_RICE_DISH.test(`${dish?.name || ""} ${dish?.nameKo || ""}`),
  };
  for (const raw of ingredients) {
    let entry = { line: raw, was: "", label: "", off: false };
    const parsed = parseIngredient(raw);
    if (parsed.header) section = parsed.item;
    if (isChiliLine(raw) && !parsed.header) hasChili = true;
    if (healthy) {
      const glaze = GLAZE_SECTION.test(section) || GLAZED_DISH.test(dish?.name || "");
      const better = healthierLine(raw, { ...context, glaze });
      if (better) {
        entry = { ...entry, line: better.line, was: raw, label: better.label };
        if (!swaps.includes(better.label)) swaps.push(better.label);
        if (better.tip && !tips.includes(better.tip)) tips.push(better.tip);
      }
    }
    const s = spiceLine(entry.line, spice);
    if (s.off) entry = { ...entry, off: true, label: entry.label || "skip for mild" };
    else if (s.line !== entry.line) entry = { ...entry, line: s.line, was: entry.was || raw };
    lines.push(entry);
  }
  if (healthy && dish?.healthyTip) tips.unshift(dish.healthyTip);
  if (hasChili && spice === "mild" && dish?.mildTip) tips.unshift(dish.mildTip);
  const savory = SAVORY_MEALS.test((dish?.categories || []).join(" ")) && !(dish?.categories || []).includes("treat");
  if (hasChili && spice === "mild") tips.push("Mild: the hot things are left out. Put chili flakes or gochujang on the table for anyone who wants heat.");
  if (hasChili && spice !== "mild" && !mildFor.length) tips.push("Someone likes it mild? Scoop out their share before the chili goes in.");
  if (!hasChili && spice === "spicy" && savory) tips.push("Spice lovers: add gochujang, chili crisp or gochugaru at the table.");

  // Notes on the steps themselves, where they matter while cooking.
  const airFry = swaps.includes("air-fried");
  let scoopNoted = false;
  const stepNotes = (dish?.steps || []).map((step) => {
    if (airFry && FRY_STEP.test(step)) return "🥗 Healthy way: air-fry at 400°F for 15 to 20 minutes, turning once, instead of frying in oil. Brush on a little oil first.";
    if (!hasChili || !isChiliLine(step)) return "";
    if (spice === "mild") return "😊 Mild: use the smaller amounts, and leave out anything marked \"skip for mild\".";
    if (mildFor.length && !scoopNoted) {
      scoopNoted = true;
      return `😊 Scoop out a mild share for ${listNames(mildFor)} before the chili goes in.`;
    }
    return "";
  });
  return { lines, swaps, tips, stepNotes };
}

function listNames(names) {
  return names.length < 3 ? names.join(" and ") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

// ---------- Metric ----------

// Grams in a cup for things people weigh. Everything else in cups becomes ml.
const GRAMS_PER_CUP = [
  [/\bbrown sugar\b/, 220], [/\b(powdered|icing|confectioners'?) sugar\b/, 120], [/\bsugar\b/, 200],
  [/\bflour\b/, 125], [/\bcooked\b.*\brice\b|\brice\b.*\bcooked\b/, 160],
  [/\brice\b(?!\s*(vinegar|wine|cakes?|paper|noodles?|flour|syrup))/, 190],
  [/\boats\b/, 90], [/\bpanko\b/, 50], [/\bbread ?crumbs\b/, 110], [/\bbutter\b/, 227],
  [/\bparmesan\b/, 90], [/\b(mozzarella|cheddar|shredded cheese|grated cheese|cheese)\b/, 100],
  [/\bchocolate chips\b/, 170], [/\bcocoa\b/, 85],
];

function metricAmount(n, base) {
  if (base === "g") return n >= 1000 ? `${formatQty(n / 1000, "kg")} kg` : `${formatQty(n, "g")} g`;
  return n >= 1000 ? `${formatQty(n / 1000, "l")} l` : `${formatQty(n, "ml")} ml`;
}

const C = (f) => (f - 32) * 5 / 9;

/** Changes °F, inches, ounces and pounds inside any text (steps, notes). */
export function metricText(text) {
  return String(text ?? "")
    .replace(/(\d{2,3})\s*(?:°\s*F\b|degrees\s+F(?:ahrenheit)?\b)/gi, (m, f) => {
      const c = C(Number(f));
      return `${f >= 250 ? Math.round(c / 10) * 10 : Math.round(c)}°C`;
    })
    .replace(/(\d+)\s*[x×]\s*(\d+)[- ]inch(?:es)?\b/gi, (m, a, b) => `${Math.round(a * 2.54)} x ${Math.round(b * 2.54)} cm`)
    .replace(new RegExp(`(${NUMBER})(?:\\s*-\\s*|\\s+)(?:inch(?:es)?|in\\.)(?=[\\s,.)]|$)`, "g"), (m, n) => {
      const cm = parseNumber(n) * 2.54;
      if (cm == null || !isFinite(cm)) return m;
      // ¼ inch ≈ ½ cm, ½ inch ≈ 1 cm, 1 inch ≈ 2½ cm, then whole cm.
      return `${cm < 0.9 ? 0.5 : cm < 2 ? 1 : cm < 3 ? 2.5 : Math.round(cm)} cm`;
    })
    .replace(new RegExp(`(${NUMBER})\\s*(?:-\\s*)?(oz|ounces?|lbs?|pounds?)\\b(?!\\.?\\s*fl)`, "gi"), (m, n, unit) => {
      const v = parseNumber(n);
      if (v == null) return m;
      const g = v * (/^(lb|pound)/i.test(unit) ? 453.592 : 28.3495);
      return metricAmount(g, "g");
    });
}

/** One ingredient line in metric: cups to ml (or grams for flour, sugar, rice…), pounds and ounces to grams. */
export function toMetric(line) {
  const p = parseIngredient(line);
  if (p.header || p.qty == null || !p.unit) return metricText(line);
  const unit = UNIT_BY_KEY[p.unit];
  const rest = `${p.item}${p.note ? `, ${p.note}` : ""}`;
  const range = (f) => {
    const lo = p.qty * f;
    const hi = p.qtyMax != null ? p.qtyMax * f : null;
    return { lo, hi };
  };
  if (unit.kind === "weight" && (p.unit === "oz" || p.unit === "lb")) {
    const { lo, hi } = range(unit.factor);
    const base = metricAmount(hi ?? lo, "g").split(" ")[1];
    const scale = base === "kg" ? 1000 : 1;
    const text = hi != null ? `${formatQty(lo / scale, base)}–${formatQty(hi / scale, base)} ${base}` : metricAmount(lo, "g");
    return `${text} ${metricText(rest)}`;
  }
  if (unit.kind === "volume" && !["tsp", "tbsp", "ml", "l"].includes(p.unit)) {
    const name = normalizeItemName(p.item) + " " + p.item.toLowerCase();
    const cups = (v) => (v * unit.factor) / 48;
    const grams = GRAMS_PER_CUP.find(([re]) => re.test(name))?.[1];
    const per = grams ?? 240;
    const base = grams ? "g" : "ml";
    const { lo, hi } = range(1);
    const text = hi != null
      ? `${formatQty(cups(lo) * per, base)}–${metricAmount(cups(hi) * per, base)}`
      : metricAmount(cups(lo) * per, base);
    return `${text} ${metricText(rest)}`;
  }
  return metricText(line);
}

// ---------- Cooking together ----------

// Knives, heat and hot oil. Whole words only, so potatoes, pancakes and panko
// don't need a grown-up, and a hot dog isn't hot.
const GROWN_UP_WORDS = /\b(knife|knives|cut|cuts|cutting|slice|slices|slicing|chop|chops|chopping|dice|dicing|mince|mincing|julienne|grate|grating|boil|boils|boiling|fry|fries|frying|deep-fry|oven|sear|sears|blanch|hot(?! dogs?\b)|drain|blend|blender|simmer|simmers|stove|pan|pans|bake|bakes|roast|roasts|grill|grills|broil|steam|steams|skillet|pot|pots|wok|heat|heats|stir-fry|toast the|microwave|pressure cooker|instant pot)\b/i;

/** Does this step use a knife, the stove, the oven or hot oil? */
export function needsGrownUp(step) {
  return GROWN_UP_WORDS.test(String(step || "")) || /\ba grown-up\b/i.test(String(step || ""));
}

// Jobs a 7-year-old can do, from the "Kids Cook Monday" age lists: washing,
// tearing, measuring, stirring cold things, cracking eggs, rolling, filling,
// sprinkling, snipping green onions with kid scissors. First match wins.
const KID_JOBS = [
  [/\bkimbap|gimbap|\broll (?:it |them |up )?(?:tightly|up)\b|\brolls? (?:of|the)\b/i, "Roll it up tight with the bamboo mat. Squeeze as you go!"],
  [/\b(mandu|dumplings?|wrappers?)\b/i, "Fill the wrappers: a small spoonful in the middle, wet the edge, pinch closed."],
  [/\b(meatballs?|patties|patty|balls?)\b.*\b(shape|form|roll)\b|\b(shape|form|roll)\b.*\b(meatballs?|patties|patty|balls?)\b/i, "Shape them with clean hands, then wash your hands with soap."],
  [/\bcrack\b|\b(beat|whisk)\b[^.]*\beggs?\b|\beggs?\b[^.]*\b(beat|whisk)\b/i, "Crack the eggs into a bowl and whisk them with a fork."],
  [/\b(wash|rinse|soak)\b/i, "Rinse it in a colander under cold water and shake it dry."],
  [/\btear\b|\btorn\b|\bpull apart\b/i, "Tear it into pieces with your hands."],
  [/\bpeel\b[^.]*\b(eggs?|garlic|banana|orange|tangerine)\b|\b(eggs?|garlic)\b[^.]*\bpeel\b/i, "Peel them with your fingers."],
  [/\bknead\b/i, "Knead the dough: push, fold, turn. Keep going!"],
  [/\bmash\b/i, "Mash it with a fork or a potato masher."],
  [/\bsqueeze\b|\bjuice of\b/i, "Squeeze the lemon or lime (catch the seeds!)."],
  [/\bspread\b/i, "Spread it on with a butter knife or the back of a spoon."],
  [/\b(fill|stuff|wrap|fold)\b/i, "Fill and fold them with clean hands."],
  [/\bgreen onions?\b|\bscallions?\b|\bchives\b/i, "Snip the green onions with kid scissors."],
  [/\b(sprinkle|garnish|top with|topped with|scatter)\b|\bsesame seeds\b/i, "Sprinkle the toppings on. A little goes a long way!"],
  [/\b(marinate|marinade|coat|toss)\b/i, "Pour the sauce over and mix it with a big spoon."],
  [/\b(whisk|stir together|mix together|combine|mix)\b/i, "Measure and stir it together in a bowl."],
  [/\b(measure|add)\b/i, "Measure it with the spoons and cups."],
  [/\b(arrange|layer|place|lay)\b/i, "Arrange it nicely on the plate."],
  [/\b(serve|enjoy|plate|bowls?)\b/i, "Set the table and help serve."],
];

// At the stove or oven, a kid's job is away from the heat: prep, finishing touches or the timer.
const AT_THE_HEAT = /\b(cook|cooks|fry|fries|frying|stir-fry|simmer|simmers|boil|boils|boiling|heat|heats|sear|bake|bakes|roast|grill|broil|saut[eé]|toast|steam|blanch|drain)\b/i;
const AWAY_FROM_HEAT = new Set(["Crack the eggs into a bowl and whisk them with a fork.", "Snip the green onions with kid scissors.", "Sprinkle the toppings on. A little goes a long way!", "Measure it with the spoons and cups."]);

/** Something a kid (about 7) can do for this step, or "" if there's nothing safe. */
export function kidJob(step, { hasTimer = false } = {}) {
  const s = String(step || "");
  const job = KID_JOBS.find(([re]) => re.test(s))?.[1] || "";
  if (!AT_THE_HEAT.test(s) || AWAY_FROM_HEAT.has(job)) return job || (hasTimer ? TIMER_JOB : "");
  return hasTimer ? TIMER_JOB : "Be the helper: hand the grown-up each thing when it's time.";
}

const TIMER_JOB = "Be the timer captain: tap the timer and shout when it rings!";

// Names too plain to find in a step on their own ("sauce", "oil").
const PLAIN_NAMES = new Set(["sauce", "oil", "water", "powder", "paste", "seed", "seeds", "leaf", "leaves", "stock", "broth", "salt", "pepper", "sugar", "flour", "juice", "cheese", "noodle", "noodles"]);

/**
 * Which ingredients a step uses, so cook-along can show their amounts there.
 * names: each ingredient's item name ("soy sauce", "garlic cloves"). Returns their indexes.
 */
export function ingredientsInStep(step, names) {
  let text = ` ${String(step || "").toLowerCase().replace(/[^a-z0-9가-힣\s-]/g, " ")} `;
  const keys = names.map((n) => normalizeItemName(n));
  const found = new Set();
  const phrase = (p) => new RegExp(`\\s${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:s|es)?(?=\\s)`, "g");
  // Longest names first, blanked out once found, so "green onions" isn't also the onion.
  const order = keys.map((k, i) => i)
    .filter((i) => keys[i] && !/\b(water|ice)$/.test(keys[i]))
    .sort((a, b) => keys[b].length - keys[a].length);
  for (const i of order) {
    const words = keys[i].split(" ");
    // "red bell pepper" is "bell pepper" in a step; "cylinder rice cakes" are "rice cakes".
    for (let n = words.length; n >= Math.min(2, words.length); n--) {
      const re = phrase(words.slice(-n).join(" "));
      if (!re.test(text)) continue;
      found.add(i);
      text = text.replace(re, " _");
      break;
    }
  }
  const words = text.split(/\s+/);
  for (const i of order) {
    if (found.has(i)) continue;
    const key = keys[i];
    const own = key.split(" ");
    const last = own.at(-1);
    // "beef" in a step is the ribeye on the list.
    const family = Object.entries(FAMILIES).find(([, members]) => members.some((m) => key === m || key.endsWith(` ${m}`)))?.[0];
    const hit = words.some((w, j) => {
      const base = singular(w);
      if (family && base === family) return true;
      return last.length >= 3 && !PLAIN_NAMES.has(last) && base === last && (!OTHER_FOOD.has(words[j - 1]) || own.includes(words[j - 1]));
    });
    if (hit) found.add(i);
  }
  return [...found].sort((a, b) => a - b);
}

// ---------- Allergies and dislikes ----------

// What each common allergy means on an ingredient list, sauces included:
// soy sauce and gochujang have wheat and soy, oyster sauce is shellfish, mayo is egg.
const FOOD_GROUPS = [
  { names: ["peanut", "peanuts"], words: /\bpeanuts?\b|\bgroundnuts?\b/ },
  { names: ["tree nut", "tree nuts", "nut", "nuts"], words: /\b(almonds?|walnuts?|cashews?|pecans?|pistachios?|hazelnuts?|pine nuts?|macadamias?|chestnuts?|nutella)\b/ },
  { names: ["egg", "eggs"], words: /\beggs?\b|\byolks?\b|\bmayo(nnaise)?\b|\bkewpie\b|\bmeringue\b/ },
  { names: ["milk", "dairy", "lactose"], words: /(?<!(?:coconut|almond|oat|soy|rice) )\bmilk\b|(?<!(?:peanut|almond|sunflower|nut|apple|cocoa|shea) )\bbutter\b(?! lettuce)|\bcheese|(?<!coconut )\bcream\b|\byogh?urt\b|\bghee\b|\bmozzarella|\bparmesan|\bcheddar|\bricotta|\bfeta\b|\bhalf-and-half\b/ },
  { names: ["wheat", "gluten"], words: /\bflour\b|\bbread|\bbuns?\b|(?<!(?:rice|glass|sweet potato|potato|mung bean|cellophane|buckwheat) )\bnoodles?\b|\bpasta\b|\bspaghetti|\bmacaroni|\budon\b|\bsomyeon\b|\bramen\b|\bramyun\b|(?<!corn )\btortillas?\b|\bpanko\b|\bbreadcrumbs?\b|\bsoy sauce\b|\bgochujang\b|\bdoenjang\b|\bwrappers?\b|\bpitas?\b|\bnaan\b|\bcrackers?\b|\bbarley\b/ },
  { names: ["soy", "soya", "soybean", "soybeans"], words: /\bsoy\b|\btofu\b|\bedamame\b|\bdoenjang\b|\bgochujang\b|\bmiso\b|\bsoybeans?\b|\bkongnamul\b/ },
  { names: ["sesame"], words: /\bsesame\b|\btahini\b/ },
  { names: ["shellfish", "seafood"], words: /\bshrimp\b|\bprawns?\b|\bcrab\b|\blobster\b|\bclams?\b|\bmussels?\b|\boysters?\b|\bscallops?\b|\bsquid\b|\boctopus\b|\bimitation crab\b/ },
  { names: ["fish"], words: /\bfish\b|\bsalmon\b|\bcod\b|\btuna\b|\bmackerel\b|\banchov(?:y|ies)\b|\bpollock\b|\bbonito\b|\bdashi\b|\beomuk\b|\btilapia\b/ },
];

/**
 * Which of someone's foods (allergies or dislikes, as typed: "peanuts, egg,
 * mushrooms") are in a dish. Returns [{ food, lines }] for the ones it has.
 */
export function foodsIn(dish, foods) {
  const terms = (Array.isArray(foods) ? foods : String(foods || "").split(/[,;\n]/)).map((t) => t.trim().toLowerCase()).filter(Boolean);
  const lines = (dish?.ingredients || []).filter((l) => !parseIngredient(l).header);
  const out = [];
  for (const food of terms) {
    const group = FOOD_GROUPS.find((g) => g.names.includes(food) || g.names.includes(singular(food)));
    const word = singular(food).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = group ? group.words : new RegExp(`\\b${word}(?:e?s)?\\b`, "i");
    const hits = lines.filter((l) => re.test(l.toLowerCase()));
    if (hits.length) out.push({ food, lines: hits });
  }
  return out;
}
