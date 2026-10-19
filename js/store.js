// The app's data in memory, plus the functions that change it. Every change is
// written to IndexedDB straight away, then the current screen redraws.
import * as db from "./db.js";
import { MEALS, STARTER_DISHES, LATEST_STARTER_BATCH, startersToAdd, starterVideoFills } from "./seed.js";
import { dateKey, addDays, slotId, averageRating, weekStart } from "./planner.js";

export const DEFAULT_SETTINGS = {
  onboarded: false,
  members: [],
  servings: 4,
  meals: ["breakfast", "lunch", "dinner", "snack"],
  weekStartsOn: 0,
  foodNotes: "Kids like mild (not spicy) food.",
  cuisineMix: "Mostly healthy Korean home cooking, plus everyday American, Italian and Mexican family favorites.",
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

export async function rateDish(dishId, memberId, score) {
  const dish = state.dishes.get(dishId);
  if (!dish) return;
  await updateDish(dishId, { ratings: { ...(dish.ratings || {}), [memberId]: score } });
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
