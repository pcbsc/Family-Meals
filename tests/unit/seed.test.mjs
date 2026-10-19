// The starter recipes: every one is complete and usable, and new batches reach
// families who already use the starter menu, once.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  STARTER_DISHES, LATEST_STARTER_BATCH, startersToAdd, starterVideoFills, cuisineOf, MEALS, CATEGORIES, CUISINES, DISCOVER,
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
    assert.ok(CUISINES.some((c) => c.key === d.cuisine && c.key !== "other"), `${d.seedKey} kind of food: ${d.cuisine}`);
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
  for (const c of CUISINES.filter((x) => x.key !== "other")) {
    assert.ok(STARTER_DISHES.filter((d) => d.cuisine === c.key).length >= 5, `only a few ${c.label} dishes`);
  }
  // Nearly every dish has a video to cook along with, and no two share one.
  const videos = STARTER_DISHES.filter((d) => d.videoUrl).map((d) => videoInfo(d.videoUrl).id);
  assert.ok(videos.length >= 100, `${videos.length} videos`);
  assert.equal(new Set(videos).size, videos.length);
  // Each trending dish shows the creator's video.
  for (const d of STARTER_DISHES.filter((x) => x.categories.includes("trending") && x.seedKey !== "tuna-mayo-bowl")) {
    assert.ok(d.videoUrl, `${d.seedKey} has no video`);
  }
});

test("a family who has the first starters gets the new ones once", () => {
  const first = new Set(STARTER_DISHES.filter((d) => d.batch === 1).map((d) => d.seedKey));
  const fresh = startersToAdd({ starterBatch: undefined, haveSeedKeys: first });
  assert.equal(fresh.length, STARTER_DISHES.filter((d) => d.batch > 1).length);
  assert.ok(fresh.every((d) => d.batch > 1));
  // A family that joined at batch 2 gets batches 3 and 4; one at batch 3 gets just batch 4.
  const two = new Set(STARTER_DISHES.filter((d) => d.batch <= 2).map((d) => d.seedKey));
  assert.ok(startersToAdd({ starterBatch: 2, haveSeedKeys: two }).every((d) => d.batch >= 3));
  const three = new Set(STARTER_DISHES.filter((d) => d.batch <= 3).map((d) => d.seedKey));
  const four = startersToAdd({ starterBatch: 3, haveSeedKeys: three });
  assert.ok(four.length >= 30 && four.every((d) => d.batch === 4));
  // Already up to date: nothing.
  assert.equal(startersToAdd({ starterBatch: LATEST_STARTER_BATCH, haveSeedKeys: first }).length, 0);
});

test("deleted starters don't come back, and saying no to starters is remembered", () => {
  const some = new Set(["bulgogi", "japchae"]);
  const fresh = startersToAdd({ starterBatch: undefined, haveSeedKeys: some });
  assert.ok(!fresh.some((d) => d.batch === 1), "the batch-1 dishes they deleted stay deleted");
  assert.equal(startersToAdd({ starterBatch: undefined, haveSeedKeys: new Set() }).length, 0, "they said no to starters");
  assert.equal(startersToAdd({ starterBatch: 2, haveSeedKeys: new Set() }).length, 0, "they said no after batch 2 came out");
  // A new batch-2 dish they already have isn't added twice.
  const withTuna = new Set([...some, "tuna-mayo-bowl"]);
  assert.ok(!startersToAdd({ starterBatch: 1, haveSeedKeys: withTuna }).some((d) => d.seedKey === "tuna-mayo-bowl"));
});

test("the newest starters are mostly Korean and Korean fusion, kid-friendly, some spicy", () => {
  const four = STARTER_DISHES.filter((d) => d.batch === 4);
  assert.ok(four.every((d) => d.cuisine === "korean" || d.cuisine === "fusion"));
  assert.ok(four.filter((d) => d.cuisine === "fusion").length >= 8);
  assert.ok(four.filter((d) => d.spicy > 0).length >= 10, "spicy dishes for the kids who like it hot");
  assert.ok(four.filter((d) => d.spicy === 0).length >= 10);
  assert.ok(four.every((d) => d.healthyTip), "every new dish says how to make it healthier");
  assert.ok(four.filter((d) => d.videoUrl).length >= 30);
});

test("Discover ideas are complete and not repeated", () => {
  const urls = new Set();
  for (const r of DISCOVER) {
    assert.ok(r.cuisine === "trending" || CUISINES.some((c) => c.key === r.cuisine), r.name);
    assert.ok(r.name && r.emoji && r.by, r.url);
    assert.ok(MEAL_KEYS.has(r.meal), r.name);
    assert.match(r.url, /^https:\/\/[a-z0-9.-]+\//);
    assert.ok(!urls.has(r.url), `${r.url} is listed twice`);
    urls.add(r.url);
  }
});

test("every dish has a kind of food, even ones saved before kinds existed", () => {
  assert.equal(cuisineOf({ cuisine: "thai", seedKey: "bulgogi" }), "thai", "the family's choice wins");
  assert.equal(cuisineOf({ seedKey: "spaghetti", categories: [] }), "italian", "an old starter dish");
  assert.equal(cuisineOf({ categories: ["korean", "soup"] }), "korean", "an old Korean import");
  assert.equal(cuisineOf({ categories: [] }), "other");
  assert.equal(cuisineOf({ cuisine: "martian" }), "other");
  assert.equal(cuisineOf(null), "other");
});

test("starter dishes a family has get new videos, but never over their own or one they removed", () => {
  const video = STARTER_DISHES.find((d) => d.seedKey === "bulgogi").videoUrl;
  const fills = starterVideoFills([
    { id: "seed-bulgogi", seedKey: "bulgogi" },
    { id: "seed-japchae", seedKey: "japchae", videoUrl: "https://youtu.be/AAAAAAAAAAA" },
    { id: "seed-kimbap", seedKey: "kimbap", videoUrl: "", videoRemoved: true },
    { id: "d-mine", name: "Our soup" },
  ]);
  assert.deepEqual(fills, [{ id: "seed-bulgogi", videoUrl: video }]);
});
