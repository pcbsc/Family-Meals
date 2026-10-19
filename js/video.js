// Recipe videos: turns a YouTube, TikTok, Instagram or Vimeo link into a player
// the app can show on the dish page and during cook-along.
import { cleanLink } from "./recipe.js";

const YT_ID = /^[A-Za-z0-9_-]{11}$/;
const TT_ID = /^\d{8,25}$/;
const IG_CODE = /^[A-Za-z0-9_-]{5,40}$/;

// The only places a player can come from. index.html allows exactly these as frames.
export const PLAYER_ORIGINS = [
  "https://www.youtube-nocookie.com",
  "https://www.tiktok.com",
  "https://www.instagram.com",
  "https://player.vimeo.com",
];

const SITE_NAMES = { youtube: "YouTube", tiktok: "TikTok", instagram: "Instagram", vimeo: "Vimeo" };

/** "90", "90s", "1m30s", "1h2m3s" → seconds (0 if it isn't a time). */
function seconds(t) {
  if (!t) return 0;
  if (/^\d+$/.test(t)) return Number(t);
  const m = t.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!m || !m[0]) return 0;
  return (Number(m[1]) || 0) * 3600 + (Number(m[2]) || 0) * 60 + (Number(m[3]) || 0);
}

// A start time past a day is a typo; start at the beginning.
const startAt = (t) => {
  const n = seconds(t);
  return n > 0 && n <= 86400 ? n : 0;
};

function youtube(u) {
  const host = u.hostname.replace(/^(www|m|music)\./, "");
  let id = "";
  let tall = false;
  if (host === "youtu.be") id = u.pathname.split("/")[1] || "";
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const [, first, second] = u.pathname.split("/");
    if (first === "watch") id = u.searchParams.get("v") || "";
    else if (["shorts", "embed", "live", "v"].includes(first)) {
      id = second || "";
      tall = first === "shorts";
    }
  } else return null;
  if (!YT_ID.test(id)) return null;
  const start = startAt(u.searchParams.get("t") || u.searchParams.get("start") || "");
  return {
    site: "youtube",
    id,
    tall,
    by: "",
    watchUrl: tall ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0${start ? `&start=${start}` : ""}`,
    thumbUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

function tiktok(u) {
  const host = u.hostname.replace(/^(www|m)\./, "");
  if (host === "vm.tiktok.com" || host === "vt.tiktok.com") return linkOnly("tiktok", u);
  if (host !== "tiktok.com") return null;
  const parts = u.pathname.split("/").filter(Boolean);
  let id = "";
  let by = "";
  if (parts[0]?.startsWith("@") && parts[1] === "video") {
    by = parts[0];
    id = parts[2] || "";
  } else if (parts[0] === "embed" && parts[1] === "v2") id = parts[2] || "";
  else if (parts[0] === "embed") id = parts[1] || "";
  else if (parts[0] === "player" && parts[1] === "v1") id = parts[2] || "";
  else if (parts[0] === "v") id = (parts[1] || "").replace(/\.html$/, "");
  else if (parts[0] === "t") return linkOnly("tiktok", u);
  if (!TT_ID.test(id)) return null;
  if (!/^@[A-Za-z0-9._]{1,30}$/.test(by)) by = "";
  return {
    site: "tiktok",
    id,
    tall: true,
    by,
    watchUrl: by ? `https://www.tiktok.com/${by}/video/${id}` : `https://www.tiktok.com/embed/v2/${id}`,
    embedUrl: `https://www.tiktok.com/player/v1/${id}?rel=0&description=1`,
    thumbUrl: "",
  };
}

function instagram(u) {
  const host = u.hostname.replace(/^(www|m)\./, "");
  if (host !== "instagram.com") return null;
  const parts = u.pathname.split("/").filter(Boolean);
  // instagram.com/p/CODE, /reel/CODE, /reels/CODE, /tv/CODE, or the same after a username.
  const at = parts.findIndex((p) => ["p", "reel", "reels", "tv"].includes(p));
  if (at < 0 || at > 1) return null;
  const code = parts[at + 1] || "";
  if (!IG_CODE.test(code)) return null;
  const kind = parts[at] === "reels" ? "reel" : parts[at];
  const by = at === 1 && /^[A-Za-z0-9._]{1,30}$/.test(parts[0]) ? `@${parts[0]}` : "";
  return {
    site: "instagram",
    id: code,
    tall: true,
    by,
    watchUrl: `https://www.instagram.com/${kind}/${code}/`,
    embedUrl: `https://www.instagram.com/${kind}/${code}/embed/`,
    thumbUrl: "",
  };
}

function vimeo(u) {
  const host = u.hostname.replace(/^www\./, "");
  const parts = u.pathname.split("/").filter(Boolean);
  let id = "";
  if (host === "vimeo.com") id = parts.find((p) => /^\d+$/.test(p)) || "";
  else if (host === "player.vimeo.com" && parts[0] === "video") id = parts[1] || "";
  else return null;
  if (!/^\d{4,12}$/.test(id)) return null;
  return {
    site: "vimeo",
    id,
    tall: false,
    by: "",
    watchUrl: `https://vimeo.com/${id}`,
    embedUrl: `https://player.vimeo.com/video/${id}`,
    thumbUrl: "",
  };
}

// A short share link (vm.tiktok.com/…) can't be turned into a player without
// following it, so the app just opens it.
function linkOnly(site, u) {
  return { site, id: "", tall: true, by: "", watchUrl: u.href, embedUrl: "", thumbUrl: "" };
}

/**
 * What the app needs to show a video link, or null if it isn't a link to a
 * video on a site the app knows. Every URL in the result is rebuilt from the
 * parsed id, never copied from the input (except a short link's watchUrl,
 * which is a checked https link).
 */
export function videoInfo(link) {
  const clean = cleanLink(typeof link === "string" ? link.trim() : "");
  if (!clean) return null;
  let u;
  try {
    u = new URL(clean);
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  const info = youtube(u) || tiktok(u) || instagram(u) || vimeo(u);
  return info && { ...info, siteName: SITE_NAMES[info.site] };
}

/**
 * True if the video appears in any of the texts (pages Claude read, search
 * results, what the family pasted): its id, or for a short link the link itself.
 */
export function videoSeenIn(link, texts) {
  const v = videoInfo(link);
  if (!v) return false;
  const needle = v.id || v.watchUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return texts.some((t) => typeof t === "string" && t.includes(needle));
}

/** True if the link is a video the app can show or open. */
export function isVideoLink(link) {
  return videoInfo(link) != null;
}
