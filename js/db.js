// Everything the app knows lives in IndexedDB on this device: dishes, photos,
// the plan, wishes, shopping-list ticks and settings. Nothing is sent anywhere
// except the Claude requests the family starts themselves.

const DB_NAME = "family-menu";
const VERSION = 1;
const STORES = ["dishes", "photos", "plan", "wishes", "shopping", "settings"];

let dbPromise;

function open() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        for (const name of STORES) {
          if (!db.objectStoreNames.contains(name)) {
            db.createObjectStore(name, { keyPath: name === "settings" ? "key" : "id" });
          }
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
}

function done(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error("Saving was cancelled"));
  });
}

function result(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getAll(store) {
  const db = await open();
  return result(db.transaction(store).objectStore(store).getAll());
}

export async function get(store, id) {
  const db = await open();
  return result(db.transaction(store).objectStore(store).get(id));
}

export async function put(store, value) {
  const db = await open();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).put(value);
  await done(tx);
  return value;
}

export async function remove(store, id) {
  const db = await open();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).delete(id);
  await done(tx);
}

export async function clear(store) {
  const db = await open();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).clear();
  await done(tx);
}

export function newId(prefix = "") {
  const rand = crypto.getRandomValues(new Uint32Array(2));
  return prefix + Date.now().toString(36) + rand[0].toString(36) + rand[1].toString(36).slice(0, 4);
}

// Asks the browser not to clear our data when the device is low on space.
export async function askToKeepData() {
  try {
    if (navigator.storage?.persist && !(await navigator.storage.persisted())) {
      await navigator.storage.persist();
    }
  } catch {
    // Not supported; the backup file is the safety net.
  }
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

async function dataUrlToBlob(url) {
  if (typeof url !== "string" || !url.startsWith("data:image/")) throw new Error("not a photo");
  return (await fetch(url)).blob();
}

/** One JSON file with everything, photos included, for the backup button. */
export async function exportAll() {
  const out = { app: "family-menu", version: 1, savedAt: new Date().toISOString() };
  for (const store of STORES) {
    const rows = await getAll(store);
    if (store === "photos") {
      out.photos = [];
      for (const p of rows) {
        out.photos.push({
          ...p,
          blob: p.blob ? await blobToDataUrl(p.blob) : null,
          thumb: p.thumb ? await blobToDataUrl(p.thumb) : null,
        });
      }
    } else if (store === "settings") {
      // The Claude key stays on this device; a backup file gets passed around.
      out.settings = rows.map((r) => (r.key === "main" ? { ...r, value: { ...r.value, apiKey: "" } } : r));
    } else {
      out[store] = rows;
    }
  }
  return out;
}

/**
 * Replaces everything with a backup's contents (keeping this device's Claude key).
 * The whole file is checked and converted first, then swapped in with one
 * transaction, so a damaged file changes nothing.
 */
export async function importAll(data) {
  if (!data || data.app !== "family-menu") throw new Error("That file isn't a Family Menu backup.");
  const damaged = () => new Error("This backup file is damaged, so it wasn't used. Nothing was changed.");
  if (!Array.isArray(data.dishes) || !Array.isArray(data.settings)) throw damaged();
  const current = await get("settings", "main");
  const rows = {};
  for (const store of STORES) {
    const key = store === "settings" ? "key" : "id";
    const list = Array.isArray(data[store]) ? data[store] : [];
    if (list.some((r) => !r || typeof r !== "object" || typeof r[key] !== "string" || !r[key])) throw damaged();
    rows[store] = list;
  }
  try {
    rows.photos = await Promise.all(rows.photos.map(async (p) => ({
      ...p,
      blob: p.blob ? await dataUrlToBlob(p.blob) : null,
      thumb: p.thumb ? await dataUrlToBlob(p.thumb) : null,
    })));
  } catch {
    throw damaged();
  }
  rows.settings = rows.settings.map((r) =>
    r.key === "main" ? { ...r, value: { ...r.value, apiKey: current?.value?.apiKey || "" } } : r,
  );
  const db = await open();
  const tx = db.transaction(STORES, "readwrite");
  try {
    for (const store of STORES) {
      const os = tx.objectStore(store);
      os.clear();
      for (const r of rows[store]) os.put(r);
    }
  } catch {
    tx.abort();
  }
  await done(tx).catch(() => {
    throw damaged();
  });
}

// The service worker drops things shared from other apps (Instagram, TikTok,
// a screenshot) into this small separate database for the app to pick up.
const INBOX_DB = "family-menu-inbox";

function openInbox() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(INBOX_DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore("shared", { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function takeSharedItem() {
  const db = await openInbox();
  const items = await result(db.transaction("shared").objectStore("shared").getAll());
  if (!items.length) return null;
  const latest = items.sort((a, b) => b.at - a.at)[0];
  const tx = db.transaction("shared", "readwrite");
  tx.objectStore("shared").clear();
  await done(tx);
  return latest;
}
