// Shopping list: built from the week's plan, merged and sorted by aisle.
// Tick things off in the store, add extras, or send the list to a phone.
import { h, toast, clearChildren, prettyDate } from "../ui.js";
import { buildGroceryList, AISLES } from "../recipe.js";
import { dateKey, fromKey, addDays, weekStart, weekDays } from "../planner.js";
import { state, getSlot, slotDishes, shoppingFor, saveShopping, go, db } from "../store.js";
import { MEALS } from "../seed.js";

export function viewShop({ params }) {
  const start = params.get("w") ? fromKey(params.get("w")) : weekStart(new Date(), state.settings.weekStartsOn);
  const weekKey = dateKey(start);
  const today = dateKey(new Date());
  // This week's list covers today onward; another week's covers all of it.
  const onlyAhead = weekKey <= today && today <= dateKey(addDays(start, 6));
  const body = h("div.stack");

  const entries = () => {
    const out = [];
    for (const day of weekDays(start)) {
      if (onlyAhead && dateKey(day) < today) continue;
      for (const m of MEALS) {
        for (const item of slotDishes(getSlot(dateKey(day), m.key))) out.push({ dish: item.dish, servings: item.servings });
      }
    }
    return out;
  };

  const draw = () => {
    clearChildren(body);
    const shop = shoppingFor(weekKey);
    const planned = entries();
    const items = buildGroceryList(planned);
    const toggle = async (key) => {
      const checked = { ...shop.checked };
      checked[key] ? delete checked[key] : (checked[key] = true);
      await saveShopping({ ...shop, checked });
      draw();
    };
    const row = (item) => {
      const done = !!shop.checked[item.key];
      return h(`li.shop-item${done ? ".done" : ""}`,
        h("button.shop-btn", { "aria-pressed": done ? "true" : "false", onclick: () => toggle(item.key) },
          h("span.check", done ? "✓" : ""),
          h("span.shop-text",
            h("span.shop-name", item.name),
            item.amount ? h("span.shop-amount", item.amount) : null,
            h("span.shop-for", item.dishes.join(", ")),
          ),
        ),
      );
    };

    if (!planned.length && !shop.extras.length) {
      body.append(h("div.empty-state",
        h("div.huge-emoji", "🪄"),
        h("p", "Plan some meals and the list makes itself!"),
        h("button.btn.primary", { onclick: () => go(`#/week?w=${weekKey}`) }, "📅 Plan the week"),
      ));
    }

    for (const aisle of AISLES) {
      const inAisle = items.filter((i) => i.aisle === aisle.key && !i.pantry);
      const extras = aisle.key === "other" ? shop.extras : [];
      if (!inAisle.length && !extras.length) continue;
      body.append(h("section.card.aisle",
        h("h2", aisle.emoji, " ", aisle.label),
        h("ul.shop-list",
          inAisle.map(row),
          extras.map((x) => h(`li.shop-item${x.checked ? ".done" : ""}`,
            h("button.shop-btn", {
              onclick: async () => {
                await saveShopping({ ...shop, extras: shop.extras.map((e) => (e.id === x.id ? { ...e, checked: !e.checked } : e)) });
                draw();
              },
            }, h("span.check", x.checked ? "✓" : ""), h("span.shop-text", h("span.shop-name", x.text))),
            h("button.icon-btn.small", {
              "aria-label": `Remove ${x.text}`,
              onclick: async () => {
                await saveShopping({ ...shop, extras: shop.extras.filter((e) => e.id !== x.id) });
                draw();
              },
            }, "✕"),
          )),
        ),
      ));
    }

    const pantry = items.filter((i) => i.pantry);
    if (pantry.length) {
      body.append(h("details.card.aisle.pantry",
        h("summary", h("h2", "🧂 Check the cupboard"), h("span.muted", `${pantry.length} things you might already have`)),
        h("ul.shop-list", pantry.map(row)),
      ));
    }

    let extra = "";
    const input = h("input.text", { placeholder: "Add something (milk, paper towels…)", oninput: (e) => (extra = e.target.value) });
    const addExtra = async () => {
      if (!extra.trim()) return;
      await saveShopping({ ...shop, extras: [...shop.extras, { id: db.newId("x-"), text: extra.trim(), checked: false }] });
      draw();
    };
    input.addEventListener("keydown", (e) => e.key === "Enter" && addExtra());
    body.append(
      h("div.row", input, h("button.btn.primary", { onclick: addExtra }, "➕")),
      h("div.row.wrap",
        h("button.btn.primary.grow", { onclick: () => sendList(items, shop) }, "📤 Send the list"),
        h("button.btn.ghost", {
          onclick: async () => {
            await saveShopping({ ...shop, checked: {}, extras: shop.extras.map((e) => ({ ...e, checked: false })) });
            draw();
          },
        }, "Untick all"),
      ),
    );
  };
  draw();

  return h("div.screen.shop",
    h("header.top", h("h1", "🛒 Shopping list")),
    h("div.week-nav",
      h("button.icon-btn", { "aria-label": "Last week", onclick: () => go(`#/shop?w=${dateKey(addDays(start, -7))}`, { replace: true }) }, "◀"),
      h("div.week-range", h("strong", `${prettyDate(start, { month: "short", day: "numeric" })} – ${prettyDate(addDays(start, 6), { month: "short", day: "numeric" })}`)),
      h("button.icon-btn", { "aria-label": "Next week", onclick: () => go(`#/shop?w=${dateKey(addDays(start, 7))}`, { replace: true }) }, "▶"),
    ),
    body,
  );
}

async function sendList(items, shop) {
  const lines = [];
  for (const aisle of AISLES) {
    const left = items.filter((i) => i.aisle === aisle.key && !i.pantry && !shop.checked[i.key]);
    const extras = aisle.key === "other" ? shop.extras.filter((e) => !e.checked) : [];
    if (!left.length && !extras.length) continue;
    lines.push(`${aisle.emoji} ${aisle.label}`);
    for (const i of left) lines.push(`☐ ${i.name}${i.amount ? ` (${i.amount})` : ""}`);
    for (const e of extras) lines.push(`☐ ${e.text}`);
    lines.push("");
  }
  const pantry = items.filter((i) => i.pantry && !shop.checked[i.key]);
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
