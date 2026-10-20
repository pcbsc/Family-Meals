// Cooking our way: healthier swaps, spice levels, metric amounts, plus the
// calendar file and "try something else" ideas.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  healthierLine, spiceLine, cookedLines, toMetric, metricText, buildGroceryList, isChiliLine, haveCovers, normalizeItemName,
} from "../../js/recipe.js";
import { weekCalendar, suggestDishes } from "../../js/planner.js";
import { STARTER_DISHES } from "../../js/seed.js";

const better = (line) => healthierLine(line)?.line ?? null;

test("healthy swaps change what's worth changing", () => {
  assert.equal(better("4 cups cooked rice (day-old is best)"), "4 cups cooked brown rice (day-old is best)");
  assert.equal(better("2 cups short-grain rice"), "2 cups short-grain brown rice");
  assert.equal(better("5 tbsp soy sauce"), "5 tbsp low-sodium soy sauce");
  assert.equal(better("2 tbsp brown sugar"), "1 tbsp brown sugar (half the usual)");
  assert.equal(better("8 oz elbow macaroni"), "8 oz whole-wheat elbow macaroni");
  assert.equal(better("4 slices white bread"), "4 slices whole-wheat bread");
  assert.equal(better("1 lb ground beef"), "1 lb lean ground beef");
  assert.equal(better("1 cup heavy cream"), "1 cup half-and-half");
  assert.equal(better("4 hot dogs"), "4 chicken hot dogs");
  assert.match(better("4 cups vegetable oil, for frying"), /air-fry/);
  assert.match(better("2 packages instant ramen"), /half the seasoning/);
});

test("healthy swaps leave look-alikes alone", () => {
  for (const line of [
    "1 lb rice cakes (tteok)", "2 tbsp rice vinegar", "8 oz rice noodles", "2 tbsp soup soy sauce", "1 tbsp low-sodium soy sauce",
    "1 cup brown rice", "2 cups sushi rice", "4 corn tortillas", "1 cup panko breadcrumbs", "2 chicken sausages", "1 cup Greek yogurt",
    "1 tbsp gochujang", "Salt, to taste", "Sauce:",
  ]) assert.equal(better(line), null, line);
});

test("spice levels: mild leaves the hot things out and halves gochujang, spicy adds more", () => {
  assert.deepEqual(spiceLine("1 tbsp gochugaru", "mild"), { line: "1 tbsp gochugaru", off: true });
  assert.equal(spiceLine("2 tbsp gochujang", "mild").line, "1 tbsp gochujang (half for mild)");
  assert.equal(spiceLine("1 jalapeño, sliced", "mild").off, true);
  assert.equal(spiceLine("1 tbsp gochugaru", "spicy").line, "1½ tbsp gochugaru (extra for spice lovers)");
  assert.deepEqual(spiceLine("1 tbsp gochugaru", "medium"), { line: "1 tbsp gochugaru", off: false });
  // Not hot at all.
  for (const line of ["1 tbsp sweet chili sauce", "1 red bell pepper", "1 tsp paprika", "2 tsp chili powder"]) {
    assert.equal(isChiliLine(line), false, line);
    assert.deepEqual(spiceLine(line, "mild"), { line, off: false });
  }
});

test("a dish cooked our way: healthy and mild together, with tips", () => {
  const dish = {
    name: "Test", categories: ["korean", "rice"], healthyTip: "Add spinach.",
    ingredients: ["Sauce:", "2 tbsp gochujang", "1 tsp gochugaru", "3 tbsp soy sauce", "2 cups cooked rice"],
  };
  const plain = cookedLines(dish);
  assert.deepEqual(plain.lines.map((l) => l.line), dish.ingredients, "medium and not healthy: the recipe as written");
  assert.deepEqual(plain.swaps, []);
  const ours = cookedLines(dish, { healthy: true, spice: "mild" });
  assert.equal(ours.lines.length, dish.ingredients.length, "lines stay in order, headers included");
  assert.equal(ours.lines[1].line, "1 tbsp gochujang (half for mild)");
  assert.equal(ours.lines[2].off, true);
  assert.equal(ours.lines[3].line, "3 tbsp low-sodium soy sauce");
  assert.equal(ours.lines[3].was, "3 tbsp soy sauce");
  assert.equal(ours.lines[4].line, "2 cups cooked brown rice");
  assert.deepEqual(ours.swaps, ["low-sodium soy sauce", "brown rice"]);
  assert.equal(ours.tips[0], "Add spinach.");
  assert.ok(ours.tips.some((t) => /Brown rice takes longer/.test(t)));
  assert.ok(ours.tips.some((t) => /^Mild/.test(t)));
  // Spicy fans get a tip even for a dish with no chili in it.
  assert.ok(cookedLines({ categories: ["korean", "soup"], ingredients: ["1 onion"] }, { spice: "spicy" }).tips.length);
  assert.equal(cookedLines({ categories: ["treat"], ingredients: ["1 cup sugar"] }, { spice: "spicy" }).tips.length, 0);
});

test("every starter recipe still reads well with every switch on", () => {
  for (const dish of STARTER_DISHES) {
    for (const prefs of [{ healthy: true, spice: "mild" }, { healthy: true, spice: "spicy" }]) {
      const { lines } = cookedLines(dish, prefs);
      assert.equal(lines.length, dish.ingredients.length, dish.seedKey);
      for (const l of lines) {
        assert.ok(l.line && !/undefined|NaN/.test(l.line), `${dish.seedKey}: ${l.line}`);
        assert.ok(!/brown brown|whole-wheat whole|low-sodium low/.test(l.line), `${dish.seedKey}: ${l.line}`);
        const metric = toMetric(l.line);
        assert.ok(metric && !/undefined|NaN/.test(metric), `${dish.seedKey}: ${metric}`);
      }
    }
  }
});

test("metric: grams for things people weigh, ml for liquids, spoons stay spoons", () => {
  assert.equal(toMetric("1 1/2 lb ribeye or sirloin, very thinly sliced"), "680 g ribeye or sirloin, very thinly sliced");
  assert.equal(toMetric("2 cups all-purpose flour"), "250 g all-purpose flour");
  assert.equal(toMetric("1 cup sugar"), "200 g sugar");
  assert.equal(toMetric("1 1/2 cups milk"), "360 ml milk");
  assert.equal(toMetric("5 cups chicken broth"), "1.2 l chicken broth");
  assert.equal(toMetric("2-3 cups flour"), "250–375 g flour");
  assert.equal(toMetric("2 tbsp soy sauce"), "2 tbsp soy sauce");
  assert.equal(toMetric("1 can (14 oz) diced tomatoes"), "1 can (395 g) diced tomatoes");
  assert.equal(toMetric("1 inch ginger, grated"), "2.5 cm ginger, grated");
  assert.equal(toMetric("3 eggs"), "3 eggs");
  assert.equal(toMetric("Sauce:"), "Sauce:");
});

test("metric steps: oven temperatures, inches, pounds", () => {
  assert.equal(metricText("Heat the oven to 400°F."), "Heat the oven to 200°C.");
  assert.equal(metricText("Bake at 350 degrees F for 20 minutes."), "Bake at 180°C for 20 minutes.");
  assert.equal(metricText("Cook to 165°F inside."), "Cook to 74°C inside.");
  assert.equal(metricText("Cut into 2-inch pieces, 1/2-inch thick."), "Cut into 5 cm pieces, 1 cm thick.");
  assert.equal(metricText("Use a 9x13-inch pan."), "Use a 23 x 33 cm pan.");
  assert.equal(metricText("Add 8 oz cheese."), "Add 225 g cheese.");
  assert.equal(metricText("Cook for 3 minutes."), "Cook for 3 minutes.");
});

test("the shopping list in metric", () => {
  const list = buildGroceryList([{ dish: { name: "A", servings: 4, ingredients: ["1 1/2 lb beef", "2 cups milk", "1 tbsp soy sauce"] }, servings: 4 }], { metric: true });
  assert.deepEqual(list.map((i) => `${i.name}: ${i.amount}`).sort(), ["Beef: 680 g", "Milk: 475 ml", "Soy sauce: 1 tbsp"]);
});

test("what we have covers the shopping list's names", () => {
  assert.ok(haveCovers(normalizeItemName("Eggs"), "egg"));
  assert.ok(haveCovers("chicken", normalizeItemName("boneless chicken thighs")));
  assert.ok(!haveCovers("chicken", "beef"));
});

test("the calendar file has one event per dinner, at dinner time, escaped and folded", () => {
  const ics = weekCalendar([
    { date: new Date(2026, 9, 20), meal: "dinner", title: "Bulgogi, rice; kimchi", detail: "Takes about 55 min\nFrom Family Menu" },
    { date: new Date(2026, 9, 21), meal: "dinner", title: "🍽️ " + "Very long dinner name ".repeat(6) },
  ], { now: new Date(Date.UTC(2026, 9, 19, 12)) });
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\nVERSION:2.0\r\n"));
  assert.ok(ics.endsWith("END:VCALENDAR\r\n"));
  assert.equal(ics.match(/BEGIN:VEVENT/g).length, 2);
  assert.match(ics, /DTSTART:20261020T180000\r\nDTEND:20261020T190000/);
  assert.match(ics, /SUMMARY:Bulgogi\\, rice\\; kimchi/);
  assert.match(ics, /DESCRIPTION:Takes about 55 min\\nFrom Family Menu/);
  assert.match(ics, /UID:20261021-dinner@family-menu/);
  for (const line of ics.split("\r\n")) assert.ok(new TextEncoder().encode(line).length <= 75, line);
});

test("try-something-else ideas fit the meal, skip what's planned and sides, and lean to the same kind", () => {
  const dishes = [
    { id: "a", meals: ["dinner"], categories: ["korean"], cuisine: "korean" },
    { id: "b", meals: ["dinner"], categories: [], cuisine: "italian" },
    { id: "c", meals: ["dinner"], categories: ["side"], cuisine: "korean" },
    { id: "d", meals: ["breakfast"], categories: [], cuisine: "korean" },
    { id: "e", meals: ["dinner"], categories: [], cuisine: "korean", favorite: true },
    { id: "f", categories: [], cuisine: "korean" },
  ];
  const ideas = suggestDishes(dishes, { meal: "dinner", exclude: new Set(["a"]), cuisine: "korean", cuisineOf: (x) => x.cuisine, random: () => 0 });
  assert.deepEqual(ideas.map((d) => d.id), ["e", "f", "b"], "favorite first, then the same kind; never the side, breakfast or the planned dish");
  assert.equal(suggestDishes(dishes, { meal: "dinner", count: 1, cuisineOf: (x) => x.cuisine, random: () => 0 }).length, 1);
});

test("what's hot: Korean chili powder is gochugaru, kimchi gets rinsed, plain chili powder and paprika aren't hot", () => {
  for (const line of ["2 tbsp gochugaru (Korean chili powder)", "1 tbsp Korean chili powder", "1 tsp red chili powder"]) {
    assert.equal(isChiliLine(line), true, line);
    assert.equal(spiceLine(line, "mild").off, true, line);
  }
  assert.equal(spiceLine("2 tbsp hot pepper paste", "mild").line, "1 tbsp hot pepper paste (half for mild)");
  assert.equal(spiceLine("1 1/2 cups kimchi, chopped", "mild").line, "1 1/2 cups kimchi, chopped (rinse it in water for mild)");
  assert.equal(spiceLine("1 1/2 cups kimchi, chopped", "spicy").line, "1 1/2 cups kimchi, chopped", "more kimchi isn't more heat");
  assert.match(spiceLine("1 package Shin ramyun", "mild").line, /half the soup packet/);
  for (const line of ["1/4 cup kimchi juice", "1 cup white kimchi", "Kimchi:"]) assert.equal(spiceLine(line, "mild").line, line, line);
});

test("healthy swaps know the dish: glazes keep their sugar, baking takes a quarter less, kimbap keeps sticky rice", () => {
  const glazed = cookedLines({ name: "Sweet Crispy Chicken (Dakgangjeong)", categories: ["korean"], ingredients: ["3 tbsp brown sugar"] }, { healthy: true });
  assert.equal(glazed.lines[0].line, "3 tbsp brown sugar");
  const glazeSection = cookedLines({ name: "Wings", categories: [], ingredients: ["1 tbsp sugar", "Glaze:", "2 tbsp honey"] }, { healthy: true });
  assert.deepEqual(glazeSection.lines.map((l) => l.line), ["½ tbsp sugar (half the usual)", "Glaze:", "2 tbsp honey"]);
  const muffins = cookedLines({ name: "Muffins", categories: [], ingredients: ["1 cup sugar", "2 tsp baking powder"] }, { healthy: true });
  assert.equal(muffins.lines[0].line, "¾ cup sugar (a quarter less)");
  const kimbap = cookedLines({ name: "Kimbap", categories: ["korean"], ingredients: ["3 cups cooked rice"] }, { healthy: true });
  assert.equal(kimbap.lines[0].line, "3 cups cooked rice");
  // Pan-frying in a little oil isn't deep-frying.
  assert.equal(healthierLine("2 tbsp vegetable oil, plus more for frying"), null);
  assert.equal(healthierLine("4 cups vegetable oil, for frying").label, "air-fried");
});

test("step notes: the air-fry way on frying steps, and when to scoop out a mild share", () => {
  const dish = {
    name: "Corn dogs", categories: [], ingredients: ["4 cups oil, for frying", "1 tbsp gochugaru"],
    steps: ["Mix the batter.", "Heat the oil to 350°F and fry 2 at a time.", "Sprinkle the gochugaru on top."],
  };
  const notes = cookedLines(dish, { healthy: true, spice: "medium", mildFor: ["Mina"] }).stepNotes;
  assert.equal(notes[0], "");
  assert.match(notes[1], /air-fry at 400°F/);
  assert.equal(notes[2], "😊 Scoop out a mild share for Mina before the chili goes in.");
  assert.match(cookedLines(dish, { spice: "mild" }).stepNotes[2], /^😊 Mild/);
  assert.match(cookedLines({ ...dish, mildTip: "Kids' version: soy sauce." }, { spice: "mild" }).tips[0], /Kids' version/);
});

test("what we have only covers the same food: onion isn't green onion, chicken isn't chicken broth", () => {
  for (const [have, need] of [["onion", "green onion"], ["potato", "sweet potato"], ["potato", "sweet potato glass noodle"], ["chicken", "chicken bouillon"],
    ["egg", "egg noodle"], ["fish", "fish cake"], ["tomato", "tomato paste"], ["beef", "beef broth"], ["rice", "brown rice"], ["red onion", "onion"]]) {
    assert.equal(haveCovers(have, need), false, `${have} → ${need}`);
  }
  for (const [have, need] of [["onion", "yellow onion"], ["chicken", "chicken thigh"], ["egg", "egg yolk"], ["tomato", "cherry tomato"], ["beef", "ground beef"],
    ["beef", "ribeye"], ["pork", "pork belly"], ["tofu", "firm tofu"], ["mushroom", "shiitake mushroom"], ["cheese", "mozzarella"]]) {
    assert.equal(haveCovers(have, need), true, `${have} → ${need}`);
  }
});

test("rice syrup and rice cereal aren't rice on the shopping list", () => {
  const list = buildGroceryList([{ dish: { name: "A", servings: 4, ingredients: ["1/3 cup rice syrup", "2 cups rice", "1 cup rice krispies", "1 cup glutinous rice"] }, servings: 4 }]);
  assert.deepEqual(list.map((i) => `${i.name}: ${i.amount}`).sort(), ["Glutinous rice: 1 cup", "Rice krispies: 1 cup", "Rice syrup: ⅓ cup", "Rice: 2 cups"]);
  assert.equal(list.find((i) => i.name === "Rice syrup").aisle, "asian");
  assert.equal(normalizeItemName("cooked short-grain rice"), "rice");
});
