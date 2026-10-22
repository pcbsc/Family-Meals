// The food storage guide: every entry is complete and sourced, the key
// food-safety numbers match the USDA FSIS cold storage chart, and the names on
// our recipes and lists find the right entry.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  FOODS, RULES, GROUPS, foodFor, foodByKey, leftoversFor, rangeText, lastsText, keepsDays, toDays, factFor, quizFoods,
} from "../../js/storage.js";
import { parseIngredient } from "../../js/recipe.js";
import { STARTER_DISHES } from "../../js/seed.js";

const UNITS = ["hours", "days", "weeks", "months", "years"];
const PLACES = ["fridge", "freezer", "pantry"];
const time = (f, place) => (f[place] ? `${f[place].min}-${f[place].max} ${f[place].unit}` : null);

test("every food in the guide is complete, sensible and sourced", () => {
  assert.ok(FOODS.length >= 100, `${FOODS.length} foods`);
  const keys = new Set();
  const groups = new Set(GROUPS.map((g) => g.key));
  for (const f of FOODS) {
    assert.ok(!keys.has(f.key), `duplicate ${f.key}`);
    keys.add(f.key);
    assert.ok(f.name && f.emoji && groups.has(f.group), f.key);
    assert.ok(["fridge", "freezer", "pantry", "counter", "counter-then-fridge"].includes(f.best), `${f.key}: best ${f.best}`);
    assert.ok(f.how && f.how.length > 20, `${f.key} says how to keep it`);
    assert.ok(f.sources.length >= 1, `${f.key} has a source`);
    for (const s of f.sources) assert.match(s.url, /^https:\/\/[^\s]+$/, `${f.key}: ${s.url}`);
    const times = [f, ...(f.variants || [])].flatMap((v) => PLACES.map((p) => v[p]).filter(Boolean));
    assert.ok(times.length, `${f.key} has at least one time`);
    for (const t of times) {
      assert.ok(UNITS.includes(t.unit), `${f.key}: unit ${t.unit}`);
      assert.ok(Number.isFinite(t.min) && Number.isFinite(t.max) && t.min > 0 && t.min <= t.max, `${f.key}: ${JSON.stringify(t)}`);
    }
    // Where it lives has a time (or its variants do).
    const home = f.best === "counter-then-fridge" ? "fridge" : f.best === "counter" ? "pantry" : f.best;
    assert.ok(f[home] || (f.variants || []).some((v) => v[home]), `${f.key}: no ${home} time`);
    // Freezing never makes food keep less long than the fridge does.
    if (f.fridge && f.freezer) assert.ok(toDays(f.freezer) >= toDays(f.fridge), `${f.key}: freezer shorter than fridge`);
  }
});

test("the key food-safety numbers match the USDA FSIS cold storage chart", () => {
  const expect = {
    "ground-meat": { fridge: "1-2 days", freezer: "3-4 months" },
    "steaks-roasts": { fridge: "3-5 days" },
    chicken: { fridge: "1-2 days" },
    "sausage-raw": { fridge: "1-2 days", freezer: "1-2 months" },
    bacon: { fridge: "7-7 days", freezer: "1-1 months" },
    eggs: { fridge: "3-5 weeks" },
    "hard-boiled-eggs": { fridge: "1-1 weeks" },
    "cooked-meat": { fridge: "3-4 days" },
    leftovers: { fridge: "3-4 days" },
    "soups-stews": { fridge: "3-4 days", freezer: "2-3 months" },
    pizza: { fridge: "3-4 days", freezer: "1-2 months" },
    "mayo-salads": { fridge: "3-5 days" },
    "fish-lean": { fridge: "1-2 days" },
    "fish-fatty": { fridge: "1-2 days" },
    shrimp: { fridge: "1-2 days" },
  };
  for (const [key, places] of Object.entries(expect)) {
    const f = foodByKey(key);
    assert.ok(f, key);
    for (const [place, want] of Object.entries(places)) {
      const got = time(f, place);
      const asDays = got && toDays(f[place]);
      const wantDays = toDays({ max: Number(want.split("-")[1].split(" ")[0]), unit: want.split(" ")[1] });
      // The chart's time, or a little more cautious when another official source said shorter; never longer.
      assert.ok(got && asDays <= wantDays && asDays >= wantDays / 2, `${key} ${place}: ${got}, the FSIS chart says ${want}`);
    }
  }
  // Eggs in the shell and hard-boiled eggs don't go in the freezer.
  assert.equal(foodByKey("eggs").freezer, null);
});

test("the food safety rules cover the basics", () => {
  const text = RULES.map((r) => `${r.rule} ${r.detail || ""}`).join(" ");
  assert.ok(RULES.length >= 6);
  assert.match(text, /2 hours/);
  assert.match(text, /40\s?°F/);
  assert.match(text, /0\s?°F/);
  assert.match(text, /165\s?°F/);
  assert.match(text, /thaw/i);
});

test("names on recipes and lists find the right food", () => {
  const cases = {
    "ground beef": "ground-meat", "2 lb boneless chicken thighs": "chicken", "chicken or vegetable broth": "broth", "ham or bacon": "deli-ham",
    "4 cups cooked rice (day-old is best)": "cooked-rice", "short-grain rice": "white-rice", "brown rice": "brown-rice", "rice syrup": "syrups",
    "rice cakes (tteok)": "tteok", "rice vinegar": "vinegar", "sweet potato glass noodles": "dry-noodles", "Korean sweet potato": "sweet-potatoes",
    "green onions": "green-onions", "onion": "onions", "garlic powder": "gochugaru", "garlic": "garlic", "gochujang": "gochujang",
    "kimchi juice": "kimchi", "fish cakes (eomuk)": "fish-cakes", "fish sauce": "fish-sauce", "salmon fillet": "fish-fatty", "cod": "fish-lean",
    "olive oil": "cooking-oil", "sesame oil": null, "peanut butter": "peanut-butter", "coconut milk": "canned-goods", "milk": "milk",
    "butter lettuce": "lettuce", "bean sprouts": "bean-sprouts", "green beans": "green-beans", "black beans": "canned-goods",
    "potato starch": null, "sun-dried tomatoes": null, "frozen peas": "frozen-veg-fruit", "frozen Korean dumplings (mandu)": "mandu",
    "round dumpling wrappers": "fresh-noodles", "roasted seaweed for kimbap": "gim", "dried anchovies": "dried-anchovies",
    "dried shiitake mushrooms": null, "shiitake mushrooms": "mushrooms", "leftover bulgogi": "cooked-meat", "water": null, "salt": null,
    "Asian pear": "asian-pear", "lemon juice": null, "lemons": "citrus", "flour tortillas": "tortillas", "all-purpose flour": "flour",
  };
  for (const [name, key] of Object.entries(cases)) assert.equal(foodFor(name)?.key ?? null, key, name);
});

test("nearly every ingredient in the starter recipes is in the guide", () => {
  const missing = new Map();
  let total = 0;
  for (const d of STARTER_DISHES) {
    for (const line of d.ingredients) {
      const p = parseIngredient(line);
      if (p.header || !p.item) continue;
      total++;
      if (!foodFor(p.item) && !/\b(salt|sugar|water|ice|skewers?|vanilla|baking|yeast|starch|cornstarch|panko|breadcrumbs|oats|raisins?|granola|juice|jujubes?|ginseng|mirin|chips|dough|sun-dried|dried shiitake|sesame oil|wakame|dried seaweed|perilla|pancake mix|furikake|coffee|kabocha|soy milk)\b/i.test(p.item)) {
        missing.set(p.item, (missing.get(p.item) || 0) + 1);
      }
    }
  }
  assert.ok(total > 1500);
  assert.deepEqual([...missing.keys()], [], "ingredients with no storage entry");
});

test("shelf life in words, and how long things keep where they live", () => {
  assert.equal(rangeText({ min: 3, max: 5, unit: "days" }), "3–5 days");
  assert.equal(rangeText({ min: 1, max: 1, unit: "weeks" }), "1 week");
  assert.equal(rangeText({ min: 6, max: 12, unit: "months" }), "6–12 months");
  assert.match(lastsText(foodByKey("ground-meat")), /^Fridge 1–2 days · Freezer 3–4 months/);
  assert.ok(keepsDays("strawberries") < keepsDays("carrots"), "berries go first");
  assert.ok(keepsDays("ground beef") <= 2);
  assert.ok(keepsDays("white rice") > 300, "uncooked rice keeps for ages");
  assert.equal(keepsDays("paper towels"), null);
});

test("leftovers of a dish use the right entry", () => {
  const key = (dish) => leftoversFor(dish)?.key;
  assert.equal(key({ name: "Kimchi Jjigae", categories: ["korean", "soup"] }), "soups-stews");
  assert.equal(key({ name: "Kimbap", categories: ["korean"] }), "kimbap");
  assert.equal(key({ name: "Seasoned Spinach", nameKo: "시금치나물", categories: ["korean", "side"] }), "namul");
  assert.equal(key({ name: "Soy-Braised Potatoes (Gamja Jorim)", categories: ["korean", "side"] }), "jorim-bokkeum");
  assert.equal(key({ name: "Beef Bulgogi", categories: ["korean", "meat"] }), "leftovers");
  assert.equal(key({ name: "Homemade Mandu", categories: ["korean"] }), "mandu");
  for (const d of STARTER_DISHES) assert.ok(leftoversFor(d), d.seedKey);
});

test("a fact a day, and quiz foods with one clear home", () => {
  const a = factFor(new Date(2026, 9, 20, 8));
  assert.equal(factFor(new Date(2026, 9, 20, 21)).key, a.key, "the same all day");
  assert.notEqual(factFor(new Date(2026, 9, 21, 8)).key, a.key, "a new one tomorrow");
  const quiz = quizFoods();
  assert.ok(quiz.length >= 30);
  for (const f of quiz) assert.ok(["fridge", "freezer", "pantry", "counter"].includes(f.best));
});
