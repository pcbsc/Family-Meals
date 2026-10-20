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

test("a balanced week: one noodle and one fried dinner at most, proteins mixed, fish in, Korean mains get banchan", async () => {
  const { dinnerTraits } = await import("../../js/planner.js");
  const { STARTER_DISHES, cuisineOf } = await import("../../js/seed.js");
  const dishes = STARTER_DISHES.map((d) => ({ ...d, id: d.seedKey }));
  assert.equal(dinnerTraits(dishes.find((d) => d.id === "bulgogi")).protein, "beef");
  assert.equal(dinnerTraits(dishes.find((d) => d.id === "dakgangjeong")).fried, true);
  assert.equal(dinnerTraits(dishes.find((d) => d.id === "kimchi-fried-rice")).fried, false, "fried rice isn't deep-fried");
  let n = 0;
  const random = () => ((n = (n * 9301 + 49297) % 233280) / 233280);
  let noodles = 0;
  let fried = 0;
  let fish = 0;
  let banchan = 0;
  for (let w = 0; w < 100; w++) {
    const empty = Array.from({ length: 7 }, (_, i) => ({ date: `2026-10-${18 + i}`, meal: "dinner" }));
    const out = fillWithFavorites({ dishes, empty, random, cuisineOf });
    const t = out.map((o) => dinnerTraits(dishes.find((d) => d.id === o.dishId)));
    if (t.filter((x) => x.noodle).length > 1) noodles++;
    if (t.filter((x) => x.fried).length > 1) fried++;
    if (t.some((x) => x.fish)) fish++;
    for (const o of out) {
      if (!o.sideId) continue;
      banchan++;
      assert.ok(dishes.find((d) => d.id === o.sideId).categories.includes("side"));
      assert.equal(cuisineOf(dishes.find((d) => d.id === o.dishId)), "korean");
    }
  }
  assert.ok(noodles <= 15, `${noodles}/100 weeks with two noodle dinners`);
  assert.ok(fried <= 5, `${fried}/100 weeks with two fried dinners`);
  assert.ok(fish >= 55, `${fish}/100 weeks with fish`);
  assert.ok(banchan > 100, `${banchan} banchan in 100 weeks`);
});

test("fills balance with what's already planned", () => {
  const dishes = [
    { id: "ramen", meals: ["dinner"], categories: ["noodles"] },
    { id: "udon", meals: ["dinner"], categories: ["noodles"] },
    { id: "rice", meals: ["dinner"], categories: [] },
  ];
  let ramenOrUdon = 0;
  let n = 0;
  for (let i = 0; i < 200; i++) {
    const [slot] = fillWithFavorites({ dishes, empty: [{ date: "2026-10-24", meal: "dinner" }], planned: [{ date: "2026-10-23", meal: "dinner", dishId: "ramen" }], random: () => (n++ % 89) / 89 });
    if (slot.dishId !== "rice") ramenOrUdon++;
  }
  assert.ok(ramenOrUdon < 60, `a second noodle dinner ${ramenOrUdon}/200 times`);
});
