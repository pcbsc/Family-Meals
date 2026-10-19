// Menu: every dish the family has, as big picture tiles. Discover: recipes
// from Seonkyoung Longest and other well-known cooks, added with one tap.
import { h, clearChildren, toast } from "../ui.js";
import { MEALS, CATEGORIES, DISCOVER } from "../seed.js";
import { isFavorite } from "../planner.js";
import { state, dishList, rating, go } from "../store.js";
import { dishTile, chip, backHeader, needKeySheet } from "../components.js";
import { runImport } from "./add.js";

let lastFilter = "all";
let lastQuery = "";

export function viewMenu({ params }) {
  let filter = params.get("c") || lastFilter;
  let query = lastQuery;
  const grid = h("div.tile-grid");
  const chips = h("div.chips.scroll");
  const count = h("p.muted.count");

  const matches = (d) => {
    if (filter === "fav") return isFavorite(d);
    if (MEALS.some((m) => m.key === filter)) return (d.meals || []).includes(filter);
    if (CATEGORIES.some((c) => c.key === filter)) return (d.categories || []).includes(filter);
    return true;
  };
  const draw = () => {
    lastFilter = filter;
    lastQuery = query;
    clearChildren(chips);
    const options = [
      ["all", "⭐", "Everything"],
      ["fav", "❤️", "Favorites"],
      ...MEALS.map((m) => [m.key, m.emoji, m.label]),
      ...CATEGORIES.map((c) => [c.key, c.emoji, c.label]),
    ];
    for (const [key, emoji, label] of options) {
      chips.append(chip(label, { emoji, on: filter === key, onclick: () => { filter = key; draw(); } }));
    }
    clearChildren(grid);
    const q = query.trim().toLowerCase();
    const list = dishList()
      .filter(matches)
      .filter((d) => !q || [d.name, d.nameKo, d.description, ...(d.ingredients || [])].join(" ").toLowerCase().includes(q))
      .sort((a, b) =>
        Number(isFavorite(b)) - Number(isFavorite(a)) ||
        (rating(b) ?? 2.5) - (rating(a) ?? 2.5) ||
        a.name.localeCompare(b.name));
    count.textContent = `${list.length} dish${list.length === 1 ? "" : "es"}`;
    if (!list.length) {
      grid.append(h("div.empty-state",
        h("div.huge-emoji", "🍽️"),
        h("p", state.dishes.size ? "No dishes match." : "Our menu is empty. Let's add a dish!"),
      ));
    }
    for (const d of list) grid.append(dishTile(d, { onclick: () => go(`#/dish/${d.id}`) }));
  };
  draw();

  return h("div.screen.menu",
    h("header.top",
      h("h1", "📖 Our menu"),
      h("button.btn.primary", { onclick: () => go("#/add") }, "➕ Add"),
    ),
    h("input.search", {
      type: "search",
      value: query,
      placeholder: "🔍 Find a dish or ingredient",
      "aria-label": "Search the menu",
      oninput: (e) => { query = e.target.value; draw(); },
    }),
    chips,
    h("button.card.discover-card", { onclick: () => go("#/discover") },
      h("span.banner-emoji", "✨"),
      h("span.grow", h("strong", "Find new recipes"), h("span.muted.block", "Seonkyoung Longest, Korean Bapsang, Maangchi")),
      h("span.chev", "▶"),
    ),
    count,
    grid,
  );
}

export function viewDiscover() {
  const key = (url) => String(url || "").toLowerCase().replace(/^https?:\/\/(www\.)?/, "").replace(/[/?#]+$/, "");
  const have = new Set(dishList().map((d) => key(d.sourceUrl)).filter(Boolean));
  const groups = new Map();
  for (const r of DISCOVER) {
    if (!groups.has(r.by)) groups.set(r.by, []);
    groups.get(r.by).push(r);
  }
  return h("div.screen.discover",
    backHeader("✨ Discover", { back: "#/menu" }),
    h("p.muted", "Famous home cooks with healthy family Korean food. Tap Add and Claude reads the recipe and puts it in our menu. You can also ask Claude to find new dishes when it plans your week."),
    ...[...groups.entries()].map(([by, recipes]) =>
      h("section.discover-group",
        h("h2", by),
        h("div.discover-list", recipes.map((r) => {
          const added = have.has(key(r.url));
          return h("div.discover-item",
            h("span.discover-emoji", r.emoji),
            h("div.grow", h("strong", r.name), r.nameKo ? h("span.muted.block", r.nameKo) : null),
            h("a.btn.ghost.small", { href: r.url, target: "_blank", rel: "noopener" }, "Look ↗"),
            added
              ? h("span.added", "✓ In menu")
              : h("button.btn.primary.small", {
                onclick: () => {
                  if (!state.settings.apiKey) return needKeySheet("Adding recipes from the web");
                  runImport({ url: r.url }).catch((e) => toast(e.message, { emoji: "😕" }));
                },
              }, "➕ Add"),
          );
        })),
      ),
    ),
    h("p.muted.small.center", "Recipes belong to their creators. Visit their sites to see the full posts, photos and videos."),
  );
}
