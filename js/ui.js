// Small UI toolkit: an element builder, bottom sheets that close with
// Android's back gesture, toasts, a grown-up PIN pad, confetti, and photo
// resizing.

/** h("button.btn.primary", { onclick }, "Save") — tag.class#id, props, children. */
export function h(spec, props, ...children) {
  if (props == null || typeof props !== "object" || props instanceof Node || Array.isArray(props)) {
    if (props != null) children.unshift(props);
    props = {};
  }
  const [, tag = "div", rest = ""] = spec.match(/^([a-z0-9-]*)(.*)$/i);
  const el = document.createElement(tag || "div");
  for (const part of rest.match(/[.#][^.#]+/g) || []) {
    if (part[0] === ".") el.classList.add(part.slice(1));
    else el.id = part.slice(1);
  }
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
    else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
    else if (k === "class") el.className += " " + v;
    else if (k === "dataset") Object.assign(el.dataset, v);
    else if (k in el && k !== "list" && k !== "form" && typeof v !== "string") el[k] = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  append(el, children);
  return el;
}

function append(el, children) {
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
}

export function clearChildren(el) {
  while (el.firstChild) el.firstChild.remove();
}

const PALETTE = ["#FFE1D6", "#FFF0C2", "#DDF4D8", "#D9ECFF", "#EADFFF", "#FFDDEB", "#D6F3EF", "#FCE6CC"];

export function colorFor(text) {
  let n = 0;
  for (const ch of String(text || "")) n = (n * 31 + ch.codePointAt(0)) >>> 0;
  return PALETTE[n % PALETTE.length];
}

// ---------- Sheets (bottom pop-ups) ----------

const sheetStack = [];
let pendingBack = null;

window.addEventListener("popstate", () => {
  if (pendingBack) {
    const done = pendingBack;
    pendingBack = null;
    done();
    return;
  }
  const top = sheetStack[sheetStack.length - 1];
  if (top && !top.closing) top.close(true);
});

/**
 * Opens a bottom sheet. build(close) returns the content. Returns { close }.
 * The phone's back gesture closes the sheet instead of leaving the screen.
 */
export function openSheet(build, { title, wide = false, onClose } = {}) {
  const backdrop = h("div.sheet-backdrop");
  const panel = h(`div.sheet${wide ? ".wide" : ""}`, { role: "dialog", "aria-modal": "true" });
  const sheet = { closing: false, closed: null, close: null };
  // Resolves once the back-step is finished, so callers can navigate safely after it.
  sheet.close = (fromHistory = false) => {
    if (sheet.closing) return sheet.closed;
    sheet.closing = true;
    const i = sheetStack.indexOf(sheet);
    if (i >= 0) sheetStack.splice(i, 1);
    backdrop.classList.add("leaving");
    panel.classList.add("leaving");
    setTimeout(() => {
      backdrop.remove();
      panel.remove();
    }, 180);
    if (fromHistory) {
      sheet.closed = Promise.resolve();
    } else {
      sheet.closed = new Promise((resolve) => {
        pendingBack = resolve;
        setTimeout(() => {
          if (pendingBack === resolve) pendingBack = null;
          resolve();
        }, 500);
      });
      history.back();
    }
    onClose?.();
    return sheet.closed;
  };
  const closeBtn = h("button.icon-btn.sheet-x", { "aria-label": "Close", onclick: () => sheet.close() }, "✕");
  panel.append(h("div.sheet-handle"), title ? h("div.sheet-head", h("h2", title), closeBtn) : closeBtn);
  const body = h("div.sheet-body");
  append(body, [build(() => sheet.close(), sheet)]);
  panel.append(body);
  backdrop.addEventListener("click", () => sheet.close());
  document.body.append(backdrop, panel);
  history.pushState({ sheet: true }, "");
  sheetStack.push(sheet);
  requestAnimationFrame(() => panel.querySelector("[autofocus]")?.focus());
  return sheet;
}

export async function closeAllSheets() {
  while (sheetStack.length) await sheetStack[sheetStack.length - 1].close();
}

export function confirmSheet(message, { yes = "Yes", no = "Cancel", danger = false } = {}) {
  return new Promise((resolve) => {
    let answered = false;
    const s = openSheet(
      (close) =>
        h("div.stack",
          h("p.big-text", message),
          h("div.row",
            h("button.btn.soft", { onclick: () => close() }, no),
            h(`button.btn.${danger ? "danger" : "primary"}`, {
              onclick: () => {
                answered = true;
                close().then(() => resolve(true));
              },
            }, yes),
          ),
        ),
      { onClose: () => !answered && resolve(false) },
    );
    return s;
  });
}

// ---------- Toasts ----------

export function toast(message, { emoji = "✅", ms = 2600 } = {}) {
  const t = h("div.toast", { role: "status" }, h("span.toast-emoji", emoji), h("span", message));
  document.body.append(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 300);
  }, ms);
}

// ---------- Confetti ----------

export function confetti(emojis = ["🎉", "⭐", "✨", "💛", "🍚", "🥳"]) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layer = h("div.confetti");
  for (let i = 0; i < 26; i++) {
    const piece = h("span", emojis[i % emojis.length]);
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.3}s`;
    piece.style.fontSize = `${22 + Math.random() * 22}px`;
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
    layer.append(piece);
  }
  document.body.append(layer);
  setTimeout(() => layer.remove(), 2200);
}

// ---------- Grown-up PIN ----------

let unlockedUntil = 0;

/** Resolves true when a grown-up has entered the PIN (or there's no PIN). */
export function grownUpCheck(pin) {
  if (!pin || Date.now() < unlockedUntil) return Promise.resolve(true);
  return new Promise((resolve) => {
    let entered = "";
    let ok = false;
    const dots = h("div.pin-dots");
    const msg = h("p.muted.center", "Grown-ups only: enter the PIN");
    const draw = () => {
      clearChildren(dots);
      for (let i = 0; i < pin.length; i++) dots.append(h(`span${i < entered.length ? ".on" : ""}`));
    };
    draw();
    openSheet(
      (close) => {
        const press = (digit) => {
          if (digit === "⌫") entered = entered.slice(0, -1);
          else if (entered.length < pin.length) entered += digit;
          draw();
          if (entered.length === pin.length) {
            if (entered === pin) {
              ok = true;
              unlockedUntil = Date.now() + 10 * 60 * 1000;
              close().then(() => resolve(true));
            } else {
              msg.textContent = "Oops, that's not it. Try again!";
              dots.classList.add("shake");
              setTimeout(() => dots.classList.remove("shake"), 400);
              entered = "";
              setTimeout(draw, 300);
            }
          }
        };
        return h("div.stack.center",
          h("div.huge-emoji", "🔒"),
          msg,
          dots,
          h("div.pin-pad", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((k) =>
            k ? h("button.pin-key", { onclick: () => press(k) }, k) : h("span"),
          )),
        );
      },
      { onClose: () => !ok && resolve(false) },
    );
  });
}

// ---------- Photos ----------

async function drawResized(file, maxSide, quality) {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" }).catch(() => createImageBitmap(file));
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const hgt = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = hgt;
  canvas.getContext("2d").drawImage(bitmap, 0, 0, w, hgt);
  bitmap.close?.();
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

/** Shrinks a camera photo to a sensible size, plus a small thumbnail for lists. */
export async function preparePhoto(file) {
  const [blob, thumb] = await Promise.all([drawResized(file, 1400, 0.82), drawResized(file, 480, 0.78)]);
  return { blob, thumb };
}

/** Base64 JPEG for sending a recipe screenshot to Claude. */
export async function imageForClaude(file) {
  const blob = await drawResized(file, 1568, 0.85);
  const buf = new Uint8Array(await blob.arrayBuffer());
  let binary = "";
  for (let i = 0; i < buf.length; i += 0x8000) binary += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return { media_type: "image/jpeg", data: btoa(binary) };
}

/** Opens the camera or photo picker; resolves with a File or null. */
export function pickImage({ camera = false } = {}) {
  return new Promise((resolve) => {
    const input = h("input", { type: "file", accept: "image/*", style: { display: "none" } });
    if (camera) input.setAttribute("capture", "environment");
    input.addEventListener("change", () => {
      resolve(input.files?.[0] || null);
      input.remove();
    });
    input.addEventListener("cancel", () => {
      resolve(null);
      input.remove();
    });
    document.body.append(input);
    input.click();
  });
}

// ---------- Sounds, speech, screen ----------

let audio;
export function ding(times = 3) {
  try {
    audio ||= new AudioContext();
    for (let i = 0; i < times; i++) {
      const t = audio.currentTime + i * 0.45;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.frequency.value = i % 2 ? 1046 : 784;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.4, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      osc.connect(gain).connect(audio.destination);
      osc.start(t);
      osc.stop(t + 0.42);
    }
  } catch {
    // No sound available; the screen still flashes.
  }
  navigator.vibrate?.([300, 150, 300, 150, 300]);
}

export function speak(text) {
  if (!("speechSynthesis" in window)) return false;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.92;
  u.lang = "en-US";
  speechSynthesis.speak(u);
  return true;
}

let wakeLock = null;
export async function keepScreenOn(on) {
  try {
    if (on && "wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen");
    else if (!on && wakeLock) {
      await wakeLock.release();
      wakeLock = null;
    }
  } catch {
    // Not allowed right now (e.g. battery saver); cooking still works.
  }
}

// ---------- Formatting ----------

export function prettyDate(date, opts = { weekday: "long", month: "long", day: "numeric" }) {
  return new Date(date).toLocaleDateString(undefined, opts);
}

export function minutesText(n) {
  if (!n) return "";
  if (n < 60) return `${n} min`;
  const hrs = Math.floor(n / 60);
  const m = n % 60;
  return m ? `${hrs} hr ${m} min` : `${hrs} hr`;
}

export function downloadFile(name, content, type = "application/json") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = h("a", { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
