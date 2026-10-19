// Menu: every dish the family has, as big picture tiles. Discover: recipes
// from Seonkyoung Longest and other well-known cooks, added with one tap.
import { h, clearChildren, toast } from "../ui.js";
import { MEALS, CATEGORIES, CUISINES, DISCOVER, cuisineOf } from "../seed.js";
import { isFavorite } from "../planner.js";
import { state, dishList, rating, go } from "../store.js";
import { dishTile, backHeader, needKeySheet } from "../components.js";
import { runImport } from "./add.js";

let lastFilter = "all";
let lastKind = "all";
let lastQuery = "";

const FILTERS = [
  { key: "all", emoji: "⭐", label: "All" },
  { key: "fav", emoji: "❤️", label: "Favorites" },
  ...MEALS.map((m) => ({ key: m.key, emoji: m.emoji, label: m.key === "snack" ? "Snacks" : m.label })),
];

// Words a dish can be found by: its names, ingredients and kinds ("Italian", "Soups"…).
function searchText(d) {
  const kinds = (d.categories || []).map((c) => CATEGORIES.find((x) => x.key === c)?.label || c);
  const cuisine = CUISINES.find((c) => c.key === cuisineOf(d))?.label;
  return [d.name, d.nameKo, d.description, cuisine, ...kinds, ...(d.ingredients || [])].join(" ").toLowerCase();
}

/**
 * A row of flag buttons to swipe through: one per kind of food, and "All kinds"
 * unless all is false. It updates itself in place, so it keeps its scroll spot.
 */
function kindRow(kinds, current, onpick, { all = true } = {}) {
  const row = h("div.kinds", { role: "group", "aria-label": "Kind of food" });
  const pick = (key) => {
    for (const b of row.children) {
      const on = b.dataset.kind === key;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    }
    onpick(key);
  };
  for (const k of [...(all ? [{ key: "all", emoji: "🌍", label: "All kinds" }] : []), ...kinds]) {
    row.append(h(`button.kind${current === k.key ? ".on" : ""}`, {
      dataset: { kind: k.key },
      "aria-pressed": current === k.key ? "true" : "false",
      onclick: () => pick(k.key),
    }, h("span.kind-emoji", k.emoji), k.label));
  }
  // Show the chosen kind even when it's far along the row.
  requestAnimationFrame(() => {
    const on = row.querySelector(".kind.on");
    if (on) row.scrollLeft = on.offsetLeft - (row.clientWidth - on.offsetWidth) / 2;
  });
  return row;
}

export function viewMenu({ params }) {
  let filter = FILTERS.some((f) => f.key === params.get("c")) ? params.get("c") : lastFilter;
  let query = lastQuery;
  // Only the kinds of food we actually have dishes for.
  const present = new Set(dishList().map(cuisineOf));
  const kinds = CUISINES.filter((c) => present.has(c.key));
  let kind = kinds.some((k) => k.key === lastKind) ? lastKind : "all";
  const grid = h("div.tile-grid");
  const filters = h("div.filters");
  const kindsBox = kinds.length > 1 ? kindRow(kinds, kind, (k) => { kind = k; draw(); }) : null;

  const matches = (d) => {
    if (kind !== "all" && cuisineOf(d) !== kind) return false;
    if (filter === "fav") return isFavorite(d);
    if (filter !== "all") return (d.meals || []).includes(filter);
    return true;
  };
  const draw = () => {
    lastFilter = filter;
    lastKind = kind;
    lastQuery = query;
    clearChildren(filters);
    for (const f of FILTERS) {
      filters.append(h(`button.filter${filter === f.key ? ".on" : ""}`, {
        "aria-pressed": filter === f.key ? "true" : "false",
        onclick: () => { filter = f.key; draw(); },
      }, h("span.filter-emoji", f.emoji), f.label));
    }
    clearChildren(grid);
    const q = query.trim().toLowerCase();
    const list = dishList()
      .filter(matches)
      .filter((d) => !q || searchText(d).includes(q))
      .sort((a, b) =>
        Number(isFavorite(b)) - Number(isFavorite(a)) ||
        (rating(b) ?? 2.5) - (rating(a) ?? 2.5) ||
        a.name.localeCompare(b.name));
    if (!list.length) {
      grid.append(h("div.empty-state",
        h("div.huge-emoji", "🍽️"),
        h("p", state.dishes.size ? "No dishes here." : "Our menu is empty. Let's add a dish!"),
      ));
    }
    for (const d of list) grid.append(dishTile(d, { onclick: () => go(`#/dish/${d.id}`) }));
  };
  draw();

  return h("div.screen.menu",
    h("header.top",
      h("h1", "📖 Menu"),
      h("button.btn.primary", { onclick: () => go("#/add") }, "➕ Add"),
    ),
    h("button.btn.soft.wide.fridge-btn", { onclick: () => go("#/fridge") }, "🧊 What can we make with what we have?"),
    filters,
    kindsBox,
    h("input.search", {
      type: "search",
      value: query,
      placeholder: "🔍 Search",
      "aria-label": "Search the menu",
      oninput: (e) => { query = e.target.value; draw(); },
    }),
    grid,
  );
}

const TRENDING = { key: "trending", emoji: "🔥", label: "Trending" };
const INTROS = {
  trending: "Viral on TikTok and Instagram, and liked by the people who made them at home.",
  korean: "Healthy family Korean food from famous home cooks.",
  american: "Family dinners, muffins and snacks from trusted recipe sites.",
};
let lastCuisine = "trending";

export function viewDiscover() {
  const key = (url) => String(url || "").toLowerCase().replace(/^https?:\/\/(www\.)?/, "").replace(/[/?#]+$/, "");
  const have = new Set(dishList().flatMap((d) => [key(d.sourceUrl), key(d.videoUrl)]).filter(Boolean));
  const intro = h("p.muted");
  const kinds = [TRENDING, ...CUISINES].filter((c) => DISCOVER.some((r) => r.cuisine === c.key));
  if (!kinds.some((k) => k.key === lastCuisine)) lastCuisine = "trending";
  const list = h("div.stack");

  const item = (r) => h("div.discover-item",
    h("span.discover-emoji", r.emoji),
    h("div.grow",
      h("strong", r.name),
      r.nameKo ? h("span.muted.block", r.nameKo) : null,
    ),
    h("a.btn.ghost.small", { href: r.url, target: "_blank", rel: "noopener" }, "Look ↗"),
    have.has(key(r.url))
      ? h("span.added", "✓ In menu")
      : h("button.btn.primary.small", {
        onclick: () => {
          if (!state.settings.apiKey) return needKeySheet("Adding recipes from the web");
          runImport({ url: r.url }).catch((e) => toast(e.message, { emoji: "😕" }));
        },
      }, "➕ Add"),
    r.note ? h("p.discover-note", "💬 ", r.note) : null,
  );

  const draw = () => {
    const current = kinds.find((c) => c.key === lastCuisine);
    intro.textContent = INTROS[lastCuisine] || `${current.label} family favorites from well-known cooks.`;
    clearChildren(list);
    const groups = new Map();
    for (const r of DISCOVER.filter((d) => d.cuisine === lastCuisine)) {
      if (!groups.has(r.by)) groups.set(r.by, []);
      groups.get(r.by).push(r);
    }
    // Trending recipes each come from a different creator, so they're one list.
    if (lastCuisine === "trending") list.append(h("div.discover-list", [...groups.values()].flat().map(item)));
    else {
      for (const [by, recipes] of groups) {
        list.append(h("section.discover-group", h("h2", by), h("div.discover-list", recipes.map(item))));
      }
    }
  };
  const tabs = kindRow(kinds, lastCuisine, (k) => { lastCuisine = k; draw(); }, { all: false });
  draw();

  return h("div.screen.discover",
    backHeader("✨ Ideas from famous cooks", { back: "#/add" }),
    tabs,
    intro,
    list,
    h("p.muted.small.center", "Tap Add and Claude reads the recipe (and keeps the video if there is one). Recipes belong to their creators; visit their sites and videos."),
  );
}
