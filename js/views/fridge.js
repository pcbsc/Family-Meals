// What can we make? Tap or type what's in the fridge, and see which dishes are
// ready to cook and which need just a thing or two (those go on the list).
// The freezer list is here too: meals we froze for a busy night.
import { h, clearChildren, toast, prettyDate } from "../ui.js";
import { whatCanIMake, keyIngredients, normalizeItemName } from "../recipe.js";
import {
  state, dishList, go, addShoppingExtras, freezer, addToFreezer, takeFromFreezer, haveItems, addHave, removeHave, FRESH_DAYS,
} from "../store.js";
import { backHeader, dishTile, dishArt, planItSheet, pickDishes } from "../components.js";

const COMMON = [
  ["🥚", "eggs"], ["🍚", "rice"], ["🍗", "chicken"], ["🥩", "ground beef"], ["🐷", "pork"], ["🐟", "salmon"],
  ["🥢", "tofu"], ["🧅", "onion"], ["🧄", "garlic"], ["🌿", "green onions"], ["🥔", "potatoes"], ["🥕", "carrots"],
  ["🥦", "broccoli"], ["🥬", "spinach"], ["🍅", "tomatoes"], ["🫑", "bell pepper"], ["🍄", "mushrooms"], ["🥒", "cucumber"],
  ["🌽", "corn"], ["🧀", "cheese"], ["🥛", "milk"], ["🍝", "pasta"], ["🍜", "noodles"], ["🫓", "tortillas"],
  ["🍞", "bread"], ["🫘", "beans"], ["🥑", "avocado"], ["🍋", "lemon"], ["🍌", "bananas"],
];
const emojiFor = (item) => COMMON.find(([, name]) => normalizeItemName(name) === normalizeItemName(item))?.[0] || "🧺";

/** "Tue" this week, "Oct 12" before. */
const dayText = (at) => prettyDate(new Date(at), Date.now() - at < 6 * 24 * 3600 * 1000 ? { weekday: "short" } : { month: "short", day: "numeric" });

export function viewFridge() {
  const haveBox = h("div.stack.have-list");
  const quick = h("div.row.wrap");
  const results = h("div.stack");

  const startOver = h("button.btn.ghost.center-btn", { onclick: async () => { await removeHave(() => true); draw(); } }, "Start over");
  const add = async (text) => {
    const fresh = String(text).split(/[,\n]/).map((t) => t.trim().toLowerCase()).filter((t) => t && t.length <= 40);
    await addHave(fresh, { max: 60 });
    draw();
  };
  const drop = async (item) => {
    await removeHave((name) => name === item.name);
    draw();
  };

  // Suggestions while typing: everything our dishes use.
  const words = new Set();
  for (const d of dishList()) for (const k of keyIngredients(d)) words.add(k);
  const input = h("input.text", { placeholder: "Type what we have (like chicken)", "aria-label": "Add what we have", list: "fridge-words", enterkeyhint: "done" });
  const addTyped = () => {
    if (!input.value.trim()) return;
    add(input.value);
    input.value = "";
  };
  input.addEventListener("keydown", (e) => e.key === "Enter" && addTyped());

  const draw = () => {
    clearChildren(haveBox);
    clearChildren(quick);
    clearChildren(results);
    const items = haveItems();
    const fresh = items.filter((x) => !x.stale);
    const stale = items.filter((x) => x.stale);
    const have = fresh.map((x) => x.name);
    startOver.hidden = !items.length;
    if (fresh.length) {
      haveBox.append(h("div.row.wrap", fresh.map((item) => h("button.have-chip", {
        "aria-label": `Remove ${item.name}`,
        onclick: () => drop(item),
      }, emojiFor(item.name), " ", item.name, item.at ? h("span.have-when", dayText(item.at)) : null, h("span.have-x", "✕")))));
    } else if (!stale.length) {
      haveBox.append(h("p.muted", "Nothing yet. Tap the foods below, or type them."));
    }
    // Fresh food bought over a week ago: still here? Until someone says so, it goes back on the list.
    if (stale.length) {
      haveBox.append(h("div.stale-have",
        h("p.muted.small", `Still have these? We got them more than ${FRESH_DAYS} days ago. Tap the ones that are still here.`),
        h("div.row.wrap", stale.map((item) => h("span.stale-chip",
          h("button.have-chip.stale", {
            "aria-label": `We still have ${item.name}`,
            onclick: async () => { await addHave([item.name]); draw(); },
          }, emojiFor(item.name), " ", item.name, h("span.have-when", dayText(item.at)), h("span.have-ok", "✓")),
          h("button.icon-btn.small", { "aria-label": `${item.name} is gone`, onclick: () => drop(item) }, "✕"),
        ))),
      ));
    }
    const known = new Set(items.map((x) => x.key));
    for (const [emoji, name] of COMMON) {
      if (known.has(normalizeItemName(name))) continue;
      quick.append(h("button.chip", { onclick: () => add(name) }, `${emoji} ${name}`));
    }

    if (!have.length) {
      results.append(h("div.empty-state", h("div.huge-emoji", "🧊"), h("p", "Tell us what's in the fridge and we'll find dishes you can make!")));
      return;
    }
    const matches = whatCanIMake(dishList(), have);
    const ready = matches.filter((m) => !m.missing.length);
    const almost = matches.filter((m) => m.missing.length && m.missing.length <= 3 && m.have / m.need >= 0.4).slice(0, 15);

    results.append(h("section.stack",
      h("h2", `✅ Ready to cook (${ready.length})`),
      ready.length
        ? h("div.tile-grid", ready.map((m) => dishTile(m.dish, { onclick: () => go(`#/dish/${m.dish.id}`) })))
        : h("p.muted", "Nothing has everything yet. These need just a thing or two:"),
    ));
    if (almost.length) {
      results.append(h("section.stack",
        h("h2", "🛒 Need just a thing or two"),
        h("div.almost-list", almost.map((m) => h("div.almost",
          h("button.almost-dish", { onclick: () => go(`#/dish/${m.dish.id}`) },
            dishArt(m.dish, { className: "art-sm" }),
            h("span.grow", h("strong", m.dish.name), h("span.muted.block", `Need: ${m.missing.join(", ")}`)),
          ),
          h("button.btn.soft.small", {
            "aria-label": `Add what ${m.dish.name} needs to the shopping list`,
            onclick: async () => {
              const n = await addShoppingExtras(m.missing);
              toast(n ? `Added ${n} thing${n === 1 ? "" : "s"} to the shopping list.` : "They're already on the list.", { emoji: "🛒" });
            },
          }, "🛒 Add"),
        ))),
      ));
    }
    results.append(h("p.muted.small", "We count salt, oil, sauces and spices as things you already have."));
  };
  draw();

  const freezerBox = h("section.card.stack.freezer");
  const drawFreezer = () => {
    clearChildren(freezerBox);
    const frozen = freezer();
    freezerBox.append(
      h("h2", "🧊 In the freezer"),
      frozen.length
        ? h("div.almost-list", frozen.map((f) => {
          const dish = state.dishes.get(f.dishId);
          return h("div.almost",
            h("button.almost-dish", { onclick: () => planItSheet(dish) },
              dishArt(dish, { className: "art-sm" }),
              h("span.grow", h("strong", dish.name), h("span.muted.block", `${f.meals} meal${f.meals === 1 ? "" : "s"} · tap to plan it`)),
            ),
            h("button.icon-btn", {
              "aria-label": `We ate one ${dish.name}`,
              onclick: async () => { await takeFromFreezer(dish.id); drawFreezer(); },
            }, "−"),
            h("button.icon-btn", {
              "aria-label": `One more ${dish.name}`,
              onclick: async () => { await addToFreezer(dish.id); drawFreezer(); },
            }, "+"),
          );
        }))
        : h("p.muted", "Nothing yet. Cook double and freeze half for a busy night!"),
      h("button.btn.soft", {
        onclick: () => pickDishes({
          title: "🧊 What did we freeze?",
          onPick: async (ids) => {
            for (const id of ids) await addToFreezer(id);
            toast("In the freezer list!", { emoji: "🧊" });
            drawFreezer();
          },
        }),
      }, "➕ We froze something"),
    );
  };
  drawFreezer();

  return h("div.screen.fridge",
    backHeader("🧊 What can we make?", { back: "#/menu" }),
    h("section.card.stack",
      h("h2", "What do we have?"),
      haveBox,
      h("div.row", input, h("button.btn.primary", { "aria-label": "Add", onclick: addTyped }, "➕")),
      h("datalist#fridge-words", [...words].sort().map((w) => h("option", { value: w }))),
      quick,
      startOver,
    ),
    results,
    freezerBox,
  );
}
