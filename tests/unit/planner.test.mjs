import { test } from "node:test";
import assert from "node:assert/strict";
import { weekStart, dateKey, fillWithFavorites, averageRating, isFavorite, slotId } from "../../js/planner.js";

test("finds the start of the week", () => {
  // Wednesday, Oct 21 2026
  const wed = new Date(2026, 9, 21);
  assert.equal(dateKey(weekStart(wed, 0)), "2026-10-18");
  assert.equal(dateKey(weekStart(wed, 1)), "2026-10-19");
  assert.equal(slotId(wed, "dinner"), "2026-10-21|dinner");
});

test("ratings make favorites", () => {
  assert.equal(averageRating({ ratings: {} }), null);
  assert.equal(averageRating({ ratings: { a: 4, b: 3 } }), 3.5);
  assert.equal(isFavorite({ ratings: { a: 4, b: 3 } }), true);
  assert.equal(isFavorite({ favorite: true }), true);
  assert.equal(isFavorite({ ratings: { a: 2 } }), false);
});

test("fills a week without repeating dinners, wishes first", () => {
  const dishes = [
    { id: "a", meals: ["dinner"], categories: [] },
    { id: "b", meals: ["dinner"], categories: [] },
    { id: "c", meals: ["dinner"], categories: [] },
    { id: "d", meals: ["dinner"], categories: [] },
    { id: "e", meals: ["dinner"], categories: [] },
    { id: "f", meals: ["dinner"], categories: [] },
    { id: "g", meals: ["dinner"], categories: [] },
    { id: "side", meals: ["dinner"], categories: ["side"] },
    { id: "oats", meals: ["breakfast"], categories: [] },
  ];
  const empty = Array.from({ length: 7 }, (_, i) => ({ date: `2026-10-${18 + i}`, meal: "dinner" }));
  const out = fillWithFavorites({ dishes, empty, wishes: [{ dishId: "g" }], random: () => 0.5 });
  assert.equal(out.length, 7);
  assert.equal(out[0].dishId, "g");
  const ids = out.map((s) => s.dishId);
  assert.equal(new Set(ids).size, 7, "no repeated dinners");
  assert.ok(!ids.includes("side"), "side dishes aren't dinners on their own");
  assert.ok(!ids.includes("oats"), "breakfast dishes stay at breakfast");
});

test("weekday breakfasts lean quick", () => {
  const dishes = [
    { id: "pancakes", meals: ["breakfast"], categories: [], prepMinutes: 5, cookMinutes: 15 },
    { id: "toast", meals: ["breakfast"], categories: [], prepMinutes: 2, cookMinutes: 5 },
  ];
  let quick = 0;
  let n = 0;
  const seq = () => (n++ % 97) / 97;
  for (let i = 0; i < 200; i++) {
    // Tuesday, Oct 20 2026
    const [slot] = fillWithFavorites({ dishes, empty: [{ date: "2026-10-20", meal: "breakfast" }], random: seq });
    if (slot.dishId === "toast") quick++;
  }
  assert.ok(quick > 140, `quick breakfast picked ${quick}/200 times`);
});
