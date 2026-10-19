// Week: seven days of meals. Tap a spot to fill it, let the kids choose,
// fill the week with favorites (no AI), or have Claude plan it.
import { h, openSheet, toast, confetti, confirmSheet, grownUpCheck, clearChildren, prettyDate } from "../ui.js";
import { MEALS } from "../seed.js";
import { dateKey, fromKey, addDays, weekStart, weekDays, fillWithFavorites, isFavorite } from "../planner.js";
import {
  state, enabledMeals, getSlot, slotDishes, saveSlot, setSlotDishes, saveDish, dishList, members, memberById,
  removeWish, wishLabel, planHistory, go, refresh,
} from "../store.js";
import { dishArt, pickDishes, stepper, chip, progressSheet, needKeySheet } from "../components.js";

function currentStart(params) {
  const w = params.get("w");
  return w ? fromKey(w) : weekStart(new Date(), state.settings.weekStartsOn);
}

function rangeText(start) {
  const end = addDays(start, 6);
  const opts = { month: "short", day: "numeric" };
  return `${prettyDate(start, opts)} – ${prettyDate(end, opts)}`;
}

// ---------- One meal spot ----------

function slotSheet(dayKey, meal) {
  const m = MEALS.find((x) => x.key === meal);
  openSheet((close) => {
    const body = h("div.stack");
    const draw = () => {
      clearChildren(body);
      const slot = getSlot(dayKey, meal) || { date: dayKey, meal, items: [], choices: [] };
      const items = slotDishes(slot);
      const choices = (slot.choices || []).map((id) => state.dishes.get(id)).filter(Boolean);
      for (const item of items) {
        body.append(h("div.slot-item",
          h("button.slot-dish", { onclick: async () => { await close(); go(`#/dish/${item.dish.id}`); } },
            dishArt(item.dish, { className: "art-sm" }), h("span.slot-dish-name", item.dish.name)),
          h("div.slot-servings",
            h("span.muted.small", "people"),
            stepper(item.servings || state.settings.servings, {
              label: "Servings",
              onchange: async (n) => {
                const fresh = getSlot(dayKey, meal);
                await saveSlot({ ...fresh, items: fresh.items.map((i) => (i.dishId === item.dishId ? { ...i, servings: n } : i)) });
              },
            }),
          ),
          h("button.icon-btn", {
            "aria-label": `Remove ${item.dish.name}`,
            onclick: async () => {
              const fresh = getSlot(dayKey, meal);
              await saveSlot({ ...fresh, items: fresh.items.filter((i) => i.dishId !== item.dishId) });
              draw();
            },
          }, "✕"),
        ));
      }
      if (!items.length && choices.length) {
        body.append(
          h("p.big-text", "🧒 The kids will choose from:"),
          h("div.row.wrap", choices.map((d) => h("span.peek", `${d.emoji} ${d.name}`))),
          h("button.btn.soft", { onclick: async () => { await saveSlot({ ...slot, choices: [] }); draw(); } }, "Cancel kids' choice"),
        );
      }
      if (!items.length && !choices.length) body.append(h("p.muted", "Nothing planned yet."));
      const pick = (opts) => async () => {
        await close();
        pickDishes(opts);
      };
      body.append(h("div.button-list",
        h("button.btn.primary", {
          onclick: pick({
            meal,
            title: items.length ? "Add a side dish" : `${m.emoji} Pick for ${m.label.toLowerCase()}`,
            onPick: async (ids) => {
              await setSlotDishes(dayKey, meal, ids, { append: true });
              refresh();
            },
          }),
        }, items.length ? "➕ Add a side dish" : "➕ Pick a dish"),
        items.length ? h("button.btn.soft", {
          onclick: pick({
            meal,
            title: "Swap for…",
            onPick: async (ids) => {
              await setSlotDishes(dayKey, meal, ids);
              refresh();
            },
          }),
        }, "🔄 Swap") : null,
        h("button.btn.soft", {
          onclick: pick({
            meal,
            multi: true,
            title: "🧒 Let the kids choose",
            onPick: async (ids) => {
              const fresh = getSlot(dayKey, meal) || { date: dayKey, meal };
              await saveSlot({ ...fresh, items: [], choices: ids });
              toast("The kids can pick on the Today screen!", { emoji: "🧒" });
              refresh();
            },
          }),
        }, "🧒 Let the kids choose"),
        items.length ? h("button.btn.ghost", {
          onclick: async () => {
            await saveSlot({ ...slot, items: [], choices: [] });
            draw();
          },
        }, "🧹 Clear") : null,
      ));
    };
    draw();
    return body;
  }, { title: `${m.emoji} ${m.label} · ${prettyDate(fromKey(dayKey), { weekday: "long", month: "short", day: "numeric" })}`, onClose: refresh });
}

function slotRow(day, meal) {
  const key = dateKey(day);
  const slot = getSlot(key, meal.key);
  const items = slotDishes(slot);
  const choices = slot?.choices?.length || 0;
  return h(`button.slot-row${items.length ? ".filled" : ""}`, { style: { "--meal": meal.color }, onclick: () => slotSheet(key, meal.key) },
    h("span.slot-meal", { title: meal.label }, meal.emoji),
    items.length
      ? [dishArt(items[0].dish, { className: "art-xs" }), h("span.slot-names", items.map((i) => i.dish.name).join(" + "))]
      : h("span.slot-empty", choices ? `🧒 Kids choose (${choices})` : `+ ${meal.label}`),
  );
}

// ---------- Fill & plan ----------

function emptySlots(days, meals, { includePast = false } = {}) {
  const today = dateKey(new Date());
  const out = [];
  for (const day of days) {
    const key = dateKey(day);
    if (!includePast && key < today) continue;
    for (const m of meals) {
      const slot = getSlot(key, m.key);
      if (!slotDishes(slot).length && !slot?.choices?.length) out.push({ date: key, meal: m.key });
    }
  }
  return out;
}

async function fillFavorites(days) {
  const empty = emptySlots(days, enabledMeals());
  if (!empty.length) return toast("Every spot is already filled!", { emoji: "👍" });
  if (!state.dishes.size) return toast("Add some dishes to the menu first.", { emoji: "📖" });
  const recentIds = new Set(planHistory(10).keys());
  const wishes = state.wishes.filter((w) => w.dishId);
  const picks = fillWithFavorites({ dishes: dishList(), empty, wishes, recentIds });
  for (const p of picks) await setSlotDishes(p.date, p.meal, [p.dishId]);
  const planned = new Set(picks.map((p) => p.dishId));
  for (const w of wishes) if (planned.has(w.dishId)) await removeWish(w.id);
  confetti(["🎲", "⭐", "🍚", "🥕"]);
  toast(`Filled ${picks.length} meals with family favorites!`, { emoji: "🎲" });
  refresh();
}

function buildPlanRequest({ slotsToFill, days, note, newIdeas }) {
  const history = planHistory(28);
  const fill = new Set(slotsToFill.map((s) => `${s.date}|${s.meal}`));
  const alreadyPlanned = [];
  for (const day of days) {
    for (const m of MEALS) {
      const key = dateKey(day);
      if (fill.has(`${key}|${m.key}`)) continue;
      const items = slotDishes(getSlot(key, m.key));
      if (items.length) alreadyPlanned.push({ date: key, meal: m.key, dishes: items.map((i) => i.dish.name) });
    }
  }
  const people = members();
  const ratingWords = { 4: "love it", 3: "yummy", 2: "okay", 1: "no thanks" };
  return {
    today: dateKey(new Date()),
    family: {
      people: people.map((p) => ({ name: p.name, kid: !!p.kid })),
      usualServings: state.settings.servings,
    },
    foodNotes: state.settings.foodNotes,
    cuisineMix: state.settings.cuisineMix,
    noteForThisWeek: note,
    newIdeas,
    slotsToFill: slotsToFill.map((s) => ({ ...s, weekday: prettyDate(fromKey(s.date), { weekday: "long" }) })),
    alreadyPlanned,
    wishes: state.wishes.map((w) => ({
      who: memberById(w.memberId)?.name || "someone",
      dishId: w.dishId || undefined,
      wish: wishLabel(w),
    })),
    menu: dishList().map((d) => {
      const ratings = Object.entries(d.ratings || {})
        .map(([mid, score]) => `${memberById(mid)?.name || "someone"}: ${ratingWords[score]}`);
      const h28 = history.get(d.id);
      return {
        id: d.id,
        name: d.name,
        meals: d.meals,
        categories: d.categories,
        spicy: d.spicy,
        favorite: isFavorite(d),
        ratings: ratings.length ? ratings : undefined,
        lastPlanned: h28?.last,
        timesLast4Weeks: h28?.count || 0,
      };
    }),
  };
}

function planSheet(days) {
  if (!state.settings.apiKey) return needKeySheet("Planning the week");
  const meals = new Set(enabledMeals().map((m) => m.key));
  let redo = false;
  let newIdeas = 2;
  let note = "";
  openSheet((close) => {
    const mealChips = h("div.row.wrap");
    const drawMeals = () => {
      clearChildren(mealChips);
      for (const m of enabledMeals()) {
        mealChips.append(chip(m.label, {
          emoji: m.emoji,
          on: meals.has(m.key),
          onclick: () => { meals.has(m.key) ? meals.delete(m.key) : meals.add(m.key); drawMeals(); },
        }));
      }
    };
    drawMeals();
    const modeRow = h("div.row.wrap");
    const drawMode = () => {
      clearChildren(modeRow);
      modeRow.append(
        chip("Only empty spots", { on: !redo, onclick: () => { redo = false; drawMode(); } }),
        chip("Redo the whole week", { on: redo, onclick: () => { redo = true; drawMode(); } }),
      );
    };
    drawMode();
    return h("div.stack",
      h("p", "Claude looks at your menu, your favorites and the kids' wishes, and makes a balanced, healthy week. It can also find new recipes from Seonkyoung Longest and other great cooks."),
      h("label.field-label", "Which meals?"), mealChips,
      h("label.field-label", "Fill in"), modeRow,
      h("label.field-label", "New dishes to try"),
      stepper(newIdeas, { min: 0, max: 5, label: "New dishes", onchange: (n) => (newIdeas = n) }),
      h("label.field-label", { for: "plan-note" }, "Anything special this week?"),
      h("textarea.text#plan-note", {
        rows: 3,
        placeholder: "Busy Wednesday, something quick. Grandma visits Saturday. Use up the chicken.",
        oninput: (e) => (note = e.target.value),
      }),
      h("button.btn.primary.big.wide", {
        onclick: async () => {
          const chosen = enabledMeals().filter((m) => meals.has(m.key));
          if (!chosen.length) return toast("Pick at least one meal.", { emoji: "☝️" });
          const today = dateKey(new Date());
          const slotsToFill = redo
            ? days.filter((d) => dateKey(d) >= today).flatMap((d) => chosen.map((m) => ({ date: dateKey(d), meal: m.key })))
            : emptySlots(days, chosen);
          if (!slotsToFill.length) return toast("Every spot is already filled! Try 'Redo the whole week'.", { emoji: "👍" });
          await close();
          runPlan({ days, slotsToFill, note, newIdeas });
        },
      }, "✨ Make our plan"),
    );
  }, { title: "✨ Plan the week with Claude" });
}

async function runPlan({ days, slotsToFill, note, newIdeas }) {
  const request = buildPlanRequest({ slotsToFill, days, note, newIdeas });
  const progress = progressSheet("✨ Claude is planning…");
  let plan;
  try {
    const { planWeek } = await import("../ai.js");
    plan = await planWeek({
      apiKey: state.settings.apiKey,
      request,
      menuIds: new Set(state.dishes.keys()),
      onProgress: progress.update,
      signal: progress.signal,
    });
  } catch (err) {
    await progress.close();
    if (err.message !== "Stopped.") toast(err.message, { emoji: "😕", ms: 6000 });
    return;
  }
  await progress.close();
  previewPlan(plan, () => runPlan({ days, slotsToFill, note, newIdeas }));
}

function previewPlan(plan, retry) {
  const newByKey = new Map(plan.newDishes.map((n) => [n.key, n.recipe]));
  const describe = (ref) => {
    if (ref.startsWith("new:")) {
      const r = newByKey.get(ref.slice(4));
      return h("span.plan-dish.new", `${r.emoji} ${r.name}`, h("span.new-badge", "✨ NEW"));
    }
    const d = state.dishes.get(ref);
    return h("span.plan-dish", `${d.emoji} ${d.name}`);
  };
  const byDay = new Map();
  for (const s of plan.slots) {
    if (!byDay.has(s.date)) byDay.set(s.date, []);
    byDay.get(s.date).push(s);
  }
  const order = Object.fromEntries(MEALS.map((m, i) => [m.key, i]));
  openSheet((close) =>
    h("div.stack",
      plan.summary ? h("p.big-text", plan.summary) : null,
      ...[...byDay.keys()].sort().map((date) =>
        h("div.preview-day",
          h("h3", prettyDate(fromKey(date), { weekday: "long", month: "short", day: "numeric" })),
          ...byDay.get(date).sort((a, b) => order[a.meal] - order[b.meal]).map((s) => {
            const m = MEALS.find((x) => x.key === s.meal);
            return h("div.preview-slot",
              h("span.preview-meal", m.emoji),
              h("div.grow", h("div.row.wrap.tight", s.dishes.map(describe)), s.why ? h("p.muted.small", s.why) : null),
            );
          }),
        ),
      ),
      plan.newDishes.length
        ? h("div.card.soft-card",
          h("strong", "✨ New dishes to try"),
          h("ul", plan.newDishes.map((n) => h("li", `${n.recipe.emoji} ${n.recipe.name}`, n.recipe.sourceName ? h("span.muted", ` from ${n.recipe.sourceName}`) : null))),
          h("p.muted.small", "They'll be added to your menu."),
        )
        : null,
      h("div.row.wrap",
        h("button.btn.soft", { onclick: async () => { await close(); retry(); } }, "🔁 Try again"),
        h("button.btn.primary.grow", {
          onclick: async () => {
            const ids = new Map();
            for (const [key, recipe] of newByKey) {
              const saved = await saveDish({ ...recipe, addedBy: "claude-plan" });
              ids.set(key, saved.id);
            }
            const planned = new Set();
            for (const s of plan.slots) {
              const dishIds = s.dishes.map((ref) => (ref.startsWith("new:") ? ids.get(ref.slice(4)) : ref)).filter(Boolean);
              dishIds.forEach((id) => planned.add(id));
              await setSlotDishes(s.date, s.meal, dishIds);
            }
            for (const w of state.wishes) if (w.dishId && planned.has(w.dishId)) await removeWish(w.id);
            await close();
            confetti();
            toast("Our week is planned!", { emoji: "✨" });
            refresh();
          },
        }, "✅ Use this plan"),
      ),
    ),
  { title: "Here's the plan!", wide: true });
}

async function copyLastWeek(start) {
  const prevDays = weekDays(addDays(start, -7));
  let copied = 0;
  for (let i = 0; i < 7; i++) {
    for (const m of MEALS) {
      const from = getSlot(dateKey(prevDays[i]), m.key);
      const items = slotDishes(from);
      const target = addDays(start, i);
      if (!items.length || slotDishes(getSlot(dateKey(target), m.key)).length) continue;
      await saveSlot({ date: dateKey(target), meal: m.key, items: from.items, choices: [] });
      copied++;
    }
  }
  toast(copied ? `Copied ${copied} meals from last week.` : "Nothing to copy from last week.", { emoji: "📋" });
  refresh();
}

function moreSheet(start, days) {
  openSheet((close) =>
    h("div.button-list",
      h("button.btn.soft", { onclick: async () => { await close(); copyLastWeek(start); } }, "📋 Copy last week's meals"),
      h("button.btn.soft", { onclick: async () => { await close(); go(`#/shop?w=${dateKey(start)}`); } }, "🛒 Shopping list for this week"),
      h("button.btn.danger", {
        onclick: async () => {
          await close();
          if (!(await grownUpCheck(state.settings.pin))) return;
          if (!(await confirmSheet("Clear every meal this week?", { yes: "Clear the week", danger: true }))) return;
          for (const d of days) for (const m of MEALS) {
            const slot = getSlot(dateKey(d), m.key);
            if (slot) await saveSlot({ ...slot, items: [], choices: [] });
          }
          refresh();
        },
      }, "🧹 Clear this week"),
    ),
  { title: "More" });
}

function wishesBar() {
  if (!state.wishes.length) return null;
  return h("section.card.wishes",
    h("h3", "🙋 Wishes"),
    h("div.row.wrap", state.wishes.map((w) => {
      const who = memberById(w.memberId);
      const dish = w.dishId ? state.dishes.get(w.dishId) : null;
      return h("span.wish-chip",
        h("button.wish-main", {
          onclick: () => (dish ? go(`#/dish/${dish.id}`) : toast(`${who?.name || "Someone"} wished for "${w.text}". Add it from the Menu tab!`, { emoji: "🙋", ms: 4000 })),
        }, `${who?.avatar || "🙂"} ${wishLabel(w)}`),
        h("button.wish-x", { "aria-label": "Remove wish", onclick: async () => { await removeWish(w.id); refresh(); } }, "✕"),
      );
    })),
  );
}

export function viewWeek({ params }) {
  const start = currentStart(params);
  const days = weekDays(start);
  const today = dateKey(new Date());
  const isThisWeek = dateKey(weekStart(new Date(), state.settings.weekStartsOn)) === dateKey(start);
  const meals = enabledMeals();
  return h("div.screen.week",
    h("header.top",
      h("h1", "📅 Our week"),
      h("button.icon-btn", { "aria-label": "More", onclick: () => moreSheet(start, days) }, "⋯"),
    ),
    h("div.week-nav",
      h("button.icon-btn", { "aria-label": "Last week", onclick: () => go(`#/week?w=${dateKey(addDays(start, -7))}`, { replace: true }) }, "◀"),
      h("div.week-range", h("strong", isThisWeek ? "This week" : rangeText(start)), isThisWeek ? h("span.muted", rangeText(start)) : null),
      h("button.icon-btn", { "aria-label": "Next week", onclick: () => go(`#/week?w=${dateKey(addDays(start, 7))}`, { replace: true }) }, "▶"),
    ),
    !isThisWeek ? h("button.btn.ghost.center-btn", { onclick: () => go("#/week", { replace: true }) }, "Back to this week") : null,
    h("div.row.wrap.actions",
      h("button.btn.primary", { onclick: () => planSheet(days) }, "✨ Plan with Claude"),
      h("button.btn.soft", { onclick: () => fillFavorites(days) }, "🎲 Fill with favorites"),
      h("button.btn.soft", { onclick: () => go(`#/shop?w=${dateKey(start)}`) }, "🛒 List"),
    ),
    wishesBar(),
    h("div.week-grid", days.map((day) => {
      const key = dateKey(day);
      return h(`section.day-card${key === today ? ".today" : ""}${key < today ? ".past" : ""}`,
        h("h2.day-name",
          h("span", prettyDate(day, { weekday: "short" })),
          h("span.day-num", day.getDate()),
          key === today ? h("span.today-badge", "Today") : null,
        ),
        meals.map((m) => slotRow(day, m)),
      );
    })),
  );
}
