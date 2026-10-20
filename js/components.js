// Pieces used on several screens: dish pictures and tiles, the dish picker,
// rating faces, the "I want…" wish flow, plan-it, and the Claude progress view.
import { h, openSheet, toast, confetti, colorFor, clearChildren, prettyDate, grownUpCheck, once } from "./ui.js";
import { MEALS, FACES } from "./seed.js";
import { dateKey, addDays, isFavorite } from "./planner.js";
import { foodsIn } from "./recipe.js";
import {
  state, members, memberById, enabledMeals, dishList, rating, rateDish, photoUrl, getSlot,
  setSlotDishes, slotDishes, addWish, saveSettings, go, refresh, snapshotSlots, restoreSlots, addBraveTry, foodWarnings,
} from "./store.js";

/** Asks for the grown-up PIN if one is set. A forgotten PIN can be reset by answering a sum. */
export function grownUp() {
  return grownUpCheck(state.settings.pin, { onReset: () => saveSettings({ pin: "" }) });
}

export function faceFor(score) {
  if (score == null) return null;
  return FACES.reduce((best, f) => (Math.abs(f.score - score) < Math.abs(best.score - score) ? f : best));
}

/** The dish's photo, its web image, or a big emoji on a soft color. */
export function dishArt(dish, { kind = "thumb", className = "" } = {}) {
  const box = h(`div.art${className ? "." + className : ""}`, { style: { background: colorFor(dish?.name) } });
  const emoji = h("span.art-emoji", { "aria-hidden": "true" }, dish?.emoji || "🍽️");
  box.append(emoji);
  const photoId = dish?.photoIds?.[0];
  const showImg = (src) => {
    const img = h("img", { alt: "", loading: "lazy", decoding: "async" });
    img.onload = () => {
      emoji.remove();
      box.classList.add("has-photo");
    };
    img.onerror = () => img.remove();
    img.src = src;
    box.append(img);
  };
  if (photoId) photoUrl(photoId, kind).then((u) => u && showImg(u));
  else if (dish?.imageUrl) showImg(dish.imageUrl);
  return box;
}

/** A picture from the Canva design (img/canva/<name>.png). They're decoration, so no alt text. */
export function icon(name, className = "") {
  return h(`img.icon${className ? "." + className : ""}`, { src: `img/canva/${name}.png`, alt: "", "aria-hidden": "true", decoding: "async" });
}

const MEAL_ICONS = { breakfast: "meal-breakfast", lunch: "meal-lunch", dinner: "meal-dinner" };

/** The round meal picture: a sunrise for breakfast, a sun for lunch, a dish cover for dinner. */
export function mealIcon(meal) {
  const key = typeof meal === "string" ? meal : meal.key;
  if (MEAL_ICONS[key]) return icon(MEAL_ICONS[key], "meal-icon");
  const m = MEALS.find((x) => x.key === key);
  return h("span.meal-icon.emoji", { "aria-hidden": "true" }, m?.emoji || "🍽️");
}

export function dishTile(dish, { onclick, selected = false, small = false } = {}) {
  const avg = rating(dish);
  const face = faceFor(avg);
  const art = dishArt(dish);
  // The video badge sits on the picture's corner; an allergy in the family, on the other one.
  if (dish.videoUrl && !small) art.append(h("span.tile-video", { "aria-label": "Has a video" }, "▶"));
  const allergy = foodWarnings(dish).allergies;
  if (allergy.length) art.append(h("span.tile-allergy", { title: allergy.map((a) => `${a.who}: ${a.food}`).join(", "), "aria-label": `Allergy: ${allergy.map((a) => `${a.who} (${a.food})`).join(", ")}` }, "⚠️"));
  return h(`button.tile${small ? ".small" : ""}${selected ? ".selected" : ""}`, { type: "button", onclick },
    art,
    isFavorite(dish) ? h("span.tile-heart", { "aria-label": "Family favorite" }, "❤️") : null,
    selected ? h("span.tile-check", "✓") : null,
    h("span.tile-name", dish.name),
    dish.nameKo ? h("span.tile-ko", dish.nameKo) : null,
    face && !small ? h("span.tile-face", { title: face.label }, face.emoji) : null,
  );
}

export function backHeader(title, { back = "#/today", right = null } = {}) {
  return h("header.top.sub",
    h("button.icon-btn.back", {
      "aria-label": "Back",
      // Go back if we came from inside the app; otherwise (opened from a shortcut) go somewhere sensible.
      onclick: () => (state.navCount > 1 ? history.back() : go(back)),
    }, "◀"),
    title ? h("h1.sub-title", title) : h("span.grow"),
    right || h("span.spacer-36"),
  );
}

export function stepper(value, { min = 1, max = 30, onchange, label = "" }) {
  let v = value;
  const num = h("span.stepper-num", String(v));
  const set = (n) => {
    v = Math.max(min, Math.min(max, n));
    num.textContent = String(v);
    onchange?.(v);
  };
  return h("div.stepper", { role: "group", "aria-label": label },
    h("button.step-btn", { type: "button", "aria-label": "Less", onclick: () => set(v - 1) }, "−"),
    num,
    h("button.step-btn", { type: "button", "aria-label": "More", onclick: () => set(v + 1) }, "+"),
  );
}

export function chip(label, { on = false, onclick, emoji = "" } = {}) {
  return h(`button.chip${on ? ".on" : ""}`, { type: "button", "aria-pressed": on ? "true" : "false", onclick },
    emoji ? h("span.chip-emoji", emoji) : null, label);
}

// ---------- Rating ----------

/** Gives a kid a Brave Bites sticker for trying a dish, with a cheer. Returns whether they got one. */
export async function braveBite(kid, dish, { meal = "", onSee } = {}) {
  const got = await addBraveTry(kid.id, dish.id, { meal });
  if (!got) return false;
  confetti([got.sticker.emoji, "🏅", "⭐"]);
  toast(`Brave Bite! ${kid.name} got a ${got.sticker.emoji} ${got.sticker.name} sticker for trying ${dish.name}.`, {
    emoji: "🏅", ms: 4000, action: { label: "See stickers", onclick: () => { onSee?.(); go("#/stickers"); } },
  });
  return true;
}

/** Faces for each person. A kid's first face asks "first time?", and saying yes is a sticker. */
export function rateRows(dish, { meal = "", onSee } = {}) {
  const box = h("div.stack");
  const firsts = new Set();
  const draw = () => {
    clearChildren(box);
    box.append(...members().map((m) => {
      const current = state.dishes.get(dish.id)?.ratings?.[m.id];
      return h("div.rate-row",
        h("span.rate-who", h("span.avatar", m.avatar), h("span", m.name)),
        h("div.faces", FACES.map((f) =>
          h(`button.face${current === f.score ? ".on" : ""}`, {
            type: "button",
            "aria-label": `${m.name}: ${f.label}`,
            onclick: async () => {
              if (await rateDish(dish.id, m.id, f.score)) firsts.add(m.id);
              if (f.score === 4) confetti(["😍", "❤️", "⭐", "🎉"]);
              draw();
            },
          }, f.emoji),
        )),
        firsts.has(m.id)
          ? h("button.btn.soft.small.first-try", {
            onclick: once(async (e) => {
              firsts.delete(m.id);
              e.currentTarget.remove();
              await braveBite(m, dish, { meal, onSee });
            }),
          }, `🏅 First time ${m.name} tried it? Sticker!`)
          : null,
      );
    }));
  };
  draw();
  return box;
}

export function rateSheet(dish, { onDone } = {}) {
  openSheet((close) => h("div.stack",
    h("div.rate-head", dishArt(dish, { className: "art-sm" }), h("div", h("h3", dish.name), h("p.muted", "Tap your face!"))),
    rateRows(dish, { onSee: () => close() }),
    h("button.btn.primary.wide", { onclick: () => close() }, "Done"),
  ), { title: "How do we like it?", onClose: () => { onDone?.(); refresh(); } });
}

/** Red for an allergy, soft for a dislike: "Dad doesn't like mushrooms: serve them on the side". */
export function foodWarningBox(dish) {
  const { allergies, dislikes } = foodWarnings(dish);
  if (!allergies.length && !dislikes.length) return null;
  const byWho = (list) => [...new Set(list.map((x) => x.who))].map((who) => ({ who, foods: list.filter((x) => x.who === who).map((x) => x.food) }));
  return h("div.food-warnings",
    byWho(allergies).map(({ who, foods }) => h("p.allergy-warning", { role: "alert" }, `⚠️ Allergy: ${who} can't have ${foods.join(" or ")}. Check every ingredient and sauce.`)),
    byWho(dislikes).map(({ who, foods }) => h("p.dislike-note", `🙅 ${who} doesn't like ${foods.join(" or ")}: leave it out of their plate, or serve it on the side.`)),
  );
}

export function familyFaces(dish) {
  const rated = members().filter((m) => dish.ratings?.[m.id]);
  if (!rated.length) return null;
  return h("div.family-faces", rated.map((m) =>
    h("span.ff", { title: `${m.name}: ${faceFor(dish.ratings[m.id]).label}` }, h("span.avatar", m.avatar), faceFor(dish.ratings[m.id]).emoji),
  ));
}

// ---------- Dish picker ----------

/**
 * Sheet for choosing dishes. multi=true lets kids' choices pick 2-3.
 * onPick(ids) runs after the sheet closes.
 */
export function pickDishes({ meal, multi = false, title = "Pick a dish", max = 3, onPick }) {
  let filter = meal ? "meal" : "all";
  let query = "";
  const picked = [];
  openSheet((close) => {
    const grid = h("div.tile-grid");
    const doneBtn = multi ? h("button.btn.primary.wide", { disabled: true }, "Done") : null;
    const chips = h("div.chips.scroll");
    const fits = (d) => {
      if (filter === "meal") return (d.meals?.length ? d.meals : ["dinner"]).includes(meal);
      if (filter === "fav") return isFavorite(d);
      return true;
    };
    const finish = async (ids) => {
      await close();
      onPick(ids);
    };
    const drawChips = () => {
      clearChildren(chips);
      const m = MEALS.find((x) => x.key === meal);
      if (m) chips.append(chip(`For ${m.label.toLowerCase()}`, { emoji: m.emoji, on: filter === "meal", onclick: () => { filter = "meal"; draw(); } }));
      chips.append(
        chip("Favorites", { emoji: "❤️", on: filter === "fav", onclick: () => { filter = "fav"; draw(); } }),
        chip("Everything", { emoji: "📖", on: filter === "all", onclick: () => { filter = "all"; draw(); } }),
      );
    };
    const draw = () => {
      drawChips();
      clearChildren(grid);
      const q = query.trim().toLowerCase();
      const list = dishList()
        .filter(fits)
        .filter((d) => !q || d.name.toLowerCase().includes(q) || (d.nameKo || "").includes(q))
        .sort((a, b) => Number(isFavorite(b)) - Number(isFavorite(a)) || a.name.localeCompare(b.name));
      if (!list.length) grid.append(h("p.muted.center.pad", "No dishes here yet."));
      for (const d of list) {
        grid.append(dishTile(d, {
          small: true,
          selected: picked.includes(d.id),
          onclick: () => {
            if (!multi) return finish([d.id]);
            const i = picked.indexOf(d.id);
            if (i >= 0) picked.splice(i, 1);
            else if (picked.length < max) picked.push(d.id);
            doneBtn.disabled = picked.length < 2;
            doneBtn.textContent = picked.length ? `Done (${picked.length} picked)` : "Done";
            draw();
          },
        }));
      }
    };
    const surprise = () => {
      const pool = dishList().filter(fits);
      if (!pool.length) return;
      const weighted = pool.flatMap((d) => (isFavorite(d) ? [d, d, d] : [d]));
      finish([weighted[Math.floor(Math.random() * weighted.length)].id]);
    };
    if (doneBtn) doneBtn.onclick = () => finish([...picked]);
    draw();
    return h("div.stack",
      multi ? h("p.muted", `Pick 2 or ${max} dishes. The kids choose one on the Today screen!`) : null,
      h("div.row",
        h("input.search", {
          type: "search", placeholder: "🔍 Search", "aria-label": "Search dishes",
          oninput: (e) => { query = e.target.value; draw(); },
        }),
        multi ? null : h("button.btn.soft", { onclick: surprise }, "🎲 Surprise me"),
      ),
      chips,
      grid,
      doneBtn,
    );
  }, { title, wide: true });
}

// ---------- Wishes ----------

export function wishFlow(presetDishId = null) {
  openSheet((close) => {
    const body = h("div.stack");
    let who = null;
    const save = once(async (wish) => {
      await addWish({ ...wish, memberId: who.id });
      await close();
      confetti(["🙋", "⭐", "💛", "🍚"]);
      toast(`Got it, ${who.name}! The grown-ups will see your wish.`, { emoji: "🙋" });
      refresh();
    });
    const stepWhat = () => {
      clearChildren(body);
      let text = "";
      // A dozen big pictures first: what this kid loves, family favorites, kid favorites.
      const score = (d) => (d.ratings?.[who.id] || 0) * 2 + (isFavorite(d) ? 3 : 0) + ((d.categories || []).includes("kid-favorite") ? 2 : 0)
        - ((d.categories || []).includes("side") ? 4 : 0) - (d.ratings?.[who.id] === 1 ? 10 : 0);
      // Never a dish they're allergic to.
      const all = dishList().filter((d) => !foodsIn(d, who.allergies).length).sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name));
      const grid = h("div.tile-grid.big.wish-grid", all.slice(0, 12).map((d) => dishTile(d, { onclick: () => save({ dishId: d.id }) })));
      const more = h("button.btn.ghost.center-btn", {
        onclick: () => {
          more.remove();
          grid.classList.remove("big");
          grid.append(...all.slice(12).map((d) => dishTile(d, { small: true, onclick: () => save({ dishId: d.id }) })));
        },
      }, `See all ${all.length} dishes`);
      const input = h("input.text", { placeholder: "Type it here (like 'pizza')", "aria-label": "Something new", oninput: (e) => (text = e.target.value) });
      // Saying it is easier than typing for a 7-year-old (where the browser can listen).
      const Listen = window.SpeechRecognition || window.webkitSpeechRecognition;
      const sayBtn = Listen
        ? h("button.btn.soft", {
          "aria-label": "Say it",
          onclick: () => {
            const rec = new Listen();
            rec.lang = "en-US";
            rec.interimResults = false;
            sayBtn.textContent = "👂";
            rec.onresult = (e) => {
              text = e.results[0][0].transcript;
              input.value = text;
            };
            rec.onend = () => (sayBtn.textContent = "🎤");
            rec.onerror = () => toast("I couldn't hear that. Try again, or type it.", { emoji: "👂" });
            rec.start();
          },
        }, "🎤")
        : null;
      body.append(...[
        h("p.big-text", `What do you want to eat, ${who.name}?`),
        grid,
        all.length > 12 ? more : null,
        h("p.muted", "Something new?"),
        h("div.row",
          input,
          sayBtn,
          h("button.btn.primary", { onclick: () => text.trim() && save({ text: text.trim() }) }, "Wish!"),
        ),
      ].filter(Boolean));
    };
    const stepWho = () => {
      clearChildren(body);
      body.append(
        h("p.big-text", "Who's asking?"),
        h("div.avatar-grid", members().map((m) =>
          h("button.avatar-btn", { onclick: () => { who = m; presetDishId ? save({ dishId: presetDishId }) : stepWhat(); } },
            h("span.avatar.xl", m.avatar), h("span", m.name)),
        )),
      );
    };
    stepWho();
    return body;
  }, { title: "🙋 I want to eat…", wide: true });
}

// ---------- Plan it ----------

/** Puts a dish on a day: 2 weeks of days, each with meal buttons. A planned meal asks: swap it, or add it as a side? */
export function planItSheet(dish, { onPlanned } = {}) {
  openSheet((close) => {
    const days = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
    const fits = dish.meals?.length ? dish.meals : ["dinner"];
    const meals = enabledMeals().sort((a, b) => Number(fits.includes(b.key)) - Number(fits.includes(a.key)));
    const body = h("div.stack");
    const dayName = (day, i) => (i === 0 ? "today" : i === 1 ? "tomorrow" : prettyDate(day, { weekday: "long" }));
    const put = async (day, i, m, append) => {
      const snap = snapshotSlots([[day, m.key]]);
      await setSlotDishes(day, m.key, [dish.id], { append });
      await close();
      await onPlanned?.();
      toast(append
        ? `${dish.name} is with ${dayName(day, i)}'s ${m.label.toLowerCase()}.`
        : `${dish.name} is ${dayName(day, i)}'s ${m.label.toLowerCase()}!`, {
        emoji: "📅",
        action: { label: "Undo", onclick: async () => { await restoreSlots(snap); refresh(); } },
      });
      refresh();
    };
    const ask = (day, i, m, filled) => {
      clearChildren(body);
      const names = filled.map((x) => x.dish.name).join(" + ");
      body.append(
        h("p.big-text", `${dayName(day, i).replace(/^./, (c) => c.toUpperCase())}'s ${m.label.toLowerCase()} is ${names}.`),
        h("div.button-list",
          h("button.btn.primary", { onclick: () => put(day, i, m, false) }, `🔄 Have ${dish.name} instead`),
          h("button.btn.soft", { onclick: () => put(day, i, m, true) }, `➕ Add ${dish.name} as a side`),
          h("button.btn.ghost", { onclick: drawDays }, "◀ Pick another day"),
        ),
      );
    };
    const drawDays = () => {
      clearChildren(body);
      body.append(
        h("p.muted", `When should we have ${dish.name}?`),
        ...days.map((day, i) =>
          h("div.plan-day",
            h("span.plan-day-name", i === 0 ? "Today" : i === 1 ? "Tomorrow" : prettyDate(day, { weekday: "short", month: "short", day: "numeric" })),
            h("div.row.wrap", meals.map((m) => {
              const filled = slotDishes(getSlot(dateKey(day), m.key));
              const already = filled.some((x) => x.dish.id === dish.id);
              return h(`button.chip${fits.includes(m.key) ? ".suggest" : ""}${already ? ".on" : ""}`, {
                "aria-label": `${m.label} ${dayName(day, i)}${filled.length ? `: ${filled.map((x) => x.dish.name).join(" + ")}` : ""}`,
                onclick: () => (already ? toast(`It's already on ${dayName(day, i)}'s ${m.label.toLowerCase()}.`, { emoji: "👍" })
                  : filled.length ? ask(day, i, m, filled) : put(day, i, m, false)),
              }, m.emoji, " ", m.label, filled.length ? h("span.chip-note", ` · ${filled[0].dish.emoji || "🍽️"}`) : null);
            })),
          ),
        ),
      );
    };
    drawDays();
    return body;
  }, { title: "📅 Plan it" });
}

// ---------- Claude progress ----------

const STATUS = {
  start: ["🤔", "Getting started…"],
  think: ["🤔", "Thinking…"],
  fetch: ["📖", "Reading the recipe page…"],
  search: ["🔍", "Searching the web…"],
  write: ["✍️", "Writing it all down…"],
};

/** A friendly waiting screen. Returns { update(kind), close(), signal }. */
export function progressSheet(title) {
  const controller = new AbortController();
  const line = h("p.big-text.center");
  const seconds = h("p.muted.center");
  const log = h("ul.progress-log");
  let last = null;
  const started = Date.now();
  const timer = setInterval(() => {
    seconds.textContent = `${Math.round((Date.now() - started) / 1000)} seconds`;
  }, 1000);
  const update = (kind) => {
    if (kind === last) return;
    last = kind;
    const [emoji, text] = STATUS[kind] || STATUS.think;
    line.textContent = `${emoji} ${text}`;
    if (kind !== "think") log.append(h("li", `${emoji} ${text}`));
  };
  update("start");
  let finished = false;
  const sheet = openSheet(() =>
    h("div.stack.center",
      h("div.pot", "🍳"),
      line,
      seconds,
      log,
      h("button.btn.soft", { onclick: () => controller.abort() }, "Stop"),
    ),
  { title, onClose: () => { clearInterval(timer); if (!finished) controller.abort(); } });
  return {
    update,
    signal: controller.signal,
    close: () => {
      finished = true;
      clearInterval(timer);
      return sheet.close();
    },
  };
}

export function needKeySheet(what) {
  openSheet((close) =>
    h("div.stack",
      h("div.huge-emoji.center", "✨"),
      h("p.big-text", `${what} uses Claude, an AI helper.`),
      h("p", "A grown-up needs to add a Claude key once in Settings. It takes about 2 minutes."),
      h("button.btn.primary.wide", { onclick: async () => { await close(); go("#/settings"); } }, "⚙️ Go to Settings"),
    ),
  { title: "Ask a grown-up" });
}

export { memberById };
