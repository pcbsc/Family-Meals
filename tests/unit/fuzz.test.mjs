// Randomized ("fuzz") tests: thousands of odd inputs, checking nothing throws
// and nothing impossible comes out (NaN, negative amounts, wrong meals).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseIngredient, scaleIngredient, formatQty, normalizeItemName, buildGroceryList, findTimers,
  parseRecipeText, stripStepNumber, cleanLink,
} from "../../js/recipe.js";
import { fillWithFavorites } from "../../js/planner.js";
import { cleanRecipe } from "../../js/ai.js";

const RUNS = Number(process.env.FUZZ_RUNS || 3000);

// Small seeded random generator so failures can be replayed.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PIECES = [
  "1", "2", "10", "0", "-3", "1/2", "1 1/2", "3/0", "½", "1½", "2-3", "2 to 4", "1.5", ".5", "999999", "1e9",
  "cup", "cups", "tbsp", "T", "t", "tsp", "oz", "lb", "g", "kg", "ml", "l", "clove", "cloves", "can", "pinch",
  "onion", "green onions", "soy sauce", "gochujang", "rice", "eggs", "salt to taste", "(14 oz)", "large",
  ",", ", diced", ":", "-", "•", "▢", "  ", "\t", "🥚", "🌶️", "고추장", "김치", "é", "\u0000", "<b>", "\"", "'",
  "minutes", "hours", "seconds", "10 minutes", "for", "about", "or", "and", "x".repeat(300),
];

function randomLine(r) {
  const n = 1 + Math.floor(r() * 7);
  return Array.from({ length: n }, () => PIECES[Math.floor(r() * PIECES.length)]).join(r() < 0.7 ? " " : "");
}

function noBadNumbers(text, where) {
  assert.ok(!/NaN|Infinity|undefined|null/.test(text), `${where}: ${JSON.stringify(text)}`);
}

test(`ingredient lines never break the parser or the scaler (${RUNS} runs)`, () => {
  const r = rng(1);
  for (let i = 0; i < RUNS; i++) {
    const line = randomLine(r);
    const factor = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 10][Math.floor(r() * 8)];
    const p = parseIngredient(line);
    assert.equal(typeof p.item, "string");
    if (p.qty != null) assert.ok(Number.isFinite(p.qty) && p.qty >= 0, `qty for ${JSON.stringify(line)}`);
    const scaled = scaleIngredient(line, factor);
    assert.equal(typeof scaled, "string");
    noBadNumbers(scaled.replace(line, ""), `scaled ${JSON.stringify(line)}`);
    assert.equal(scaleIngredient(line, 1), line.trim());
    normalizeItemName(p.item);
  }
});

test(`scaling keeps amounts in proportion (${RUNS} runs)`, () => {
  const r = rng(2);
  const units = ["", " cups", " tbsp", " tsp", " lb", " oz", " cloves"];
  for (let i = 0; i < RUNS; i++) {
    const qty = Math.ceil(r() * 16) / 4;
    const unit = units[Math.floor(r() * units.length)];
    const factor = [0.5, 1.5, 2, 3][Math.floor(r() * 4)];
    const line = `${qty}${unit} carrots`;
    const back = parseIngredient(scaleIngredient(line, factor));
    const want = qty * factor;
    // Below 10, amounts round to the nearest kitchen fraction (⅛ ¼ ⅓ ½ ⅔ ¾), so they can be up
    // to ⅛ off (the gap between ¾ and 1 is the widest). From 10 up they round to whole numbers.
    const tolerance = want >= 10 ? 0.51 : 0.126;
    assert.ok(Math.abs(back.qty - want) <= tolerance, `${line} ×${factor} → ${back.qty}, wanted ${want}`);
  }
});

test(`formatted quantities are always readable (${RUNS} runs)`, () => {
  const r = rng(3);
  for (let i = 0; i < RUNS; i++) {
    const n = r() * 1000 * (r() < 0.5 ? 0.01 : 1);
    const text = formatQty(n, ["", "g", "ml", "kg", "cup"][Math.floor(r() * 5)]);
    assert.ok(text.length > 0 && text.length < 12, `${n} → ${JSON.stringify(text)}`);
    noBadNumbers(text, String(n));
  }
});

test(`shopping lists from random menus are always sensible (${RUNS / 10} menus)`, () => {
  const r = rng(4);
  for (let i = 0; i < RUNS / 10; i++) {
    const entries = Array.from({ length: 1 + Math.floor(r() * 12) }, (_, d) => ({
      dish: {
        name: `Dish ${d}`,
        servings: [0, -1, 1, 4, NaN, 6, undefined][Math.floor(r() * 7)],
        ingredients: r() < 0.05 ? undefined : Array.from({ length: Math.floor(r() * 15) }, () => randomLine(r)),
      },
      servings: [1, 3, 4, 8, 0][Math.floor(r() * 5)],
    }));
    for (const item of buildGroceryList(entries)) {
      noBadNumbers(item.amount, item.name);
      assert.ok(!/(^|\s)-\d/.test(item.amount), `negative amount ${item.amount}`);
      assert.ok(item.dishes.length > 0);
    }
  }
});

test(`pasted text and timers never throw (${RUNS} runs)`, () => {
  const r = rng(5);
  for (let i = 0; i < RUNS; i++) {
    const text = Array.from({ length: Math.floor(r() * 20) }, () => (r() < 0.2 ? "Ingredients:" : r() < 0.2 ? `${i % 9}. ` + randomLine(r) : randomLine(r))).join("\n");
    const out = parseRecipeText(text);
    assert.ok(Array.isArray(out.ingredients) && Array.isArray(out.steps));
    for (const t of findTimers(text)) assert.ok(t.seconds > 0 && t.seconds <= 12 * 3600);
    assert.equal(typeof stripStepNumber(randomLine(r)), "string");
    const link = cleanLink(randomLine(r));
    assert.ok(link === "" || /^https?:\/\//.test(link), `unsafe link ${link}`);
  }
});

test(`the no-AI planner only fills a spot with a dish meant for it (${RUNS / 10} weeks)`, () => {
  const r = rng(6);
  const meals = ["breakfast", "lunch", "dinner", "snack"];
  for (let i = 0; i < RUNS / 10; i++) {
    const dishes = Array.from({ length: Math.floor(r() * 20) }, (_, n) => ({
      id: `d${n}`,
      meals: meals.filter(() => r() < 0.4),
      categories: r() < 0.2 ? ["side"] : [],
      favorite: r() < 0.3,
      ratings: r() < 0.5 ? { a: 1 + Math.floor(r() * 4) } : {},
      prepMinutes: Math.floor(r() * 40),
    }));
    const empty = Array.from({ length: Math.floor(r() * 28) }, (_, n) => ({ date: `2026-10-${10 + (n % 7)}`, meal: meals[n % 4] }));
    const wishes = dishes.filter(() => r() < 0.1).map((d) => ({ dishId: d.id }));
    const out = fillWithFavorites({ dishes, empty, wishes, random: r });
    for (const slot of out) {
      const dish = dishes.find((d) => d.id === slot.dishId);
      assert.ok(dish, "picked a real dish");
      const fits = dish.meals.length ? dish.meals : ["dinner"];
      assert.ok(fits.includes(slot.meal), `${dish.id} (${fits}) put at ${slot.meal}`);
    }
  }
});

test(`recipes from Claude are always tidied or refused (${RUNS} runs)`, () => {
  const r = rng(7);
  const junk = () => [null, undefined, 3, -2, "", "x", [], {}, ["a", 5, null], "javascript:alert(1)", "https://ok.example/x", randomLine(r)][Math.floor(r() * 12)];
  for (let i = 0; i < RUNS; i++) {
    const raw = {
      name: junk(), nameKo: junk(), emoji: junk(), meals: junk(), categories: junk(), servings: junk(),
      prepMinutes: junk(), cookMinutes: junk(), spicy: junk(), ingredients: r() < 0.5 ? junk() : Array.from({ length: Math.floor(r() * 300) }, () => randomLine(r)),
      steps: r() < 0.5 ? junk() : ["Stir.", "Serve."], notes: junk(), sourceName: junk(), sourceUrl: junk(), imageUrl: junk(),
    };
    const out = cleanRecipe(r() < 0.05 ? junk() : raw);
    if (!out) continue;
    assert.ok(out.name && out.ingredients.length && out.steps.length);
    assert.ok(out.servings >= 1 && out.servings <= 50);
    assert.ok(out.ingredients.length <= 80 && out.steps.length <= 60, "long lists are capped");
    assert.ok(out.ingredients.every((l) => typeof l === "string" && l.length <= 300));
    assert.ok(out.sourceUrl === "" || /^https?:\/\//.test(out.sourceUrl));
    assert.ok(out.imageUrl === "" || /^https:\/\//.test(out.imageUrl));
    assert.ok(out.meals.length > 0);
  }
});
