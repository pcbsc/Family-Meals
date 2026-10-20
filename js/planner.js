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

// ---------- A balanced week ----------

// The main protein is the first ingredient line that names one (broths and sauces don't count).
const PROTEINS = [
  ["fish", /\b(salmon|cod|mackerel|tuna|pollock|tilapia|halibut|fish(?! (sauce|cakes?|balls?))|shrimp|prawns?|squid|clams?|mussels?|crab|seafood|anchov(?:y|ies)(?! broth))\b/],
  ["beef", /\b(beef|ribeye|sirloin|brisket|short ribs?|steak|chuck|flank)\b/],
  ["pork", /\b(pork|bacon|ham|spam|sausages?|hot dogs?|samgyeopsal)\b/],
  ["chicken", /\b(chicken|turkey|drumsticks?|thighs?)\b/],
  ["tofu", /\b(tofu)\b/],
  ["egg", /\b(eggs?)\b/],
];
const NOT_PROTEIN = /\b(broth|stock|bouillon|sauce|powder|dashida|fish cakes?)\b/;
const FRIED_NAME = /\b(katsu|tonkatsu|tempura|karaage|corn dogs?|gangjeong|nuggets|fritters?|fried chicken|chicken tenders|french fries|fries|churros?|donuts?)\b/i;

/** What a dinner is like, for balancing a week: { protein, fish, noodle, fried, minutes }. */
export function dinnerTraits(dish) {
  let protein = "";
  for (const line of dish?.ingredients || []) {
    const l = String(line).toLowerCase();
    if (NOT_PROTEIN.test(l) && !/\b(and|with)\b/.test(l)) continue;
    protein = PROTEINS.find(([, re]) => re.test(l))?.[0] || "";
    if (protein) break;
  }
  const cats = dish?.categories || [];
  const deepFried = (dish?.ingredients || []).some((l) => /\bfor (deep[- ])?frying\b|deep[- ]fr/i.test(l) && /\bcups?|quarts?\b/i.test(l));
  return {
    protein,
    fish: cats.includes("seafood") || protein === "fish",
    noodle: cats.includes("noodles"),
    fried: FRIED_NAME.test(dish?.name || "") || deepFried,
    minutes: (dish?.prepMinutes || 0) + (dish?.cookMinutes || 0),
  };
}

// Monday to Thursday nights are school nights.
const schoolNight = (date) => [1, 2, 3, 4].includes(fromKey(date).getDay());

/**
 * How a dinner fits the week so far: at most one noodle and one fried dinner,
 * a mix of proteins (not the same two nights running), fish at least once,
 * and 40 minutes or less on school nights.
 */
function balanceFor(dish, date, week) {
  const t = dinnerTraits(dish);
  const before = week.filter((x) => x.date < date).sort((a, b) => a.date.localeCompare(b.date)).at(-1);
  let w = 1;
  if (t.noodle && week.some((x) => x.traits.noodle)) w *= 0.15;
  if (t.fried && week.some((x) => x.traits.fried)) w *= 0.1;
  if (t.protein && before?.traits.protein === t.protein) w *= 0.3;
  if (t.protein && week.filter((x) => x.traits.protein === t.protein).length >= 2) w *= 0.5;
  if (t.fish && !week.some((x) => x.traits.fish)) w *= 2.5;
  if (schoolNight(date) && t.minutes > 40) w *= 0.35;
  return w;
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
 * recentIds: dish ids planned in the last week (picked less often);
 * planned: [{date, meal, dishId}] already in the week, so the week balances.
 * A Korean dinner gets a banchan on the side, like a real Korean table.
 * Returns [{date, meal, dishId, sideId?}].
 */
export function fillWithFavorites({
  dishes, empty, wishes = [], recentIds = new Set(), planned = [], random = Math.random,
  cuisineOf = (d) => d.cuisine || ((d.categories || []).includes("korean") ? "korean" : ""),
}) {
  const used = {};
  const result = [];
  const byId = new Map(dishes.map((d) => [d.id, d]));
  const week = planned
    .filter((p) => p.meal === "dinner" && byId.has(p.dishId))
    .map((p) => ({ date: p.date, traits: dinnerTraits(byId.get(p.dishId)) }));
  for (const p of planned) used[p.dishId] = (used[p.dishId] || 0) + 1;
  const banchan = dishes.filter((d) => (d.categories || []).includes("side") && cuisineOf(d) === "korean");
  const sidesUsed = {};
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
      const weights = options.map((d) => weightFor(d, recentIds, { meal, date }) * (meal === "dinner" ? balanceFor(d, date, week) : 1));
      chosen = pick(options, weights, random);
    }
    used[chosen.id] = (used[chosen.id] || 0) + 1;
    const slot = { date, meal, dishId: chosen.id };
    if (meal === "dinner") {
      week.push({ date, traits: dinnerTraits(chosen) });
      // Rice and a banchan with a Korean main (not with a side dish, a soup on its own is fine too).
      const isMain = !(chosen.categories || []).includes("side");
      const sides = banchan.filter((b) => b.id !== chosen.id);
      if (isMain && cuisineOf(chosen) === "korean" && sides.length) {
        const fewest = Math.min(...sides.map((b) => sidesUsed[b.id] || 0));
        const fresh = sides.filter((b) => (sidesUsed[b.id] || 0) === fewest);
        const side = pick(fresh, fresh.map((b) => weightFor(b, recentIds)), random);
        sidesUsed[side.id] = (sidesUsed[side.id] || 0) + 1;
        slot.sideId = side.id;
      }
    }
    result.push(slot);
  }
  return result;
}

/**
 * A few dishes to swap in for a meal: ones that suit it, favorites and
 * well-liked first, the same kind of food a little ahead, never the ones in
 * exclude. random() picks among close scores, so "more ideas" shows others.
 */
export function suggestDishes(dishes, { meal, exclude = new Set(), cuisine = "", cuisineOf = () => "", count = 4, random = Math.random }) {
  const fits = (d) => (d.meals?.length ? d.meals : ["dinner"]).includes(meal) && !exclude.has(d.id);
  const main = (d) => meal === "snack" || !(d.categories || []).includes("side");
  return dishes
    .filter((d) => fits(d) && main(d))
    .map((d) => ({
      d,
      score: (isFavorite(d) ? 3 : 0) + (averageRating(d) ?? 2) + (cuisine && cuisineOf(d) === cuisine ? 1.5 : 0) + random() * 2.5,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.d);
}

// ---------- Calendar ----------

const MEAL_TIMES = { breakfast: ["0730", "0800"], lunch: ["1200", "1230"], snack: ["1530", "1545"], dinner: ["1800", "1900"] };

const icsText = (s) => String(s ?? "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

// Lines longer than 75 bytes are folded: a line break and a space.
function fold(line) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out = [];
  let chunk = "";
  let size = 0;
  for (const ch of line) {
    const n = new TextEncoder().encode(ch).length;
    if (size + n > (out.length ? 74 : 75)) {
      out.push(chunk);
      chunk = "";
      size = 0;
    }
    chunk += ch;
    size += n;
  }
  out.push(chunk);
  return out.join("\r\n ");
}

/**
 * A calendar file (.ics) with one event per planned meal, at the family's usual
 * time and in the phone's own time zone. entries: [{ date, meal, title, detail }].
 */
export function weekCalendar(entries, { now = new Date() } = {}) {
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Family Menu//Meals//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
  for (const e of entries) {
    const day = dateKey(e.date).replace(/-/g, "");
    const [from, to] = MEAL_TIMES[e.meal] || MEAL_TIMES.dinner;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${day}-${e.meal}@family-menu`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${day}T${from}00`,
      `DTEND:${day}T${to}00`,
      `SUMMARY:${icsText(e.title)}`,
      ...(e.detail ? [`DESCRIPTION:${icsText(e.detail)}`] : []),
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}
