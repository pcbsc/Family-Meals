// The Android app (built with Capacitor) gives the web app a few things a
// browser tab can't: things shared from Instagram or TikTok, saving and sharing
// files, reading aloud and keeping the screen on. In a normal browser none of
// this runs and the web versions are used.

const cap = window.Capacitor;
export const isApp = !!cap?.isNativePlatform?.();
const plugin = (name) => (isApp ? cap.Plugins?.[name] || null : null);

const canceled = (err) => /cancel/i.test(String(err?.message || err));

async function cacheFile(name, data, { base64 = false } = {}) {
  const fs = plugin("Filesystem");
  const safe = String(name).replace(/[^\w.-]+/g, "-").slice(0, 80) || "file";
  const { uri } = await fs.writeFile({ path: safe, data, directory: "CACHE", ...(base64 ? {} : { encoding: "utf8" }) });
  return uri;
}

function blobBase64(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] || "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

/** Saves a file and opens Android's share sheet for it (Drive, email, Calendar…). */
export async function shareFile(name, content, title = name) {
  const share = plugin("Share");
  if (!share || !plugin("Filesystem")) return false;
  const uri = typeof content === "string" ? await cacheFile(name, content) : await cacheFile(name, await blobBase64(content), { base64: true });
  try {
    await share.share({ title, dialogTitle: title, files: [uri] });
  } catch (err) {
    if (!canceled(err)) throw err;
  }
  return true;
}

// Android's WebView has no navigator.share, so the app's "Send the list" and
// "Send the join link" buttons go through the Share plugin instead.
if (plugin("Share")) {
  navigator.share = async ({ title, text, url, files } = {}) => {
    const uris = [];
    for (const f of files || []) uris.push(/^(text|application\/(json|xml))|calendar/.test(f.type) ? await cacheFile(f.name, await f.text()) : await cacheFile(f.name, await blobBase64(f), { base64: true }));
    try {
      await plugin("Share").share({ title, text, url, dialogTitle: title, ...(uris.length ? { files: uris } : {}) });
    } catch (err) {
      throw canceled(err) ? new DOMException("Share canceled", "AbortError") : err;
    }
  };
  navigator.canShare = () => true;
}

/** Reads text aloud with Android's voice. Returns false when there's no app voice. */
export function appSpeak(text, lang = "en-US") {
  const tts = plugin("TextToSpeech");
  if (!tts) return false;
  tts.stop().catch(() => {}).finally(() => tts.speak({ text, lang, rate: 0.92 }).catch(() => {}));
  return true;
}

export function appStopSpeaking() {
  plugin("TextToSpeech")?.stop().catch(() => {});
}

/** Keeps the screen on while cooking. Returns false when not in the app. */
export function appKeepAwake(on) {
  const ka = plugin("KeepAwake");
  if (!ka) return false;
  (on ? ka.keepAwake() : ka.allowSleep()).catch(() => {});
  return true;
}

/**
 * Things shared to the app from Android's Share menu: { title, text, image }.
 * onItem gets the one that opened the app, and every one after that.
 */
export function listenForShares(onItem) {
  const p = plugin("SharedText");
  if (!p) return;
  const take = async (item) => {
    if (!item || (!item.text && !item.image)) return;
    let image = null;
    if (item.image) {
      const bytes = Uint8Array.from(atob(item.image), (c) => c.charCodeAt(0));
      image = new File([bytes], "shared-image", { type: item.imageType || "image/jpeg" });
    }
    onItem({ title: item.title || "", text: item.text || "", url: "", image });
  };
  p.take().then(take).catch(() => {});
  p.addListener("shared", take);
}
