import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseIngredient,
  scaleIngredient,
  formatQty,
  normalizeItemName,
  buildGroceryList,
  findTimers,
  parseRecipeText,
  aisleFor,
  findLink,
  whatCanIMake,
  keyIngredients,
} from "../../js/recipe.js";

test("reads quantities, units and notes", () => {
  const p = parseIngredient("1 1/2 cups short-grain rice, rinsed");
  assert.equal(p.qty, 1.5);
  assert.equal(p.unit, "cup");
  assert.equal(p.item, "short-grain rice");
  assert.equal(p.note, "rinsed");

  assert.equal(parseIngredient("½ tsp salt").qty, 0.5);
  assert.equal(parseIngredient("1½ lb beef").qty, 1.5);
  assert.equal(parseIngredient("2-3 green onions").qtyMax, 3);
  assert.equal(parseIngredient("2 T soy sauce").unit, "tbsp");
  assert.equal(parseIngredient("1 t sesame oil").unit, "tsp");
  assert.equal(parseIngredient("3 cloves garlic, minced").unit, "clove");
  assert.equal(parseIngredient("2 eggs").unit, null);
  assert.equal(parseIngredient("Salt to taste").qty, null);
  assert.equal(parseIngredient("For the sauce:").header, true);
  // "oz" must not swallow the start of "onion"; "l" must not swallow "large".
  assert.equal(parseIngredient("1 onion").unit, null);
  assert.equal(parseIngredient("1 large egg").unit, null);
  assert.equal(parseIngredient("2 fl oz milk").unit, "fl oz");
});

test("formats friendly fractions", () => {
  assert.equal(formatQty(0.5), "½");
  assert.equal(formatQty(1.5), "1½");
  assert.equal(formatQty(0.33), "⅓");
  assert.equal(formatQty(2.66), "2⅔");
  assert.equal(formatQty(0.98), "1");
  assert.equal(formatQty(12.4), "12");
  assert.equal(formatQty(252, "g"), "250");
  assert.equal(formatQty(0.02), "⅛");
});

test("scales ingredient lines", () => {
  assert.equal(scaleIngredient("1 lb beef", 2), "2 lb beef");
  assert.equal(scaleIngredient("1/2 cup soy sauce", 1.5), "¾ cup soy sauce");
  assert.equal(scaleIngredient("2-3 green onions", 2), "4–6 green onions");
  assert.equal(scaleIngredient("1 (14 oz) can tomatoes", 2), "2 (14 oz) can tomatoes");
  assert.equal(scaleIngredient("Salt to taste", 3), "Salt to taste");
  assert.equal(scaleIngredient("- 2 eggs", 0.5), "- 1 eggs");
  assert.equal(scaleIngredient("400 g tofu", 1.5), "600 g tofu");
});

test("normalizes names so the list merges duplicates", () => {
  assert.equal(normalizeItemName("Large Yellow Onions (about 1 lb)"), "yellow onion");
  assert.equal(normalizeItemName("scallions, sliced"), "green onion");
  assert.equal(normalizeItemName("green onions"), "green onion");
  assert.equal(normalizeItemName("toasted sesame oil"), "sesame oil");
  assert.equal(normalizeItemName("potatoes"), "potato");
  assert.equal(normalizeItemName("cooked short-grain rice"), "rice");
  assert.equal(normalizeItemName("rice cakes"), "rice cake");
  assert.equal(normalizeItemName("bean sprouts"), "bean sprouts");
});

test("builds a merged, scaled shopping list", () => {
  const bulgogi = {
    name: "Bulgogi",
    servings: 4,
    ingredients: ["1 lb ribeye, thinly sliced", "3 tbsp soy sauce", "2 green onions", "Water"],
  };
  const japchae = {
    name: "Japchae",
    servings: 4,
    ingredients: ["8 oz ribeye", "1/4 cup soy sauce", "3 scallions", "Salt to taste"],
  };
  const list = buildGroceryList([
    { dish: bulgogi, servings: 8 },
    { dish: japchae, servings: 4 },
  ]);
  const byKey = Object.fromEntries(list.map((i) => [i.key, i]));
  assert.equal(byKey["ribeye"].amount, "2½ lb");
  assert.equal(byKey["ribeye"].aisle, "meat");
  assert.equal(byKey["soy sauce"].amount, "⅔ cup");
  assert.equal(byKey["soy sauce"].pantry, true);
  assert.equal(byKey["green onion"].amount, "7");
  assert.deepEqual(byKey["green onion"].dishes.sort(), ["Bulgogi", "Japchae"]);
  assert.equal(byKey["salt"].amount, "");
  assert.equal(byKey["water"], undefined);
});

test("puts things in sensible aisles", () => {
  assert.equal(aisleFor("firm tofu"), "asian");
  assert.equal(aisleFor("gochujang"), "asian");
  assert.equal(aisleFor("spinach"), "produce");
  assert.equal(aisleFor("egg"), "dairy");
  assert.equal(aisleFor("spaghetti"), "grains");
  assert.equal(aisleFor("frozen peas"), "frozen");
  assert.equal(aisleFor("sweet potato"), "produce");
  assert.equal(aisleFor("sweet potato noodles"), "asian");
});

test("finds timers in steps", () => {
  assert.deepEqual(findTimers("Simmer for 10 minutes, then rest 30 seconds."), [
    { seconds: 600, label: "10 minutes" },
    { seconds: 30, label: "30 seconds" },
  ]);
  assert.equal(findTimers("Bake 1-2 hours")[0].seconds, 3600);
  assert.equal(findTimers("Cook 7 to 9 min")[0].seconds, 420);
  assert.deepEqual(findTimers("Stir well."), []);
});

test("reads a pasted Instagram-style caption", () => {
  const caption = `Easy Gyeran Jjim 🥚
Serves 2

Ingredients:
- 3 eggs
- 1 cup water
- 1/2 tsp salt
- 1 green onion, chopped

Steps:
1. Whisk eggs, water and salt.
2. Cook on low for 8 minutes with the lid on.
3. Top with green onion.
#koreanfood #easyrecipe`;
  const r = parseRecipeText(caption);
  assert.equal(r.name, "Easy Gyeran Jjim 🥚");
  assert.equal(r.servings, 2);
  assert.deepEqual(r.ingredients, ["3 eggs", "1 cup water", "1/2 tsp salt", "1 green onion, chopped"]);
  assert.equal(r.steps.length, 3);
  assert.equal(r.steps[1], "Cook on low for 8 minutes with the lid on.");
});

test("keeps look-alike items in the right aisle", () => {
  assert.equal(aisleFor("egg noodles"), "grains");
  assert.equal(aisleFor("chicken broth"), "pantry");
  assert.equal(aisleFor("garlic powder"), "pantry");
  assert.equal(aisleFor("black pepper"), "pantry");
  assert.equal(aisleFor("red bell pepper"), "produce");
  assert.equal(aisleFor("eggplant"), "produce");
  assert.equal(aisleFor("peanut butter"), "pantry");
  assert.equal(aisleFor("pepperoni"), "meat");
});

test("whole things round up on the shopping list", () => {
  const tacos = { name: "Tacos", servings: 4, ingredients: ["1 avocado, sliced", "3 cloves garlic", "2 apples"] };
  const list = buildGroceryList([{ dish: tacos, servings: 3 }]);
  const byKey = Object.fromEntries(list.map((i) => [i.key, i]));
  assert.equal(byKey["avocado"].amount, "1");
  assert.equal(byKey["garlic"].amount, "3 cloves");
  assert.equal(byKey["apple"].amount, "2");
});

test("step numbers are removed, but amounts at the start of a step stay", async () => {
  const { stripStepNumber } = await import("../../js/recipe.js");
  assert.equal(stripStepNumber("1. Mix."), "Mix.");
  assert.equal(stripStepNumber("Step 2: Stir."), "Stir.");
  assert.equal(stripStepNumber("3) Bake."), "Bake.");
  assert.equal(stripStepNumber("3-4 minutes later, flip."), "3-4 minutes later, flip.");
  assert.equal(stripStepNumber("1.5 cups water go in."), "1.5 cups water go in.");
  assert.equal(stripStepNumber("2 eggs go in the bowl."), "2 eggs go in the bowl.");
});

test("links are made safe to open", async () => {
  const { cleanLink } = await import("../../js/recipe.js");
  assert.equal(cleanLink("www.maangchi.com/recipe/kimbap"), "https://www.maangchi.com/recipe/kimbap");
  assert.equal(cleanLink(" https://seonkyounglongest.com/bulgogi/ "), "https://seonkyounglongest.com/bulgogi/");
  assert.equal(cleanLink("javascript:alert(1)"), "");
  assert.equal(cleanLink("data:text/html,hi"), "");
  assert.equal(cleanLink("Grandma's kitchen"), "");
  assert.equal(cleanLink(""), "");
});

test("'X or Y food' lines keep the food's name", () => {
  assert.equal(normalizeItemName("soft or medium tofu, cubed"), "soft tofu");
  assert.equal(normalizeItemName("plain or vanilla yogurt"), "yogurt");
  assert.equal(normalizeItemName("pizza or marinara sauce"), "pizza sauce");
  assert.equal(normalizeItemName("beef or pork"), "beef");
  assert.equal(normalizeItemName("water or chicken broth"), "water");
  assert.equal(normalizeItemName("spaghetti or thick rice noodles"), "spaghetti");
});

test("new starter ingredients land in the right aisle", () => {
  const cases = {
    "korean black bean paste": "asian", "dried jujube": "asian", "chili crisp": "asian", "round rice paper": "asian",
    "round dumpling wrapper": "asian", "cornish hen": "meat", "cornstarch": "pantry", "potato starch": "pantry",
    "worcestershire sauce": "pantry", "panko breadcrumbs": "grains", "half-and-half": "dairy", "kidney bean": "pantry",
    "instant yeast": "pantry", "sun-dried tomato": "pantry", "dried italian herb": "pantry", "snap pea": "produce",
    "peanut": "pantry", "pizza sauce": "pantry",
  };
  for (const [item, aisle] of Object.entries(cases)) assert.equal(aisleFor(item), aisle, item);
});

test("a comma inside brackets is part of the name, not the start of a note", () => {
  const p = parseIngredient("1 can (15 oz, drained) chickpeas");
  assert.equal(p.unit, "can");
  assert.equal(normalizeItemName(p.item), "chickpea");
  assert.equal(parseIngredient("1 lb chicken thighs (boneless, skinless), cut up").note, "cut up");
  const list = buildGroceryList([{ dish: { name: "Salad", ingredients: ["1 can (15 oz, drained) chickpeas"], servings: 4 }, servings: 4 }]);
  assert.deepEqual(list.map((i) => [i.key, i.aisle]), [["chickpea", "pantry"]]);
});

test("links are found without the punctuation around them", () => {
  assert.equal(findLink("Watch this (https://youtu.be/i1djfV9uigc)."), "https://youtu.be/i1djfV9uigc");
  assert.equal(findLink("So good! https://www.tiktok.com/@cook/video/7398765432109876543!!"), "https://www.tiktok.com/@cook/video/7398765432109876543");
  assert.equal(findLink("https://en.wikipedia.org/wiki/Kimchi_(food)"), "https://en.wikipedia.org/wiki/Kimchi_(food)");
  assert.equal(findLink("no link here"), "");
  assert.equal(findLink(null), "");
});

test("what we can make: dishes ready to cook first, then ones that need a thing or two", () => {
  const eggTomato = { id: "a", name: "Tomato Egg", ingredients: ["5 eggs", "1/2 tsp salt", "3 tomatoes, cut into wedges", "2 tbsp vegetable oil", "1 tbsp ketchup", "1 green onion, sliced"] };
  const bulgogi = { id: "b", name: "Bulgogi", ingredients: ["1 1/2 lb ribeye, thinly sliced", "1/4 cup soy sauce", "1 onion, sliced", "4 cloves garlic, minced", "Sesame seeds, for serving"] };
  const katsu = { id: "c", name: "Katsu", ingredients: ["2 chicken breasts", "1 cup panko breadcrumbs", "2 eggs", "2 cups shredded cabbage"] };
  const salad = { id: "d", name: "Salad", ingredients: ["1 cucumber", "2 tomatoes"] };
  const result = whatCanIMake([bulgogi, katsu, eggTomato, salad], ["Eggs", "tomatoes", "scallions", "chicken"]);
  assert.deepEqual(result.map((r) => [r.dish.name, r.missing]), [
    ["Tomato Egg", []],
    ["Salad", ["cucumber"]],
    ["Katsu", ["panko breadcrumbs", "cabbage"]],
  ], "salt, oil, ketchup and garnishes are assumed; Bulgogi uses nothing we have");
  assert.deepEqual(whatCanIMake([bulgogi], ["beef", "onion", "garlic"])[0].missing, [], "beef covers ribeye");
  assert.deepEqual(whatCanIMake([eggTomato], []), []);
  assert.deepEqual([...keyIngredients(bulgogi)], ["ribeye", "onion", "garlic"]);
});

test("rice covers rice, but not rice cakes or rice paper", () => {
  const tteokbokki = { name: "Tteokbokki", ingredients: ["1 lb rice cakes"] };
  const bowl = { name: "Bowl", ingredients: ["2 cups cooked short-grain rice"] };
  const result = whatCanIMake([tteokbokki, bowl], ["rice"]);
  assert.deepEqual(result.map((r) => r.dish.name), ["Bowl"]);
});

test("cooking together: grown-up steps are whole words, and kids get a job", async () => {
  const { needsGrownUp, kidJob, ingredientsInStep } = await import("../../js/recipe.js");
  for (const step of ["Heat the oil in a pan.", "Cut the tofu into cubes.", "Bake for 20 minutes.", "A grown-up drains the noodles."]) assert.ok(needsGrownUp(step), step);
  for (const step of ["Roll each one in panko.", "Mix the pancake batter.", "Mash the potatoes with a fork.", "Thread half a hot dog onto each stick."]) assert.ok(!needsGrownUp(step), step);
  assert.match(kidJob("Crack the eggs into a bowl and beat them."), /Crack the eggs/);
  assert.match(kidJob("Top with green onions and sesame seeds."), /kid scissors/);
  assert.match(kidJob("Fill each wrapper with a spoonful and pinch closed to make mandu."), /Fill the wrappers/);
  assert.equal(kidJob("Simmer for 10 minutes.", { hasTimer: true }), "Be the timer captain: tap the timer and shout when it rings!");
  // At the stove, the job is away from the heat.
  assert.equal(kidJob("Simmer gently, then arrange on a plate."), "Be the helper: hand the grown-up each thing when it's time.");
  assert.match(kidJob("Cook the noodles in boiling water. Drain and rinse with cold water.", { hasTimer: true }), /timer captain/);
  assert.match(kidJob("Turn off the heat. Sprinkle with sesame seeds."), /Sprinkle/);
  assert.equal(kidJob("Let it rest."), "");
  const names = ["ribeye or sirloin", "onion", "green onions", "soy sauce", "cylinder rice cakes (tteok)", "red bell pepper", "water", "hard-boiled eggs"];
  const used = (step) => ingredientsInStep(step, names).map((i) => names[i]);
  assert.deepEqual(used("Add the beef and onion."), ["ribeye or sirloin", "onion"]);
  assert.deepEqual(used("Add the green onions for the last minute."), ["green onions"]);
  assert.deepEqual(used("Soak the rice cakes in warm water."), ["cylinder rice cakes (tteok)"]);
  assert.deepEqual(used("Cook the bell pepper with the soy sauce, then add the eggs."), ["soy sauce", "red bell pepper", "hard-boiled eggs"]);
});

test("allergies and dislikes are found in ingredients, sauces too, without look-alikes", async () => {
  const { foodsIn } = await import("../../js/recipe.js");
  const dish = { ingredients: ["Sauce:", "3 tbsp soy sauce", "1 tbsp gochujang", "2 tbsp peanut butter", "1 can coconut milk", "8 corn tortillas", "4 oz glass noodles", "1 cup shiitake mushrooms"] };
  const found = (foods) => foodsIn(dish, foods).map((x) => `${x.food}: ${x.lines.join(" | ")}`);
  assert.deepEqual(found("wheat"), ["wheat: 3 tbsp soy sauce | 1 tbsp gochujang"]);
  assert.deepEqual(found("soy"), ["soy: 3 tbsp soy sauce | 1 tbsp gochujang"]);
  assert.deepEqual(found("peanuts, milk, eggs"), ["peanuts: 2 tbsp peanut butter"]);
  assert.deepEqual(found("Mushrooms"), ["mushrooms: 1 cup shiitake mushrooms"]);
  assert.deepEqual(foodsIn({ ingredients: ["2 tbsp butter", "1 tbsp fish sauce", "4 shrimp"] }, "dairy; fish; shellfish").map((x) => x.food), ["dairy", "fish", "shellfish"]);
  assert.deepEqual(foodsIn(dish, ""), []);
});
