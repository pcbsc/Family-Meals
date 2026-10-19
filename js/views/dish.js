// Dish: the recipe card. Photos, hearts and faces, servings that rescale the
// ingredients, and Cook-along: one big step at a time with timers.
import {
  h, toast, confetti, confirmSheet, grownUpCheck, preparePhoto, pickImage, ding, speak, keepScreenOn,
  minutesText, clearChildren,
} from "../ui.js";
import { MEALS, SPICE } from "../seed.js";
import { scaleIngredient, parseIngredient, findTimers } from "../recipe.js";
import { dateKey } from "../planner.js";
import {
  state, updateDish, deleteDish, addPhoto, removePhotoFromDish, photoUrl, go, refresh,
} from "../store.js";
import {
  dishArt, backHeader, stepper, rateSheet, familyFaces, wishFlow, planItSheet, categoryLabel,
} from "../components.js";

function notFound() {
  return h("div.screen", backHeader("Oops", { back: "#/menu" }), h("div.empty-state", h("div.huge-emoji", "🤷"), h("p", "That dish isn't in our menu anymore.")));
}

async function addPhotoFlow(dish, camera) {
  const file = await pickImage({ camera });
  if (!file) return;
  try {
    await addPhoto(dish.id, await preparePhoto(file));
    confetti(["📸", "😋", "⭐"]);
    toast("Yum! Photo added.", { emoji: "📸" });
    refresh();
  } catch {
    toast("That photo didn't work. Try another one.", { emoji: "😕" });
  }
}

function photoStrip(dish) {
  const ids = dish.photoIds || [];
  const strip = h("div.hero");
  if (!ids.length) {
    strip.append(dishArt(dish, { kind: "full", className: "art-hero" }));
  } else {
    const track = h("div.hero-track");
    for (const id of ids) {
      const slide = h("div.hero-slide");
      photoUrl(id, "full").then((url) => url && slide.append(h("img", { src: url, alt: dish.name })));
      slide.append(h("button.icon-btn.photo-x", {
        "aria-label": "Remove this photo",
        onclick: async () => {
          if (!(await grownUpCheck(state.settings.pin))) return;
          if (!(await confirmSheet("Remove this photo?", { yes: "Remove", danger: true }))) return;
          await removePhotoFromDish(dish.id, id);
          refresh();
        },
      }, "🗑️"));
      track.append(slide);
    }
    strip.append(track);
    if (ids.length > 1) strip.append(h("span.hero-count", `${ids.length} photos ▸`));
  }
  strip.append(h("div.hero-buttons",
    h("button.btn.photo-btn", { onclick: () => addPhotoFlow(dish, true) }, "📷 Take photo"),
    h("button.btn.photo-btn", { onclick: () => addPhotoFlow(dish, false) }, "🖼️"),
  ));
  return strip;
}

const servingsMemory = new Map();

export function viewDish({ match }) {
  const dish = state.dishes.get(match[1]);
  if (!dish) return notFound();
  let servings = servingsMemory.get(dish.id) || dish.servings || state.settings.servings || 4;
  const checked = new Set();
  const list = h("ul.ingredients");
  const drawIngredients = () => {
    clearChildren(list);
    const factor = servings / (dish.servings || servings);
    dish.ingredients.forEach((line, i) => {
      const p = parseIngredient(line);
      if (p.header) return list.append(h("li.ing-header", p.item));
      const text = scaleIngredient(line, factor);
      list.append(h(`li.ing${checked.has(i) ? ".done" : ""}`,
        h("button.ing-btn", {
          "aria-pressed": checked.has(i) ? "true" : "false",
          onclick: () => { checked.has(i) ? checked.delete(i) : checked.add(i); drawIngredients(); },
        }, h("span.check", checked.has(i) ? "✓" : ""), h("span", text)),
      ));
    });
  };
  drawIngredients();
  const total = (dish.prepMinutes || 0) + (dish.cookMinutes || 0);
  const meals = MEALS.filter((m) => dish.meals?.includes(m.key));

  return h("div.screen.dish",
    backHeader(dish.name, {
      back: "#/menu",
      right: h("button.icon-btn", {
        "aria-label": "Edit dish",
        onclick: async () => (await grownUpCheck(state.settings.pin)) && go(`#/edit/${dish.id}`),
      }, "✏️"),
    }),
    photoStrip(dish),
    h("div.dish-title",
      h("h1", dish.emoji, " ", dish.name),
      dish.nameKo ? h("p.ko", dish.nameKo) : null,
      dish.description ? h("p.desc", dish.description) : null,
    ),
    h("div.facts",
      total ? h("span.fact", "⏱️ ", minutesText(total)) : null,
      h("span.fact", dish.spicy ? "🌶️".repeat(dish.spicy) + " " : "😊 ", SPICE[dish.spicy || 0]),
      ...meals.map((m) => h("span.fact", m.emoji, " ", m.label)),
      ...(dish.categories || []).filter((c) => c !== "korean").slice(0, 3).map((c) => h("span.fact", categoryLabel(c))),
    ),
    h("div.dish-actions",
      h(`button.action${dish.favorite ? ".on" : ""}`, {
        "aria-pressed": dish.favorite ? "true" : "false",
        onclick: async () => {
          await updateDish(dish.id, { favorite: !dish.favorite });
          if (!dish.favorite) confetti(["❤️", "💖", "⭐"]);
          refresh();
        },
      }, h("span.action-emoji", dish.favorite ? "❤️" : "🤍"), "Favorite"),
      h("button.action", { onclick: () => rateSheet(dish) }, h("span.action-emoji", "⭐"), "Rate"),
      h("button.action", { onclick: () => wishFlow(dish.id) }, h("span.action-emoji", "🙋"), "I want it"),
      h("button.action", { onclick: () => planItSheet(dish) }, h("span.action-emoji", "📅"), "Plan it"),
    ),
    familyFaces(dish),
    h("button.btn.cook.big.wide", { onclick: () => go(`#/cook/${dish.id}?s=${servings}`) }, "👩‍🍳 Cook together"),
    h("section.card",
      h("div.section-head",
        h("h2", "🛒 Ingredients"),
        h("div.servings", h("span.muted", "people"), stepper(servings, {
          label: "Servings",
          max: 40,
          onchange: (n) => { servings = n; servingsMemory.set(dish.id, n); drawIngredients(); },
        })),
      ),
      dish.ingredients.length ? list : h("p.muted", "No ingredients yet."),
    ),
    h("section.card",
      h("h2", "👣 Steps"),
      dish.steps.length
        ? h("ol.steps", dish.steps.map((s) => h("li", s)))
        : h("p.muted", "No steps yet."),
    ),
    dish.notes ? h("section.card.notes", h("h2", "💡 Tips"), h("p", dish.notes)) : null,
    dish.sourceUrl || dish.sourceName
      ? h("p.source", "From ",
        dish.sourceUrl ? h("a", { href: dish.sourceUrl, target: "_blank", rel: "noopener" }, dish.sourceName || new URL(dish.sourceUrl).hostname, " ↗") : dish.sourceName)
      : null,
    dish.timesCooked ? h("p.muted.center", `We've cooked this ${dish.timesCooked} time${dish.timesCooked === 1 ? "" : "s"}! 🎉`) : null,
    h("button.btn.ghost.danger-text.center-btn", {
      onclick: async () => {
        if (!(await grownUpCheck(state.settings.pin))) return;
        if (!(await confirmSheet(`Delete ${dish.name} from our menu? Its photos go too.`, { yes: "Delete", danger: true }))) return;
        await deleteDish(dish.id);
        toast(`${dish.name} was deleted.`, { emoji: "🗑️" });
        go("#/menu", { replace: true });
      },
    }, "🗑️ Delete this dish"),
  );
}

// ---------- Cook-along ----------

const GROWN_UP = /knife|cut |cut\b|slice|chop|dice|mince|grate|boil|fry|oven|sear|blanch|hot|drain|blend|simmer|stove|pan\b|bake|roast|grill|broil|steam|skillet|pot\b/i;

let activeTimer = null;

function timerPill() {
  const pill = h("div.timer-pill", { role: "timer" });
  const tick = () => {
    if (!activeTimer) return pill.remove();
    const left = Math.max(0, Math.round((activeTimer.end - Date.now()) / 1000));
    clearChildren(pill);
    pill.append(
      h("span.timer-time", `⏰ ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`),
      h("button.timer-btn", { onclick: () => { activeTimer.end += 60000; tick(); } }, "+1 min"),
      h("button.timer-btn", { "aria-label": "Stop timer", onclick: () => { clearInterval(activeTimer.id); activeTimer = null; tick(); } }, "✕"),
    );
    if (left === 0) {
      clearInterval(activeTimer.id);
      activeTimer = null;
      ding();
      document.body.classList.add("flash");
      setTimeout(() => document.body.classList.remove("flash"), 1600);
      toast("Time's up!", { emoji: "⏰", ms: 6000 });
      pill.remove();
    }
  };
  return { pill, tick };
}

function startTimer(seconds) {
  if (activeTimer) clearInterval(activeTimer.id);
  document.querySelector(".timer-pill")?.remove();
  const { pill, tick } = timerPill();
  activeTimer = { end: Date.now() + seconds * 1000, id: setInterval(() => tick(), 1000) };
  document.body.append(pill);
  tick();
}

export function viewCook({ match, params, setCleanup }) {
  const dish = state.dishes.get(match[1]);
  if (!dish) return notFound();
  const servings = Number(params.get("s")) || dish.servings || 4;
  const factor = servings / (dish.servings || servings);
  const steps = dish.steps;
  const last = steps.length + 1;
  let index = 0;
  const stage = h("div.cook-stage");
  const dots = h("div.cook-dots");
  const backBtn = h("button.btn.soft.cook-nav", { onclick: () => show(index - 1) }, "◀ Back");
  const nextBtn = h("button.btn.primary.cook-nav.cook-next", { onclick: () => show(index + 1) }, "Next ▶");
  const readBtn = h("button.btn.soft.cook-nav", { "aria-label": "Read it to me", onclick: () => readAloud() }, "🔊");
  const gathered = new Set();

  const readAloud = () => {
    const text = index === 0
      ? "Let's get ready! Gather these: " + dish.ingredients.map((l) => scaleIngredient(l, factor)).join(", ")
      : index === last ? "You did it! Great job!" : `Step ${index}. ${steps[index - 1]}`;
    if (!speak(text)) toast("This device can't read aloud.", { emoji: "🔇" });
  };

  const show = (i) => {
    index = Math.max(0, Math.min(last, i));
    clearChildren(stage);
    clearChildren(dots);
    for (let d = 0; d <= last; d++) dots.append(h(`span${d === index ? ".on" : d < index ? ".done" : ""}`));
    backBtn.disabled = index === 0;
    nextBtn.style.visibility = index === last ? "hidden" : "visible";
    nextBtn.textContent = index === last - 1 ? "Finish 🎉" : index === 0 ? "Let's cook ▶" : "Next ▶";
    if (index === 0) {
      const lines = dish.ingredients.map((l, n) => ({ line: l, n })).filter(({ line }) => !parseIngredient(line).header);
      stage.append(
        h("h2.cook-title", "🧺 Get ready!"),
        h("p.cook-sub", `Gather everything for ${servings} people. Tap each one when you have it.`),
        h("ul.gather", lines.map(({ line, n }) => {
          const li = h(`li${gathered.has(n) ? ".done" : ""}`,
            h("button.ing-btn", {
              onclick: () => {
                gathered.has(n) ? gathered.delete(n) : gathered.add(n);
                li.classList.toggle("done");
                li.querySelector(".check").textContent = gathered.has(n) ? "✓" : "";
              },
            }, h("span.check", gathered.has(n) ? "✓" : ""), h("span", scaleIngredient(line, factor))));
          return li;
        })),
      );
    } else if (index === last) {
      confetti();
      updateDish(dish.id, { timesCooked: (dish.timesCooked || 0) + 1, lastCooked: dateKey(new Date()) });
      stage.append(
        h("div.huge-emoji.center", "🎉"),
        h("h2.cook-title.center", "You did it!"),
        h("p.cook-sub.center", "Great cooking, chefs! Take a picture before you eat it?"),
        h("div.button-list",
          h("button.btn.primary.big", {
            onclick: async () => {
              const file = await pickImage({ camera: true });
              if (file) {
                await addPhoto(dish.id, await preparePhoto(file));
                toast("Photo saved!", { emoji: "📸" });
              }
            },
          }, "📷 Take a picture"),
          h("button.btn.soft.big", { onclick: () => rateSheet(dish) }, "⭐ How was it?"),
          h("button.btn.ghost", { onclick: () => go(`#/dish/${dish.id}`, { replace: true }) }, "Back to the recipe"),
        ),
      );
    } else {
      const text = steps[index - 1];
      const timers = findTimers(text);
      stage.append(...[
        h("div.step-num", index),
        h("p.step-text", text),
        GROWN_UP.test(text) ? h("p.grown-up", "🧑 A grown-up helps with this step") : null,
        timers.length
          ? h("div.row.wrap.center", timers.map((t) =>
            h("button.btn.timer-start", { onclick: () => startTimer(t.seconds) }, `⏰ Start ${t.label} timer`)))
          : null,
      ].filter(Boolean));
    }
  };

  // Swipe left/right to change steps.
  let startX = null;
  stage.addEventListener("pointerdown", (e) => (startX = e.clientX));
  stage.addEventListener("pointerup", (e) => {
    if (startX == null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 70) show(index + (dx < 0 ? 1 : -1));
  });

  keepScreenOn(true);
  setCleanup(() => {
    keepScreenOn(false);
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  });
  show(0);
  return h("div.screen.cook",
    h("header.cook-top",
      h("button.icon-btn", { "aria-label": "Stop cooking", onclick: () => go(`#/dish/${dish.id}`, { replace: true }) }, "✕"),
      h("div.cook-name", dish.emoji, " ", dish.name),
      h("span.spacer-36"),
    ),
    dots,
    stage,
    h("div.cook-bar", backBtn, readBtn, nextBtn),
  );
}

