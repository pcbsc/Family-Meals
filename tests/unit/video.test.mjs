// Video links: YouTube, TikTok, Instagram and Vimeo links become players, and
// nothing else (or anything odd) ever does.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { videoInfo, isVideoLink, videoSeenIn, PLAYER_ORIGINS } from "../../js/video.js";

test("YouTube links of every shape", () => {
  const id = "i1djfV9uigc";
  for (const link of [
    `https://www.youtube.com/watch?v=${id}`,
    `https://m.youtube.com/watch?v=${id}&pp=abc`,
    `https://youtu.be/${id}`,
    `https://youtu.be/${id}?si=share123`,
    `https://www.youtube.com/embed/${id}`,
    `youtube.com/watch?v=${id}`,
  ]) {
    const v = videoInfo(link);
    assert.equal(v?.site, "youtube", link);
    assert.equal(v.id, id);
    assert.equal(v.embedUrl, `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0`);
    assert.equal(v.thumbUrl, `https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
    assert.equal(v.tall, false);
  }
  const short = videoInfo("https://www.youtube.com/shorts/EEa5F7YxwdY");
  assert.equal(short.tall, true);
  assert.equal(short.watchUrl, "https://www.youtube.com/shorts/EEa5F7YxwdY");
  const timed = videoInfo(`https://youtu.be/${id}?t=1m30s`);
  assert.match(timed.embedUrl, /&start=90$/);
  assert.equal(timed.watchUrl, `https://www.youtube.com/watch?v=${id}&t=90s`);
});

test("TikTok links, with the creator's handle", () => {
  const v = videoInfo("https://www.tiktok.com/@emilymariko/video/7010506729012219141?lang=en");
  assert.equal(v.site, "tiktok");
  assert.equal(v.id, "7010506729012219141");
  assert.equal(v.by, "@emilymariko");
  assert.equal(v.tall, true);
  assert.equal(v.embedUrl, "https://www.tiktok.com/player/v1/7010506729012219141?rel=0&description=1");
  assert.equal(v.watchUrl, "https://www.tiktok.com/@emilymariko/video/7010506729012219141");
  assert.equal(videoInfo("https://www.tiktok.com/embed/v2/7010506729012219141").id, "7010506729012219141");
  // Short share links can't become a player, but can still be opened.
  const shortLink = videoInfo("https://vm.tiktok.com/ZMabc123/");
  assert.equal(shortLink.embedUrl, "");
  assert.equal(shortLink.watchUrl, "https://vm.tiktok.com/ZMabc123/");
  assert.equal(videoInfo("https://www.tiktok.com/@emilymariko"), null, "a profile isn't a video");
});

test("Instagram posts and reels", () => {
  const reel = videoInfo("https://www.instagram.com/reel/C8xYz12AbCd/?igsh=abc");
  assert.equal(reel.site, "instagram");
  assert.equal(reel.embedUrl, "https://www.instagram.com/reel/C8xYz12AbCd/embed/");
  assert.equal(videoInfo("https://instagram.com/reels/C8xYz12AbCd").embedUrl, "https://www.instagram.com/reel/C8xYz12AbCd/embed/");
  assert.equal(videoInfo("https://www.instagram.com/p/C8xYz12AbCd/").embedUrl, "https://www.instagram.com/p/C8xYz12AbCd/embed/");
  assert.equal(videoInfo("https://www.instagram.com/seonkyounglongest/reel/C8xYz12AbCd/").by, "@seonkyounglongest");
  assert.equal(videoInfo("https://www.instagram.com/seonkyounglongest/"), null, "a profile isn't a video");
});

test("Vimeo", () => {
  assert.equal(videoInfo("https://vimeo.com/123456789").embedUrl, "https://player.vimeo.com/video/123456789");
});

test("anything else isn't a video", () => {
  for (const link of [
    "", null, undefined, 42, "hello", "javascript:alert(1)", "data:text/html,hi",
    "https://seonkyounglongest.com/bulgogi/", "https://www.youtube.com/@AsianAtHome",
    "https://www.youtube.com/watch?v=short", "https://www.youtube.com/watch?v=i1djfV9uigc%22onload%3D",
    "https://youtube.com.evil.example/watch?v=i1djfV9uigc", "https://evil.example/?u=https://youtu.be/i1djfV9uigc",
    "https://www.tiktok.com/@x/video/abc", "ftp://youtu.be/i1djfV9uigc",
  ]) {
    assert.equal(videoInfo(link), null, String(link));
    assert.equal(isVideoLink(link), false);
  }
});

test("players only ever come from the sites index.html allows", () => {
  const csp = readFileSync(new URL("../../index.html", import.meta.url), "utf8").match(/frame-src ([^;]+);/)[1].split(" ");
  assert.deepEqual([...csp].sort(), [...PLAYER_ORIGINS].sort());
  const pieces = [
    "https://", "http://", "www.", "m.", "youtube.com", "youtu.be", "tiktok.com", "vm.tiktok.com", "instagram.com",
    "vimeo.com", "player.vimeo.com", "/watch?v=", "/shorts/", "/embed/", "/@cook/video/", "/reel/", "/p/", "/",
    "i1djfV9uigc", "7010506729012219141", "C8xYz12AbCd", "123456", "?t=", "&t=", "90", "1m", "\"", "'", "<", ">",
    "%22", "javascript:", "#", " ", "..", "@", ":443", "evil.example",
  ];
  let seed = 7;
  const rand = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
  for (let i = 0; i < Number(process.env.FUZZ_RUNS || 3000); i++) {
    const link = Array.from({ length: 1 + Math.floor(rand() * 8) }, () => pieces[Math.floor(rand() * pieces.length)]).join("");
    const v = videoInfo(link);
    if (!v) continue;
    if (v.embedUrl) {
      assert.ok(PLAYER_ORIGINS.includes(new URL(v.embedUrl).origin), `${link} → ${v.embedUrl}`);
      assert.doesNotMatch(v.embedUrl, /["'<> ]/);
    }
    assert.match(v.watchUrl, /^https?:\/\//, link);
  }
});

test("a video only counts as seen if its id is in what Claude read or was given", async () => {
  const { toolEvidence } = await import("../../js/ai.js");
  const reply = [
    { type: "text", text: "I remember https://www.youtube.com/watch?v=MadeUpVid01" },
    { type: "web_search_tool_result", content: [{ type: "web_search_result", url: "https://www.youtube.com/watch?v=i1djfV9uigc", title: "Japchae" }] },
    { type: "web_fetch_tool_result", content: { type: "web_fetch_result", url: "https://vm.tiktok.com/ZMabc123/", content: { type: "document", source: { type: "text", data: "<blockquote cite=\"https://www.tiktok.com/@cook/video/7398765432109876543\">" } } } },
    // Results that came back through the tools' own filtering code.
    { type: "code_execution_tool_result", content: { type: "code_execution_result", stdout: "https://youtu.be/EEa5F7YxwdY Easy japchae" } },
    { type: "tool_use", name: "save_video", input: { url: "https://youtu.be/AAAAAAAAAAA" } },
  ];
  const seen = toolEvidence(reply);
  assert.ok(videoSeenIn("https://youtu.be/i1djfV9uigc", seen), "a search result");
  assert.ok(videoSeenIn("https://www.tiktok.com/@cook/video/7398765432109876543", seen), "a link inside a page Claude read");
  assert.ok(videoSeenIn("https://www.youtube.com/shorts/EEa5F7YxwdY", seen), "filtered results");
  assert.ok(!videoSeenIn("https://www.youtube.com/watch?v=MadeUpVid01", seen), "Claude's own words don't count");
  assert.ok(!videoSeenIn("https://youtu.be/AAAAAAAAAAA", seen), "nor its tool call");
  assert.ok(!videoSeenIn("", seen));
  assert.ok(videoSeenIn("https://vm.tiktok.com/ZMabc123/", ["shared: https://vm.tiktok.com/ZMabc123/"]), "a short link the family shared");
  assert.deepEqual(toolEvidence(null), []);
});

test("an impossible start time is ignored", () => {
  assert.doesNotMatch(videoInfo("https://youtu.be/i1djfV9uigc?t=99999999999999999999").embedUrl, /start/);
  assert.match(videoInfo("https://youtu.be/i1djfV9uigc?t=1h").embedUrl, /&start=3600$/);
});
