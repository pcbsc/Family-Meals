// Brave Bites: a sticker chart for trying new foods. Every dish a kid tries and
// rates gives them an animal sticker; a full row of ten earns a prize (they pick
// a dinner!). The look comes from the Canva design.
import { h } from "../ui.js";
import { state, members, stickersFor, STICKERS_PER_PRIZE, dishList, go } from "../store.js";
import { backHeader, dishArt, icon } from "../components.js";

/** A few dishes this kid hasn't tried yet, kid favorites first. */
function toTry(memberId) {
  return dishList()
    .filter((d) => d.ratings?.[memberId] == null && !(d.categories || []).includes("side"))
    .map((d) => ({ d, score: ((d.categories || []).includes("kid-favorite") ? 2 : 0) + Math.random() }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.d);
}

function kidCard(kid) {
  const mine = stickersFor(kid.id);
  const prizes = Math.floor(mine.length / STICKERS_PER_PRIZE);
  const row = mine.slice(prizes * STICKERS_PER_PRIZE);
  const left = STICKERS_PER_PRIZE - row.length;
  const slots = [];
  for (let i = 0; i < STICKERS_PER_PRIZE; i++) {
    const s = row[i];
    slots.push(s
      ? h("button.sticker", { "aria-label": `${s.sticker.name} sticker for trying ${s.dish.name}`, onclick: () => go(`#/dish/${s.dish.id}`) },
        icon(`sticker-${s.sticker.key}`, "sticker-img"), h("span.sticker-name", s.dish.name))
      : h("span.sticker.empty", { "aria-hidden": "true" }, h("span.sticker-num", i + 1)));
  }
  return h("section.card.stack.kid-stickers",
    h("div.kid-head",
      h("span.kid-face", kid.avatar),
      h("h2.grow", kid.name),
      h("span.star-badge", { "aria-label": `${mine.length} sticker${mine.length === 1 ? "" : "s"}` }, icon("star-gold"), h("span", String(mine.length))),
    ),
    h("div.sticker-grid", slots),
    h("div.prize-bar",
      icon("trophy", "prize-trophy"),
      left === STICKERS_PER_PRIZE && prizes
        ? h("p", h("span.block", "Prize time! 🎉"), h("strong", "Pick a dinner this week!"))
        : h("p", h("span.block", `${left} more for a prize:`), h("strong", "you pick a dinner!")),
      prizes ? h("span.prize-count", "🏆".repeat(Math.min(prizes, 3)), prizes > 3 ? ` ×${prizes}` : "") : null,
    ),
  );
}

export function viewStickers() {
  const kids = members().filter((m) => m.kid);
  const ideas = kids.length ? toTry(kids[0].id) : [];
  return h("div.screen.stickers",
    backHeader("Brave Bites", { back: "#/today" }),
    h("div.brave-intro",
      icon("mascot-cheer", "brave-mascot"),
      h("p.brave-call", h("span.block", "Try a new food,"), h("span.block.orange", "get a sticker!")),
    ),
    kids.length
      ? kids.map(kidCard)
      : h("div.empty-state", h("div.huge-emoji", "🧒"), h("p", "Mark your kids as 🧒 Kid in Settings and their sticker charts show up here."),
        h("button.btn.primary", { onclick: () => go("#/settings") }, "⚙️ Settings")),
    ideas.length
      ? h("section.card.stack.try-new",
        h("h2", "Try something new"),
        h("div.mini-tiles", ideas.map((d) => h("button.mini-tile", { onclick: () => go(`#/dish/${d.id}`) },
          dishArt(d, { className: "art-mini" }), h("span.mini-name", d.name)))),
      )
      : null,
    state.dishes.size ? null : h("p.muted", "Add some dishes first!"),
  );
}
