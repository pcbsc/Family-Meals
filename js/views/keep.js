// How long does food last? The storage guide: every food with its fridge,
// freezer and pantry times and the best way to keep it, the food-safety rules
// every family should know, and "Where does it go?", a quiz for kids.
import { h, openSheet, clearChildren, confetti } from "../ui.js";
import { FOODS, RULES, GROUPS, PLACES, rangeText, homeOf, quizFoods, foodByKey, foodFor } from "../storage.js";
import { backHeader, chip } from "../components.js";

const BEST = {
  fridge: "🥶 In the fridge",
  freezer: "🧊 In the freezer",
  pantry: "🏠 In a cool, dry cupboard",
  counter: "🏠 On the counter",
  "counter-then-fridge": "🏠 On the counter until ripe, then 🥶 the fridge",
};

/** Three tiles: how long in the fridge, the freezer and the pantry ("—" where it doesn't belong). */
function placeTiles(times) {
  return h("div.keep-places", PLACES.map((p) => h(`div.keep-place${times[p.key] ? "" : ".no"}`,
    h("span.keep-place-emoji", { "aria-hidden": "true" }, p.emoji),
    h("span.keep-place-label", p.label),
    h("strong.keep-place-time", times[p.key] ? rangeText(times[p.key]) : "—"),
  )));
}

/** Everything about keeping one food. onRemove adds a "We're out of it" button (from what we have). */
export function foodSheet(food, { onRemove, title } = {}) {
  if (!food) return;
  openSheet((close) => h("div.stack.keep-sheet",
    h("div.keep-head", h("span.keep-emoji", { "aria-hidden": "true" }, food.emoji), h("div",
      h("h3", food.name),
      h("p.keep-best", BEST[food.best] || ""),
    )),
    placeTiles(food),
    food.variants?.length
      ? h("div.keep-variants", food.variants.map((v) => h("div.keep-variant",
        h("strong", v.label),
        h("span.muted", PLACES.filter((p) => v[p.key]).map((p) => `${p.emoji} ${rangeText(v[p.key])}`).join("  ·  ") || "—"),
      )))
      : null,
    food.caution ? h("p.keep-caution", "⚠️ ", food.caution) : null,
    food.how ? h("section.keep-section", h("h4", "📦 How to keep it"), h("p", food.how)) : null,
    food.freeze ? h("section.keep-section", h("h4", "🧊 Freezing"), h("p", food.freeze)) : null,
    food.why ? h("section.keep-section.keep-why", h("h4", "💡 Why?"), h("p", food.why)) : null,
    food.spoiled ? h("section.keep-section", h("h4", "👃 It's gone bad if…"), h("p", food.spoiled)) : null,
    h("p.muted.small", "Fridge times are for 40°F (4°C) or colder. Freezer times are for best taste: at 0°F (-18°C) food stays safe, just less tasty after that. When in doubt, throw it out."),
    food.sources?.length
      ? h("p.muted.small.keep-sources", "Sources: ", ...food.sources.flatMap((s, i) => [
        i ? " · " : "",
        h("a", { href: s.url, target: "_blank", rel: "noopener" }, s.name),
      ]))
      : null,
    onRemove ? h("button.btn.soft.wide", { onclick: async () => { await close(); onRemove(); } }, "We're out of it") : null,
  ), { title: title || "How to keep it" });
}

/** The few rules that matter most, in plain words. */
function rulesCard() {
  if (!RULES.length) return null;
  return h("details.card.keep-rules",
    h("summary", h("h2", "🛡️ Food safety rules"), h("span.muted", `${RULES.length} things every family should know`)),
    h("ul.keep-rule-list", RULES.map((r) => h("li", h("strong", r.rule), r.detail ? h("span.block.muted", r.detail) : null))),
  );
}

/** Where does it go? Five foods, three buttons, and why. */
export function quizSheet() {
  const pool = quizFoods();
  const picks = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
  let n = 0;
  let right = 0;
  openSheet(() => {
    const body = h("div.stack.quiz");
    const ask = () => {
      clearChildren(body);
      if (n >= picks.length) {
        if (right >= 4) confetti(["🥶", "🧊", "⭐", "🎉"]);
        body.append(
          h("div.huge-emoji.center", right >= 4 ? "🏆" : "⭐"),
          h("p.big-text.center", `You got ${right} out of ${picks.length}!`),
          h("button.btn.primary.wide", { onclick: () => { n = 0; right = 0; picks.sort(() => Math.random() - 0.5); ask(); } }, "Play again"),
        );
        return;
      }
      const food = picks[n];
      const home = homeOf(food);
      const answer = (place) => {
        const ok = place === home;
        if (ok) right++;
        clearChildren(body);
        body.append(
          h("div.huge-emoji.center", food.emoji),
          h("p.big-text.center", ok ? "✅ Yes!" : `🤔 Not quite: ${BEST[food.best]?.replace(/^\S+\s/, "").toLowerCase() || home}.`),
          food.why ? h("p.center", food.why) : null,
          h("p.muted.center", PLACES.filter((p) => food[p.key]).map((p) => `${p.emoji} ${p.label}: ${rangeText(food[p.key])}`).join("  ·  ")),
          h("button.btn.primary.wide", { onclick: () => { n++; ask(); } }, n + 1 < picks.length ? "Next ▶" : "See my score"),
        );
      };
      body.append(
        h("p.muted.center", `${n + 1} of ${picks.length}`),
        h("div.huge-emoji.center", food.emoji),
        h("p.big-text.center", `Where do ${food.name.toLowerCase()} go?`),
        h("div.quiz-answers",
          h("button.btn.soft.big", { onclick: () => answer("fridge") }, "🥶 Fridge"),
          h("button.btn.soft.big", { onclick: () => answer("freezer") }, "🧊 Freezer"),
          h("button.btn.soft.big", { onclick: () => answer("pantry") }, "🏠 Cupboard or counter"),
        ),
      );
    };
    ask();
    return body;
  }, { title: "🎮 Where does it go?" });
}

export function viewKeep({ params }) {
  let group = "";
  let query = "";
  const list = h("div.keep-list");
  const chips = h("div.chips.scroll");
  const draw = () => {
    clearChildren(chips);
    chips.append(chip("Everything", { on: !group, onclick: () => { group = ""; draw(); } }),
      ...GROUPS.map((g) => chip(g.label, { emoji: g.emoji, on: group === g.key, onclick: () => { group = g.key; draw(); } })));
    clearChildren(list);
    const q = query.trim().toLowerCase();
    const shown = FOODS.filter((f) => (!group || f.group === group) && (!q || f.name.toLowerCase().includes(q) || f.key.includes(q)));
    if (!shown.length) list.append(h("p.muted.center", "Nothing by that name. Try another word."));
    for (const f of shown) {
      list.append(h("button.keep-row", { onclick: () => foodSheet(f) },
        h("span.keep-row-emoji", { "aria-hidden": "true" }, f.emoji),
        h("span.grow",
          h("strong", f.name),
          h("span.muted.block.small", PLACES.filter((p) => f[p.key]).map((p) => `${p.emoji} ${rangeText(f[p.key])}`).join("  ·  ") || "See how to keep it"),
        ),
        h("span.row-go", { "aria-hidden": "true" }, "›"),
      ));
    }
  };
  draw();
  const open = params.get("f") && foodByKey(params.get("f"));
  if (open) setTimeout(() => foodSheet(open), 0);
  return h("div.screen.keep",
    backHeader("How long does food last?", { back: "#/menu" }),
    h("button.card.quiz-card", { onclick: quizSheet },
      h("span.quiz-card-emoji", { "aria-hidden": "true" }, "🎮"),
      h("span.grow", h("strong", "Where does it go?"), h("span.muted.block", "A quiz for kids: fridge, freezer or cupboard?")),
      h("span.row-go", { "aria-hidden": "true" }, "›"),
    ),
    rulesCard(),
    h("input.search", { type: "search", placeholder: "🔍 Find a food", "aria-label": "Find a food", oninput: (e) => { query = e.target.value; draw(); } }),
    chips,
    list,
    h("p.muted.small.center", "From USDA FoodKeeper, FoodSafety.gov, the FDA and university extension services. Each number was checked by two researchers separately."),
  );
}

const firstSentence = (text) => String(text || "").split(/(?<=[.!?])\s/)[0];

/**
 * After shopping: where each thing goes and how long it keeps there, so the
 * groceries go to the right shelf (and the kids can help put them away).
 */
export function putAwaySheet(names) {
  const shelves = [
    { key: "fridge", title: "🥶 Fridge", items: [] },
    { key: "freezer", title: "🧊 Freezer", items: [] },
    { key: "counter", title: "🏠 Counter", items: [] },
    { key: "pantry", title: "🏠 Cupboard", items: [] },
  ];
  const unknown = [];
  const seen = new Set();
  for (const name of names) {
    const food = foodFor(name);
    if (!food) { unknown.push(name); continue; }
    if (seen.has(`${food.key}|${name}`)) continue;
    seen.add(`${food.key}|${name}`);
    const shelf = food.best === "counter-then-fridge" ? "counter" : food.best;
    (shelves.find((s) => s.key === shelf) || shelves[0]).items.push({ name, food });
  }
  if (!shelves.some((s) => s.items.length)) return;
  openSheet(() => h("div.stack.put-away",
    h("p", "Here's where everything goes, and how long it keeps there. Tap one to learn more."),
    ...shelves.filter((s) => s.items.length).map((s) => h("section.stack",
      h("h3", s.title),
      ...s.items.map(({ name, food }) => {
        const home = homeOf(food);
        const time = food[home] || food.fridge || food.pantry;
        return h("button.keep-row", { onclick: () => foodSheet(food) },
          h("span.keep-row-emoji", { "aria-hidden": "true" }, food.emoji),
          h("span.grow",
            h("strong", name.charAt(0).toUpperCase() + name.slice(1)),
            h("span.muted.block.small", [time ? `Keeps ${rangeText(time)}` : "", firstSentence(food.how)].filter(Boolean).join(". ")),
          ),
          h("span.row-go", { "aria-hidden": "true" }, "›"),
        );
      }),
    )),
    unknown.length ? h("p.muted.small", `Also: ${unknown.join(", ")}.`) : null,
  ), { title: "🧺 Putting it away" });
}
