// How long food lasts and the best way to keep it. The numbers live in
// storage-data.js (from USDA FoodKeeper, FSIS, FDA and university extension
// services; see its header for how they were checked). This file matches the
// names on our recipes and lists to that guide, and turns times into words.
// No browser dependencies, so the unit tests run it in Node.
import { FOODS, RULES, GROUPS } from "./storage-data.js";

export { FOODS, RULES, GROUPS };

const BY_KEY = new Map(FOODS.map((f) => [f.key, f]));
export const foodByKey = (key) => BY_KEY.get(key) || null;

// Which guide entry a name belongs to. Order matters: the first match wins, so
// "sweet potato noodles" are noodles, "green onion" isn't an onion, and
// "frozen peas" are frozen vegetables.
const MATCHERS = [
  ["cooked-rice", /\b(cooked|steamed|day-old|leftover) [a-z -]*rice\b|\brice\b.*\b(cooked|day-old|leftovers?)\b/],
  ["cooked-meat", /\b(leftover|cooked|grilled|roasted|fried|rotisserie|smoked)\b.*\b(chicken|beef|pork|bulgogi|galbi|meat|fish|salmon|shrimp|turkey|steak)\b/],
  ["cooked-veg", /\b(leftover|cooked|roasted|steamed)\b.*\b(potato(es)?|vegetables?|veggies|broccoli|carrots?|spinach|squash)\b/],
  ["cooked-noodles", /\b(leftover|cooked)\b.*\b(pasta|noodles|spaghetti|macaroni)\b/],
  ["leftovers", /\bleftovers?\b/],
  ["frozen-veg-fruit", /\bfrozen\b(?!.*\b(dumplings?|mandu|udon|noodles?)\b)/],
  ["mandu", /\b(dumplings?|mandu|potstickers?|gyoza|wontons?)\b(?! wrappers?)/],
  ["gim", /\b(roasted seaweed|gim|nori|seaweed snacks?|seaweed sheets?|seaweed for kimbap)\b/],
  ["kimbap", /\b(kimbap|gimbap|rice balls?|onigiri|jumeokbap|musubi)\b/],
  ["danmuji", /\b(danmuji|pickled radish|pickles?|pickled (cucumber|onion|jalape))/],
  ["kimchi", /\bkimchi\b/],
  ["gochujang", /\bgochujang\b|\b(korean )?(hot |red )pepper paste\b/],
  ["doenjang", /\bdoenjang\b|\bsoybean paste\b|\bmiso\b|\bssamjang\b|\bblack bean paste\b|\bchunjang\b/],
  ["soy-sauce", /\bsoy sauce\b|\bganjang\b|\btamari\b/],
  ["fish-sauce", /\b(fish|oyster) sauce\b/],
  ["sesame-oil", /\bsesame oil\b/],
  ["sesame-seeds", /\bsesame seeds?\b/],
  ["peanut-butter", /\b(peanut|almond|sunflower) butter\b/],
  ["condiments", /\b(mayo|mayonnaise|kewpie|ketchup|mustard|sriracha|bbq sauce|barbecue sauce|worcestershire|hot sauce|chili crisp)\b/],
  ["vinegar", /\bvinegar\b/],
  ["syrups", /\b(honey|corn syrup|rice syrup|maple syrup|oligo(dang)?|agave|molasses|jocheong)\b/],
  ["dried-anchovies", /\bdried anchov|\bmyeolchi\b/],
  ["dried-seaweed", /\b(miyeok|wakame|dashima|kelp|dried seaweed)\b/],
  ["gochugaru", /\bgochugaru\b|\bchil(i|e) (flakes|powder)\b|\bred pepper flakes\b|\bpaprika\b|\bcumin\b|\bcinnamon\b|\bturmeric\b|\bgaram masala\b|\bcurry powder\b|\bground (coriander|ginger|cardamom|nutmeg|cloves|allspice|mustard)\b|\bdried (oregano|thyme|basil|parsley|rosemary|dill|herbs?|italian herbs?|red chil[a-z]*|chil[a-z]*)|\bitalian (seasoning|herbs?)\b|\bbay lea|\bcardamom\b|\bspices?\b|\b(garlic|onion) powder\b|\bblack pepper\b|\bpeppercorns?\b|\bcumin seeds?\b|\bcoriander seeds?\b/],
  ["tteok", /\brice cakes?\b|\btteok\b|\bgaraetteok\b/],
  ["fresh-noodles", /\b(udon|kalguksu|fresh (noodles|pasta)|refrigerated (noodles|pasta)|wonton wrappers?|dumpling wrappers?)\b/],
  ["dry-noodles", /\b(spaghetti|pasta|macaroni|penne|fettuccine|linguine|rotini|fusilli|ditalini|lasagna|somyeon|dangmyeon|glass noodles|sweet potato (glass )?noodles|noodles?|ramen|ramyun|ramyeon|lo mein|soba|vermicelli|rice paper)\b/],
  ["brown-rice", /\bbrown rice\b(?! syrup)/],
  ["white-rice", /\brice\b(?! (syrup|vinegar|wine|flour|paper|noodles?|cakes?|krispies|cereal))/],
  ["tortillas", /\btortillas?\b(?! chips)/],
  ["flour", /\bflour\b/],
  ["bread", /\b(bread|buns?|rolls?|baguette|brioche|sourdough|pitas?|naan|bagels?|english muffins?|hoagie|flatbread)\b(?!crumbs)/],
  ["imitation-crab", /\bimitation crab\b|\bcrab sticks?\b|\bsurimi\b|\bkrab\b/],
  ["fish-cakes", /\bfish cakes?\b|\beomuk\b|\bodeng\b/],
  ["canned-tuna", /\b(canned |can of )?tuna\b(?! steak)/],
  ["spam", /\bspam\b|\bluncheon meat\b/],
  ["hot-dogs", /\b(hot dogs?|frankfurters?|wieners?|vienna sausages?|mini sausages?)\b/],
  ["bacon", /\bbacon\b/],
  ["deli-ham", /\b(ham|deli|lunch meat|cold cuts|salami|pepperoni|prosciutto|turkey slices)\b/],
  ["sausage-raw", /\bsausages?\b|\bchorizo\b/],
  ["ground-meat", /\bground (beef|pork|chicken|turkey|lamb|meat)\b|\bminced (beef|pork|meat)\b|\bmeatballs?\b/],
  ["shrimp", /\b(shrimp|prawns?|clams?|mussels?|squid|scallops?|crab|octopus|lobster|seafood)\b/],
  ["fish-fatty", /\b(salmon|mackerel|trout|sardines?|tuna steak|eel|yellowtail|sablefish|herring)\b/],
  ["fish-lean", /\b(cod|tilapia|pollock|halibut|flounder|sole|haddock|white fish|whitefish|fish fillets?|fish)\b/],
  ["chicken", /\b(chicken|turkey|drumsticks?|cornish hens?|wings?|poultry)\b(?! (broth|stock|bouillon|powder))/],
  ["steaks-roasts", /\b(beef|ribeye|rib eye|sirloin|brisket|short ribs?|galbi|steak|chuck|flank|pork|lamb|veal|tenderloin|bulgogi)\b(?! (broth|stock|bouillon|powder))/],
  ["hard-boiled-eggs", /\bhard[- ]boiled\b|\bboiled eggs?\b|\bjangjorim\b/],
  ["eggs", /\beggs?\b(?! (noodles?|roll|wrappers?))/],
  ["sour-cream", /\bsour cream\b/],
  ["cream", /\b(heavy cream|whipping cream|half-and-half|light cream|double cream)\b/],
  ["butter", /\bbutter\b(?! lettuce)|\bghee\b/],
  ["yogurt", /\byogh?urt\b/],
  ["hard-cheese", /\b(cheddar|parmesan|parmigiano|pecorino|gouda|swiss|provolone|monterey jack|colby|gruyere|asiago|manchego)\b/],
  ["soft-cheese", /\b(mozzarella|shredded cheese|string cheese|cream cheese|ricotta|cottage cheese|feta|cotija|goat cheese|brie|american cheese|mexican-blend|queso|cheese)\b/],
  ["milk", /(?<!(coconut|condensed|evaporated|almond|oat|soy|rice) )\bmilk\b(?! chocolate)/],
  ["tofu", /\btofu\b|\bdubu\b|\byubu\b/],
  ["dips", /\b(hummus|salsa|guacamole|tzatziki)\b/],
  ["broth", /\b(broth|stock|dashi)\b/],
  ["canned-goods", /\b(canned|cans?|(?<!(green|string|long) )beans?(?! sprouts?)|chickpeas?|lentils?|tomato (sauce|paste)|crushed tomatoes|diced tomatoes|marinara|pizza sauce|enchilada sauce|coconut (milk|cream)|condensed milk|evaporated milk|olives|olive(?! oil)|curry roux|curry paste|tamarind)\b/],
  ["nuts", /\b(walnuts?|almonds?|pine nuts?|peanuts?|cashews?|pecans?|pistachios?|hazelnuts?|chestnuts?|nuts?)\b/],
  ["cooking-oil", /\boils?\b/],
  ["perilla", /\bperilla\b|\bkkaennip\b|\bsesame leaves\b/],
  ["green-onions", /\b(green onions?|scallions?|spring onions?|pa)\b/],
  ["herbs", /\b(cilantro|parsley|basil|dill|mint|chives?|thai basil|tarragon|coriander leaves)\b/],
  ["onions", /\b(onions?|shallots?|leeks?)\b/],
  ["garlic", /\bgarlic\b/],
  ["ginger", /\bginger\b/],
  ["sweet-potatoes", /\b(sweet potato(es)?|goguma|yams?)\b/],
  ["potatoes", /\bpotato(es)?\b(?! (starch|chips|flakes))/],
  ["mushrooms", /^(?!.*\bdried\b).*\b(mushrooms?|shiitake|enoki|portobello|cremini|oyster mushrooms?|king oyster)\b/],
  ["bean-sprouts", /\b(bean sprouts?|kongnamul|sukju|soybean sprouts?|sprouts)\b/],
  ["korean-radish", /\b(korean radish|daikon|radish(es)?|mu)\b/],
  ["bok-choy", /\b(bok|pak) choy\b/],
  ["cabbage", /\bcabbage\b/],
  ["spinach", /\bspinach\b/],
  ["lettuce", /\b(lettuce|salad greens|mixed greens|spring mix|romaine|arugula|kale|greens)\b/],
  ["broccoli", /\b(broccoli|broccolini|cauliflower)\b/],
  ["celery", /\bcelery\b/],
  ["carrots", /\bcarrots?\b/],
  ["peppers", /\b(bell peppers?|jalape(ñ|n)os?|serranos?|chil(i|e) peppers?|green chil(i|e)s?|red chil(i|e)s?|thai chil(i|e)s?|cheongyang|peppers?)\b/],
  ["zucchini", /\b(zucchini|summer squash|yellow squash|aehobak|korean zucchini)\b/],
  ["cucumber", /\bcucumbers?\b/],
  ["eggplant", /\beggplants?\b/],
  ["green-beans", /\b(green beans?|string beans?|snap peas?|snow peas?|sugar snaps?)\b/],
  ["corn", /\bcorn\b(?!starch| syrup| tortillas?| chips)/],
  ["tomatoes", /(?<!sun-dried |sundried )\btomato(es)?\b/],
  ["avocado", /\bavocados?\b/],
  ["asian-pear", /\b(asian|korean) pears?\b|\bpears?\b/],
  ["apples", /\bapples?\b/],
  ["bananas", /\bbananas?\b/],
  ["berries", /\b(strawberr(y|ies)|blueberr(y|ies)|raspberr(y|ies)|blackberr(y|ies)|berr(y|ies))\b/],
  ["grapes", /\bgrapes?\b/],
  ["citrus", /\b(lemons?|limes?|oranges?|tangerines?|clementines?|mandarins?|grapefruits?|yuzu)\b(?! (juice|marmalade|tea))/],
  ["mango", /\bmango(e?s)?\b/],
  ["pineapple", /\bpineapples?\b/],
  ["melon", /\b(watermelon|cantaloupe|honeydew|melons?)\b/],
];

// Things the guide doesn't need to cover: water, salt, sugar, ice, skewers.
const NOT_FOOD = /^((cold|hot|warm|boiling|sparkling) )?water$|^(ice|ice cubes?|salt|kosher salt|sea salt|sugar|brown sugar|powdered sugar|wooden skewers?|toothpicks?)$/;

function match(s) {
  if (!s || NOT_FOOD.test(s)) return null;
  for (const [key, re] of MATCHERS) if (re.test(s)) return BY_KEY.get(key) || null;
  return null;
}

/**
 * The guide entry for an ingredient or a "what we have" name, or null.
 * "Ham or bacon" is ham, but "chicken or vegetable broth" is broth.
 */
export function foodFor(name) {
  const s = String(name || "").toLowerCase().replace(/\([^)]*\)/g, " ").split(/,| - /)[0].replace(/\s+/g, " ").trim();
  const [first] = s.split(/\s+or\s+/);
  if (first === s) return match(s);
  // "Chicken or vegetable broth": the last words name the food.
  if (/\b(broth|stock|sauce|paste|oil|flour|noodles?|powder|vinegar|cheese|beans|syrup)$/.test(s)) return match(s.split(" ").slice(-2).join(" ")) || match(s);
  return match(first.trim()) || match(s);
}

/** Leftovers of a dish: soups and stews, banchan, kimbap, noodles… or leftovers in general. */
export function leftoversFor(dish) {
  const name = `${dish?.name || ""} ${dish?.nameKo || ""}`.toLowerCase();
  const cats = dish?.categories || [];
  const pick = (key) => BY_KEY.get(key) || BY_KEY.get("leftovers") || null;
  if (/kimbap|gimbap|musubi|rice ball|onigiri|jumeokbap/.test(name)) return pick("kimbap");
  if (/mandu|dumpling|gyoza|potsticker/.test(name)) return pick("mandu");
  if (/pizza/.test(name)) return pick("pizza");
  if (/potato salad|egg salad|macaroni salad|tuna salad|chicken salad/.test(name)) return pick("mayo-salads");
  if (cats.includes("soup") || /\b(jjigae|guk|tang|soup|stew|chili|curry)\b/.test(name)) return pick("soups-stews");
  if (cats.includes("side") && /namul|muchim|spinach|sprout|sigeumchi|kongnamul/.test(name)) return pick("namul");
  if (cats.includes("side") && /jorim|bokkeum|braised|stir-fr/.test(name)) return pick("jorim-bokkeum");
  if (cats.includes("side")) return pick("cooked-veg");
  if (/\b(egg|omelet|omelette|gyeran|frittata|quiche|shakshuka)\b/.test(name)) return pick("egg-dishes");
  if (cats.includes("treat") || /muffin|cookie|cake|bread|brownie/.test(name)) return pick("baked-goods");
  return pick("leftovers");
}

// ---------- Times in words ----------

const DAYS = { hours: 1 / 24, days: 1, weeks: 7, months: 30, years: 365 };

export function toDays(t) {
  return t ? t.max * (DAYS[t.unit] ?? 1) : 0;
}

/** { min: 3, max: 5, unit: "days" } → "3–5 days"; { 1, 1, weeks } → "1 week". */
export function rangeText(t) {
  if (!t) return "";
  const unit = t.max === 1 ? t.unit.replace(/s$/, "") : t.unit;
  return t.min === t.max || t.min == null ? `${t.max} ${unit}` : `${t.min}–${t.max} ${unit}`;
}

export const PLACES = [
  { key: "fridge", label: "Fridge", emoji: "🥶", note: "40°F (4°C) or colder" },
  { key: "freezer", label: "Freezer", emoji: "🧊", note: "0°F (-18°C), best quality" },
  { key: "pantry", label: "Counter or pantry", emoji: "🏠", note: "room temperature" },
];

/** "Fridge 3–5 days · Freezer 2–3 months". */
export function lastsText(food) {
  if (!food) return "";
  return PLACES.filter((p) => food[p.key]).map((p) => `${p.key === "pantry" ? "Pantry" : p.label} ${rangeText(food[p.key])}`).join(" · ");
}

/** Where it lives day to day: fridge, freezer, pantry or counter. */
export function homeOf(food) {
  if (!food) return null;
  if (food.best === "counter-then-fridge") return "fridge";
  return food.best === "counter" ? "pantry" : food.best;
}

/**
 * How many days something keeps where it lives (its longest time), for
 * "still have it?" on what we have. null when the guide doesn't know it.
 */
export function keepsDays(name) {
  const food = foodFor(name);
  if (!food) return null;
  const home = homeOf(food);
  return toDays(food[home]) || toDays(food.fridge) || toDays(food.pantry) || null;
}

/** A fact for today, the same all day: "Did you know?" on the Today screen. */
export function factFor(date = new Date()) {
  const facts = FOODS.filter((f) => f.why);
  if (!facts.length) return null;
  const day = Math.floor(new Date(date).setHours(12, 0, 0, 0) / 86400000);
  return facts[((day % facts.length) + facts.length) % facts.length];
}

/** Questions for "Where does it go?": foods with one clear home. */
export function quizFoods() {
  return FOODS.filter((f) => ["fridge", "freezer", "pantry", "counter"].includes(f.best) && f.kidName !== false && f.group !== "cooked");
}
