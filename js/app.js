// Family Menu: starts the app, picks the screen for the address bar's #/route,
// and keeps the tab bar in step.
import { h, clearChildren, toast } from "./ui.js";
import { state, loadAll, setRedraw, saveSettings, go, addNewStarters } from "./store.js";
import { askToKeepData } from "./db.js";
import { viewToday } from "./views/today.js";
import { viewWeek } from "./views/week.js";
import { viewMenu, viewDiscover } from "./views/menu.js";
import { viewDish, viewCook } from "./views/dish.js";
import { viewAdd, viewEdit } from "./views/add.js";
import { viewShop } from "./views/shop.js";
import { viewSettings, viewWelcome } from "./views/settings.js";

// full: hides the tab bar. still: background refreshes don't redraw it (so
// cook-along keeps its place when a rating sheet closes).
const ROUTES = [
  { re: /^\/today$/, view: viewToday, tab: "today" },
  { re: /^\/week$/, view: viewWeek, tab: "week" },
  { re: /^\/menu$/, view: viewMenu, tab: "menu" },
  { re: /^\/discover$/, view: viewDiscover, tab: "menu" },
  { re: /^\/dish\/([^/]+)$/, view: viewDish, tab: "menu" },
  { re: /^\/cook\/([^/]+)$/, view: viewCook, full: true, still: true },
  { re: /^\/add$/, view: viewAdd, tab: "menu", still: true },
  { re: /^\/new$/, view: viewEdit, tab: "menu", still: true },
  { re: /^\/edit\/([^/]+)$/, view: viewEdit, tab: "menu", still: true },
  { re: /^\/shop$/, view: viewShop, tab: "shop" },
  { re: /^\/settings$/, view: viewSettings, tab: "today" },
  { re: /^\/welcome$/, view: viewWelcome, full: true, still: true },
];

const scrollMemory = new Map();
let currentKey = null;
let currentRoute = null;
let cleanup = null;
let renderToken = 0;

function errorScreen(err) {
  console.error(err);
  return h("div.screen",
    h("div.empty-state",
      h("div.huge-emoji", "😵"),
      h("p", "Oops, this screen had a problem."),
      h("p.muted.small", String(err?.message || err)),
      h("button.btn.primary", { onclick: () => go("#/today") }, "🏠 Go home"),
    ),
  );
}

async function render({ keepScroll = false } = {}) {
  const raw = location.hash.replace(/^#/, "") || "/today";
  const [path, query = ""] = raw.split("?");
  if (!state.settings.onboarded && path !== "/welcome") return go("#/welcome", { replace: true });
  const route = ROUTES.find((r) => r.re.test(path)) || ROUTES[0];
  if (keepScroll && route === currentRoute && route.still) return;

  if (currentKey && !keepScroll) scrollMemory.set(currentKey, window.scrollY);
  const y = keepScroll ? window.scrollY : scrollMemory.get(raw) ?? 0;
  if (!keepScroll) {
    cleanup?.();
    cleanup = null;
  }
  const token = ++renderToken;
  let node;
  try {
    node = await route.view({
      match: path.match(route.re),
      params: new URLSearchParams(query),
      setCleanup: (fn) => (cleanup = fn),
    });
  } catch (err) {
    node = errorScreen(err);
  }
  if (token !== renderToken || node == null) return;

  const view = document.getElementById("view");
  clearChildren(view);
  view.append(node);
  document.body.dataset.full = route.full ? "1" : "";
  for (const a of document.querySelectorAll(".tabbar a")) {
    const on = a.dataset.tab === route.tab;
    a.classList.toggle("on", on);
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  }
  currentKey = raw;
  currentRoute = route;
  requestAnimationFrame(() => window.scrollTo(0, y));
}

async function start() {
  try {
    await loadAll();
  } catch (err) {
    document.getElementById("view").replaceChildren(errorScreen(err));
    return;
  }
  askToKeepData();
  if (state.settings.onboarded && !state.settings.onboardedAt) saveSettings({ onboardedAt: Date.now() });
  // Anything that fails to save gets said out loud instead of silently lost.
  window.addEventListener("unhandledrejection", (e) => {
    console.error(e.reason);
    const full = e.reason?.name === "QuotaExceededError";
    toast(full
      ? "This device is out of space, so that wasn't saved. Save a backup, then remove some photos."
      : "Something didn't save. Please try again.", { emoji: "😕", ms: 6000 });
  });
  setRedraw(render);
  window.addEventListener("hashchange", () => {
    state.navCount++;
    render();
  });
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    state.installPrompt = e;
    if (currentRoute?.tab === "today") render({ keepScroll: true });
  });
  if (!location.hash) history.replaceState(null, "", "#/today");
  state.navCount = 1;
  // New starter recipes from an app update go in before the first screen draws.
  const newStarters = await addNewStarters().catch((err) => (console.error(err), 0));
  render();
  if (newStarters) toast(`${newStarters} new recipes are on the menu, with videos for the trending ones!`, { emoji: "🔥", ms: 5000 });
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
}

start();
