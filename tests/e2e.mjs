// End-to-end test: drives the real app in Chromium with Claude's API mocked.
// Run with `npm run e2e`. Exits non-zero on the first failure.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { readFileSync, writeFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { Buffer } from "node:buffer";
import { STARTER_DISHES, LATEST_STARTER_BATCH } from "../js/seed.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png",
  ".svg": "image/svg+xml", ".woff2": "font/woff2", ".txt": "text/plain",
};

const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  const file = join(ROOT, path.endsWith("/") ? path + "index.html" : path);
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream", "cache-control": "no-store" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}/`;

// ---------- Fake Claude ----------

function sse(content, stopReason) {
  const events = [{
    type: "message_start",
    message: { id: "msg_test", type: "message", role: "assistant", model: "claude-opus-5-5", content: [], stop_reason: null, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 1 } },
  }];
  content.forEach((block, index) => {
    if (block.type === "tool_use" || block.type === "server_tool_use") {
      events.push({ type: "content_block_start", index, content_block: { ...block, input: {} } });
      events.push({ type: "content_block_delta", index, delta: { type: "input_json_delta", partial_json: JSON.stringify(block.input) } });
    } else if (block.type.endsWith("_tool_result")) {
      events.push({ type: "content_block_start", index, content_block: block });
    } else {
      events.push({ type: "content_block_start", index, content_block: { type: "text", text: "" } });
      events.push({ type: "content_block_delta", index, delta: { type: "text_delta", text: block.text } });
    }
    events.push({ type: "content_block_stop", index });
  });
  events.push({ type: "message_delta", delta: { stop_reason: stopReason, stop_sequence: null }, usage: { output_tokens: 42 } });
  events.push({ type: "message_stop" });
  return events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`).join("");
}

const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
const calls = [];
let reply = () => sse([{ type: "text", text: "no handler" }], "end_turn");

const recipe = (over = {}) => ({
  name: "Tteokguk", nameKo: "떡국", emoji: "🥣", description: "Rice cake soup for New Year.",
  meals: ["dinner"], categories: ["korean", "soup"], servings: 4, prepMinutes: 10, cookMinutes: 20, spicy: 0,
  ingredients: ["1 lb rice cakes", "6 cups beef broth", "2 eggs"], steps: ["Soak the rice cakes for 10 minutes.", "Boil the broth.", "Add rice cakes and eggs."],
  notes: "", sourceName: "Seonkyoung Longest", sourceUrl: "https://seonkyounglongest.com/tteokguk/", imageUrl: "", ...over,
});

// Stand-ins for the video sites, so the players load without the internet.
const PIXEL = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");
const fakePlayer = (route) => route.fulfill({ status: 200, headers: { "content-type": "text/html" }, body: "<!doctype html><p>fake player</p>" });

async function setupRoutes(context) {
  await context.route("https://www.tiktok.com/player/**", fakePlayer);
  await context.route("https://www.youtube-nocookie.com/**", fakePlayer);
  await context.route("https://www.instagram.com/**/embed/", fakePlayer);
  await context.route("https://i.ytimg.com/**", (route) => route.fulfill({ status: 200, headers: { "content-type": "image/png" }, body: PIXEL }));
  await context.route("https://api.anthropic.com/**", async (route) => {
    const req = route.request();
    if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: CORS });
    if (req.url().includes("/v1/models/")) {
      return route.fulfill({ status: 200, headers: { ...CORS, "content-type": "application/json" }, body: JSON.stringify({ id: "claude-opus-5-5", type: "model" }) });
    }
    const body = JSON.parse(req.postData());
    calls.push({ body, headers: req.headers() });
    const out = reply(body, calls.length);
    if (typeof out === "object") {
      return route.fulfill({ status: out.status, headers: { ...CORS, "content-type": "application/json" }, body: JSON.stringify(out.error) });
    }
    return route.fulfill({ status: 200, headers: { ...CORS, "content-type": "text/event-stream" }, body: out });
  });
}

// ---------- Helpers ----------

const errors = [];
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true, serviceWorkers: "block", acceptDownloads: true });
await setupRoutes(context);
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && !/Failed to load resource/.test(m.text()) && errors.push(m.text()));

let step = 0;
const failed = [];
// Records a failure (with a screenshot) and carries on, so one run shows every problem.
async function check(name, fn) {
  step++;
  try {
    await fn();
    console.log(`ok ${step} - ${name}`);
  } catch (err) {
    console.log(`not ok ${step} - ${name}\n  ${String(err.message).split("\n")[0]}`);
    failed.push(name);
    await page.screenshot({ path: join(ROOT, `tests/failure-${step}.png`) }).catch(() => {});
    await page.keyboard.press("Escape").catch(() => {});
  }
}

const sheet = () => page.locator(".sheet").last();
async function closeSheets() {
  while (await page.locator(".sheet:not(.leaving)").count()) {
    await page.locator(".sheet:not(.leaving) .sheet-x").last().click();
    await page.waitForTimeout(250);
  }
}
async function enterPin(pin) {
  for (const d of pin) await page.locator(".pin-key", { hasText: d }).first().click();
}

// ---------- The walk-through ----------

await check("first run sets up the family and the starter menu", async () => {
  await page.goto(BASE);
  await page.getByText("Let's set up").click();
  await page.getByText("Who eats with us?").waitFor();
  await page.getByText("Next ▶").click();
  await page.getByText("Yes, add them").click();
  await page.locator(".meal-cards").waitFor();
  await page.locator(".tabbar a[data-tab=menu]").click();
  await page.locator(".tile").first().waitFor();
  assert.equal(await page.locator(".tile").count(), STARTER_DISHES.length);
  // Nearly every starter comes with a cooking video.
  assert.equal(await page.locator(".tile-video").count(), STARTER_DISHES.filter((d) => d.videoUrl).length);
});

await check("the menu filters by kind of food", async () => {
  const italian = STARTER_DISHES.filter((d) => d.cuisine === "italian").length;
  await page.locator(".kind", { hasText: "Italian" }).click();
  await page.waitForTimeout(100);
  assert.equal(await page.locator(".tile").count(), italian);
  await page.getByText("Classic Lasagna").waitFor();
  // Kinds and meals work together: Italian lunches only.
  await page.locator(".filter", { hasText: "Lunch" }).click();
  assert.equal(await page.locator(".tile").count(), STARTER_DISHES.filter((d) => d.cuisine === "italian" && d.meals.includes("lunch")).length);
  await page.locator(".filter", { hasText: "All" }).first().click();
  // A kind far along the row stays in view after it's picked.
  await page.locator(".kind", { hasText: "Mediterranean" }).click();
  await page.waitForTimeout(100);
  assert.ok(await page.locator(".kinds").evaluate((row) => row.scrollLeft > 0), "the row kept its place");
  await page.locator(".kinds").evaluate((row) => (row.scrollLeft = 0));
  await page.locator(".kind", { hasText: "All kinds" }).click();
  assert.equal(await page.locator(".tile").count(), STARTER_DISHES.length);
  await page.goto(BASE + "#/dish/seed-pad-thai");
  await page.locator(".fact", { hasText: "Thai" }).waitFor();
  await page.goto(BASE + "#/menu");
});

await check("families on an older version get the new starter recipes, once", async () => {
  const before = await page.evaluate(async () => {
    const store = await import("./js/store.js");
    const { STARTER_DISHES: all } = await import("./js/seed.js");
    // Like a family from before: only the first batch, minus one they deleted.
    for (const d of all.filter((x) => x.batch > 1)) await store.deleteDish(`seed-${d.seedKey}`);
    await store.deleteDish("seed-apple-pb");
    // Their starters had no videos then, and they'd taken one off on purpose.
    for (const d of store.dishList()) await store.updateDish(d.id, { videoUrl: undefined });
    await store.updateDish("seed-kimbap", { videoUrl: "", videoRemoved: true });
    await store.saveSettings({ starterBatch: undefined });
    return store.state.dishes.size;
  });
  await page.reload();
  await page.locator(".toast", { hasText: "new recipes are on the menu" }).waitFor();
  const after = await page.evaluate(async () => {
    const { state } = await import("./js/store.js");
    return {
      size: state.dishes.size, deletedBack: state.dishes.has("seed-apple-pb"), batch: state.settings.starterBatch,
      bulgogiVideo: state.dishes.get("seed-bulgogi").videoUrl, kimbapVideo: state.dishes.get("seed-kimbap").videoUrl,
    };
  });
  assert.equal(after.size, before + STARTER_DISHES.filter((d) => d.batch > 1).length);
  assert.equal(after.deletedBack, false, "a starter they deleted stays deleted");
  assert.equal(after.batch, LATEST_STARTER_BATCH);
  assert.equal(after.bulgogiVideo, STARTER_DISHES.find((d) => d.seedKey === "bulgogi").videoUrl, "their starters got videos");
  assert.equal(after.kimbapVideo, "", "a video they took off stays off");
  await page.reload();
  await page.locator(".tile").first().waitFor();
  await page.waitForTimeout(300);
  assert.equal(await page.locator(".toast", { hasText: "new recipes are on the menu" }).count(), 0, "only once");
});

await check("Discover has trending, Korean and American ideas, with what testers said", async () => {
  await page.goto(BASE + "#/discover");
  await page.getByText("Salmon Rice Bowl").waitFor();
  await page.getByText("worth the hype").first().waitFor();
  // The salmon bowl is already a starter with the same TikTok.
  await page.locator(".discover-item", { hasText: "Salmon Rice Bowl" }).getByText("In menu").waitFor();
  await page.locator(".kind", { hasText: "Korean" }).click();
  await page.getByRole("heading", { name: "Seonkyoung Longest" }).waitFor();
  await page.getByText("Jjajangmyeon").first().waitFor();
  await page.locator(".kind", { hasText: "Italian" }).click();
  await page.getByText("Flatbread Pizza").waitFor();
  await page.locator(".kind", { hasText: "American" }).click();
  await page.getByRole("heading", { name: "Natasha's Kitchen" }).waitFor();
  assert.equal(await page.getByText("Salmon Rice Bowl").count(), 0);
});

await check("a trending dish plays the creator's video right in the app", async () => {
  await page.goto(BASE + "#/dish/seed-salmon-rice-bowl");
  await page.locator(".video-card").waitFor();
  await page.getByText("@emilymariko on TikTok").waitFor();
  assert.equal(await page.locator(".video-card iframe").count(), 0, "nothing loads until it's tapped");
  await page.getByLabel("Play the video on TikTok").click();
  assert.equal(await page.locator(".video-card iframe").getAttribute("src"),
    "https://www.tiktok.com/player/v1/7010506729012219141?rel=0&description=1&autoplay=1");
  // The player really loads (the page's security rules allow it).
  await page.frameLocator(".video-card iframe").getByText("fake player").waitFor();
  // Tapping the heart while it plays doesn't restart it.
  const player = () => page.frames().find((f) => f.url().includes("tiktok.com/player"));
  await player().evaluate(() => (window.stillPlaying = true));
  await page.locator(".dish-actions .action", { hasText: "Favorite" }).click();
  await page.locator(".dish-actions .action[aria-pressed=true]").waitFor();
  assert.equal(await player().evaluate(() => window.stillPlaying), true, "the video kept playing");
  await page.locator(".dish-actions .action", { hasText: "Favorite" }).click();
});

await check("cook-along keeps the video on screen while the steps change", async () => {
  await page.getByText("Cook together").click();
  await page.getByText("Get ready!").waitFor();
  await page.getByLabel("Show the video").click();
  await page.frameLocator(".cook-video iframe").getByText("fake player").waitFor();
  await page.locator(".cook-video iframe").evaluate((el) => (el.dataset.mark = "same"));
  await page.getByText("Let's cook ▶").click();
  await page.getByText("Next ▶").click();
  assert.equal(await page.locator(".cook-video iframe").getAttribute("data-mark"), "same", "the video wasn't restarted");
  await page.getByLabel("Hide the video").click();
  assert.equal(await page.locator(".cook-video iframe").count(), 0);
  await page.getByLabel("Stop cooking").click();
  await page.locator(".dish-title").waitFor();
});

await check("a grown-up can paste a video link onto any dish, and take it off", async () => {
  await page.goto(BASE + "#/dish/seed-gamja-jorim");
  await page.getByText("📺 Add a video").click();
  await sheet().getByLabel("Video link").fill("https://seonkyounglongest.com/bulgogi/");
  await sheet().getByText("Save this video").click();
  await page.getByText("isn't a YouTube, TikTok or Instagram video link").waitFor();
  await sheet().getByLabel("Video link").fill("https://youtu.be/i1djfV9uigc?si=abc");
  await sheet().getByText("Save this video").click();
  await page.locator(".video-card .video-poster img").waitFor();
  assert.equal(await page.locator(".video-card .video-poster img").getAttribute("src"), "https://i.ytimg.com/vi/i1djfV9uigc/hqdefault.jpg");
  await page.reload();
  await page.locator(".video-card").waitFor();
  await page.locator(".video-card").getByText("Change").click();
  await sheet().getByText("Remove the video").click();
  await page.getByText("📺 Add a video").waitFor();
  assert.equal(await page.locator(".video-card").count(), 0);
});

await check("servings rescale the ingredients", async () => {
  await page.goto(BASE + "#/dish/seed-bulgogi");
  await page.locator(".dish-title").waitFor();
  await page.locator(".servings .step-btn").nth(1).click();
  await page.locator(".servings .step-btn").nth(1).click();
  assert.match(await page.locator(".ing").first().textContent(), /^2¼ lb ribeye/);
  await page.locator(".servings .step-btn").nth(0).click();
  await page.locator(".servings .step-btn").nth(0).click();
  await page.locator(".servings .step-btn").nth(0).click();
  await page.locator(".servings .step-btn").nth(0).click();
  assert.match(await page.locator(".ing").first().textContent(), /^¾ lb ribeye/);
});

await check("cook-along shows steps with timers and no stray text", async () => {
  await page.getByText("Cook together").click();
  await page.getByText("Get ready!").waitFor();
  await page.getByText("Let's cook ▶").click();
  await page.getByText("Next ▶").click();
  await page.getByText("Next ▶").click();
  await page.getByText("Start 30 minutes timer").waitFor();
  assert.ok(!(await page.locator(".cook-stage").textContent()).includes("null"));
  await page.getByText("Start 30 minutes timer").click();
  await page.locator(".timer-pill").waitFor();
  await page.locator(".timer-pill [aria-label='Stop timer']").click();
  await page.getByLabel("Stop cooking").click();
  await page.locator(".dish-title").waitFor();
});

await check("finishing cook-along twice still counts one cook", async () => {
  await page.goto(BASE + "#/dish/seed-smoothie");
  await page.getByText("Cook together").click();
  await page.getByText("Let's cook ▶").click();
  await page.getByText("Next ▶").click();
  await page.getByText("Next ▶").click();
  await page.getByText("Finish 🎉").click();
  await page.getByText("You did it!").waitFor();
  await page.getByText("◀ Back").click();
  await page.getByText("Finish 🎉").click();
  await page.getByText("You did it!").waitFor();
  await page.getByText("Back to the recipe").click();
  await page.getByText("We've cooked this 1 time!").waitFor();
});

await check("Claude key is saved and tested", async () => {
  await page.goto(BASE + "#/settings");
  await page.getByPlaceholder("sk-ant-…").fill("sk-ant-test-key");
  await page.getByText("Save & test").click();
  await page.getByText("The key works").waitFor();
});

await check("settings text boxes show what's saved", async () => {
  const notes = page.getByPlaceholder("No peanuts. Kids like mild food. Dad doesn't eat mushrooms.");
  assert.equal(await notes.inputValue(), "Kids like mild (not spicy) food.");
});

await check("Claude finds a video, and only one its search really found", async () => {
  calls.length = 0;
  const found = {
    type: "web_search_tool_result", tool_use_id: "srvtoolu_v",
    content: [{ type: "web_search_result", url: "https://www.youtube.com/watch?v=i1djfV9uigc", title: "Tteokguk", encrypted_content: "x", page_age: null }],
  };
  reply = (body, n) => n === 1
    ? sse([
      { type: "server_tool_use", id: "srvtoolu_v", name: "web_search", input: { query: "tteokguk recipe video" } },
      found,
      { type: "tool_use", id: "toolu_v1", name: "save_video", input: { found: true, url: "https://www.youtube.com/watch?v=MadeUpVid01", channel: "Nobody", problem: "" } },
    ], "tool_use")
    : sse([{ type: "tool_use", id: "toolu_v2", name: "save_video", input: { found: true, url: "https://www.youtube.com/watch?v=i1djfV9uigc", channel: "Maangchi", problem: "" } }], "tool_use");
  await page.goto(BASE + "#/dish/seed-hobak-jeon");
  await page.getByText("📺 Add a video").click();
  await sheet().getByText("Find one for me").click();
  await page.getByText("Found one from Maangchi!").waitFor();
  await page.locator(".video-card .video-poster").waitFor();
  assert.equal(calls.length, 2);
  const retry = calls[1].body.messages.at(-1).content[0];
  assert.equal(retry.is_error, true);
  assert.match(retry.content, /wasn't in your search results/);
  assert.deepEqual(calls[0].body.tools.find((t) => t.name === "web_search").allowed_domains, ["youtube.com", "tiktok.com", "instagram.com"]);
  await page.getByText("amounts may be a little different").waitFor();
  await page.goto(BASE + "#/settings");
  await page.getByText("Set a PIN").waitFor();
});

await check("a grown-up PIN protects settings", async () => {
  await page.getByText("Set a PIN").click();
  await page.locator(".pin-input").fill("1234");
  await page.getByText("Save PIN").click();
  await page.goto(BASE + "#/today");
  await page.locator(".meal-cards").waitFor();
  await page.locator(".gear").click();
  await page.getByText("Grown-ups only").waitFor();
  await enterPin("9999");
  await page.getByText("that's not it").waitFor();
  await enterPin("1234");
  await page.getByRole("heading", { name: "👨‍👩‍👧 Our family" }).waitFor();
});

await check("an Instagram link imports through Claude's web tools (with a pause)", async () => {
  calls.length = 0;
  reply = (body, n) =>
    n === 1
      ? sse([{ type: "server_tool_use", id: "srvtoolu_1", name: "web_fetch", input: { url: "https://www.instagram.com/reel/abc/" } }], "pause_turn")
      : sse([{ type: "tool_use", id: "toolu_1", name: "save_recipe", input: { found: true, problem: "", confidence: "adapted", recipe: recipe({ videoUrl: "https://www.youtube.com/watch?v=MadeUpVid01" }) } }], "tool_use");
  await page.goto(BASE + "#/add");
  await page.getByLabel("Link or recipe").fill("https://www.instagram.com/reel/abc/");
  await page.getByText("Get the recipe").click();
  await page.locator(".screen.edit").waitFor();
  assert.equal(await page.locator(".form input.text").first().inputValue(), "Tteokguk");
  assert.equal(calls.length, 2);
  const first = calls[0];
  assert.equal(first.body.model, "claude-opus-5-5");
  assert.equal(first.body.fallbacks, "default");
  assert.match(first.headers["anthropic-beta"], /server-side-fallback-2026-07-01/);
  assert.equal(first.headers["anthropic-dangerous-direct-browser-access"], "true");
  assert.deepEqual(first.body.tools.map((t) => t.name), ["web_fetch", "web_search", "save_recipe"]);
  assert.equal(first.body.tool_choice.type, "auto");
  assert.equal(calls[1].body.messages.length, 2, "the paused turn is sent back to continue");
  assert.equal(calls[1].body.messages[1].role, "assistant");
  assert.equal(await page.getByLabel("Video link").inputValue(), "", "a video link Claude never saw is dropped");
  await page.getByText("💾 Save").click();
  await page.locator(".dish-title", { hasText: "Tteokguk" }).waitFor();
  await page.getByText("Seonkyoung Longest ↗").waitFor();
});

await check("if the API turns down the newer options, it asks again without them", async () => {
  calls.length = 0;
  reply = (body) =>
    body.fallbacks
      ? { status: 400, error: { type: "error", error: { type: "invalid_request_error", message: "fallbacks: Extra inputs are not permitted" } } }
      : sse([{ type: "tool_use", id: "toolu_f", name: "save_recipe", input: { found: true, problem: "", confidence: "exact", recipe: recipe({ name: "Hotteok" }) } }], "tool_use");
  await page.goto(BASE + "#/add");
  await page.getByLabel("Link or recipe").fill("https://seonkyounglongest.com/hotteok/");
  await page.getByText("Get the recipe").click();
  await page.locator(".screen.edit").waitFor();
  assert.equal(await page.locator(".form input.text").first().inputValue(), "Hotteok");
  assert.equal(calls.length, 2);
  assert.equal(calls[1].body.fallbacks, undefined);
  assert.ok(calls[1].body.tools.every((t) => !("eager_input_streaming" in t)));
  await page.locator(".tabbar a[data-tab=menu]").click();
});

await check("a post with no recipe explains what to do", async () => {
  reply = () => sse([{ type: "tool_use", id: "toolu_2", name: "save_recipe", input: { found: false, problem: "This post is private.", confidence: "guessed", recipe: recipe({ name: "", ingredients: [], steps: [] }) } }], "tool_use");
  await page.goto(BASE + "#/add");
  await page.getByLabel("Link or recipe").fill("https://www.instagram.com/p/private/");
  await page.getByText("Get the recipe").click();
  await page.getByText("couldn't find the recipe").waitFor();
  await page.getByText("This post is private.").waitFor();
  await closeSheets();
});

await check("TikTok links shared from Android get the caption link too", async () => {
  calls.length = 0;
  reply = () => sse([{ type: "tool_use", id: "toolu_3", name: "save_recipe", input: { found: true, problem: "", confidence: "guessed", recipe: recipe({ name: "TikTok Egg Toast", emoji: "🍳" }) } }], "tool_use");
  await page.evaluate(() => new Promise((resolve, reject) => {
    const req = indexedDB.open("family-menu-inbox", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("shared", { keyPath: "id" });
    req.onerror = () => reject(req.error);
    req.onsuccess = () => {
      const tx = req.result.transaction("shared", "readwrite");
      tx.objectStore("shared").put({ id: "latest", at: Date.now(), title: "", text: "So good! https://www.tiktok.com/@cook/video/7398765432109876543", url: "", image: null });
      tx.oncomplete = () => resolve();
    };
  }));
  await page.goto(BASE + "#/add?shared=1");
  await page.getByText("Claude had to guess").waitFor();
  const text = calls[0].body.messages[0].content.at(-1).text;
  assert.match(text, /tiktok\.com\/oembed\?url=/);
  // The TikTok itself becomes the dish's video.
  assert.equal(await page.getByLabel("Video link").inputValue(), "https://www.tiktok.com/@cook/video/7398765432109876543");
  await page.getByText("💾 Save").click();
  await page.locator(".dish-title", { hasText: "TikTok Egg Toast" }).waitFor();
  await page.getByText("@cook on TikTok").waitFor();
});

await check("a short TikTok link becomes the full video Claude read, so it plays in the app", async () => {
  const full = "https://www.tiktok.com/@cook/video/7311111111111111111";
  reply = () => sse([
    { type: "server_tool_use", id: "srvtoolu_t", name: "web_fetch", input: { url: "https://vm.tiktok.com/ZMabc123/" } },
    { type: "web_fetch_tool_result", tool_use_id: "srvtoolu_t", content: { type: "web_fetch_result", url: "https://vm.tiktok.com/ZMabc123/", retrieved_at: null, content: { type: "document", title: null, citations: null, source: { type: "text", media_type: "text/plain", data: `<blockquote cite="${full}">Garlic noodles</blockquote>` } } } },
    { type: "tool_use", id: "toolu_t", name: "save_recipe", input: { found: true, problem: "", confidence: "adapted", recipe: recipe({ name: "Garlic Noodles", videoUrl: full }) } },
  ], "tool_use");
  await page.goto(BASE + "#/add");
  await page.getByLabel("Link or recipe").fill("Try this (https://vm.tiktok.com/ZMabc123/).");
  await page.getByText("Get the recipe").click();
  await page.locator(".screen.edit").waitFor();
  assert.equal(await page.getByLabel("Video link").inputValue(), full);
  await page.locator(".tabbar a[data-tab=menu]").click();
});

await check("Claude plans the week, fixing a bad dish reference", async () => {
  calls.length = 0;
  reply = (body, n) => {
    const request = JSON.parse(body.messages[0].content[0].text.split("as JSON:\n")[1]);
    const dinners = request.slotsToFill.filter((s) => s.meal === "dinner").slice(0, 2);
    const slots = [
      { date: dinners[0].date, meal: "dinner", dishes: [n === 1 ? "seed-nope" : "seed-bulgogi", "seed-sigeumchi-namul"], why: "Kiddo loves it" },
      { date: dinners[1].date, meal: "dinner", dishes: ["new:soup"], why: "Something new" },
    ];
    return sse([{ type: "tool_use", id: `toolu_p${n}`, name: "save_week_plan", input: { summary: "A cozy week!", slots, newDishes: [{ key: "soup", recipe: recipe({ name: "Kongnamul Bap", emoji: "🌱" }) }] } }], "tool_use");
  };
  await page.locator(".tabbar a[data-tab=week]").click();
  await page.getByText("Fill our week").click();
  await page.getByText("Ask Claude").click();
  await page.getByText("Make our plan").click();
  await page.getByText("A cozy week!").waitFor();
  assert.equal(calls.length, 2);
  const retry = calls[1].body.messages.at(-1).content[0];
  assert.equal(retry.type, "tool_result");
  assert.equal(retry.is_error, true);
  assert.match(retry.content, /seed-nope/);
  const request = JSON.parse(calls[0].body.messages[0].content[0].text.split("as JSON:\n")[1]);
  assert.ok(request.menu.some((d) => d.id === "seed-bulgogi"));
  assert.equal(request.newIdeas, 2);
  await page.getByText("Use this plan").click();
  await page.locator(".slot-names", { hasText: "Beef Bulgogi + Seasoned Spinach" }).waitFor();
  await page.locator(".slot-names", { hasText: "Kongnamul Bap" }).waitFor();
});

await check("days already gone this week are folded away", async () => {
  await page.locator(".tabbar a[data-tab=week]").click();
  await page.locator(".week-grid").waitFor();
  const past = (new Date().getDay() - 0 + 7) % 7; // the week starts on Sunday by default
  assert.equal(await page.locator(".day-card").count(), 7 - past);
  if (past) {
    await page.getByText(`Show earlier days (${past})`).click();
    await page.locator(".day-card.past").first().waitFor();
    assert.equal(await page.locator(".day-card").count(), 7);
  }
});

await check("kids pick today's lunch from the choices", async () => {
  await page.locator(".day-card.today .slot-row").nth(1).click();
  await sheet().getByText("Let the kids choose").click();
  await page.locator(".sheet:not(.leaving) .tile").nth(0).click();
  await page.locator(".sheet:not(.leaving) .tile").nth(1).click();
  await page.getByText("Done (2 picked)").click();
  await page.locator(".tabbar a[data-tab=today]").click();
  await page.locator(".kid-choice").waitFor();
  const pick = (await page.locator(".kid-choice .tile-name").first().textContent()).trim();
  await page.locator(".kid-choice .tile").first().click();
  await page.locator(".meal-name", { hasText: pick }).waitFor();
});

await check("a kid makes a wish and the grown-ups see it", async () => {
  await page.getByText("I want to eat…").click();
  await sheet().locator(".avatar-btn", { hasText: "Kiddo" }).click();
  await sheet().locator(".tile", { hasText: "Japchae" }).click();
  await page.locator(".toast", { hasText: "Got it, Kiddo" }).waitFor();
  await page.locator(".tabbar a[data-tab=week]").click();
  await page.locator(".wishes", { hasText: "Japchae" }).waitFor();
});

await check("rating with faces shows on the dish", async () => {
  await page.goto(BASE + "#/dish/seed-japchae");
  await page.locator(".action", { hasText: "Rate" }).click();
  await page.locator("[aria-label='Kiddo: Love it!']").click();
  await sheet().getByText("Done").click();
  await page.locator(".family-faces", { hasText: "😍" }).waitFor();
});

await check("a food photo can be added from the gallery", async () => {
  const [chooser] = await Promise.all([page.waitForEvent("filechooser"), page.locator(".photo-btn", { hasText: "Add photo" }).click()]);
  await chooser.setFiles(join(ROOT, "icons/icon-512.png"));
  await page.locator(".hero-slide img").waitFor();
});

await check("our own recipe can be written and edited", async () => {
  await page.goto(BASE + "#/add");
  await page.getByText("Write our own recipe").click();
  await page.getByPlaceholder("Grandma's Japchae").fill("Dad's Famous Fried Rice");
  await page.getByPlaceholder("2 cups rice").fill("3 cups rice\n2 eggs\n1 cup peas");
  await page.getByPlaceholder("Wash the rice.").fill("1. Fry the eggs.\n2. Add rice for 5 minutes.");
  await page.getByText("💾 Save").click();
  await page.locator(".dish-title", { hasText: "Dad's Famous Fried Rice" }).waitFor();
  assert.equal(await page.locator(".steps li").first().textContent(), "Fry the eggs.");
  await page.locator("[aria-label='Edit dish']").click();
  await page.locator(".screen.edit").waitFor();
  await page.getByPlaceholder("Grandma's Japchae").fill("Dad's Fried Rice");
  await page.getByText("💾 Save").click();
  await page.locator(".dish-title", { hasText: "Dad's Fried Rice" }).waitFor();
});

await check("editing shows the recipe's ingredients and steps", async () => {
  await page.goto(BASE + "#/edit/seed-bulgogi");
  await page.locator(".screen.edit").waitFor();
  assert.match(await page.getByPlaceholder("2 cups rice").inputValue(), /ribeye/);
  assert.match(await page.getByPlaceholder("Wash the rice.").inputValue(), /marinate/);
});

await check("a photo added while editing is still there after Save", async () => {
  await page.goto(BASE + "#/edit/seed-kimbap");
  await page.locator(".screen.edit").waitFor();
  const [chooser] = await Promise.all([page.waitForEvent("filechooser"), page.getByText("📷 Add photo").click()]);
  await chooser.setFiles(join(ROOT, "icons/icon-192.png"));
  await page.locator(".toast", { hasText: "Photo added" }).waitFor();
  await page.getByText("💾 Save").click();
  await page.locator(".dish-title", { hasText: "Kimbap" }).waitFor();
  await page.locator(".hero-slide img").waitFor({ timeout: 5000 });
});

await check("a link typed without https:// works, and javascript: links are dropped", async () => {
  await page.goto(BASE + "#/edit/seed-kimbap");
  await page.locator(".screen.edit").waitFor();
  await page.getByText("More details").click();
  await page.getByPlaceholder("https://…").fill("www.maangchi.com/recipe/kimbap");
  await page.getByText("💾 Save").click();
  await page.locator(".dish-title", { hasText: "Kimbap" }).waitFor();
  assert.equal(await page.locator(".source a").getAttribute("href"), "https://www.maangchi.com/recipe/kimbap");
  await page.goto(BASE + "#/edit/seed-kimbap");
  await page.getByText("More details").click();
  await page.getByPlaceholder("https://…").fill("javascript:alert(1)");
  await page.getByText("💾 Save").click();
  await page.locator(".dish-title", { hasText: "Kimbap" }).waitFor();
  assert.equal(await page.locator("a[href^='javascript']").count(), 0);
});

await check("double-tapping Save adds the dish only once", async () => {
  await page.goto(BASE + "#/new");
  await page.getByPlaceholder("Grandma's Japchae").fill("Double Tap Soup");
  await page.getByText("💾 Save").dblclick();
  await page.locator(".dish-title", { hasText: "Double Tap Soup" }).waitFor();
  await page.waitForTimeout(300);
  await page.goto(BASE + "#/menu");
  await page.getByPlaceholder("🔍 Search").fill("Double Tap");
  assert.equal(await page.locator(".tile", { hasText: "Double Tap Soup" }).count(), 1);
  await page.getByPlaceholder("🔍 Search").fill("");
});

await check("a half-typed recipe survives switching tabs", async () => {
  await page.goto(BASE + "#/add");
  await page.getByText("Write our own recipe").click();
  await page.getByPlaceholder("Grandma's Japchae").fill("Half Done Bibimbap");
  await page.locator(".tabbar a[data-tab=week]").click();
  await page.locator(".week-grid").waitFor();
  await page.goto(BASE + "#/add");
  await page.getByText("Write our own recipe").click();
  assert.equal(await page.getByPlaceholder("Grandma's Japchae").inputValue(), "Half Done Bibimbap");
  await page.getByText("Start over").click();
  assert.equal(await page.getByPlaceholder("Grandma's Japchae").inputValue(), "");
});

await check("what can we make: tap what we have, see what's ready and what's nearly there", async () => {
  await page.goto(BASE + "#/menu");
  await page.getByText("What can we make with what we have?").click();
  await page.getByText("Tell us what's in the fridge").waitFor();
  await page.getByRole("button", { name: "🥚 eggs" }).click();
  await page.getByRole("button", { name: "🍅 tomatoes" }).click();
  await page.getByLabel("Add what we have").fill("scallions, rice");
  await page.getByLabel("Add what we have").press("Enter");
  await page.locator(".have-chip", { hasText: "rice" }).waitFor();
  const ready = page.locator("section", { hasText: "Ready to cook" });
  await ready.locator(".tile", { hasText: "Tomato & Egg Stir-Fry" }).waitFor();
  const almost = page.locator(".almost").first();
  await almost.waitFor();
  assert.match(await almost.textContent(), /Need: /);
  await almost.getByRole("button", { name: /to the shopping list/ }).click();
  await page.locator(".toast", { hasText: "to the shopping list" }).waitFor();
  // What we have is remembered.
  await page.reload();
  await page.locator(".have-chip", { hasText: "eggs" }).waitFor();
  await page.getByRole("button", { name: "Remove eggs" }).click();
  await page.locator(".have-chip", { hasText: "eggs" }).waitFor({ state: "detached" });
});

await check("a recipe can go on the shopping list, combined with everything else", async () => {
  await page.goto(BASE + "#/dish/seed-lasagna");
  await page.getByText("Add to shopping list").click();
  await page.locator(".toast", { hasText: "On the shopping list" }).waitFor();
  await page.locator(".tabbar a[data-tab=shop]").click();
  const chip = page.getByRole("button", { name: "Take Classic Lasagna off the list" });
  await chip.waitFor();
  await page.locator(".shop-item", { hasText: "Ricotta cheese" }).waitFor();
  // Things the plan and the lasagna both need are one line, not two.
  assert.equal(await page.locator(".shop-item", { hasText: /^✓?Ground beef/ }).count() <= 1, true);
  await chip.click();
  await page.locator(".shop-item", { hasText: "Ricotta cheese" }).waitFor({ state: "detached" });
});

await check("the shopping list merges the week and remembers ticks", async () => {
  await page.locator(".tabbar a[data-tab=shop]").click();
  const ribeye = page.locator(".shop-item", { hasText: "Ribeye" });
  await ribeye.waitFor();
  await ribeye.locator(".shop-btn").click();
  await page.locator(".shop-item.done", { hasText: "Ribeye" }).waitFor();
  await page.reload();
  await page.locator(".shop-item.done", { hasText: "Ribeye" }).waitFor({ timeout: 5000 });
});

let backupPath;
await check("a backup file holds everything except the key", async () => {
  await page.goto(BASE + "#/settings");
  // The reload in the last check locked grown-up mode again.
  await page.getByText("Grown-ups only").waitFor();
  await enterPin("1234");
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByText("Save backup file").click()]);
  backupPath = await download.path();
  const data = JSON.parse(readFileSync(backupPath, "utf8"));
  assert.equal(data.app, "family-menu");
  assert.ok(data.dishes.length >= 41);
  assert.ok(data.photos.length >= 2, "photos from the gallery and the edit form");
  assert.ok(data.photos[0].blob.startsWith("data:image/jpeg;base64,"));
  assert.equal(data.settings.find((s) => s.key === "main").value.apiKey, "");
});

await check("a damaged backup file is refused and nothing is lost", async () => {
  await page.goto(BASE + "#/menu");
  await page.getByPlaceholder("🔍 Search").fill("");
  await page.locator(".tile").first().waitFor();
  const before = await page.locator(".tile").count();
  const data = JSON.parse(readFileSync(backupPath, "utf8"));
  data.dishes.push({ name: "I have no id" });
  const damaged = join(ROOT, "tests/failure-damaged-backup.json");
  writeFileSync(damaged, JSON.stringify(data));
  await page.goto(BASE + "#/settings");
  const [chooser] = await Promise.all([page.waitForEvent("filechooser"), page.getByText("Restore from file").click()]);
  await chooser.setFiles(damaged);
  await sheet().getByRole("button", { name: "Restore" }).click();
  await page.locator(".toast", { hasText: "Nothing was changed" }).waitFor();
  await page.goto(BASE + "#/menu");
  await page.locator(".tile").first().waitFor();
  assert.equal(await page.locator(".tile").count(), before);
});

await check("erase everything, then restore from the backup", async () => {
  await page.goto(BASE + "#/settings");
  await page.getByText("Erase everything").click();
  await sheet().getByRole("button", { name: "Erase everything" }).click();
  await page.getByText("Welcome to Family Menu!").waitFor();
  await page.getByText("Let's set up").click();
  await page.getByText("Next ▶").click();
  await page.getByText("No thanks").click();
  await page.locator(".meal-cards").waitFor();
  await page.goto(BASE + "#/settings");
  const [chooser] = await Promise.all([page.waitForEvent("filechooser"), page.getByText("Restore from file").click()]);
  await chooser.setFiles(backupPath);
  await sheet().getByRole("button", { name: "Restore" }).click();
  await page.getByText("Backup restored!").waitFor();
  await page.goto(BASE + "#/dish/seed-japchae");
  await page.locator(".hero-slide img").waitFor();
  await page.locator(".family-faces", { hasText: "😍" }).waitFor();
});

await check("deleting a dish (from Edit) needs the PIN (restored from backup)", async () => {
  await page.goto(BASE + "#/dish/seed-goguma");
  await page.reload(); // grown-up mode stays unlocked for 10 minutes; a reload locks it again
  await page.locator(".dish-title").waitFor();
  await page.locator("[aria-label='Edit dish']").click();
  await page.getByText("Grown-ups only").waitFor();
  await enterPin("1234");
  await page.getByText("Delete this dish").click();
  await sheet().getByRole("button", { name: "Delete" }).click();
  await page.locator(".screen.menu").waitFor();
  assert.equal(await page.locator(".tile", { hasText: "Roasted Sweet Potatoes" }).count(), 0);
});

await check("a forgotten PIN can be reset by a grown-up", async () => {
  await page.reload();
  await page.goto(BASE + "#/settings");
  await page.getByText("Grown-ups only").waitFor();
  await page.getByText("Forgot the PIN?").click();
  const question = await page.locator(".pin-question").textContent();
  const [, a, b, c] = question.match(/(\d+) × (\d+) \+ (\d+)/).map(Number);
  await page.locator(".pin-answer").fill(String(a * b + c));
  await page.getByText("Reset the PIN").click();
  await page.getByText("No PIN yet").waitFor();
});

await check("no errors in the console", async () => {
  assert.deepEqual(errors, []);
});

// ---------- Offline, with the service worker ----------

await check("works offline once it has loaded", async () => {
  const ctx = await browser.newContext({ viewport: { width: 800, height: 1200 } });
  const p = await ctx.newPage();
  await p.goto(BASE);
  await p.evaluate(() => navigator.serviceWorker.ready);
  await p.reload();
  await p.getByText("Welcome to Family Menu!").waitFor();
  await ctx.setOffline(true);
  await p.reload();
  await p.getByText("Welcome to Family Menu!").waitFor();
  await ctx.close();
});

await check("Android's Share menu delivers a post to the app (service worker share target)", async () => {
  const ctx = await browser.newContext({ viewport: { width: 412, height: 915 } });
  const p = await ctx.newPage();
  await p.goto(BASE);
  await p.evaluate(() => navigator.serviceWorker.ready);
  await p.reload();
  await p.getByText("Let's set up").click();
  await p.getByText("Next ▶").click();
  await p.getByText("No thanks").click();
  await p.locator(".meal-cards").waitFor();
  // What Android does when you pick Family Menu in the Share menu: a multipart POST.
  await p.evaluate(() => {
    const form = document.createElement("form");
    form.method = "POST";
    form.enctype = "multipart/form-data";
    form.action = "share-target";
    for (const [name, value] of [["title", "Reel"], ["text", "Best kimchi stew https://www.instagram.com/reel/xyz/"], ["url", ""]]) {
      const input = document.createElement("input");
      input.name = name;
      input.value = value;
      form.append(input);
    }
    document.body.append(form);
    form.submit();
  });
  await p.waitForURL(/#\/add\?shared=1/);
  // No Claude key in this browser, so the shared text waits in the paste box.
  await p.waitForFunction(() => document.querySelector(".add textarea")?.value.includes("instagram.com/reel/xyz"));
  await ctx.close();
});

await browser.close();
server.close();
if (failed.length) {
  console.log(`\n${failed.length} of ${step} checks failed`);
  process.exit(1);
}
console.log(`\nall ${step} checks passed`);
