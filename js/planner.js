// Dates and the no-AI planner ("Fill with favorites"). Pure functions, so the
// unit tests can run them in Node.

export function dateKey(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** The first day of the week holding `date`; startsOn is 0 (Sunday) or 1 (Monday). */
export function weekStart(date, startsOn = 0) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const diff = (d.getDay() - startsOn + 7) % 7;
  return addDays(d, -diff);
}

export function weekDays(start) {
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function slotId(date, meal) {
  return `${typeof date === "string" ? date : dateKey(date)}|${meal}`;
}

/** Average family rating from 1 (no thanks) to 4 (love it), or null if nobody rated it. */
export function averageRating(dish) {
  const scores = Object.values(dish?.ratings || {}).filter((n) => n > 0);
  if (!scores.length) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function isFavorite(dish) {
  const avg = averageRating(dish);
  return !!dish?.favorite || (avg != null && avg >= 3.5);
}

function weightFor(dish, recentIds, { meal, date } = {}) {
  let w = 1;
  // School and work mornings need a quick breakfast; save pancakes for the weekend.
  if (meal === "breakfast" && date) {
    const day = fromKey(date).getDay();
    const minutes = (dish.prepMinutes || 0) + (dish.cookMinutes || 0);
    if (day !== 0 && day !== 6 && minutes > 15) w *= 0.25;
  }
  if (dish.favorite) w += 3;
  const avg = averageRating(dish);
  if (avg != null) w += (avg - 2.5) * 1.5;
  if (dish.categories?.includes("kid-favorite")) w += 0.5;
  if (recentIds.has(dish.id)) w *= 0.3;
  return Math.max(0.05, w);
}

function pick(candidates, weights, random) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = random() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}

const REPEATS_ALLOWED = { breakfast: 2, lunch: 1, dinner: 1, snack: 3 };

/**
 * Fills empty slots with dishes the family likes, without AI.
 * dishes: menu; empty: [{date, meal}] to fill; wishes: [{dishId}];
 * recentIds: dish ids planned in the last week (picked less often).
 * Returns [{date, meal, dishId}].
 */
export function fillWithFavorites({ dishes, empty, wishes = [], recentIds = new Set(), random = Math.random }) {
  const used = {};
  const result = [];
  const wishQueue = wishes.map((w) => w.dishId).filter((id) => dishes.some((d) => d.id === id));
  for (const { date, meal } of empty) {
    const fits = dishes.filter((d) => (d.meals?.length ? d.meals.includes(meal) : meal === "dinner"));
    if (!fits.length) continue;
    const wished = wishQueue.findIndex((id) => fits.some((d) => d.id === id) && !(used[id] >= 1));
    let chosen;
    if (wished >= 0) {
      chosen = fits.find((d) => d.id === wishQueue[wished]);
      wishQueue.splice(wished, 1);
    } else {
      // Side dishes don't make a meal on their own.
      const mains = fits.filter((d) => !d.categories?.includes("side"));
      const pool = (mains.length ? mains : fits).filter((d) => (used[d.id] || 0) < REPEATS_ALLOWED[meal]);
      const options = pool.length ? pool : fits;
      chosen = pick(options, options.map((d) => weightFor(d, recentIds, { meal, date })), random);
    }
    used[chosen.id] = (used[chosen.id] || 0) + 1;
    result.push({ date, meal, dishId: chosen.id });
  }
  return result;
}
