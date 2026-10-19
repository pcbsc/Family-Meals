// Today: the home screen kids see first. Today's meals, a "pick tonight's
// dinner" game when a grown-up set choices, "how was last night?", and wishes.
import { h, confetti, toast, prettyDate, once } from "../ui.js";
import { dateKey, addDays } from "../planner.js";
import { state, enabledMeals, getSlot, slotDishes, saveSlot, setSlotDishes, go, refresh, saveSettings } from "../store.js";
import { grownUp, dishArt, dishTile, rateSheet, wishFlow, pickDishes } from "../components.js";

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
      h("span.meal-label", meal.emoji, " ", meal.label),
      h("span.meal-empty", kidsChoosing ? "🧒 Kids are choosing!" : "➕ Tap to pick"),
    );
  }
  const [first] = items;
  return h("button.meal-card", { style: { "--meal": meal.color }, onclick: () => go(`#/dish/${first.dish.id}`) },
    dishArt(first.dish, { kind: "full", className: "art-meal" }),
    h("span.meal-label", meal.emoji, " ", meal.label),
    h("span.meal-name", first.dish.name),
    items.length > 1 ? h("span.meal-more", "with " + items.slice(1).map((i) => i.dish.name).join(", ")) : null,
  );
}

/** The day's other meals, small. */
function mealRow(date, meal) {
  const slot = getSlot(dateKey(date), meal.key);
  const items = slotDishes(slot);
  const kidsChoosing = !items.length && slot?.choices?.length;
  return h("button.meal-row", {
    style: { "--meal": meal.color },
    onclick: () => (items.length
      ? go(`#/dish/${items[0].dish.id}`)
      : kidsChoosing ? document.querySelector(".kid-choice")?.scrollIntoView({ behavior: "smooth" }) : pickFor(date, meal)),
  },
    items.length ? dishArt(items[0].dish, { className: "art-sm" }) : h("span.meal-row-emoji", meal.emoji),
    h("span.meal-row-text",
      h("span.meal-label", meal.label),
      items.length
        ? h("span.meal-name", items.map((i) => i.dish.name).join(" + "))
        : h("span.meal-empty", kidsChoosing ? "🧒 Kids are choosing" : "➕ Pick"),
    ),
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

function lastNight() {
  const yesterday = dateKey(addDays(new Date(), -1));
  const slot = getSlot(yesterday, "dinner");
  const items = slotDishes(slot);
  if (!items.length || slot.rated) return null;
  const dish = items[0].dish;
  const markDone = async () => {
    await saveSlot({ ...slot, rated: true });
    refresh();
  };
  return h("section.card.last-night",
    dishArt(dish, { className: "art-sm" }),
    h("div.grow",
      h("h3", `How was the ${dish.name} last night?`),
      h("div.row",
        h("button.btn.primary", { onclick: () => rateSheet(dish, { onDone: markDone }) }, "⭐ Rate it"),
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
    h("header.top",
      h("div", h("h1", `${hello}! 👋`), h("p.muted.date", prettyDate(now))),
      h("button.icon-btn.gear", { "aria-label": "Settings (grown-ups)", onclick: () => go("#/settings") }, "⚙️"),
    ),
    kidChoices(now),
    lastNight(),
    h("div.meal-cards",
      mealCard(now, upNext),
      h("div.meal-rows", meals.filter((m) => m !== upNext).map((m) => mealRow(now, m))),
    ),
    h("button.btn.big.wish.wide", { onclick: () => wishFlow() }, "🙋 I want to eat…"),
    grownUpBanners(),
  );
}
