// The app's data in memory, plus the functions that change it. Every change is
// written to IndexedDB straight away, then the current screen redraws.
import * as db from "./db.js";
import { MEALS, STARTER_DISHES, LATEST_STARTER_BATCH, startersToAdd, starterVideoFills } from "./seed.js";
import { dateKey, fromKey, addDays, slotId, averageRating, weekStart } from "./planner.js";

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
}

// ---------- Settings & family ----------

export async function saveSettings(patch) {
  state.settings = { ...state.settings, ...patch };
  await db.put("settings", { key: "main", value: state.settings });
}

/** How this family cooks: healthier swaps, spice level, metric. */
export function cookPrefs() {
  const s = state.settings;
  return { healthy: !!s.healthy, spice: ["mild", "medium", "spicy"].includes(s.spice) ? s.spice : "medium", metric: !!s.metric };
}

export function members() {
  return state.settings.members.length
    ? state.settings.members
    : [{ id: "family", name: "Our family", avatar: "👨‍👩‍👧", kid: false }];
}

export function memberById(id) {
  return members().find((m) => m.id === id);
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

/** Saves a face. Returns true if it's a kid's first time rating this dish: a Brave Bite. */
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

// The animal stickers from the Canva design (img/canva/sticker-<key>.png).
export const STICKERS = [
  { key: "tiger", name: "tiger", emoji: "🐯" }, { key: "dolphin", name: "dolphin", emoji: "🐬" },
  { key: "bunny", name: "bunny", emoji: "🐰" }, { key: "bear", name: "bear", emoji: "🐻" },
  { key: "penguin", name: "penguin", emoji: "🐧" }, { key: "frog", name: "frog", emoji: "🐸" },
];
export const STICKERS_PER_PRIZE = 10;

/** A kid's stickers: one for every dish they've tried and rated, oldest first. */
export function stickersFor(memberId) {
  const out = [];
  for (const dish of state.dishes.values()) {
    if (dish.ratings?.[memberId] == null) continue;
    let hash = 0;
    for (const ch of dish.id + memberId) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
    out.push({ dish, sticker: STICKERS[hash % STICKERS.length], at: dish.ratedAt?.[memberId] || 0 });
  }
  return out.sort((a, b) => a.at - b.at || a.dish.name.localeCompare(b.dish.name));
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
  if (!full.items.length && !full.choices.length && !full.rated) {
    state.plan.delete(full.id);
    await db.remove("plan", full.id);
    return null;
  }
  state.plan.set(full.id, full);
  await db.put("plan", full);
  return full;
}

/** A copy of some meal spots, to put back with restoreSlots (for Undo). */
export function snapshotSlots(spots) {
  return spots.map(([date, meal]) => {
    const key = typeof date === "string" ? date : dateKey(date);
    return { key, meal, slot: structuredClone(getSlot(key, meal) || null) };
  });
}

export async function restoreSlots(snapshot) {
  for (const { key, meal, slot } of snapshot) await saveSlot(slot || { date: key, meal, items: [], choices: [] });
}

/** Moves a meal to another day (same meal), swapping with whatever was there. */
export async function moveSlot(fromKey, toKey, meal) {
  if (fromKey === toKey) return;
  const from = getSlot(fromKey, meal) || { items: [], choices: [] };
  const to = getSlot(toKey, meal) || { items: [], choices: [] };
  await saveSlot({ date: toKey, meal, items: from.items || [], choices: from.choices || [] });
  await saveSlot({ date: fromKey, meal, items: to.items || [], choices: to.choices || [] });
}

/** Cooks extra tonight so tomorrow's lunch is leftovers (the shopping list buys it with tonight's). */
export async function planLeftovers(dayKey, meal, dishId) {
  const slot = getSlot(dayKey, meal);
  const item = slot?.items?.find((i) => i.dishId === dishId);
  if (!item) return null;
  const tomorrow = dateKey(addDays(fromKey(dayKey), 1));
  const lunch = getSlot(tomorrow, "lunch") || { date: tomorrow, meal: "lunch", items: [], choices: [] };
  const servings = item.servings || state.settings.servings || 4;
  await saveSlot({ ...lunch, items: [{ dishId, servings, leftover: true }], choices: [] });
  await saveSlot({ ...slot, items: slot.items.map((i) => (i.dishId === dishId ? { ...i, servings: servings * 2, extraFor: tomorrow } : i)) });
  return tomorrow;
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
