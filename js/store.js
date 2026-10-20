// The app's data in memory, plus the functions that change it. Every change is
// written to IndexedDB straight away, then the current screen redraws.
import * as db from "./db.js";
import { MEALS, STARTER_DISHES, LATEST_STARTER_BATCH, MILD_TIPS, startersToAdd, starterVideoFills } from "./seed.js";
import { dateKey, fromKey, addDays, slotId, averageRating, weekStart } from "./planner.js";
import { cookedLines, normalizeItemName, aisleFor, foodsIn } from "./recipe.js";

const FOOD_NOTES = "Our kids like some spice (our 7-year-old loves spicy food). Keep a mild way to make spicy dishes.";
const CUISINE_MIX = "Mostly Korean home cooking, Korean-American and Korean fusion favorites (like bulgogi tacos and kimchi quesadillas), plus some American, Italian and Mexican family dinners. Kid-friendly, with healthy choices.";
// Older defaults, replaced when the family never changed them.
const OLD_DEFAULTS = {
  foodNotes: ["Kids like mild (not spicy) food."],
  cuisineMix: ["Mostly healthy Korean home cooking, plus everyday American, Italian and Mexican family favorites."],
};

export const DEFAULT_SETTINGS = {
  onboarded: false,
  members: [],
  servings: 4,
  meals: ["breakfast", "lunch", "dinner", "snack"],
  weekStartsOn: 0,
  foodNotes: FOOD_NOTES,
  cuisineMix: CUISINE_MIX,
  healthy: false,
  spice: "medium",
  metric: false,
  apiKey: "",
  pin: "",
  lastBackupAt: null,
};

export const state = {
  settings: { ...DEFAULT_SETTINGS },
  dishes: new Map(),
  plan: new Map(),
  wishes: [],
  shopping: new Map(),
  draft: null,
  installPrompt: null,
  navCount: 0,
};

let redraw = () => {};
export function setRedraw(fn) {
  redraw = fn;
}
export function refresh() {
  redraw({ keepScroll: true });
}
/** Draws the current screen again from scratch (refresh() leaves forms alone). */
export function redrawScreen() {
  redraw({});
}

export function go(hash, { replace = false } = {}) {
  if (replace) location.replace(hash);
  else location.hash = hash;
}

export async function loadAll() {
  const [settingsRow, dishes, plan, wishes, shopping] = await Promise.all([
    db.get("settings", "main"),
    db.getAll("dishes"),
    db.getAll("plan"),
    db.getAll("wishes"),
    db.getAll("shopping"),
  ]);
  state.settings = { ...DEFAULT_SETTINGS, ...(settingsRow?.value || {}) };
  for (const [key, olds] of Object.entries(OLD_DEFAULTS)) {
    if (olds.includes(state.settings[key])) state.settings[key] = DEFAULT_SETTINGS[key];
  }
  state.dishes = new Map(dishes.map((d) => [d.id, d]));
  state.plan = new Map(plan.map((s) => [s.id, s]));
  state.wishes = wishes.sort((a, b) => a.createdAt - b.createdAt);
  state.shopping = new Map(shopping.map((s) => [s.id, s]));
  // "What we have" from before it kept dates: count it as bought today.
  const at = { ...(state.settings.haveAt || {}) };
  const undated = (state.settings.have || []).filter((n) => at[normalizeItemName(n)] == null);
  if (undated.length) {
    for (const n of undated) at[normalizeItemName(n)] = Date.now();
    await saveSettings({ haveAt: at });
  }
  if (state.settings.onboarded) await keepOldStickers();
}

// ---------- Settings & family ----------

export async function saveSettings(patch) {
  state.settings = { ...state.settings, ...patch };
  await db.put("settings", { key: "main", value: state.settings });
}

const SPICES = ["mild", "medium", "spicy"];

/**
 * How we cook: healthier swaps, spice level, metric. With a dish, its own
 * switches (set on its page) win over the family's way; own says it has some.
 * mildFor names the people who want it mild when it's cooked hotter.
 */
export function cookPrefs(dish = null) {
  const s = state.settings;
  const way = dish?.way || {};
  const spice = [way.spice, s.spice].find((x) => SPICES.includes(x)) || "medium";
  const healthy = typeof way.healthy === "boolean" ? way.healthy : !!s.healthy;
  const mildFor = spice === "mild" ? [] : members().filter((m) => m.spice === "mild").map((m) => m.name);
  return { healthy, spice, metric: !!s.metric, own: typeof way.healthy === "boolean" || SPICES.includes(way.spice), mildFor };
}

/** A dish's ingredients and step notes, cooked our way (see cookedLines). */
export function ourLines(dish) {
  const mildTip = dish?.mildTip || MILD_TIPS[dish?.seedKey] || "";
  return cookedLines({ ...dish, mildTip }, cookPrefs(dish));
}

export function members() {
  return state.settings.members.length
    ? state.settings.members
    : [{ id: "family", name: "Our family", avatar: "👨‍👩‍👧", kid: false }];
}

export function memberById(id) {
  return members().find((m) => m.id === id);
}

/**
 * Who can't or won't eat a dish, from each person's food profile:
 * { allergies: [{ who, food }], dislikes: [{ who, food }] }.
 */
export function foodWarnings(dish) {
  const allergies = [];
  const dislikes = [];
  for (const m of members()) {
    if (m.allergies) for (const x of foodsIn(dish, m.allergies)) allergies.push({ who: m.name, food: x.food });
    if (m.dislikes) for (const x of foodsIn(dish, m.dislikes)) dislikes.push({ who: m.name, food: x.food });
  }
  return { allergies, dislikes };
}

/** No allergy in the family: the fill buttons and ideas only pick these. */
export function safeForAll(dish) {
  return !foodWarnings(dish).allergies.length;
}

export function enabledMeals() {
  return MEALS.filter((m) => state.settings.meals.includes(m.key));
}

// ---------- Dishes ----------

export function dishList() {
  return [...state.dishes.values()];
}

export function blankDish() {
  return {
    name: "", nameKo: "", emoji: "🍽️", description: "", meals: ["dinner"], categories: [],
    servings: state.settings.servings || 4, prepMinutes: 0, cookMinutes: 0, spicy: 0,
    ingredients: [], steps: [], notes: "", sourceName: "", sourceUrl: "", imageUrl: "", videoUrl: "",
  };
}

export async function saveDish(dish) {
  const now = Date.now();
  const full = {
    photoIds: [], favorite: false, ratings: {}, timesCooked: 0, lastCooked: null, createdAt: now,
    ...dish,
    id: dish.id || db.newId("d-"),
    updatedAt: now,
  };
  state.dishes.set(full.id, full);
  await db.put("dishes", full);
  return full;
}

export async function updateDish(id, patch) {
  const dish = state.dishes.get(id);
  if (!dish) return null;
  return saveDish({ ...dish, ...patch });
}

export async function deleteDish(id) {
  const dish = state.dishes.get(id);
  if (!dish) return;
  for (const pid of dish.photoIds || []) await deletePhoto(pid);
  state.dishes.delete(id);
  await db.remove("dishes", id);
  // Take it off the plan and the wish list too.
  for (const slot of [...state.plan.values()]) {
    const items = slot.items.filter((i) => i.dishId !== id);
    const choices = (slot.choices || []).filter((c) => c !== id);
    if (items.length !== slot.items.length || choices.length !== (slot.choices || []).length) {
      await saveSlot({ ...slot, items, choices });
    }
  }
  for (const w of state.wishes.filter((w) => w.dishId === id)) await removeWish(w.id);
}

export async function addStarterDishes(list = STARTER_DISHES) {
  const have = new Set(dishList().map((d) => d.seedKey).filter(Boolean));
  let added = 0;
  for (const { batch, ...seed } of list) {
    if (have.has(seed.seedKey)) continue;
    await saveDish({ description: "", sourceName: "", sourceUrl: "", imageUrl: "", videoUrl: "", ...seed, id: `seed-${seed.seedKey}` });
    added++;
  }
  return added;
}

/**
 * When the app gains new starter recipes, a family using the starter menu gets
 * them once, and their starter dishes get any new videos. Starters they deleted
 * stay deleted, and a video they took off stays off. Returns { added, videos }.
 */
export async function addNewStarters() {
  const s = state.settings;
  if (!s.onboarded || (s.starterBatch ?? 0) >= LATEST_STARTER_BATCH) return { added: 0, videos: 0 };
  const haveSeedKeys = new Set(dishList().map((d) => d.seedKey).filter(Boolean));
  const added = await addStarterDishes(startersToAdd({ starterBatch: s.starterBatch, haveSeedKeys }));
  const fills = starterVideoFills(dishList());
  for (const { id, videoUrl } of fills) await updateDish(id, { videoUrl });
  await saveSettings({ starterBatch: LATEST_STARTER_BATCH });
  return { added, videos: fills.length };
}

export function rating(dish) {
  return averageRating(dish);
}

/** Saves a face. Returns true if it's a kid's first time rating this dish (they may have a first-try sticker coming). */
export async function rateDish(dishId, memberId, score) {
  const dish = state.dishes.get(dishId);
  if (!dish) return false;
  const first = dish.ratings?.[memberId] == null;
  await updateDish(dishId, {
    ratings: { ...(dish.ratings || {}), [memberId]: score },
    ratedAt: { ...(dish.ratedAt || {}), [memberId]: dish.ratedAt?.[memberId] || Date.now() },
  });
  return first && !!memberById(memberId)?.kid;
}

// ---------- Brave Bites ----------
//
// Kids learn to like a food by tasting it again and again, about a dozen tiny
// tastes, each with a sticker (Cooke 2011, Remington 2012). So a grown-up picks
// one or two Brave Foods per kid, and every try earns a sticker, up to 12 per
// food. Trying a dish for the very first time earns one too. Stickers are
// saved, so they stay even if the dish is deleted.

// The animal stickers from the Canva design (img/canva/sticker-<key>.png).
export const STICKERS = [
  { key: "tiger", name: "tiger", emoji: "🐯" }, { key: "dolphin", name: "dolphin", emoji: "🐬" },
  { key: "bunny", name: "bunny", emoji: "🐰" }, { key: "bear", name: "bear", emoji: "🐻" },
  { key: "penguin", name: "penguin", emoji: "🐧" }, { key: "frog", name: "frog", emoji: "🐸" },
];
export const STICKERS_PER_PRIZE = 10;
export const TRIES_PER_FOOD = 12;

function stickerOf(seed) {
  let hash = 0;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return STICKERS[hash % STICKERS.length];
}

/** A kid's stickers, oldest first: [{ id, dishId, dishName, dish, at, kind, sticker }]. */
export function stickersFor(memberId) {
  return (state.settings.braveTries || [])
    .filter((t) => t.memberId === memberId)
    .map((t) => ({ ...t, dish: state.dishes.get(t.dishId) || null, sticker: stickerOf(t.id) }))
    .sort((a, b) => a.at - b.at);
}

/** The Brave Foods a grown-up picked for this kid (dish ids still on the menu). */
export function braveFoods(memberId) {
  return (state.settings.braveFoods?.[memberId] || []).filter((id) => state.dishes.has(id));
}

export async function setBraveFoods(memberId, dishIds) {
  await saveSettings({ braveFoods: { ...(state.settings.braveFoods || {}), [memberId]: dishIds.slice(0, 2) } });
}

/** How many times this kid tried this dish for a sticker. */
export function triesOf(memberId, dishId) {
  return (state.settings.braveTries || []).filter((t) => t.memberId === memberId && t.dishId === dishId).length;
}

/**
 * Can trying this dish earn a sticker? "brave" for a Brave Food with tries
 * left, "first" for a dish they've never had, otherwise "". `meal` (a slot id)
 * keeps one meal from giving the same sticker twice.
 */
export function braveKind(memberId, dishId, { meal = "" } = {}) {
  const tries = (state.settings.braveTries || []).filter((t) => t.memberId === memberId && t.dishId === dishId);
  if (meal && tries.some((t) => t.meal === meal)) return "";
  if (braveFoods(memberId).includes(dishId)) return tries.length < TRIES_PER_FOOD ? "brave" : "";
  const dish = state.dishes.get(dishId);
  const firstRating = dish?.ratedAt?.[memberId];
  const rated = dish?.ratings?.[memberId] != null;
  // Never tried: no sticker yet, and not rated before today.
  if (tries.length || (rated && firstRating && Date.now() - firstRating > 12 * 3600 * 1000)) return "";
  return "first";
}

/** Saves a try and returns its sticker (or null when this try doesn't earn one). */
export async function addBraveTry(memberId, dishId, { meal = "" } = {}) {
  const kind = braveKind(memberId, dishId, { meal });
  if (!kind) return null;
  const dish = state.dishes.get(dishId);
  const t = { id: db.newId("bt-"), memberId, dishId, dishName: dish?.name || "a new food", at: Date.now(), kind, meal };
  await saveSettings({ braveTries: [...(state.settings.braveTries || []), t] });
  return { ...t, sticker: stickerOf(t.id) };
}

/** Prizes: one for every 10 stickers. used is how many the kid already picked a dinner with. */
export function prizesFor(memberId) {
  const earned = Math.floor(stickersFor(memberId).length / STICKERS_PER_PRIZE);
  const used = Math.min(earned, state.settings.prizesUsed?.[memberId] || 0);
  return { earned, used, ready: earned - used };
}

export async function usePrize(memberId) {
  const used = state.settings.prizesUsed || {};
  await saveSettings({ prizesUsed: { ...used, [memberId]: (used[memberId] || 0) + 1 } });
}

/** Stickers used to come from ratings: keep every kid's old ones as saved stickers. */
async function keepOldStickers() {
  if (state.settings.braveTries) return;
  const kids = new Set(state.settings.members.filter((m) => m.kid).map((m) => m.id));
  const tries = [];
  for (const dish of state.dishes.values()) {
    for (const [memberId, score] of Object.entries(dish.ratings || {})) {
      if (!kids.has(memberId) || score == null) continue;
      tries.push({ id: `bt-${dish.id}-${memberId}`, memberId, dishId: dish.id, dishName: dish.name, at: dish.ratedAt?.[memberId] || 0, kind: "first", meal: "" });
    }
  }
  await saveSettings({ braveTries: tries });
}

// ---------- Photos ----------

const photoUrlCache = new Map();

export async function addPhoto(dishId, { blob, thumb }) {
  const id = db.newId("p-");
  await db.put("photos", { id, dishId, blob, thumb, createdAt: Date.now() });
  const dish = state.dishes.get(dishId);
  if (dish) await updateDish(dishId, { photoIds: [id, ...(dish.photoIds || [])] });
  return id;
}

export async function deletePhoto(photoId) {
  for (const kind of ["thumb", "full"]) {
    const url = photoUrlCache.get(`${photoId}:${kind}`);
    if (url) URL.revokeObjectURL(url);
    photoUrlCache.delete(`${photoId}:${kind}`);
  }
  await db.remove("photos", photoId);
}

export async function removePhotoFromDish(dishId, photoId) {
  const dish = state.dishes.get(dishId);
  if (!dish) return;
  await deletePhoto(photoId);
  await updateDish(dishId, { photoIds: (dish.photoIds || []).filter((p) => p !== photoId) });
}

export async function photoUrl(photoId, kind = "thumb") {
  const key = `${photoId}:${kind}`;
  if (photoUrlCache.has(key)) return photoUrlCache.get(key);
  const row = await db.get("photos", photoId);
  const blob = kind === "full" ? row?.blob || row?.thumb : row?.thumb || row?.blob;
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  photoUrlCache.set(key, url);
  return url;
}

// ---------- Plan ----------

export function getSlot(date, meal) {
  return state.plan.get(slotId(date, meal));
}

export function slotDishes(slot) {
  return (slot?.items || []).map((i) => ({ ...i, dish: state.dishes.get(i.dishId) })).filter((i) => i.dish);
}

export async function saveSlot(slot) {
  const full = { items: [], choices: [], ...slot, id: slotId(slot.date, slot.meal), updatedAt: Date.now() };
  const before = state.plan.get(full.id) || null;
  if (!full.items.length && !full.choices.length && !full.rated) {
    state.plan.delete(full.id);
    await db.remove("plan", full.id);
    await keepLeftoversInStep(before, null);
    return null;
  }
  state.plan.set(full.id, full);
  await db.put("plan", full);
  await keepLeftoversInStep(before, full);
  return full;
}

const shiftKey = (key, days) => dateKey(addDays(fromKey(key), days));

/**
 * A dinner cooked double and the next day's leftover lunch go together: take
 * the dinner off and the leftovers go too; take the leftovers off and the
 * dinner goes back to the normal amount (so the list doesn't buy double).
 */
async function keepLeftoversInStep(before, after) {
  if (!before) return;
  const now = after?.items || [];
  const stays = (i) => now.some((n) => n.dishId === i.dishId && (n.extraFor || "") === (i.extraFor || "") && !!n.leftover === !!i.leftover);
  for (const item of before.items || []) {
    if (stays(item)) continue;
    if (item.extraFor) {
      const lunch = getSlot(item.extraFor, "lunch");
      const left = (lunch?.items || []).filter((i) => !(i.leftover && i.dishId === item.dishId));
      if (lunch && left.length !== lunch.items.length) await saveSlot({ ...lunch, items: left });
    }
    if (item.leftover) {
      const dinner = getSlot(shiftKey(before.date, -1), "dinner");
      const cooked = dinner?.items?.find((i) => i.dishId === item.dishId && i.extraFor === before.date);
      if (cooked) {
        const { extraFor, ...normal } = cooked;
        await saveSlot({ ...dinner, items: dinner.items.map((i) => (i === cooked ? { ...normal, servings: Math.max(1, Math.round((i.servings || 2) / 2)) } : i)) });
      }
    }
  }
}

/**
 * A copy of some meal spots, to put back with restoreSlots (for Undo). The
 * lunch a double dinner feeds, and the dinner a leftover lunch came from, come too.
 */
export function snapshotSlots(spots) {
  const all = new Map();
  const add = (key, meal) => all.set(`${key}|${meal}`, [key, meal]);
  for (const [date, meal] of spots) {
    const key = typeof date === "string" ? date : dateKey(date);
    add(key, meal);
    for (const i of getSlot(key, meal)?.items || []) {
      if (i.extraFor) add(i.extraFor, "lunch");
      if (i.leftover) add(shiftKey(key, -1), "dinner");
    }
  }
  return [...all.values()].map(([key, meal]) => ({ key, meal, slot: structuredClone(getSlot(key, meal) || null) }));
}

/** Every meal spot in some days, for an Undo of a whole week. */
export function snapshotDays(days) {
  return snapshotSlots(days.flatMap((d) => MEALS.map((m) => [d, m.key])));
}

export async function restoreSlots(snapshot) {
  // Straight back as they were, without the leftovers bookkeeping in between.
  for (const { key, meal, slot } of snapshot) {
    const id = slotId(key, meal);
    if (slot) {
      state.plan.set(id, slot);
      await db.put("plan", slot);
    } else {
      state.plan.delete(id);
      await db.remove("plan", id);
    }
  }
}

/** The spots moving a meal touches, for its Undo: both days, and the lunches after them. */
export function moveSpots(fromKey, toKey, meal) {
  return [[fromKey, meal], [toKey, meal], [shiftKey(fromKey, 1), "lunch"], [shiftKey(toKey, 1), "lunch"]];
}

/**
 * Moves a meal to another day (same meal), swapping with whatever was there.
 * A dinner cooked double takes its leftover lunch along to the day after.
 */
export async function moveSlot(fromKey, toKey, meal) {
  if (fromKey === toKey) return;
  const from = getSlot(fromKey, meal) || { items: [], choices: [] };
  const to = getSlot(toKey, meal) || { items: [], choices: [] };
  // Leftovers moved to another day aren't leftovers any more: that lunch gets bought for.
  const retarget = (items, day) => (items || []).map(({ leftover, ...i }) => (i.extraFor ? { ...i, extraFor: shiftKey(day, 1) } : i));
  const moved = retarget(from.items, toKey);
  const back = retarget(to.items, fromKey);
  await saveSlot({ date: toKey, meal, items: moved, choices: from.choices || [] });
  await saveSlot({ date: fromKey, meal, items: back, choices: to.choices || [] });
  for (const item of [...moved, ...back]) {
    if (item.extraFor) await putLeftoverLunch(item.extraFor, item.dishId, Math.max(1, Math.round((item.servings || 2) / 2)));
  }
}

async function putLeftoverLunch(day, dishId, servings) {
  const lunch = getSlot(day, "lunch") || { date: day, meal: "lunch", items: [], choices: [] };
  await saveSlot({ ...lunch, items: [{ dishId, servings, leftover: true }], choices: [] });
}

/** Cooks extra tonight so tomorrow's lunch is leftovers (the shopping list buys it with tonight's). */
export async function planLeftovers(dayKey, meal, dishId) {
  const slot = getSlot(dayKey, meal);
  const item = slot?.items?.find((i) => i.dishId === dishId);
  if (!item) return null;
  const tomorrow = shiftKey(dayKey, 1);
  const servings = item.servings || state.settings.servings || 4;
  await saveSlot({ ...slot, items: slot.items.map((i) => (i.dishId === dishId ? { ...i, servings: servings * 2, extraFor: tomorrow } : i)) });
  await putLeftoverLunch(tomorrow, dishId, servings);
  return tomorrow;
}

/** After dinner: what's left goes in tomorrow's lunch (already cooked, so nothing to buy). */
export async function leftoversForLunch(dishId) {
  const day = shiftKey(dateKey(new Date()), 1);
  await putLeftoverLunch(day, dishId, state.settings.servings || 4);
  return day;
}

/** What's planned for tomorrow's lunch, if it isn't already leftovers (to ask before replacing it). */
export function lunchInTheWay(dayKey) {
  const items = slotDishes(getSlot(shiftKey(dayKey, 1), "lunch"));
  return items.length && !items.every((i) => i.leftover) ? items : [];
}

/**
 * Copies last week's meals into the empty spots of the week starting `start`.
 * Freezer meals become ordinary ones (they're not in the freezer twice), and
 * leftovers only come along with the dinner they're from. Returns how many.
 */
export async function copyWeek(fromStart, toStart) {
  const days = Math.round((fromKey(dateKey(toStart)) - fromKey(dateKey(fromStart))) / (24 * 3600 * 1000));
  let copied = 0;
  for (let i = 0; i < 7; i++) {
    const fromDay = dateKey(addDays(fromStart, i));
    const toDay = shiftKey(fromDay, days);
    for (const m of MEALS) {
      const from = getSlot(fromDay, m.key);
      if (!slotDishes(from).length || slotDishes(getSlot(toDay, m.key)).length) continue;
      const items = from.items.map(({ fromFreezer, ...i }) => (i.extraFor ? { ...i, extraFor: shiftKey(i.extraFor, days) } : i));
      await saveSlot({ date: toDay, meal: m.key, items, choices: [] });
      copied++;
    }
  }
  // Leftovers with no double dinner before them are an ordinary lunch, and the other way round.
  for (let i = 0; i < 7; i++) {
    const day = dateKey(addDays(toStart, i));
    const lunch = getSlot(day, "lunch");
    const dinnerBefore = getSlot(shiftKey(day, -1), "dinner");
    if (lunch?.items?.some((x) => x.leftover && !dinnerBefore?.items?.some((d) => d.dishId === x.dishId && d.extraFor === day))) {
      state.plan.set(lunch.id, { ...lunch, items: lunch.items.map(({ leftover, ...x }) => x) });
      await db.put("plan", state.plan.get(lunch.id));
    }
    const dinner = getSlot(day, "dinner");
    const next = getSlot(shiftKey(day, 1), "lunch");
    if (dinner?.items?.some((x) => x.extraFor && !next?.items?.some((l) => l.leftover && l.dishId === x.dishId))) {
      state.plan.set(dinner.id, {
        ...dinner,
        items: dinner.items.map(({ extraFor, ...x }) => (extraFor ? { ...x, servings: Math.max(1, Math.round((x.servings || 2) / 2)) } : x)),
      });
      await db.put("plan", state.plan.get(dinner.id));
    }
  }
  return copied;
}

/** Meals in the freezer: [{ id, dishId, meals, addedAt }]. */
export function freezer() {
  return (state.settings.freezer || []).filter((f) => f.meals > 0 && state.dishes.get(f.dishId));
}

export async function addToFreezer(dishId, meals = 1) {
  const list = [...(state.settings.freezer || [])];
  const existing = list.find((f) => f.dishId === dishId);
  if (existing) existing.meals += meals;
  else list.push({ id: db.newId("fz-"), dishId, meals, addedAt: Date.now() });
  await saveSettings({ freezer: list.filter((f) => f.meals > 0) });
}

export async function takeFromFreezer(dishId, meals = 1) {
  const list = (state.settings.freezer || []).map((f) => (f.dishId === dishId ? { ...f, meals: f.meals - meals } : f));
  await saveSettings({ freezer: list.filter((f) => f.meals > 0) });
}

/** Puts a freezer meal in a spot: nothing to buy for it. */
export async function planFromFreezer(date, meal, dishId) {
  const key = typeof date === "string" ? date : dateKey(date);
  const slot = getSlot(key, meal) || { date: key, meal, items: [], choices: [] };
  await saveSlot({ ...slot, items: [{ dishId, servings: state.settings.servings || 4, fromFreezer: true }], choices: [] });
  await takeFromFreezer(dishId);
}

export async function setSlotDishes(date, meal, dishIds, { append = false } = {}) {
  const key = typeof date === "string" ? date : dateKey(date);
  const slot = getSlot(key, meal) || { date: key, meal, items: [], choices: [] };
  const servings = state.settings.servings || 4;
  const add = dishIds.map((dishId) => ({ dishId, servings }));
  const items = append ? [...slot.items, ...add.filter((a) => !slot.items.some((i) => i.dishId === a.dishId))] : add;
  return saveSlot({ ...slot, date: key, meal, items, choices: [] });
}

/** How often each dish was planned in the last `days` days, and when it was last planned. */
export function planHistory(days = 28) {
  const since = dateKey(addDays(new Date(), -days));
  const today = dateKey(new Date());
  const stats = new Map();
  for (const slot of state.plan.values()) {
    if (slot.date < since || slot.date > today) continue;
    for (const item of slot.items) {
      const s = stats.get(item.dishId) || { count: 0, last: "" };
      s.count++;
      if (slot.date > s.last) s.last = slot.date;
      stats.set(item.dishId, s);
    }
  }
  return stats;
}

// ---------- Wishes ----------

export async function addWish({ dishId = null, text = "", memberId }) {
  const wish = { id: db.newId("w-"), dishId, text, memberId, createdAt: Date.now() };
  state.wishes.push(wish);
  await db.put("wishes", wish);
  return wish;
}

export async function removeWish(id) {
  state.wishes = state.wishes.filter((w) => w.id !== id);
  await db.remove("wishes", id);
}

export function wishLabel(wish) {
  return wish.dishId ? state.dishes.get(wish.dishId)?.name || "a dish" : wish.text;
}

// ---------- What we have ----------

const DAY = 24 * 3600 * 1000;
export const FRESH_DAYS = 7;

/**
 * What's in the kitchen: [{ name, key, at, stale }]. Veggies, meat, eggs and
 * milk are only a guess after a week, so they stop hiding things on the
 * shopping list until someone says we still have them.
 */
export function haveItems(now = Date.now()) {
  const at = state.settings.haveAt || {};
  return (state.settings.have || []).map((name) => {
    const key = normalizeItemName(name);
    const when = at[key] ?? null;
    const fresh = ["produce", "meat", "dairy"].includes(aisleFor(`${key} ${name}`));
    return { name, key, at: when, stale: fresh && when != null && now - when > FRESH_DAYS * DAY };
  });
}

/** The names we can count on having. */
export function haveNames() {
  return haveItems().filter((x) => !x.stale).map((x) => x.name);
}

/** Adds things (or says we still have them), dated today. */
export async function addHave(names, { max = 80 } = {}) {
  const have = [...(state.settings.have || [])];
  const at = { ...(state.settings.haveAt || {}) };
  const known = new Set(have.map(normalizeItemName));
  for (const raw of names) {
    const n = String(raw || "").trim();
    const key = normalizeItemName(n);
    if (!key) continue;
    at[key] = Date.now();
    if (known.has(key)) continue;
    known.add(key);
    have.push(n);
  }
  const kept = have.slice(-max);
  const keys = new Set(kept.map(normalizeItemName));
  await saveSettings({ have: kept, haveAt: Object.fromEntries(Object.entries(at).filter(([k]) => keys.has(k))) });
}

/** Takes off everything `drop(name, key)` says is gone. */
export async function removeHave(drop) {
  const have = (state.settings.have || []).filter((n) => !drop(n, normalizeItemName(n)));
  const keys = new Set(have.map(normalizeItemName));
  const at = Object.fromEntries(Object.entries(state.settings.haveAt || {}).filter(([k]) => keys.has(k)));
  await saveSettings({ have, haveAt: at });
}

// ---------- Shopping ----------

export function shoppingFor(weekKey) {
  return state.shopping.get(weekKey) || { id: weekKey, checked: {}, extras: [] };
}

/** This week's shopping list (the one the Shop tab opens on). */
export function thisWeeksShopping() {
  return shoppingFor(dateKey(weekStart(new Date(), state.settings.weekStartsOn)));
}

/** Puts a dish's ingredients (for this many people) on this week's list. */
export async function addRecipeToShopping(dishId, servings) {
  const shop = thisWeeksShopping();
  const recipes = (shop.recipes || []).filter((r) => r.dishId !== dishId);
  await saveShopping({ ...shop, recipes: [...recipes, { dishId, servings }] });
}

/** Adds things (like what a dish is missing) to this week's list, skipping ones already there. */
export async function addShoppingExtras(texts) {
  const shop = thisWeeksShopping();
  const have = new Set(shop.extras.map((e) => e.text.toLowerCase()));
  const fresh = texts.filter((t) => t && !have.has(t.toLowerCase())).map((text) => ({ id: db.newId("x-"), text, checked: false }));
  await saveShopping({ ...shop, extras: [...shop.extras, ...fresh] });
  return fresh.length;
}

export async function saveShopping(entry) {
  state.shopping.set(entry.id, entry);
  await db.put("shopping", entry);
}

export { db };
