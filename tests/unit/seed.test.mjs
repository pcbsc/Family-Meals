// The starter recipes: every one is complete and usable, and new batches reach
// families who already use the starter menu, once.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  STARTER_DISHES, LATEST_STARTER_BATCH, startersToAdd, MEALS, CATEGORIES, DISCOVER,
} from "../../js/seed.js";
import { parseIngredient, findTimers } from "../../js/recipe.js";
import { videoInfo } from "../../js/video.js";

const MEAL_KEYS = new Set(MEALS.map((m) => m.key));
const CATEGORY_KEYS = new Set(CATEGORIES.map((c) => c.key));

test("every starter recipe is complete", () => {
  const keys = new Set();
  for (const d of STARTER_DISHES) {
    assert.ok(!keys.has(d.seedKey), `${d.seedKey} is listed twice`);
    keys.add(d.seedKey);
    assert.match(d.seedKey, /^[a-z0-9-]+$/);
    assert.ok(d.name && d.emoji, d.seedKey);
    assert.ok(d.meals.length && d.meals.every((m) => MEAL_KEYS.has(m)), `${d.seedKey} meals`);
    assert.ok(d.categories.every((c) => CATEGORY_KEYS.has(c)), `${d.seedKey} categories: ${d.categories}`);
    assert.ok(d.servings >= 1 && d.servings <= 24, d.seedKey);
    assert.ok([0, 1, 2].includes(d.spicy), d.seedKey);
    assert.ok(d.ingredients.length >= 1 && d.steps.length >= 2, `${d.seedKey} needs ingredients and steps`);
    assert.ok(Number.isInteger(d.batch) && d.batch >= 1 && d.batch <= LATEST_STARTER_BATCH, d.seedKey);
    for (const line of d.ingredients) {
      const p = parseIngredient(line);
      assert.ok(p.header || p.item, `${d.seedKey}: "${line}"`);
    }
    for (const step of d.steps) assert.ok(step.length < 300, `${d.seedKey} has a very long step`);
    if (d.videoUrl) assert.ok(videoInfo(d.videoUrl)?.embedUrl, `${d.seedKey} video ${d.videoUrl}`);
  }
});

test("cooking times in the steps become timers", () => {
  const stew = STARTER_DISHES.find((d) => d.seedKey === "beef-stew");
  assert.ok(stew.steps.some((s) => findTimers(s).some((t) => t.seconds === 3600)));
});

test("the starter menu is a good mix", () => {
  const count = (c) => STARTER_DISHES.filter((d) => d.categories.includes(c)).length;
  assert.ok(count("korean") >= 40);
  assert.ok(STARTER_DISHES.filter((d) => !d.categories.includes("korean")).length >= 30);
  assert.ok(count("trending") >= 7);
  for (const meal of MEAL_KEYS) assert.ok(STARTER_DISHES.filter((d) => d.meals.includes(meal)).length >= 8, meal);
  // Each trending dish shows the creator's video.
  for (const d of STARTER_DISHES.filter((x) => x.categories.includes("trending") && x.seedKey !== "tuna-mayo-bowl")) {
    assert.ok(d.videoUrl, `${d.seedKey} has no video`);
  }
});

test("a family who has the first starters gets the new ones once", () => {
  const first = new Set(STARTER_DISHES.filter((d) => d.batch === 1).map((d) => d.seedKey));
  const fresh = startersToAdd({ starterBatch: undefined, haveSeedKeys: first });
  assert.equal(fresh.length, STARTER_DISHES.filter((d) => d.batch === LATEST_STARTER_BATCH).length);
  assert.ok(fresh.every((d) => d.batch > 1));
  // Already up to date: nothing.
  assert.equal(startersToAdd({ starterBatch: LATEST_STARTER_BATCH, haveSeedKeys: first }).length, 0);
});

test("deleted starters don't come back, and saying no to starters is remembered", () => {
  const some = new Set(["bulgogi", "japchae"]);
  const fresh = startersToAdd({ starterBatch: undefined, haveSeedKeys: some });
  assert.ok(!fresh.some((d) => d.batch === 1), "the batch-1 dishes they deleted stay deleted");
  assert.equal(startersToAdd({ starterBatch: undefined, haveSeedKeys: new Set() }).length, 0, "they said no to starters");
  // A new batch-2 dish they already have isn't added twice.
  const withTuna = new Set([...some, "tuna-mayo-bowl"]);
  assert.ok(!startersToAdd({ starterBatch: 1, haveSeedKeys: withTuna }).some((d) => d.seedKey === "tuna-mayo-bowl"));
});

test("Discover ideas are complete and not repeated", () => {
  const urls = new Set();
  for (const r of DISCOVER) {
    assert.ok(["trending", "korean", "american"].includes(r.cuisine), r.name);
    assert.ok(r.name && r.emoji && r.by, r.url);
    assert.ok(MEAL_KEYS.has(r.meal), r.name);
    assert.match(r.url, /^https:\/\/[a-z0-9.-]+\//);
    assert.ok(!urls.has(r.url), `${r.url} is listed twice`);
    urls.add(r.url);
  }
});
