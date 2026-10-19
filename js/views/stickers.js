// Brave Bites: a sticker chart for trying new foods. Every dish a kid tries and
// rates gives them a sticker; a full row of ten earns a prize (they pick a dinner!).
import { h } from "../ui.js";
import { state, members, stickersFor, STICKERS_PER_PRIZE, dishList, go } from "../store.js";
import { backHeader, dishTile } from "../components.js";

/** A few dishes this kid hasn't tried yet, kid favorites first. */
function toTry(memberId) {
  return dishList()
    .filter((d) => d.ratings?.[memberId] == null && !(d.categories || []).includes("side"))
    .map((d) => ({ d, score: ((d.categories || []).includes("kid-favorite") ? 2 : 0) + Math.random() }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
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
      ? h("button.sticker", { "aria-label": `${s.sticker} for trying ${s.dish.name}`, onclick: () => go(`#/dish/${s.dish.id}`) },
        h("span.sticker-emoji", s.sticker), h("span.sticker-name", s.dish.name))
      : h("span.sticker.empty", { "aria-hidden": "true" }, i + 1));
  }
  const ideas = toTry(kid.id);
  return h("section.card.stack.kid-stickers",
    h("div.row",
      h("span.avatar.lg", kid.avatar),
      h("div.grow", h("h2", kid.name), h("p.muted", `${mine.length} sticker${mine.length === 1 ? "" : "s"}`)),
      prizes ? h("span.prize", "🏆".repeat(Math.min(prizes, 5)), prizes > 5 ? ` ×${prizes}` : "") : null,
    ),
    h("div.sticker-grid", slots),
    h("p.big-text.center", left === STICKERS_PER_PRIZE && prizes
      ? "🎉 Prize time! Pick a dinner this week. Then a new row starts."
      : `${left} more for a prize: you pick a dinner! 🏆`),
    ideas.length ? h("h3", "😋 Try something new") : null,
    ideas.length ? h("div.tile-grid", ideas.map((d) => dishTile(d, { onclick: () => go(`#/dish/${d.id}`) }))) : null,
  );
}

export function viewStickers() {
  const kids = members().filter((m) => m.kid);
  return h("div.screen.stickers",
    backHeader("🏅 Brave Bites", { back: "#/today" }),
    h("div.row.brave-intro",
      h("img.mascot.small", { src: "img/mascot.png", alt: "" }),
      h("p.big-text.grow", "Try a food and rate it with your face. You get a sticker for every new one!"),
    ),
    kids.length
      ? kids.map(kidCard)
      : h("div.empty-state", h("div.huge-emoji", "🧒"), h("p", "Mark your kids as 🧒 Kid in Settings and their sticker charts show up here."),
        h("button.btn.primary", { onclick: () => go("#/settings") }, "⚙️ Settings")),
    state.dishes.size ? null : h("p.muted", "Add some dishes first!"),
  );
}
