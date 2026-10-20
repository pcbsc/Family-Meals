// Shopping list: the week's plan plus any recipes added from their pages, merged
// into one list sorted by aisle. Things we already have are set aside, ticked
// things go into "what we have" when shopping's done, and the list can be shared
// so both grown-ups' phones tick the same list.
import { h, toast, clearChildren, prettyDate } from "../ui.js";
import { buildGroceryList, AISLES, cookedLines, haveCovers, normalizeItemName, aisleFor } from "../recipe.js";
import { dateKey, fromKey, addDays, weekStart, weekDays } from "../planner.js";
import { state, getSlot, slotDishes, shoppingFor, saveShopping, saveSettings, cookPrefs, go, db } from "../store.js";
import { shareConfig, readList, writeList, startList, tickId, extraId } from "../share.js";
import { MEALS } from "../seed.js";
import { icon, dishArt } from "../components.js";

// Aisle pictures from the Canva design; the other aisles keep their emoji.
const AISLE_ICONS = { produce: "aisle-produce", meat: "aisle-meat", dairy: "aisle-dairy", asian: "aisle-asian" };

// The last copy of the shared list, so the screen opens instantly (and works offline).
let lastRemote = null;

/** Our list for a week: planned meals (not leftovers or freezer meals) and added recipes. */
function weekItems(start, shop, { onlyAhead }) {
  const today = dateKey(new Date());
  const prefs = cookPrefs();
  const planned = [];
  for (const day of weekDays(start)) {
    if (onlyAhead && dateKey(day) < today) continue;
    for (const m of MEALS) {
      for (const item of slotDishes(getSlot(dateKey(day), m.key))) {
        if (item.leftover || item.fromFreezer) continue;
        planned.push({ dish: item.dish, servings: item.servings });
      }
    }
  }
  const added = (shop.recipes || [])
    .map((r) => ({ dish: state.dishes.get(r.dishId), servings: r.servings }))
    .filter((r) => r.dish);
  // The family's way of cooking: healthier swaps, nothing that mild leaves out.
  const ourWay = (list) => list.map(({ dish, servings }) => ({
    dish: { ...dish, ingredients: cookedLines(dish, prefs).lines.filter((l) => !l.off).map((l) => l.line) },
    servings,
  }));
  const haves = (state.settings.have || []).map(normalizeItemName).filter(Boolean);
  const items = buildGroceryList(ourWay([...planned, ...added]), { metric: prefs.metric })
    .map((i) => ({ ...i, have: !i.pantry && haves.some((x) => haveCovers(x, i.key)) }));
  return { planned, added, items };
}

const forShare = (items) => items.map(({ key, name, amount, aisle, pantry, have, dishes }) =>
  ({ key, name, amount: amount || "", aisle, pantry: !!pantry, have: !!have, dishes: Array.isArray(dishes) ? dishes.join(", ") : dishes || "" }));

/** What "Done shopping" puts in "what we have": ticked foods (not paper towels). */
function boughtNames(items, extras, ticked) {
  const names = items.filter((i) => !i.pantry && ticked(i.key)).map((i) => i.key);
  for (const x of extras) if (x.checked && aisleFor(x.text) !== "other") names.push(x.text.toLowerCase());
  return [...new Set(names)];
}

async function addToHave(names) {
  const have = [...(state.settings.have || [])];
  const known = new Set(have.map(normalizeItemName));
  for (const n of names) {
    if (known.has(normalizeItemName(n))) continue;
    known.add(normalizeItemName(n));
    have.push(n);
  }
  await saveSettings({ have: have.slice(-80) });
}

export function viewShop({ params, setCleanup }) {
  const cfg = shareConfig();
  const member = cfg?.role === "member";
  const thisWeek = dateKey(weekStart(new Date(), state.settings.weekStartsOn));
  const start = member ? fromKey(thisWeek) : params.get("w") ? fromKey(params.get("w")) : fromKey(thisWeek);
  const weekKey = dateKey(start);
  // This week's list covers today onward; another week's covers all of it.
  const onlyAhead = weekKey === thisWeek;
  const shared = !!cfg && (member || weekKey === thisWeek);
  let remote = shared && lastRemote?.familyId === cfg.familyId ? lastRemote.list : shared ? state.settings.share?.last || null : null;
  let problem = "";
  let writing = 0;
  const body = h("div.stack");

  // ---------- Shared list: reading, writing, keeping in step ----------
  const keep = (list) => {
    remote = list;
    lastRemote = { familyId: cfg.familyId, list };
  };
  const write = async (fields, paths) => {
    writing++;
    try {
      const fresh = await writeList(cfg, fields, paths);
      if (writing === 1) keep(fresh);
      problem = "";
    } catch (err) {
      problem = err.status === 403 ? "denied" : "offline";
      toast("Couldn't reach the shared list. It'll catch up when you're back online.", { emoji: "📡" });
    } finally {
      writing--;
    }
  };
  const pull = async () => {
    if (writing) return;
    try {
      let list = await readList(cfg);
      if (!list && !member) list = await startList(cfg, weekKey);
      if (writing) return;
      problem = list ? "" : "gone";
      const changed = list && list.updateTime !== remote?.updateTime;
      if (list) keep(list);
      // Shopping finished on the other phone: what they bought is now in what we have.
      if (list && !member && list.doneAt > (state.settings.share?.seenDoneAt || 0)) {
        await addToHave(list.bought);
        await saveSettings({ share: { ...state.settings.share, seenDoneAt: list.doneAt } });
      }
      if (changed || !list) {
        await saveSettings({ share: { ...state.settings.share, last: list } });
        draw();
      }
    } catch (err) {
      const was = problem;
      problem = err.status === 403 ? "denied" : "offline";
      if (problem !== was) draw();
    }
  };

  // One way to tick and add things, whether the list is on this phone or shared.
  const model = (shop, items) => {
    if (!shared) {
      return {
        items,
        ticked: (key) => !!shop.checked[key],
        extras: shop.extras,
        tick: (key) => {
          const checked = { ...shop.checked };
          checked[key] ? delete checked[key] : (checked[key] = true);
          return saveShopping({ ...shop, checked });
        },
        addExtra: (text) => saveShopping({ ...shop, extras: [...shop.extras, { id: db.newId("x-"), text, checked: false }] }),
        toggleExtra: (x) => saveShopping({ ...shop, extras: shop.extras.map((e) => (e.id === x.id ? { ...e, checked: !e.checked } : e)) }),
        removeExtra: (x) => saveShopping({ ...shop, extras: shop.extras.filter((e) => e.id !== x.id) }),
        untickAll: () => saveShopping({ ...shop, checked: {}, extras: shop.extras.map((e) => ({ ...e, checked: false })) }),
        done: async (names) => {
          await addToHave(names);
          await saveShopping({ ...shop, checked: {}, extras: shop.extras.filter((e) => !e.checked) });
        },
      };
    }
    const ticks = remote?.ticks || {};
    const extras = remote?.extras || [];
    const set = (patch) => keep({ ...remote, ...patch });
    return {
      items,
      ticked: (key) => !!ticks[tickId(key)],
      extras,
      tick: (key) => {
        const id = tickId(key);
        const on = !ticks[id];
        set({ ticks: { ...ticks, [id]: on } });
        return write({ ticks: { [id]: on } }, [`ticks.${id}`]);
      },
      addExtra: (text) => {
        const x = { id: extraId(), text, checked: false, at: Date.now() };
        set({ extras: [...extras, x] });
        return write({ extras: { [x.id]: { text, checked: false, at: x.at } } }, [`extras.${x.id}`]);
      },
      toggleExtra: (x) => {
        set({ extras: extras.map((e) => (e.id === x.id ? { ...e, checked: !e.checked } : e)) });
        return write({ extras: { [x.id]: { checked: !x.checked } } }, [`extras.${x.id}.checked`]);
      },
      removeExtra: (x) => {
        set({ extras: extras.filter((e) => e.id !== x.id) });
        return write({}, [`extras.${x.id}`]);
      },
      untickAll: () => {
        set({ ticks: {}, extras: extras.map((e) => ({ ...e, checked: false })) });
        return write({ ticks: {}, extras: Object.fromEntries(extras.map((e) => [e.id, { checked: false }])) },
          ["ticks", ...extras.map((e) => `extras.${e.id}.checked`)]);
      },
      done: async (names) => {
        const doneAt = Date.now();
        if (!member) {
          await addToHave(names);
          await saveSettings({ share: { ...state.settings.share, seenDoneAt: doneAt } });
        }
        const left = extras.filter((e) => !e.checked);
        set({ ticks: {}, extras: left, doneAt, bought: names });
        return write({ ticks: {}, doneAt, bought: names }, ["ticks", "doneAt", "bought", ...extras.filter((e) => e.checked).map((e) => `extras.${e.id}`)]);
      },
    };
  };

  // Things added on this phone before sharing (or from "What can we make?") go onto the shared list once.
  let sending = false;
  const sendLocal = async (shop) => {
    if (sending) return;
    const extras = shop.extras.filter((x) => !x.sent && x.text);
    const recipes = member ? (shop.recipes || []).filter((r) => !r.sent && state.dishes.get(r.dishId)) : [];
    if (!extras.length && !recipes.length) return;
    sending = true;
    const texts = [
      ...extras.map((x) => x.text),
      ...buildGroceryList(recipes.map((r) => ({ dish: state.dishes.get(r.dishId), servings: r.servings })))
        .filter((i) => !i.pantry).map((i) => (i.amount ? `${i.name} (${i.amount})` : i.name)),
    ];
    const known = new Set((remote?.extras || []).map((x) => x.text.toLowerCase()));
    const fresh = [...new Set(texts)].filter((t) => !known.has(t.toLowerCase())).map((text, n) => ({ id: extraId() + n, text, at: Date.now() + n }));
    if (fresh.length) await write({ extras: Object.fromEntries(fresh.map((x) => [x.id, { text: x.text, checked: false, at: x.at }])) }, fresh.map((x) => `extras.${x.id}`));
    if (!problem) {
      await saveShopping({
        ...shop,
        extras: shop.extras.map((x) => ({ ...x, sent: true })),
        recipes: (shop.recipes || []).map((r) => (member ? { ...r, sent: true } : r)),
      });
    }
    sending = false;
    if (!problem) draw();
  };

  // The planning phone keeps the shared list's items up to date.
  let publishing = false;
  const publish = async (items) => {
    if (member || !remote || publishing) return;
    const payload = forShare(items);
    const newWeek = remote.week !== weekKey;
    if (!newWeek && JSON.stringify(payload) === JSON.stringify(forShare(remote.items))) return;
    publishing = true;
    // A new week starts with nothing ticked (extras already bought are dropped).
    const bought = newWeek ? (remote.extras || []).filter((e) => e.checked) : [];
    await write(
      newWeek ? { items: payload, week: weekKey, ticks: {} } : { items: payload, week: weekKey },
      newWeek ? ["items", "week", "ticks", ...bought.map((e) => `extras.${e.id}`)] : ["items", "week"],
    );
    publishing = false;
  };

  const draw = () => {
    clearChildren(body);
    const shop = shoppingFor(weekKey);
    const mine = weekItems(start, shop, { onlyAhead });
    const items = member ? (remote?.items || []) : mine.items;
    const list = model(shop, items);

    if (shared) {
      const note = problem === "denied" ? "🚫 The shared list said no. Check the Firebase rules (see the README)."
        : problem === "gone" ? "🤷 This shared list is gone. Ask for a new link in Settings on the other phone."
          : problem === "offline" ? "📡 Offline. Showing the last copy; ticks catch up when you're back."
            : !remote ? "⏳ Getting the shared list…"
              : member ? "📱 Shared list from the family's planning phone. Ticks show up on both phones."
                : "📱 Shared with the family. Ticks show up on both phones.";
      body.append(h(`p.share-note${problem ? ".warn" : ""}`, { role: "status" }, problem ? null : icon("phone"), h("span", note)));
    }

    if (!member && !mine.planned.length && !mine.added.length && !list.extras.length) {
      body.append(h("div.empty-state",
        h("img.mascot", { src: "img/mascot.png", alt: "" }),
        h("p", "Plan some meals, or tap \"Add to shopping list\" on a recipe, and the list makes itself!"),
        h("button.btn.primary", { onclick: () => go(`#/week?w=${weekKey}`) }, "📅 Plan the week"),
      ));
    }
    if (!member && (mine.planned.length || mine.added.length)) {
      // What the list is for: one line per dish, however many times it's planned.
      const counts = new Map();
      for (const p of mine.planned) counts.set(p.dish.id, { dish: p.dish, times: (counts.get(p.dish.id)?.times || 0) + 1 });
      const n = counts.size + mine.added.length;
      const toBuy = items.filter((i) => !i.pantry && !i.have).length;
      body.append(h("section.card.list-for",
        h("h2", `📖 For ${n} dish${n === 1 ? "" : "es"}`),
        h("p.muted", `${toBuy} thing${toBuy === 1 ? "" : "s"} to buy, all combined and sorted by aisle.`,
          cookPrefs().healthy ? " 🥗 With healthy swaps." : ""),
        h("div.row.wrap",
          [...counts.values()].map(({ dish, times }) => h("span.chip.static.dish-chip", dishArt(dish, { className: "art-chip" }), `${dish.name}${times > 1 ? ` ×${times}` : ""}`)),
          mine.added.map(({ dish, servings }) => h("button.chip.on", {
            "aria-label": `Take ${dish.name} off the list`,
            onclick: async () => {
              await saveShopping({ ...shop, recipes: shop.recipes.filter((r) => r.dishId !== dish.id) });
              draw();
            },
          }, `🛒 ${dish.name} (${servings}) ✕`)),
        ),
      ));
    }

    const redrawAfter = (fn) => async () => {
      const p = fn();
      draw();
      await p;
      draw();
    };
    const row = (item) => {
      const done = list.ticked(item.key);
      const dishes = Array.isArray(item.dishes) ? item.dishes.join(", ") : item.dishes;
      return h(`li.shop-item${done ? ".done" : ""}`,
        h("button.shop-btn", { "aria-pressed": done ? "true" : "false", onclick: redrawAfter(() => list.tick(item.key)) },
          h("span.check", done ? "✓" : ""),
          h("span.shop-text",
            h("span.shop-name", item.name),
            dishes ? h("span.shop-for", `for ${dishes}`) : null,
          ),
          item.amount ? h("span.shop-amount", item.amount) : null,
        ),
      );
    };
    const extraRow = (x) => h(`li.shop-item${x.checked ? ".done" : ""}`,
      h("button.shop-btn", { "aria-pressed": x.checked ? "true" : "false", onclick: redrawAfter(() => list.toggleExtra(x)) },
        h("span.check", x.checked ? "✓" : ""), h("span.shop-text", h("span.shop-name", x.text))),
      h("button.icon-btn.small", { "aria-label": `Remove ${x.text}`, onclick: redrawAfter(() => list.removeExtra(x)) }, "✕"),
    );

    for (const aisle of AISLES) {
      const inAisle = items.filter((i) => i.aisle === aisle.key && !i.pantry && !i.have);
      const extras = aisle.key === "other" ? list.extras : [];
      if (!inAisle.length && !extras.length) continue;
      body.append(h(`section.card.aisle.aisle-${aisle.key}`,
        h("h2", AISLE_ICONS[aisle.key] ? icon(AISLE_ICONS[aisle.key], "aisle-icon") : h("span.aisle-emoji", aisle.emoji), aisle.label),
        h("ul.shop-list", inAisle.map(row), extras.map(extraRow)),
      ));
    }

    // Things "What can we make?" says we have: set aside, one tap to need them again.
    const have = items.filter((i) => i.have && !i.pantry);
    if (have.length) {
      body.append(h("details.card.aisle.have-these",
        h("summary", h("h2", icon("check-green", "summary-icon"), "We have these"), h("span.muted", `${have.length} thing${have.length === 1 ? "" : "s"} already at home`)),
        h("ul.shop-list", have.map((item) => h("li.shop-item",
          h("span.shop-text.grow", h("span.shop-name", item.name), item.amount ? h("span.shop-amount", item.amount) : null),
          member ? null : h("button.btn.soft.small", {
            onclick: async () => {
              const need = normalizeItemName(item.key);
              await saveSettings({ have: (state.settings.have || []).filter((x) => !haveCovers(normalizeItemName(x), need)) });
              toast(`${item.name} is back on the list.`, { emoji: "🛒" });
              draw();
            },
          }, "We need it"),
        ))),
      ));
    }

    const pantry = items.filter((i) => i.pantry);
    if (pantry.length) {
      body.append(h("details.card.aisle.pantry",
        h("summary", h("h2", "🧂 Check the cupboard"), h("span.muted", `${pantry.length} things you might already have`)),
        h("ul.shop-list", pantry.map(row)),
      ));
    }

    const input = h("input.text", { placeholder: "Add something (milk, paper towels…)", "aria-label": "Add something to the list", enterkeyhint: "done" });
    const addExtra = async () => {
      const text = input.value.trim().slice(0, 80);
      if (!text) return;
      input.value = "";
      const p = list.addExtra(text);
      draw();
      await p;
      draw();
      body.querySelector("input.text")?.focus();
    };
    input.addEventListener("keydown", (e) => e.key === "Enter" && addExtra());
    const tickedCount = items.filter((i) => list.ticked(i.key)).length + list.extras.filter((x) => x.checked).length;
    body.append(...[
      h("div.row", input, h("button.btn.primary", { "aria-label": "Add", onclick: addExtra }, "➕")),
      // From the Canva design: Done shopping and Send the list side by side.
      h("div.shop-actions",
        h("button.btn.cook.shop-done", {
          onclick: async () => {
            if (!tickedCount) return toast("Tick what you bought first, then tap Done shopping.", { emoji: "☝️" });
            const names = boughtNames(items, list.extras, list.ticked);
            await list.done(names);
            toast(names.length ? `All put away! ${names.length} thing${names.length === 1 ? "" : "s"} added to "what we have".` : "All done!", { emoji: "🏠" });
            draw();
          },
        }, icon("home-white"), "Done shopping"),
        h("button.btn.primary.shop-send", { onclick: () => sendList(items, list) }, icon("share-white"), "Send the list"),
      ),
      tickedCount ? h("button.btn.ghost.center-btn", { onclick: redrawAfter(() => list.untickAll()) }, "Untick all") : null,
      shared ? null : h("p.muted.small.center", h("a", { href: "#/settings" }, "📱 Share this list with another phone")),
    ].filter(Boolean));

    if (shared && remote && !problem) {
      sendLocal(shop);
      if (!member) publish(mine.items);
    }
  };
  draw();

  if (shared) {
    pull();
    const timer = setInterval(() => document.visibilityState === "visible" && pull(), 4000);
    const onShow = () => document.visibilityState === "visible" && pull();
    document.addEventListener("visibilitychange", onShow);
    setCleanup(() => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onShow);
    });
  }

  return h("div.screen.shop",
    h("header.top.shop-top", icon("cart", "shop-cart"), h("h1.grow", "Shopping list"), icon("mascot-thumb", "shop-mascot")),
    member ? null : h("div.week-nav",
      h("button.icon-btn", { "aria-label": "Last week", onclick: () => go(`#/shop?w=${dateKey(addDays(start, -7))}`, { replace: true }) }, "◀"),
      h("div.week-range", h("strong", `${prettyDate(start, { month: "short", day: "numeric" })} – ${prettyDate(addDays(start, 6), { month: "short", day: "numeric" })}`)),
      h("button.icon-btn", { "aria-label": "Next week", onclick: () => go(`#/shop?w=${dateKey(addDays(start, 7))}`, { replace: true }) }, "▶"),
    ),
    body,
  );
}

async function sendList(items, list) {
  const lines = [];
  for (const aisle of AISLES) {
    const left = items.filter((i) => i.aisle === aisle.key && !i.pantry && !i.have && !list.ticked(i.key));
    const extras = aisle.key === "other" ? list.extras.filter((e) => !e.checked) : [];
    if (!left.length && !extras.length) continue;
    lines.push(`${aisle.emoji} ${aisle.label}`);
    for (const i of left) lines.push(`☐ ${i.name}${i.amount ? ` (${i.amount})` : ""}`);
    for (const e of extras) lines.push(`☐ ${e.text}`);
    lines.push("");
  }
  const pantry = items.filter((i) => i.pantry && !list.ticked(i.key));
  if (pantry.length) lines.push(`🧂 Check we have: ${pantry.map((i) => i.name).join(", ")}`);
  const text = lines.join("\n").trim();
  if (!text) return toast("Everything's ticked off!", { emoji: "🎉" });
  try {
    if (navigator.share) await navigator.share({ title: "Shopping list", text });
    else {
      await navigator.clipboard.writeText(text);
      toast("Copied! Paste it into a message.", { emoji: "📋" });
    }
  } catch (err) {
    if (err?.name !== "AbortError") {
      await navigator.clipboard?.writeText(text).catch(() => {});
      toast("Copied! Paste it into a message.", { emoji: "📋" });
    }
  }
}
