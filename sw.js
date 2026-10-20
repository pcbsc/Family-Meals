// Service worker: keeps the app working without internet, and receives
// recipes shared from other apps (Android's Share menu → Family Menu).
// Bump VERSION when the list of app files changes.
const VERSION = "v7";
const APP_CACHE = `family-menu-app-${VERSION}`;
const IMAGE_CACHE = "family-menu-images";

const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.webmanifest",
  "./js/app.js",
  "./js/ui.js",
  "./js/db.js",
  "./js/store.js",
  "./js/components.js",
  "./js/recipe.js",
  "./js/planner.js",
  "./js/seed.js",
  "./js/ai.js",
  "./js/video.js",
  "./js/share.js",
  "./js/native.js",
  "./js/seed-fusion.js",
  "./js/views/today.js",
  "./js/views/week.js",
  "./js/views/menu.js",
  "./js/views/dish.js",
  "./js/views/add.js",
  "./js/views/shop.js",
  "./js/views/settings.js",
  "./js/views/fridge.js",
  "./js/views/stickers.js",
  "./vendor/anthropic-sdk.mjs",
  "./fonts/nunito-latin.woff2",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/favicon-32.png",
  "./img/tab-today.png",
  "./img/tab-today-on.png",
  "./img/tab-week.png",
  "./img/tab-week-on.png",
  "./img/tab-menu.png",
  "./img/tab-menu-on.png",
  "./img/tab-shop.png",
  "./img/tab-shop-on.png",
  "./img/wave.png",
  "./img/sun.png",
  "./img/hand-up.png",
  "./img/mascot.png",
  "./img/canva/aisle-asian.png",
  "./img/canva/aisle-dairy.png",
  "./img/canva/aisle-meat.png",
  "./img/canva/aisle-produce.png",
  "./img/canva/arrow-go.png",
  "./img/canva/calendar.png",
  "./img/canva/cart.png",
  "./img/canva/check-green.png",
  "./img/canva/chef-kids.png",
  "./img/canva/chili.png",
  "./img/canva/clock.png",
  "./img/canva/dice.png",
  "./img/canva/flame.png",
  "./img/canva/freezer.png",
  "./img/canva/heart.png",
  "./img/canva/home-white.png",
  "./img/canva/kid-wave.png",
  "./img/canva/leaf.png",
  "./img/canva/lunchbox.png",
  "./img/canva/mascot-cheer.png",
  "./img/canva/mascot-peek.png",
  "./img/canva/mascot-thumb.png",
  "./img/canva/mascot-wave.png",
  "./img/canva/meal-breakfast.png",
  "./img/canva/meal-dinner.png",
  "./img/canva/meal-lunch.png",
  "./img/canva/medal.png",
  "./img/canva/phone.png",
  "./img/canva/plus-blue.png",
  "./img/canva/refresh.png",
  "./img/canva/salad.png",
  "./img/canva/scale.png",
  "./img/canva/share-white.png",
  "./img/canva/smile.png",
  "./img/canva/spoon.png",
  "./img/canva/star-gold.png",
  "./img/canva/star.png",
  "./img/canva/sticker-bear.png",
  "./img/canva/sticker-bunny.png",
  "./img/canva/sticker-dolphin.png",
  "./img/canva/sticker-frog.png",
  "./img/canva/sticker-penguin.png",
  "./img/canva/sticker-tiger.png",
  "./img/canva/tomato-face.png",
  "./img/canva/trophy.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(APP_CACHE)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k.startsWith("family-menu-app-") && k !== APP_CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

function saveShared(item) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("family-menu-inbox", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("shared", { keyPath: "id" });
    req.onerror = () => reject(req.error);
    req.onsuccess = () => {
      const tx = req.result.transaction("shared", "readwrite");
      tx.objectStore("shared").put(item);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
  });
}

async function receiveShare(request) {
  const form = await request.formData();
  const files = form.getAll("image").filter((f) => f && typeof f !== "string" && f.size);
  await saveShared({
    id: "latest",
    at: Date.now(),
    title: String(form.get("title") || ""),
    text: String(form.get("text") || ""),
    url: String(form.get("url") || ""),
    image: files[0] || null,
  });
  return Response.redirect(new URL("./#/add?shared=1", self.registration.scope).href, 303);
}

async function networkFirst(request) {
  const cache = await caches.open(APP_CACHE);
  try {
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) => setTimeout(() => reject(new Error("slow")), 4000)),
    ]);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === "navigate") return cache.match("./index.html");
    throw new Error("offline");
  }
}

async function cacheFirstImage(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok || response.type === "opaque") cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method === "POST" && url.pathname.endsWith("/share-target")) {
    event.respondWith(receiveShare(request));
    return;
  }
  if (request.method !== "GET") return;
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request));
  } else if (request.destination === "image") {
    event.respondWith(cacheFirstImage(request));
  }
});
