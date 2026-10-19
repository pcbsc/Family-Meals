// Shared shopping list: both grown-ups' phones see the same list and the same
// ticks, a few seconds apart. It uses the family's own free Firebase project
// (Firestore plus anonymous sign-in) through plain web requests, so there's no
// SDK to load. The list is one document whose id is a long random secret; the
// join link carries it, with the project's public web key, to the other phone.
import { state, saveSettings } from "./store.js";

const ID_HOST = "https://identitytoolkit.googleapis.com";
const TOKEN_HOST = "https://securetoken.googleapis.com";
const FS_HOST = "https://firestore.googleapis.com";

const API_KEY = /^[A-Za-z0-9_-]{20,80}$/;
const PROJECT = /^[a-z][a-z0-9-]{3,38}[a-z0-9]$/;
const FAMILY = /^[A-Za-z0-9]{24,64}$/;

/** The sharing setup on this phone, or null when the list isn't shared. */
export function shareConfig() {
  const s = state.settings.share;
  return s && API_KEY.test(s.apiKey) && PROJECT.test(s.projectId) && FAMILY.test(s.familyId) ? s : null;
}

export function validSetup(apiKey, projectId) {
  return API_KEY.test(String(apiKey || "").trim()) && PROJECT.test(String(projectId || "").trim());
}

export function newFamilyId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return [...bytes].map((b) => chars[b % chars.length]).join("");
}

/** The link that puts another phone on this list. */
export function joinLink(cfg, base = `${location.origin}${location.pathname}`) {
  const q = new URLSearchParams({ k: cfg.apiKey, p: cfg.projectId, f: cfg.familyId });
  return `${base}#/join?${q}`;
}

/** Reads a join link's query (k, p, f). Returns the setup or null if anything looks wrong. */
export function parseJoin(params) {
  const apiKey = params.get("k") || "";
  const projectId = params.get("p") || "";
  const familyId = params.get("f") || "";
  return API_KEY.test(apiKey) && PROJECT.test(projectId) && FAMILY.test(familyId) ? { apiKey, projectId, familyId } : null;
}

/** A Firestore-safe field name for a shopping item ("green onion" → "k1x9…"). */
export function tickId(key) {
  let a = 0x811c9dc5;
  let b = 0x01000193;
  for (const ch of String(key)) {
    const c = ch.codePointAt(0);
    a = Math.imul(a ^ c, 0x01000193) >>> 0;
    b = Math.imul(b + c, 0x5bd1e995) >>> 0;
  }
  return `k${a.toString(36)}${b.toString(36)}`;
}

export function extraId() {
  const r = crypto.getRandomValues(new Uint32Array(2));
  return `x${Date.now().toString(36)}${r[0].toString(36)}${r[1].toString(36).slice(0, 3)}`;
}

// ---------- Firestore values ----------

export function toValue(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === "string") return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toValue) } };
  return { mapValue: { fields: toFields(v) } };
}

export function toFields(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined).map(([k, v]) => [k, toValue(v)]));
}

export function fromValue(v) {
  if (!v || typeof v !== "object") return null;
  if ("stringValue" in v) return v.stringValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(fromValue);
  if ("mapValue" in v) return fromFields(v.mapValue.fields || {});
  return null;
}

export function fromFields(fields) {
  return Object.fromEntries(Object.entries(fields || {}).map(([k, v]) => [k, fromValue(v)]));
}

/** The shared list as the app uses it, with safe defaults for anything missing or odd. */
export function readDoc(doc) {
  const f = fromFields(doc?.fields);
  const extras = f.extras && typeof f.extras === "object" ? f.extras : {};
  return {
    week: typeof f.week === "string" ? f.week : "",
    items: Array.isArray(f.items) ? f.items.filter((i) => i && typeof i.key === "string" && typeof i.name === "string") : [],
    ticks: f.ticks && typeof f.ticks === "object" ? f.ticks : {},
    extras: Object.entries(extras)
      .filter(([, x]) => x && typeof x.text === "string")
      .map(([id, x]) => ({ id, text: x.text.slice(0, 80), checked: !!x.checked, at: Number(x.at) || 0 }))
      .sort((a, b) => a.at - b.at),
    doneAt: Number(f.doneAt) || 0,
    bought: Array.isArray(f.bought) ? f.bought.filter((x) => typeof x === "string") : [],
    updateTime: doc?.updateTime || "",
  };
}

// ---------- Requests ----------

let token = null; // { idToken, exp, apiKey }

async function json(res) {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body?.error?.message || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return body;
}

async function idToken(cfg) {
  if (token && token.apiKey === cfg.apiKey && token.exp > Date.now() + 60_000) return token.idToken;
  const refresh = state.settings.share?.refreshToken;
  let out;
  if (refresh) {
    try {
      const r = await json(await fetch(`${TOKEN_HOST}/v1/token?key=${encodeURIComponent(cfg.apiKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
      }));
      out = { idToken: r.id_token, refreshToken: r.refresh_token, expiresIn: r.expires_in };
    } catch (err) {
      if (err.status !== 400) throw err; // offline: try again later. 400: the old sign-in is gone, so sign in again.
    }
  }
  if (!out) {
    out = await json(await fetch(`${ID_HOST}/v1/accounts:signUp?key=${encodeURIComponent(cfg.apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ returnSecureToken: true }),
    }));
  }
  token = { idToken: out.idToken, exp: Date.now() + (Number(out.expiresIn) || 3600) * 1000, apiKey: cfg.apiKey };
  if (out.refreshToken && out.refreshToken !== refresh && state.settings.share) {
    await saveSettings({ share: { ...state.settings.share, refreshToken: out.refreshToken } });
  }
  return token.idToken;
}

function docUrl(cfg, query = "") {
  return `${FS_HOST}/v1/projects/${cfg.projectId}/databases/(default)/documents/families/${cfg.familyId}${query}`;
}

async function request(cfg, method, query = "", body) {
  const send = async () => fetch(docUrl(cfg, query), {
    method,
    headers: { Authorization: `Bearer ${await idToken(cfg)}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  let res = await send();
  // A sign-in that expired early: get a fresh one once.
  if (res.status === 401) {
    token = null;
    res = await send();
  }
  return res;
}

/** The shared list, or null if it hasn't been made yet. */
export async function readList(cfg) {
  const res = await request(cfg, "GET");
  if (res.status === 404) return null;
  return readDoc(await json(res));
}

/** Writes some fields. paths are the field paths to change; a path left out of fields is deleted. */
export async function writeList(cfg, fields, paths, { create = false } = {}) {
  const q = new URLSearchParams();
  for (const p of paths) q.append("updateMask.fieldPaths", p);
  if (create) q.set("currentDocument.exists", "false");
  return readDoc(await json(await request(cfg, "PATCH", `?${q}`, { fields: toFields(fields) })));
}

/** Makes the family's list and checks the setup works. */
export async function startList(cfg, week) {
  return writeList(cfg, { week, items: [], ticks: {}, extras: {}, doneAt: 0, bought: [] }, ["week", "items", "ticks", "extras", "doneAt", "bought"], { create: true });
}

export function forgetToken() {
  token = null;
}
