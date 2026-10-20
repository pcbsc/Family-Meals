// Today: the home screen kids see first. Today's meals, a "pick tonight's
// dinner" game when a grown-up set choices, "how was last night?", and wishes.
import { h, confetti, toast, prettyDate, once, openSheet, confirmSheet } from "../ui.js";
import { dateKey, addDays } from "../planner.js";
import {
  state, enabledMeals, getSlot, slotDishes, saveSlot, setSlotDishes, go, refresh, saveSettings, members, stickersFor,
  braveFoods, braveKind, triesOf, TRIES_PER_FOOD, updateDish, addToFreezer, leftoversForLunch, lunchInTheWay,
} from "../store.js";
import { grownUp, dishArt, dishTile, wishFlow, pickDishes, icon, mealIcon, rateRows, braveBite } from "../components.js";
import { slotSheet } from "./week.js";
import { usedUp } from "./dish.js";

/**
 * The "Change" pill on a planned meal: swap, move, leftovers… With a grown-up
 * PIN, kids ask for something else instead (the shopping may be done already).
 */
const changeBtn = (date, meal) => h("button.change-pill", {
  "aria-label": `Change ${meal.label.toLowerCase()}`,
  onclick: () => (state.settings.pin ? changeOrAsk(date, meal) : slotSheet(dateKey(date), meal.key)),
}, icon("refresh"), "Change");

function changeOrAsk(date, meal) {
  openSheet((close) => h("div.button-list",
    h("button.choice-btn", { onclick: async () => { await close(); wishFlow(); } },
      h("span.add-emoji", "🙋"),
      h("span.grow", h("strong", "Ask for something else"), h("span.muted.block", "The grown-ups will see your wish."))),
    h("button.choice-btn", {
      onclick: async () => {
        await close();
        if (await grownUp()) slotSheet(dateKey(date), meal.key);
      },
    },
    h("span.add-emoji", "🔒"),
    h("span.grow", h("strong", "Change it"), h("span.muted.block", "For grown-ups: swap, move, leftovers."))),
  ), { title: `Change ${meal.label.toLowerCase()}?` });
}

function pickFor(date, meal) {
  pickDishes({
    meal: meal.key,
    title: `${meal.emoji} ${meal.label} today`,
    onPick: async (ids) => {
      await setSlotDishes(date, meal.key, ids);
      refresh();
    },
  });
}

/** The next meal, big. */
function mealCard(date, meal) {
  const slot = getSlot(dateKey(date), meal.key);
  const items = slotDishes(slot);
  if (!items.length) {
    const kidsChoosing = slot?.choices?.length;
    return h("button.meal-card.empty", {
      style: { "--meal": meal.color },
      onclick: () => (kidsChoosing ? document.querySelector(".kid-choice")?.scrollIntoView({ behavior: "smooth" }) : pickFor(date, meal)),
    },
      h("span.meal-label", mealIcon(meal), meal.label),
      h("span.meal-empty", kidsChoosing ? "🧒 Kids are choosing!" : "➕ Tap to pick"),
    );
  }
  const [first] = items;
  const badge = first.leftover ? "🍱 Leftovers · " : first.fromFreezer ? "🧊 From the freezer · " : "";
  // From the Canva design: words on the left, the food on the right, and a Change pill.
  return h(`div.hero-card.meal-${meal.key}`,
    h("button.hero-main", { onclick: () => go(`#/dish/${first.dish.id}`) },
      dishArt(first.dish, { kind: "full", className: "art-side" }),
      h("span.hero-text",
        h("span.meal-label", mealIcon(meal), meal.label),
        h("span.meal-name", first.dish.name),
        badge || items.length > 1
          ? h("span.meal-more", badge, items.length > 1 ? "with " + items.slice(1).map((i) => i.dish.name).join(", ") : "")
          : null,
      ),
    ),
    changeBtn(date, meal),
  );
}

/** The day's other meals, small. */
function mealRow(date, meal) {
  const slot = getSlot(dateKey(date), meal.key);
  const items = slotDishes(slot);
  const kidsChoosing = !items.length && slot?.choices?.length;
  const row = h(`button.meal-row.meal-${meal.key}${items.length ? ".planned" : ""}`, {
    style: { "--meal": meal.color },
    onclick: () => (items.length
      ? go(`#/dish/${items[0].dish.id}`)
      : kidsChoosing ? document.querySelector(".kid-choice")?.scrollIntoView({ behavior: "smooth" }) : pickFor(date, meal)),
  },
    items.length ? dishArt(items[0].dish, { className: "art-side" }) : null,
    h("span.meal-row-text",
      h("span.meal-label", mealIcon(meal), meal.label),
      items.length
        ? h("span.meal-name", items.map((i) => i.dish.name).join(" + "))
        : h("span.meal-empty", kidsChoosing ? "🧒 Kids are choosing" : "➕ Pick"),
    ),
    items.length ? null : h("span.meal-row-go", { "aria-hidden": "true" }, "›"),
  );
  return items.length ? h("div.meal-row-wrap", row, changeBtn(date, meal)) : row;
}

/** Brave Bites: each kid's sticker count, one tap to the chart. */
function braveBites() {
  const kids = members().filter((m) => m.kid);
  if (!kids.length || !state.dishes.size) return null;
  return h("button.card.brave", { onclick: () => go("#/stickers") },
    icon("medal", "brave-medal"),
    h("span.brave-title", "Brave", h("br"), "Bites"),
    h("span.brave-kids", kids.slice(0, 4).map((k, i) => h(`span.brave-kid.kid-${i % 3}`,
      h("span.brave-face", k.avatar),
      h("span.brave-count", String(stickersFor(k.id).length), icon("star-gold", "brave-star")),
    ))),
  );
}

function kidChoices(date) {
  const cards = [];
  for (const meal of enabledMeals()) {
    const slot = getSlot(dateKey(date), meal.key);
    const choices = (slot?.choices || []).map((id) => state.dishes.get(id)).filter(Boolean);
    if (!choices.length || slotDishes(slot).length) continue;
    cards.push(h("section.card.kid-choice",
      h("h2", `${meal.emoji} What should we have for ${meal.label.toLowerCase()}?`),
      h("p.muted", "Pick one!"),
      h("div.tile-grid.big", choices.map((dish) =>
        dishTile(dish, {
          onclick: once(async () => {
            await saveSlot({ ...slot, items: [{ dishId: dish.id, servings: state.settings.servings || 4 }], choices: [] });
            confetti();
            toast(`Yay! ${dish.name} for ${meal.label.toLowerCase()}!`, { emoji: "🎉" });
            refresh();
          }),
        }),
      )),
    ));
  }
  return cards;
}

/** The newest dinner nobody has said "we ate it" for: tonight after 7, or the 3 days before. */
function lastDinner() {
  const now = new Date();
  for (const back of [now.getHours() >= 19 ? 0 : null, 1, 2, 3]) {
    if (back == null) continue;
    const key = dateKey(addDays(now, -back));
    const slot = getSlot(key, "dinner");
    const items = slotDishes(slot);
    if (items.length && !slot.rated) return { key, slot, items, back };
  }
  return null;
}

const whenText = (back, key) => (back === 0 ? "Tonight's" : back === 1 ? "Last night's" : `${prettyDate(new Date(`${key}T12:00`), { weekday: "long" })}'s`);

/**
 * One sheet after dinner: faces, Brave Bites, what got used up, leftovers or
 * the freezer, and a note for next time.
 */
function weAteIt({ key, slot, items, back }) {
  let note = "";
  openSheet((close) => {
    const kids = members().filter((m) => m.kid);
    const braveRows = [];
    for (const kid of kids) {
      for (const { dish } of items) {
        if (!braveFoods(kid.id).includes(dish.id) || !braveKind(kid.id, dish.id, { meal: slot.id })) continue;
        braveRows.push(h("button.btn.cook.wide", {
          onclick: once(async (e) => {
            const btn = e.currentTarget;
            if (await braveBite(kid, dish, { meal: slot.id, onSee: () => close() })) btn.replaceWith(h("p.added.center", `🏅 ${kid.name}: ${triesOf(kid.id, dish.id)} of ${TRIES_PER_FOOD} tries!`));
          }),
        }, `🏅 ${kid.name} tried the ${dish.name}!`));
      }
    }
    const [main] = items;
    return h("div.stack.we-ate",
      ...items.map(({ dish }) => h("section.stack",
        h("div.rate-head", dishArt(dish, { className: "art-sm" }), h("div", h("h3", dish.name), h("p.muted", "Tap your face!"))),
        rateRows(dish, { meal: slot.id, onSee: () => close() }),
      )),
      braveRows.length ? h("section.stack", h("h3", "Brave Bites"), ...braveRows) : null,
      usedUp(main.dish),
      h("section.stack",
        h("h3", "Anything left?"),
        h("div.row.wrap",
          h("button.btn.soft", {
            onclick: once(async (e) => {
              const btn = e.currentTarget;
              const inTheWay = lunchInTheWay(dateKey(new Date()));
              if (inTheWay.length && !(await confirmSheet(`Tomorrow's lunch is ${inTheWay.map((i) => i.dish.name).join(" + ")}. Have leftovers instead?`, { yes: "Leftovers instead" }))) return;
              await leftoversForLunch(main.dish.id);
              btn.replaceWith(h("p.added", "🍱 Lunch tomorrow!"));
            }),
          }, "🍱 Leftovers for lunch tomorrow"),
          h("button.btn.soft", {
            onclick: once(async (e) => {
              const btn = e.currentTarget;
              await addToFreezer(main.dish.id, 1);
              btn.replaceWith(h("p.added", "🧊 In the freezer list!"));
            }),
          }, "🧊 We froze some"),
        ),
      ),
      h("label.field-label", { for: "ate-note" }, "📝 A note for next time"),
      h("input.text#ate-note", { placeholder: "Like: less sugar, kids loved the egg on top", maxlength: 120, oninput: (e) => (note = e.target.value) }),
      h("button.btn.primary.wide", {
        onclick: once(async () => {
          await saveSlot({ ...getSlot(key, "dinner"), rated: true });
          for (const { dish } of items) {
            const fresh = state.dishes.get(dish.id);
            if (!fresh) continue;
            const patch = {};
            // Cooked from the recipe page instead of cook-along still counts.
            if (fresh.lastCooked !== key && !items.find((i) => i.dish.id === dish.id)?.fromFreezer) {
              Object.assign(patch, { timesCooked: (fresh.timesCooked || 0) + 1, lastCooked: key });
            }
            if (note.trim() && dish.id === main.dish.id) patch.lastNote = { date: key, text: note.trim().slice(0, 120) };
            if (Object.keys(patch).length) await updateDish(dish.id, patch);
          }
          await close();
          confetti(["🍽️", "⭐", "😋"]);
          refresh();
        }),
      }, "✅ Done"),
    );
  }, { title: `🍽️ ${whenText(back, key)} dinner`, wide: true });
}

function lastNight() {
  const meal = lastDinner();
  if (!meal) return null;
  const dish = meal.items[0].dish;
  const markDone = async () => {
    await saveSlot({ ...meal.slot, rated: true });
    refresh();
  };
  return h("section.card.last-night",
    dishArt(dish, { className: "art-sm" }),
    h("div.grow",
      h("h3", `${whenText(meal.back, meal.key)} dinner: ${meal.items.map((i) => i.dish.name).join(" + ")}`),
      h("p.muted.small", "How was it? Rate it, Brave Bites, leftovers."),
      h("div.row",
        h("button.btn.primary", { onclick: () => weAteIt(meal) }, "🍽️ We ate it!"),
        h("button.btn.ghost", { onclick: markDone }, "Skip"),
      ),
    ),
  );
}

function grownUpBanners() {
  const out = [];
  if (state.installPrompt) {
    out.push(h("section.card.banner",
      h("span.banner-emoji", "📲"),
      h("div.grow", h("strong", "Put Family Menu on the home screen"), h("p.muted", "It opens like a real app, and Instagram/TikTok can share recipes to it.")),
      h("button.btn.primary", {
        onclick: async () => {
          const prompt = state.installPrompt;
          state.installPrompt = null;
          prompt.prompt();
          await prompt.userChoice.catch(() => null);
          refresh();
        },
      }, "Install"),
    ));
  }
  const last = state.settings.lastBackupAt;
  const month = 30 * 24 * 3600 * 1000;
  // Two weeks in is when a family has recipes and photos worth keeping; no nagging on day one.
  const settledIn = Date.now() - (state.settings.onboardedAt || Date.now()) > 14 * 24 * 3600 * 1000;
  if (settledIn && (!last || Date.now() - last > month) && Date.now() - (state.settings.backupNudgeAt || 0) > 7 * 24 * 3600 * 1000) {
    out.push(h("section.card.banner",
      h("span.banner-emoji", "💾"),
      h("div.grow", h("strong", "Time for a backup"), h("p.muted", "Everything lives on this device. A backup file keeps your recipes and photos safe.")),
      h("div.row",
        h("button.btn.ghost", { onclick: async () => { await saveSettings({ backupNudgeAt: Date.now() }); refresh(); } }, "Later"),
        h("button.btn.soft", {
          onclick: async () => {
            await saveSettings({ backupNudgeAt: Date.now() });
            if (await grownUp()) go("#/settings");
            else refresh();
          },
        }, "Back up"),
      ),
    ));
  }
  return out;
}

export function viewToday() {
  const now = new Date();
  const hour = now.getHours();
  const hello = hour < 11 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  // The next meal is the big card: breakfast in the morning, lunch at midday, then dinner.
  const meals = enabledMeals();
  const upNext = meals.find((m) => m.key === (hour < 10 ? "breakfast" : hour < 14 ? "lunch" : "dinner")) || meals[0];
  return h("div.screen.today",
    h("header.top.today-top",
      h("div.grow", h("h1.hello", `${hello}! `, h("img.inline-icon", { src: hour < 11 ? "img/sun.png" : "img/wave.png", alt: "" })), h("p.muted.date", prettyDate(now))),
      icon("mascot-wave", "today-mascot"),
      h("button.icon-btn.gear", { "aria-label": "Settings (grown-ups)", onclick: () => go("#/settings") }, "⚙️"),
    ),
    kidChoices(now),
    lastNight(),
    h("div.meal-cards",
      mealCard(now, upNext),
      h("div.meal-rows", meals.filter((m) => m !== upNext).map((m) => mealRow(now, m))),
    ),
    h("button.wish-card", { onclick: () => wishFlow() },
      icon("kid-wave", "wish-kid"),
      h("span.wish-text", "I want to eat…"),
      h("span.wish-go", icon("arrow-go")),
    ),
    braveBites(),
    grownUpBanners(),
  );
}
