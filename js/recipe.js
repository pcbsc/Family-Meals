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
  if ((m = s.match(/^(\d+)\s+(\d+)\/(\d+)$/))) return +m[1] + +m[2] / +m[3];
  if ((m = s.match(/^(\d+)\/(\d+)$/))) return +m[2] ? +m[1] / +m[2] : null;
  if ((m = s.match(new RegExp(`^(\\d*)\\s*([${FRACTION_CHARS}])$`)))) return (m[1] ? +m[1] : 0) + FRACTIONS[m[2]];
  if (/^\d+(?:\.\d+)?$/.test(s)) return +s;
  return null;
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
  const comma = rest.indexOf(",");
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
  [/\b(cooked |steamed |short[- ]grain |white )*rice\b(?! (cake|paper|vinegar|wine|flour|noodle))/, "rice"],
  [/\bground black pepper\b|\bblack pepper\b/, "black pepper"],
  [/\b(kosher |sea |fine |table )salt\b/, "salt"],
];

function singular(word) {
  if (/(ss|us|is)$/.test(word) || word.length < 4) return word;
  if (/ies$/.test(word)) return word.slice(0, -3) + "y";
  if (/(tomato|potato)es$/.test(word)) return word.slice(0, -2);
  if (/(ch|sh|x)es$/.test(word)) return word.slice(0, -2);
  if (/s$/.test(word) && !/(leaves|sprouts|noodles|oats|greens|flakes|seeds|chips|crumbs)$/.test(word)) return word.slice(0, -1);
  return word;
}

/** "2 large Yellow Onions (about 1 lb), diced" → "yellow onion" */
export function normalizeItemName(item) {
  let s = String(item || "").toLowerCase();
  s = s.replace(/\([^)]*\)/g, " ").split(/,| - | – |;/)[0];
  s = s.replace(/\b(for (garnish|serving|topping|drizzling)|to taste|or more|as needed|if you like|plus more.*)$/g, " ");
  s = s.replace(/\bor\b.*$/, " ");
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
  ["pantry", /broth|\bstock\b|powder|peanut butter|sunflower butter|almond butter|\bdried (thyme|oregano|basil|parsley|rosemary|dill|herbs?)\b|bay lea|canned|marinara|tomato sauce|tomato paste|crushed tomato/],
  ["asian", /tofu|kimchi|gochujang|doenjang|gochugaru|fish sauce|mirin|rice wine|rice cake|tteok|dangmyeon|glass noodle|sweet potato noodle|seaweed|\bgim\b|miyeok|nori|dashima|kelp|anchov|soup soy|oyster sauce|perilla|danmuji|pickled radish|eomuk|fish cake|sesame oil|korean radish|rice vinegar|plum extract|corn syrup|oligo|jjajang|udon/],
  ["meat", /beef|pork|chicken|turkey|ribeye|sirloin|short rib|brisket|bacon|sausage|\bham\b|pepperoni|salami|salmon|mackerel|\bfish\b|\bcod\b|shrimp|prawn|squid|clam|mussel|steak|lamb|drumstick|imitation crab/],
  ["grains", /\brice\b|noodle|pasta|spaghetti|macaroni|bread|tortilla|\bflour\b|oats|oatmeal|flatbread|pita|naan|pizza dough|cereal|granola|\bbuns?\b|bagel|cracker/],
  ["dairy", /\beggs?\b|milk|butter|cheese|yogurt|yoghurt|cream|mozzarella|parmesan|cheddar|hummus/],
  ["produce", /onion|garlic|ginger|carrot|spinach|zucchini|squash|potato|cabbage|lettuce|cucumber|tomato|pepper(?!corn)|jalape|\bchil(?:i|e)s?\b|mushroom|sprout|radish|apple|banana|berr|lemon|lime|orange|avocado|cilantro|parsley|basil|broccoli|celery|pear|fruit|kale|corn|peas|chive|herb|grape|melon|mango|peach|kiwi|eggplant|asparagus|green bean|bok choy|napa|leek|shallot|scallion|thyme|rosemary|mint|dill/],
  ["pantry", /\boil\b|sugar|\bsalt\b|soy sauce|vinegar|honey|sesame seed|spice|cumin|paprika|oregano|cinnamon|vanilla|syrup|ketchup|mustard|mayo|cornstarch|starch|bouillon|salsa|beans|tuna|nut|raisin|chocolate|jam|seasoning|baking/],
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

function amountText(bucket) {
  const parts = [];
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
  for (const [unit, n] of Object.entries(bucket.counts)) {
    const plural = n > 1.01 ? (unit.endsWith("ch") || unit.endsWith("sh") || unit === "box" ? "es" : unit === "leaf" ? "" : "s") : "";
    const word = unit === "leaf" && n > 1.01 ? "leaves" : unit + plural;
    parts.push(`${formatQty(n)} ${word}`);
  }
  if (bucket.plain) parts.push(formatQty(bucket.plain));
  return parts.join(" + ");
}

/**
 * Builds a shopping list from planned dishes.
 * entries: [{ dish: { name, servings, ingredients: [string] }, servings }]
 * Returns items sorted by aisle, each { key, name, amount, aisle, pantry, dishes }.
 */
export function buildGroceryList(entries) {
  const byKey = new Map();
  for (const { dish, servings } of entries) {
    if (!dish || !Array.isArray(dish.ingredients)) continue;
    const factor = dish.servings > 0 && servings > 0 ? servings / dish.servings : 1;
    for (const line of dish.ingredients) {
      const p = parseIngredient(line);
      if (p.header || !p.item) continue;
      const key = normalizeItemName(p.item);
      if (!key || /^(water|ice|cold water|hot water|warm water|boiling water)$/.test(key)) continue;
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
      amount: amountText(e.bucket),
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
    const cleaned = line.replace(/^[-•*▢☐□✓✔·]\s*/, "").replace(/^(step\s*)?\d+\s*[.):-]\s+/i, "");
    const looksLikeIngredient = parseIngredient(cleaned).qty != null && cleaned.length < 90;
    const numbered = /^(step\s*)?\d+\s*[.):-]\s+/i.test(line);
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
