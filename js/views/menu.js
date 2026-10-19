// Menu: every dish the family has, as big picture tiles. Discover: recipes
// from Seonkyoung Longest and other well-known cooks, added with one tap.
import { h, clearChildren, toast } from "../ui.js";
import { MEALS, CATEGORIES, DISCOVER } from "../seed.js";
import { isFavorite } from "../planner.js";
import { state, dishList, rating, go } from "../store.js";
import { dishTile, backHeader, needKeySheet } from "../components.js";
import { runImport } from "./add.js";

let lastFilter = "all";
let lastQuery = "";

const FILTERS = [
  { key: "all", emoji: "⭐", label: "All" },
  { key: "fav", emoji: "❤️", label: "Favorites" },
  ...MEALS.map((m) => ({ key: m.key, emoji: m.emoji, label: m.key === "snack" ? "Snacks" : m.label })),
];

// Words a dish can be found by: its names, ingredients and kinds ("Korean", "Soups"…).
function searchText(d) {
  const kinds = (d.categories || []).map((c) => CATEGORIES.find((x) => x.key === c)?.label || c);
  return [d.name, d.nameKo, d.description, ...kinds, ...(d.ingredients || [])].join(" ").toLowerCase();
}

export function viewMenu({ params }) {
  let filter = FILTERS.some((f) => f.key === params.get("c")) ? params.get("c") : lastFilter;
  let query = lastQuery;
  const grid = h("div.tile-grid");
  const filters = h("div.filters");

  const matches = (d) => {
    if (filter === "fav") return isFavorite(d);
    if (filter !== "all") return (d.meals || []).includes(filter);
    return true;
  };
  const draw = () => {
    lastFilter = filter;
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
    filters,
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

const CUISINES = [
  { key: "trending", emoji: "🔥", label: "Trending", intro: "Viral on TikTok and Instagram, and liked by the people who made them at home." },
  { key: "korean", emoji: "🇰🇷", label: "Korean", intro: "Healthy family Korean food from famous home cooks." },
  { key: "american", emoji: "🇺🇸", label: "American", intro: "Family dinners, muffins and snacks from trusted recipe sites." },
];
let lastCuisine = "trending";

export function viewDiscover() {
  const key = (url) => String(url || "").toLowerCase().replace(/^https?:\/\/(www\.)?/, "").replace(/[/?#]+$/, "");
  const have = new Set(dishList().map((d) => key(d.sourceUrl)).filter(Boolean));
  const tabs = h("div.filters.three");
  const intro = h("p.muted");
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
    clearChildren(tabs);
    for (const c of CUISINES) {
      tabs.append(h(`button.filter${lastCuisine === c.key ? ".on" : ""}`, {
        "aria-pressed": lastCuisine === c.key ? "true" : "false",
        onclick: () => { lastCuisine = c.key; draw(); },
      }, h("span.filter-emoji", c.emoji), c.label));
    }
    intro.textContent = CUISINES.find((c) => c.key === lastCuisine).intro;
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
  draw();

  return h("div.screen.discover",
    backHeader("✨ Ideas from famous cooks", { back: "#/add" }),
    tabs,
    intro,
    list,
    h("p.muted.small.center", "Tap Add and Claude reads the recipe (and keeps the video if there is one). Recipes belong to their creators; visit their sites and videos."),
  );
}
