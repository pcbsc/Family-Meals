// The shared shopping list's pieces that don't need the internet: join links,
// safe field names, and reading and writing Firestore's value format.
import { test } from "node:test";
import assert from "node:assert/strict";
import { joinLink, parseJoin, tickId, extraId, toFields, fromFields, readDoc, newFamilyId, validSetup } from "../../js/share.js";

const cfg = { apiKey: "AIzaSyD-abcdefghijklmnopqrstuvwxyz012", projectId: "our-family-menu", familyId: "Abc123Abc123Abc123Abc123Abc123Ab" };

test("a join link carries the setup to the other phone, and broken ones are refused", () => {
  const link = joinLink(cfg, "https://example.com/meals/");
  assert.ok(link.startsWith("https://example.com/meals/#/join?"));
  const params = new URLSearchParams(link.split("#/join?")[1]);
  assert.deepEqual(parseJoin(params), cfg);
  assert.equal(parseJoin(new URLSearchParams({ ...Object.fromEntries(params), f: "short" })), null);
  assert.equal(parseJoin(new URLSearchParams({ ...Object.fromEntries(params), p: "Bad Project!" })), null);
  assert.equal(parseJoin(new URLSearchParams({ ...Object.fromEntries(params), k: "x" })), null);
  assert.equal(parseJoin(new URLSearchParams()), null);
});

test("setups and family ids look right", () => {
  assert.ok(validSetup(cfg.apiKey, cfg.projectId));
  assert.ok(!validSetup("", cfg.projectId));
  assert.ok(!validSetup(cfg.apiKey, "x"));
  const id = newFamilyId();
  assert.match(id, /^[A-Za-z0-9]{32}$/);
  assert.notEqual(id, newFamilyId());
});

test("item names become safe, steady field names", () => {
  const names = ["green onion", "egg", "soy sauce", "gochugaru", "고추장", "a.b`c", "x".repeat(200)];
  const ids = names.map(tickId);
  for (const id of ids) assert.match(id, /^k[a-z0-9]+$/);
  assert.equal(new Set(ids).size, names.length);
  assert.equal(tickId("egg"), tickId("egg"));
  assert.match(extraId(), /^x[a-z0-9]+$/);
});

test("Firestore values go both ways", () => {
  const data = { week: "2026-10-18", n: 3, half: 0.5, on: true, none: null, items: [{ key: "egg", name: "Eggs", have: false }], ticks: {}, nested: { a: { b: "c" } } };
  const fields = toFields(data);
  assert.deepEqual(fields.n, { integerValue: "3" });
  assert.deepEqual(fields.half, { doubleValue: 0.5 });
  assert.deepEqual(fields.ticks, { mapValue: { fields: {} } });
  assert.deepEqual(fromFields(fields), data);
  // Firestore leaves out empty arrays' values and empty maps' fields.
  assert.deepEqual(fromFields({ a: { arrayValue: {} }, m: { mapValue: {} } }), { a: [], m: {} });
});

test("a shared list document is read safely, whatever's in it", () => {
  const doc = {
    updateTime: "2026-10-19T12:00:00Z",
    fields: toFields({
      week: "2026-10-18",
      items: [{ key: "egg", name: "Eggs", amount: "6", aisle: "dairy" }, { name: "no key" }, "junk"],
      ticks: { kabc: true },
      extras: { x2: { text: "Paper towels", checked: true, at: 2 }, x1: { text: "Milk", checked: false, at: 1 }, bad: { checked: true } },
      doneAt: 5,
      bought: ["egg", 7],
    }),
  };
  const list = readDoc(doc);
  assert.equal(list.week, "2026-10-18");
  assert.deepEqual(list.items.map((i) => i.key), ["egg"]);
  assert.deepEqual(list.ticks, { kabc: true });
  assert.deepEqual(list.extras.map((x) => x.text), ["Milk", "Paper towels"], "oldest first, broken ones dropped");
  assert.equal(list.doneAt, 5);
  assert.deepEqual(list.bought, ["egg"]);
  assert.equal(list.updateTime, doc.updateTime);
  const empty = readDoc({});
  assert.deepEqual([empty.items, empty.extras, empty.ticks, empty.week], [[], [], {}, ""]);
});
