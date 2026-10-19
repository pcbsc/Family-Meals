// What can we make? Tap or type what's in the fridge, and see which dishes are
// ready to cook and which need just a thing or two (those go on the list).
import { h, clearChildren, toast } from "../ui.js";
import { whatCanIMake, keyIngredients, normalizeItemName } from "../recipe.js";
import { state, dishList, saveSettings, go, addShoppingExtras } from "../store.js";
import { backHeader, dishTile, dishArt } from "../components.js";

const COMMON = [
  ["🥚", "eggs"], ["🍚", "rice"], ["🍗", "chicken"], ["🥩", "ground beef"], ["🐷", "pork"], ["🐟", "salmon"],
  ["🥢", "tofu"], ["🧅", "onion"], ["🧄", "garlic"], ["🌿", "green onions"], ["🥔", "potatoes"], ["🥕", "carrots"],
  ["🥦", "broccoli"], ["🥬", "spinach"], ["🍅", "tomatoes"], ["🫑", "bell pepper"], ["🍄", "mushrooms"], ["🥒", "cucumber"],
  ["🌽", "corn"], ["🧀", "cheese"], ["🥛", "milk"], ["🍝", "pasta"], ["🍜", "noodles"], ["🫓", "tortillas"],
  ["🍞", "bread"], ["🫘", "beans"], ["🥑", "avocado"], ["🍋", "lemon"], ["🍌", "bananas"],
];
const emojiFor = (item) => COMMON.find(([, name]) => normalizeItemName(name) === normalizeItemName(item))?.[0] || "🧺";

export function viewFridge() {
  let have = [...(state.settings.have || [])];
  const haveBox = h("div.row.wrap.have-list");
  const quick = h("div.row.wrap");
  const results = h("div.stack");

  const keep = async (next) => {
    have = next;
    await saveSettings({ have });
    draw();
  };
  const add = (text) => {
    const known = new Set(have.map(normalizeItemName));
    const fresh = String(text).split(/[,\n]/).map((t) => t.trim().toLowerCase()).filter((t) => t && t.length <= 40);
    const next = [...have];
    for (const t of fresh) {
      if (known.has(normalizeItemName(t))) continue;
      known.add(normalizeItemName(t));
      next.push(t);
    }
    return keep(next.slice(0, 60));
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
    if (have.length) {
      for (const item of have) {
        haveBox.append(h("button.have-chip", {
          "aria-label": `Remove ${item}`,
          onclick: () => keep(have.filter((x) => x !== item)),
        }, emojiFor(item), " ", item, h("span.have-x", "✕")));
      }
    } else {
      haveBox.append(h("p.muted", "Nothing yet. Tap the foods below, or type them."));
    }
    const known = new Set(have.map(normalizeItemName));
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

  return h("div.screen.fridge",
    backHeader("🧊 What can we make?", { back: "#/menu" }),
    h("section.card.stack",
      h("h2", "What do we have?"),
      haveBox,
      h("div.row", input, h("button.btn.primary", { "aria-label": "Add", onclick: addTyped }, "➕")),
      h("datalist#fridge-words", [...words].sort().map((w) => h("option", { value: w }))),
      quick,
      have.length ? h("button.btn.ghost.center-btn", { onclick: () => keep([]) }, "Start over") : null,
    ),
    results,
  );
}
