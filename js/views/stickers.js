// Brave Bites: a sticker chart for trying foods. A grown-up picks one or two
// Brave Foods for each kid; every tiny taste earns an animal sticker, up to 12
// per food (that's how often it takes to start liking something). Trying a dish
// for the first time earns one too. Ten stickers win a prize: you pick a dinner!
// The look comes from the Canva design.
import { h, openSheet, toast, confetti, clearChildren, once } from "../ui.js";
import {
  state, members, stickersFor, STICKERS_PER_PRIZE, TRIES_PER_FOOD, dishList, go, refresh, braveFoods, setBraveFoods,
  triesOf, addBraveTry, prizesFor, usePrize,
} from "../store.js";
import { backHeader, dishArt, dishTile, icon, grownUp, pickDishes, planItSheet } from "../components.js";

/** A few dishes none of the kids has tried yet, kid favorites first. */
function toTry(kids) {
  return dishList()
    .filter((d) => kids.every((k) => d.ratings?.[k.id] == null && !triesOf(k.id, d.id)) && !(d.categories || []).includes("side"))
    .map((d) => ({ d, score: ((d.categories || []).includes("kid-favorite") ? 2 : 0) + Math.random() }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.d);
}

/** Good Brave Foods: ones this kid said "okay" or "no thanks" to, then veggies and banchan they've never had. */
function braveIdeas(kid) {
  const score = (d) => {
    const r = d.ratings?.[kid.id];
    const cats = d.categories || [];
    if (r === 1 || r === 2) return 10 - r;
    if (r != null) return -10;
    return (cats.includes("veggie") ? 4 : 0) + (cats.includes("side") ? 3 : 0) + (cats.includes("healthy") ? 1 : 0) + Math.random();
  };
  return dishList().map((d) => ({ d, s: score(d) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).map((x) => x.d);
}

async function pickBraveFoods(kid) {
  if (!(await grownUp())) return;
  const picked = [...braveFoods(kid.id)];
  const ideas = braveIdeas(kid).slice(0, 12);
  openSheet((close) => {
    const grid = h("div.tile-grid");
    const save = h("button.btn.primary.wide", {
      onclick: async () => {
        await setBraveFoods(kid.id, picked);
        await close();
        toast(picked.length ? `${kid.name}'s Brave Food${picked.length === 1 ? " is" : "s are"} ready!` : "No Brave Foods for now.", { emoji: "🏅" });
        refresh();
      },
    }, "Save");
    const draw = () => {
      clearChildren(grid);
      const shown = [...picked.map((id) => state.dishes.get(id)).filter(Boolean), ...ideas.filter((d) => !picked.includes(d.id))];
      for (const d of shown) {
        grid.append(dishTile(d, {
          small: true,
          selected: picked.includes(d.id),
          onclick: () => {
            const i = picked.indexOf(d.id);
            if (i >= 0) picked.splice(i, 1);
            else if (picked.length < 2) picked.push(d.id);
            else toast("Two at a time is plenty. Tap one to take it off first.", { emoji: "☝️" });
            draw();
          },
        }));
      }
    };
    draw();
    return h("div.stack",
      h("p", `Pick one or two foods for ${kid.name} to try again and again. A tiny taste each time is enough: after about ${TRIES_PER_FOOD} tries, most kids start to like it.`),
      h("p.muted.small", "Ideas: what they said \"okay\" or \"no thanks\" to, and veggies and banchan they haven't had."),
      grid,
      h("button.btn.ghost", {
        onclick: async () => {
          await close();
          pickDishes({
            title: `🏅 A Brave Food for ${kid.name}`,
            onPick: async ([id]) => {
              await setBraveFoods(kid.id, [...picked.filter((x) => x !== id), id].slice(-2));
              refresh();
            },
          });
        },
      }, "🔍 Find another dish"),
      save,
    );
  }, { title: `🏅 ${kid.name}'s Brave Foods`, wide: true });
}

/** A Brave Food with its progress and the "I tried it!" button. */
function braveFoodRow(kid, dish) {
  const tries = triesOf(kid.id, dish.id);
  const done = tries >= TRIES_PER_FOOD;
  return h("div.brave-food",
    h("button.brave-food-dish", { onclick: () => go(`#/dish/${dish.id}`) },
      dishArt(dish, { className: "art-sm" }),
      h("span.grow",
        h("strong", dish.name),
        h("span.brave-progress", { role: "progressbar", "aria-valuemin": "0", "aria-valuemax": String(TRIES_PER_FOOD), "aria-valuenow": String(tries) },
          h("span.brave-progress-fill", { style: { width: `${Math.min(100, (tries / TRIES_PER_FOOD) * 100)}%` } })),
        h("span.muted.small", done ? "All 12 tries! Pick a new Brave Food." : `${tries} of ${TRIES_PER_FOOD} tries`),
      ),
    ),
    done ? null : h("button.btn.cook.tried-btn", {
      onclick: once(async () => {
        const got = await addBraveTry(kid.id, dish.id);
        if (got) {
          confetti([got.sticker.emoji, "🏅", "⭐"]);
          toast(`${kid.name} got a ${got.sticker.emoji} ${got.sticker.name} sticker for trying ${dish.name}!`, { emoji: "🏅", ms: 4000 });
        }
        refresh();
      }),
    }, "🏅 I tried it!"),
  );
}

function kidCard(kid) {
  const mine = stickersFor(kid.id);
  const prize = prizesFor(kid.id);
  const full = Math.floor(mine.length / STICKERS_PER_PRIZE);
  const row = mine.slice(full * STICKERS_PER_PRIZE);
  const left = STICKERS_PER_PRIZE - row.length;
  const slots = [];
  for (let i = 0; i < STICKERS_PER_PRIZE; i++) {
    const s = row[i];
    slots.push(s
      ? h("button.sticker", {
        "aria-label": `${s.sticker.name} sticker for trying ${s.dish?.name || s.dishName}`,
        onclick: () => (s.dish ? go(`#/dish/${s.dish.id}`) : null),
      }, icon(`sticker-${s.sticker.key}`, "sticker-img"), h("span.sticker-name", s.dish?.name || s.dishName))
      : h("span.sticker.empty", { "aria-hidden": "true" }, h("span.sticker-num", i + 1)));
  }
  const foods = braveFoods(kid.id).map((id) => state.dishes.get(id));
  return h("section.card.stack.kid-stickers",
    h("div.kid-head",
      h("span.kid-face", kid.avatar),
      h("h2.grow", kid.name),
      h("span.star-badge", { "aria-label": `${mine.length} sticker${mine.length === 1 ? "" : "s"}` }, icon("star-gold"), h("span", String(mine.length))),
    ),
    h("div.brave-foods",
      h("div.section-head",
        h("h3", "🏅 Brave Foods"),
        h("button.btn.ghost.small", { onclick: () => pickBraveFoods(kid) }, foods.length ? "Change" : "Pick"),
      ),
      foods.length
        ? foods.map((d) => braveFoodRow(kid, d))
        : h("p.muted", "A grown-up picks a food or two to try again and again. Each try is a sticker!"),
      foods.length && kid.safeFoods ? h("p.muted.small", `Serve it next to something ${kid.name} likes: ${kid.safeFoods}.`) : null,
    ),
    h("div.sticker-grid", slots),
    prize.ready
      ? h("button.prize-bar.prize-ready", {
        onclick: () => pickDishes({
          meal: "dinner",
          title: `🏆 ${kid.name} picks a dinner!`,
          onPick: ([id]) => planItSheet(state.dishes.get(id), {
            onPlanned: async () => {
              await usePrize(kid.id);
              confetti(["🏆", "🎉", "⭐"]);
              refresh();
            },
          }),
        }),
      }, icon("trophy", "prize-trophy"), h("p", h("span.block", "Prize time! 🎉"), h("strong", "Tap to pick a dinner!")))
      : h("div.prize-bar",
        icon("trophy", "prize-trophy"),
        h("p", h("span.block", `${left} more for a prize:`), h("strong", "you pick a dinner!")),
        prize.used ? h("span.prize-count", "🏆".repeat(Math.min(prize.used, 3)), prize.used > 3 ? ` ×${prize.used}` : "") : null,
      ),
  );
}

export function viewStickers() {
  const kids = members().filter((m) => m.kid);
  const ideas = kids.length ? toTry(kids) : [];
  return h("div.screen.stickers",
    backHeader("Brave Bites", { back: "#/today" }),
    h("div.brave-intro",
      icon("mascot-cheer", "brave-mascot"),
      h("p.brave-call", h("span.block", "Try a food,"), h("span.block.orange", "get a sticker!")),
    ),
    kids.length ? h("p.muted.brave-tip", "Tiny tastes count. Serve the Brave Food next to something they already like, and try one new food at a time.") : null,
    kids.length
      ? kids.map(kidCard)
      : h("div.empty-state", h("div.huge-emoji", "🧒"), h("p", "Mark your kids as 🧒 Kid in Settings and their sticker charts show up here."),
        h("button.btn.primary", { onclick: () => go("#/settings") }, "⚙️ Settings")),
    ideas.length
      ? h("section.card.stack.try-new",
        h("h2", "Never tried these"),
        h("p.muted.small", "A first taste is a sticker too. Tap \"We ate it\" on Today after dinner."),
        h("div.mini-tiles", ideas.map((d) => h("button.mini-tile", { onclick: () => go(`#/dish/${d.id}`) },
          dishArt(d, { className: "art-mini" }), h("span.mini-name", d.name)))),
      )
      : null,
    state.dishes.size ? null : h("p.muted", "Add some dishes first!"),
  );
}
