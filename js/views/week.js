// Week: seven days of meals. Tap a spot to fill it, let the kids choose,
// fill the week with favorites (no AI), or have Claude plan it.
import { h, openSheet, toast, confetti, confirmSheet, clearChildren, prettyDate, once, downloadFile, minutesText } from "../ui.js";
import { MEALS, cuisineOf } from "../seed.js";
import { dateKey, fromKey, addDays, weekStart, weekDays, fillWithFavorites, isFavorite, suggestDishes, weekCalendar } from "../planner.js";
import { keyIngredients } from "../recipe.js";
import {
  state, enabledMeals, getSlot, slotDishes, saveSlot, setSlotDishes, saveDish, dishList, members, memberById,
  removeWish, wishLabel, planHistory, go, refresh, snapshotSlots, snapshotDays, restoreSlots, moveSlot, moveSpots, planLeftovers,
  freezer, planFromFreezer, cookPrefs, lunchInTheWay, copyWeek, haveNames, safeForAll,
} from "../store.js";
import { grownUp, dishArt, pickDishes, stepper, chip, progressSheet, needKeySheet, icon } from "../components.js";

function currentStart(params) {
  const w = params.get("w");
  return w ? fromKey(w) : weekStart(new Date(), state.settings.weekStartsOn);
}

function rangeText(start) {
  const end = addDays(start, 6);
  const opts = { month: "short", day: "numeric" };
  return `${prettyDate(start, opts)} – ${prettyDate(end, opts)}`;
}

const showPast = {};

// ---------- One meal spot ----------

/** Says what changed, with an Undo that puts the spots back. */
function changed(message, snapshot, emoji = "🔄") {
  toast(message, { emoji, action: { label: "Undo", onclick: async () => { await restoreSlots(snapshot); refresh(); } } });
}

const itemBadge = (item) => (item.leftover ? " 🍱" : item.fromFreezer ? " 🧊" : "");

/** Everything you can do with one meal spot: swap, move, leftovers, freezer, kids' choice. */
export function slotSheet(dayKey, meal) {
  const m = MEALS.find((x) => x.key === meal);
  // "More ideas" shows ones we haven't shown yet, until we run out and start over.
  let shown = new Set();
  let ideas = null;
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
            dishArt(item.dish, { className: "art-slot" }),
          ),
          h("div.slot-info",
            h("span.slot-dish-name", item.dish.name, itemBadge(item),
              item.leftover ? h("span.muted.block.small", "Leftovers from yesterday") : null,
              item.fromFreezer ? h("span.muted.block.small", "From the freezer") : null,
              item.extraFor ? h("span.muted.block.small", "Making extra for tomorrow's lunch") : null),
            h("div.slot-servings",
              stepper(item.servings || state.settings.servings, {
                label: "Servings",
                onchange: async (n) => {
                  const fresh = getSlot(dayKey, meal);
                  await saveSlot({ ...fresh, items: fresh.items.map((i) => (i.dishId === item.dishId ? { ...i, servings: n } : i)) });
                },
              }),
              h("span.slot-people", "people"),
            ),
          ),
          h("button.icon-btn", {
            "aria-label": `Remove ${item.dish.name}`,
            onclick: async () => {
              const snap = snapshotSlots([[dayKey, meal]]);
              const fresh = getSlot(dayKey, meal);
              await saveSlot({ ...fresh, items: fresh.items.filter((i) => i.dishId !== item.dishId) });
              changed(`${item.dish.name} was taken off.`, snap, "🗑️");
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

      // One tap to try something else: a few good ideas for this meal.
      const main = items[0]?.dish;
      const planned = new Set(items.map((i) => i.dish.id));
      const suggest = () => {
        const opts = { meal, cuisine: main ? cuisineOf(main) : "", cuisineOf };
        // Ideas never include a dish someone in the family is allergic to.
        const safe = dishList().filter(safeForAll);
        let next = suggestDishes(safe, { ...opts, exclude: new Set([...planned, ...shown]) });
        if (next.length < 4 && shown.size) {
          shown = new Set();
          next = suggestDishes(safe, { ...opts, exclude: planned });
        }
        for (const d of next) shown.add(d.id);
        return next;
      };
      // The same ideas until someone asks for more (or picks one).
      if (!ideas || ideas.some((d) => planned.has(d.id) || !state.dishes.has(d.id))) ideas = suggest();
      if (ideas.length) {
        body.append(h("section.stack.swap-ideas",
          h("div.section-head",
            h("h3", items.length ? "Try something else" : "Ideas"),
            h("button.more-ideas", { onclick: () => { ideas = suggest(); draw(); } }, icon("dice"), "More ideas"),
          ),
          h("div.idea-row", ideas.map((d) => h("button.idea", {
            "aria-label": `${items.length ? "Swap for" : "Pick"} ${d.name}`,
            onclick: async () => {
              const snap = snapshotSlots([[dayKey, meal]]);
              await setSlotDishes(dayKey, meal, [d.id]);
              changed(items.length ? `Swapped for ${d.name}.` : `${d.name} it is!`, snap);
              draw();
            },
          }, dishArt(d, { className: "art-idea" }), h("span.idea-name", d.name)))),
        ));
      }

      // Move it to another day this week (swapping with whatever is there).
      if (items.length || choices.length) {
        const start = weekStart(fromKey(dayKey), state.settings.weekStartsOn);
        const others = weekDays(start).map(dateKey).filter((k) => k !== dayKey && k >= dateKey(new Date()));
        if (others.length) {
          body.append(h("section.stack",
            h("h3", "Move to another day"),
            h("div.day-chips", others.map((k) => h("button.chip.day-chip", {
              onclick: async () => {
                const snap = snapshotSlots(moveSpots(dayKey, k, meal));
                await moveSlot(dayKey, k, meal);
                await close();
                changed(`Moved to ${prettyDate(fromKey(k), { weekday: "long" })}.`, snap, "📆");
                refresh();
              },
            }, prettyDate(fromKey(k), { weekday: "short" }), slotDishes(getSlot(k, meal)).length ? " ⇄" : ""))),
          ));
        }
      }

      const extras = [];
      // Dinner tonight, leftovers tomorrow: cook double and lunch is done.
      if (meal === "dinner" && items.length && !items[0].extraFor) {
        extras.push(h("button.leftover-row", {
          onclick: async () => {
            const tomorrow = addDays(fromKey(dayKey), 1);
            const inTheWay = lunchInTheWay(dayKey);
            if (inTheWay.length && !(await confirmSheet(`Tomorrow's lunch is ${inTheWay.map((i) => i.dish.name).join(" + ")}. Have leftovers instead?`, { yes: "Leftovers instead" }))) return;
            const snap = snapshotSlots([[dayKey, "dinner"], [tomorrow, "lunch"]]);
            await planLeftovers(dayKey, "dinner", items[0].dish.id);
            changed(`Cooking double: tomorrow's lunch is ${items[0].dish.name} leftovers.`, snap, "🍱");
            draw();
          },
        }, icon("lunchbox"), h("span.grow", "Make extra for lunch tomorrow"), h("span.row-go", { "aria-hidden": "true" }, "›")));
      }
      const frozen = freezer();
      if (frozen.length) {
        extras.push(h("section.stack",
          h("h3.with-icon", icon("freezer"), "From the freezer"),
          h("div.row.wrap", frozen.map((f) => {
            const d = state.dishes.get(f.dishId);
            return h("button.chip.freezer-chip", {
              onclick: async () => {
                const snap = snapshotSlots([[dayKey, meal]]);
                await planFromFreezer(dayKey, meal, d.id);
                changed(`${d.name} from the freezer. Nothing to buy!`, snap, "🧊");
                draw();
              },
            }, `${d.emoji} ${d.name} ×${f.meals}`);
          })),
        ));
      }
      const pick = (opts) => async () => {
        await close();
        pickDishes(opts);
      };
      body.append(...extras, h("div.button-list",
        h("button.btn.primary", {
          onclick: pick({
            meal,
            title: items.length ? "Add a side dish" : `${m.emoji} Pick for ${m.label.toLowerCase()}`,
            onPick: async (ids) => {
              await setSlotDishes(dayKey, meal, ids, { append: true });
              refresh();
            },
          }),
        }, items.length ? "➕ Add a side dish" : "📖 Pick from the menu"),
        items.length ? h("button.btn.soft", {
          onclick: pick({
            meal,
            title: "Swap for…",
            onPick: async (ids) => {
              const snap = snapshotSlots([[dayKey, meal]]);
              await setSlotDishes(dayKey, meal, ids);
              changed("Swapped.", snap);
              refresh();
            },
          }),
        }, "📖 Swap from the menu") : null,
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
            const snap = snapshotSlots([[dayKey, meal]]);
            await saveSlot({ ...slot, items: [], choices: [] });
            changed("Cleared.", snap, "🧹");
            draw();
          },
        }, "🧹 Clear") : null,
      ));
    };
    draw();
    return body;
  }, { title: `${m.label} · ${prettyDate(fromKey(dayKey), { weekday: "long" })}`, onClose: refresh });
}

function slotRow(day, meal) {
  const key = dateKey(day);
  const slot = getSlot(key, meal.key);
  const items = slotDishes(slot);
  const choices = slot?.choices?.length || 0;
  return h(`button.slot-row${items.length ? ".filled" : ""}`, { style: { "--meal": meal.color }, onclick: () => slotSheet(key, meal.key) },
    h("span.slot-meal", { title: meal.label }, meal.emoji),
    items.length
      ? [dishArt(items[0].dish, { className: "art-xs" }), h("span.slot-names", items.map((i) => i.dish.name + itemBadge(i)).join(" + "))]
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

async function fillFavoritesNow(days) {
  const empty = emptySlots(days, enabledMeals());
  if (!empty.length) return toast("Every spot is already filled!", { emoji: "👍" });
  if (!state.dishes.size) return toast("Add some dishes to the menu first.", { emoji: "📖" });
  const recentIds = new Set(planHistory(10).keys());
  const wishes = state.wishes.filter((w) => w.dishId);
  // What's already planned this week, so the new dinners balance with it.
  const planned = days.flatMap((d) => MEALS.flatMap((m) => slotDishes(getSlot(dateKey(d), m.key)).map((i) => ({ date: dateKey(d), meal: m.key, dishId: i.dish.id }))));
  const snap = snapshotDays(days);
  const picks = fillWithFavorites({ dishes: dishList().filter(safeForAll), empty, wishes, recentIds, planned, cuisineOf });
  for (const p of picks) await setSlotDishes(p.date, p.meal, p.sideId ? [p.dishId, p.sideId] : [p.dishId]);
  const chosen = new Set(picks.map((p) => p.dishId));
  for (const w of wishes) if (chosen.has(w.dishId)) await removeWish(w.id);
  confetti(["🎲", "⭐", "🍚", "🥕"]);
  changed(`Filled ${picks.length} meals with family favorites!`, snap, "🎲");
  refresh();
}

// A double-tap shouldn't fill the week twice.
const fillFavorites = once(fillFavoritesNow);

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
  const list = (text) => String(text || "").split(/[,;\n]/).map((x) => x.trim()).filter(Boolean);
  return {
    today: dateKey(new Date()),
    family: {
      people: people.map((p) => ({
        name: p.name,
        kid: !!p.kid,
        allergies: list(p.allergies).length ? list(p.allergies) : undefined,
        dislikes: list(p.dislikes).length ? list(p.dislikes) : undefined,
        spice: p.spice || undefined,
      })),
      usualServings: state.settings.servings,
    },
    haveAtHome: haveNames(),
    freezer: freezer().map((f) => ({ dishId: f.dishId, name: state.dishes.get(f.dishId)?.name, meals: f.meals })),
    foodNotes: state.settings.foodNotes,
    cuisineMix: state.settings.cuisineMix,
    spiceLevel: cookPrefs().spice,
    healthyCooking: cookPrefs().healthy,
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
        cuisine: cuisineOf(d),
        categories: d.categories,
        spicy: d.spicy,
        minutes: (d.prepMinutes || 0) + (d.cookMinutes || 0) || undefined,
        mainIngredients: [...keyIngredients(d)].slice(0, 6),
        favorite: isFavorite(d),
        ratings: ratings.length ? ratings : undefined,
        lastPlanned: h28?.last,
        timesLast4Weeks: h28?.count || 0,
      };
    }),
  };
}

/** The one "fill the week" button: favorites (instant, free) or Claude. */
function fillSheet(days) {
  openSheet((close) =>
    h("div.button-list",
      h("button.choice-btn", { onclick: async () => { await close(); fillFavorites(days); } },
        h("span.add-emoji", "🎲"),
        h("span.grow", h("strong", "Use our favorites"), h("span.muted.block", "Fills the empty spots right away. Free."))),
      h("button.choice-btn", { onclick: async () => { await close(); planSheet(days); } },
        h("span.add-emoji", "✨"),
        h("span.grow", h("strong", "Ask Claude"), h("span.muted.block", "A healthy, balanced week, plus new recipes to try."))),
    ),
  { title: "Fill our week" });
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
        onclick: once(async () => {
          const chosen = enabledMeals().filter((m) => meals.has(m.key));
          if (!chosen.length) return toast("Pick at least one meal.", { emoji: "☝️" });
          const today = dateKey(new Date());
          const slotsToFill = redo
            ? days.filter((d) => dateKey(d) >= today).flatMap((d) => chosen.map((m) => ({ date: dateKey(d), meal: m.key })))
            : emptySlots(days, chosen);
          if (!slotsToFill.length) return toast("Every spot is already filled! Try 'Redo the whole week'.", { emoji: "👍" });
          await close();
          runPlan({ days, slotsToFill, note, newIdeas });
        }),
      }, "✨ Make our plan"),
    );
  }, { title: "✨ Plan the week with Claude" });
}

let planning = false;

async function runPlan(options) {
  if (planning) return;
  planning = true;
  try {
    await planOnce(options);
  } finally {
    planning = false;
  }
}

async function planOnce({ days, slotsToFill, note, newIdeas }) {
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
          // Once only: a second tap would add Claude's new dishes to the menu twice.
          onclick: once(async () => {
            const ids = new Map();
            for (const [key, recipe] of newByKey) {
              const saved = await saveDish({ ...recipe, addedBy: "claude-plan" });
              ids.set(key, saved.id);
            }
            const snap = snapshotSlots(plan.slots.map((s) => [s.date, s.meal]));
            const planned = new Set();
            for (const s of plan.slots) {
              const dishIds = s.dishes.map((ref) => (ref.startsWith("new:") ? ids.get(ref.slice(4)) : ref)).filter(Boolean);
              dishIds.forEach((id) => planned.add(id));
              // Claude picked a freezer meal for a busy night: take it from the freezer, nothing to buy.
              if (/^from the freezer/i.test(s.why || "") && dishIds.length === 1 && freezer().some((f) => f.dishId === dishIds[0])) {
                await planFromFreezer(s.date, s.meal, dishIds[0]);
              } else {
                await setSlotDishes(s.date, s.meal, dishIds);
              }
            }
            for (const w of state.wishes) if (w.dishId && planned.has(w.dishId)) await removeWish(w.id);
            await close();
            confetti();
            changed("Our week is planned!", snap, "✨");
            refresh();
          }),
        }, "✅ Use this plan"),
      ),
    ),
  { title: "Here's the plan!", wide: true });
}

async function copyLastWeek(start) {
  const snap = snapshotDays(weekDays(start));
  const copied = await copyWeek(addDays(start, -7), start);
  if (copied) changed(`Copied ${copied} meals from last week.`, snap, "📋");
  else toast("Nothing to copy from last week.", { emoji: "📋" });
  refresh();
}

/** The week's dinners as a calendar file: Google Calendar, Apple Calendar or Outlook can add it. */
async function addToCalendar(days) {
  const today = dateKey(new Date());
  const entries = [];
  for (const d of days) {
    if (dateKey(d) < today) continue;
    const items = slotDishes(getSlot(dateKey(d), "dinner"));
    if (!items.length) continue;
    const [main] = items;
    const minutes = (main.dish.prepMinutes || 0) + (main.dish.cookMinutes || 0);
    entries.push({
      date: d,
      meal: "dinner",
      title: `🍽️ ${items.map((i) => i.dish.name).join(" + ")}`,
      detail: [main.leftover ? "Leftovers from yesterday" : main.fromFreezer ? "From the freezer" : minutes ? `Takes about ${minutesText(minutes)}` : "", "From Family Menu"].filter(Boolean).join("\n"),
    });
  }
  if (!entries.length) return toast("No dinners planned from today on.", { emoji: "📆" });
  const name = `family-menu-dinners-${dateKey(days[0])}.ics`;
  const text = weekCalendar(entries);
  const file = typeof File === "function" ? new File([text], name, { type: "text/calendar" }) : null;
  try {
    if (file && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "Our dinners" });
      return;
    }
  } catch (err) {
    if (err?.name === "AbortError") return;
  }
  downloadFile(name, text, "text/calendar");
  toast(`${entries.length} dinner${entries.length === 1 ? "" : "s"} saved. Open the file to add them to your calendar.`, { emoji: "📆", ms: 5000 });
}

function moreSheet(start, days) {
  openSheet((close) =>
    h("div.button-list",
      h("button.btn.soft", { onclick: async () => { await close(); copyLastWeek(start); } }, "📋 Copy last week's meals"),
      h("button.btn.soft", { onclick: async () => { await close(); go(`#/shop?w=${dateKey(start)}`); } }, "🛒 Shopping list for this week"),
      h("button.btn.soft", { onclick: async () => { await close(); addToCalendar(days); } }, "📆 Put our dinners on the calendar"),
      h("button.btn.danger", {
        onclick: async () => {
          await close();
          if (!(await grownUp())) return;
          if (!(await confirmSheet("Clear every meal this week?", { yes: "Clear the week", danger: true }))) return;
          const snap = snapshotDays(days);
          for (const d of days) for (const m of MEALS) {
            const slot = getSlot(dateKey(d), m.key);
            if (slot) await saveSlot({ ...slot, items: [], choices: [] });
          }
          changed("The week is cleared.", snap, "🧹");
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
  const pastDays = isThisWeek ? days.filter((d) => dateKey(d) < today).length : 0;
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
    h("button.btn.primary.big.wide", { onclick: () => fillSheet(days) }, "✨ Fill our week"),
    // An empty week is one tap from last week's meals.
    days.every((d) => meals.every((m) => !slotDishes(getSlot(dateKey(d), m.key)).length))
      && weekDays(addDays(start, -7)).some((d) => meals.some((m) => slotDishes(getSlot(dateKey(d), m.key)).length))
      ? h("button.btn.soft.wide", { onclick: () => copyLastWeek(start) }, "📋 Same as last week")
      : null,
    wishesBar(),
    // Days already gone this week stay out of the way until asked for.
    pastDays && !showPast[dateKey(start)]
      ? h("button.btn.ghost.center-btn", { onclick: () => { showPast[dateKey(start)] = true; refresh(); } },
        `Show earlier days (${pastDays})`)
      : null,
    h("div.week-grid", days.filter((day) => !pastDays || showPast[dateKey(start)] || dateKey(day) >= today).map((day) => {
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
