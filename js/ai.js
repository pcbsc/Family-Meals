// Claude features: turn a link / caption / screenshot into a recipe card, and
// plan a week of meals. Calls go straight from this device to the Claude API
// with the family's own key (saved only on this device).
import Anthropic from "../vendor/anthropic-sdk.mjs";
import { MEALS, CATEGORIES } from "./seed.js";
import { cleanLink } from "./recipe.js";
import { videoInfo, videoSeenIn } from "./video.js";

const MODEL = "claude-opus-5-5";
// If Claude's safety filters ever decline a request, the API retries it on the
// model Anthropic recommends for that case instead of failing.
const FALLBACK_BETA = "server-side-fallback-2026-07-01";

const MEAL_KEYS = MEALS.map((m) => m.key);
const CATEGORY_KEYS = CATEGORIES.map((c) => c.key);

export class FriendlyError extends Error {}

function client(apiKey) {
  // This app has no server, so the key lives on the family's own device and
  // requests go directly from it. That's why the browser opt-in is set.
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true, maxRetries: 2 });
}

const RECIPE_SCHEMA = {
  type: "object",
  properties: {
    name: { type: "string", description: "Short, friendly dish name in English, e.g. 'Beef Bulgogi'." },
    nameKo: { type: "string", description: "Name in Hangul for Korean dishes (e.g. '불고기'), otherwise empty." },
    emoji: { type: "string", description: "One food emoji that looks like the dish." },
    description: { type: "string", description: "One short, appetizing sentence a child would understand." },
    meals: { type: "array", items: { type: "string", enum: MEAL_KEYS }, description: "Which meals it suits." },
    categories: { type: "array", items: { type: "string", enum: CATEGORY_KEYS } },
    servings: { type: "integer", description: "How many people the quantities feed." },
    prepMinutes: { type: "integer" },
    cookMinutes: { type: "integer" },
    spicy: { type: "integer", enum: [0, 1, 2], description: "0 not spicy, 1 a little, 2 spicy." },
    ingredients: {
      type: "array",
      items: { type: "string" },
      description:
        "One ingredient per item, quantity first: '1 1/2 cups rice, rinsed'. Keep the source's amounts. A group header ends with a colon, e.g. 'For the sauce:'.",
    },
    steps: {
      type: "array",
      items: { type: "string" },
      description:
        "One short action per step, written in your own words, clear enough for a 7-year-old helper. Say times and heat levels explicitly ('Simmer for 10 minutes').",
    },
    notes: { type: "string", description: "Helpful tips: kid-friendly swaps, make-ahead, how to make it milder. Can be empty." },
    sourceName: { type: "string", description: "Who created the recipe (cook, site or account), or empty." },
    sourceUrl: { type: "string", description: "The page the recipe came from, or empty." },
    imageUrl: { type: "string", description: "Direct URL of the recipe's main photo if you saw one, or empty." },
    videoUrl: {
      type: "string",
      description:
        "A video of this dish being made: the post itself if it's a video (YouTube, TikTok, an Instagram reel), or the creator's own YouTube/TikTok/Instagram video that the page embeds or links. The full link exactly as you saw it, or empty.",
    },
  },
  required: [
    "name", "nameKo", "emoji", "description", "meals", "categories", "servings", "prepMinutes",
    "cookMinutes", "spicy", "ingredients", "steps", "notes", "sourceName", "sourceUrl", "imageUrl", "videoUrl",
  ],
  additionalProperties: false,
};

const SAVE_RECIPE_TOOL = {
  name: "save_recipe",
  description: "Save the finished recipe card to the family's menu. Call this exactly once, at the end.",
  eager_input_streaming: true,
  input_schema: {
    type: "object",
    properties: {
      found: { type: "boolean", description: "False if there was no recipe to be found at all." },
      problem: { type: "string", description: "If found is false: a short, friendly explanation of what was missing. Otherwise empty." },
      confidence: {
        type: "string",
        enum: ["exact", "adapted", "guessed"],
        description: "exact: copied from a full recipe; adapted: filled small gaps; guessed: reconstructed from a video or photo without a written recipe.",
      },
      recipe: RECIPE_SCHEMA,
    },
    required: ["found", "problem", "confidence", "recipe"],
    additionalProperties: false,
  },
};

const SAVE_PLAN_TOOL = {
  name: "save_week_plan",
  description: "Save the finished meal plan. Call this exactly once, at the end.",
  eager_input_streaming: true,
  input_schema: {
    type: "object",
    properties: {
      summary: { type: "string", description: "One or two cheerful sentences about this week's plan, for the family." },
      slots: {
        type: "array",
        items: {
          type: "object",
          properties: {
            date: { type: "string", description: "YYYY-MM-DD, one of the requested dates." },
            meal: { type: "string", enum: MEAL_KEYS },
            dishes: {
              type: "array",
              items: { type: "string" },
              description: "Dish ids from the menu, or 'new:<key>' for a dish in newDishes. Main dish first, then any sides.",
            },
            why: { type: "string", description: "A few words on why, e.g. 'Mina asked for it' or 'leftovers from Monday'." },
          },
          required: ["date", "meal", "dishes", "why"],
          additionalProperties: false,
        },
      },
      newDishes: {
        type: "array",
        items: {
          type: "object",
          properties: { key: { type: "string" }, recipe: RECIPE_SCHEMA },
          required: ["key", "recipe"],
          additionalProperties: false,
        },
      },
    },
    required: ["summary", "slots", "newDishes"],
    additionalProperties: false,
  },
};

const WEB_TOOLS = [
  { type: "web_fetch_20260209", name: "web_fetch", max_uses: 5 },
  { type: "web_search_20260209", name: "web_search", max_uses: 4 },
];

function friendly(err) {
  if (err instanceof FriendlyError) return err;
  if (err instanceof Anthropic.APIUserAbortError) return new FriendlyError("Stopped.");
  if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) {
    return new FriendlyError("Claude didn't accept the key. A grown-up can check it in Settings ⚙️.");
  }
  if (err instanceof Anthropic.RateLimitError) return new FriendlyError("Claude is busy right now. Try again in a minute.");
  if (err instanceof Anthropic.APIConnectionError) return new FriendlyError("Can't reach Claude. Is the internet on?");
  if (err instanceof Anthropic.BadRequestError) {
    if (/credit balance/i.test(err.message)) {
      return new FriendlyError("The Claude account is out of credit. A grown-up can add some at console.anthropic.com.");
    }
    return new FriendlyError(`Claude couldn't do that: ${err.message}`);
  }
  if (err instanceof Anthropic.APIError) return new FriendlyError(`Claude had a problem (${err.status ?? "error"}). Try again.`);
  return new FriendlyError(err?.message || "Something went wrong.");
}

/**
 * Every piece of text inside the web tools' results in a reply: the pages Claude
 * read and the links its searches found (whether the results came straight back
 * or through the tools' own result filtering). Claude's own words aren't included.
 */
export function toolEvidence(content) {
  const out = [];
  const walk = (v) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  for (const block of Array.isArray(content) ? content : []) {
    if (/_tool_result$/.test(block?.type || "")) walk(block.content);
  }
  return out;
}

/**
 * Runs a conversation with the web tools until Claude calls `toolName`.
 * validate(input, evidence) returns an error message to send back, or null when
 * it's good. evidence (pass an array to keep it) collects toolEvidence() from
 * every reply along the way.
 */
async function runUntilTool({ apiKey, system, content, tools, toolName, effort, maxTokens, validate, onProgress, signal, evidence = [] }) {
  const api = client(apiKey);
  const messages = [{ role: "user", content }];
  // The refusal fallback and streamed tool input are newer API options. If the
  // API ever turns one down, ask again once without them rather than failing.
  let extras = true;
  const send = async () => {
    const stream = api.beta.messages.stream(
      {
        model: MODEL,
        max_tokens: maxTokens,
        ...(extras ? { betas: [FALLBACK_BETA], fallbacks: "default" } : {}),
        output_config: { effort },
        system,
        tools: extras ? tools : tools.map(({ eager_input_streaming, ...t }) => t),
        tool_choice: { type: "auto" },
        messages,
      },
      { signal },
    );
    for await (const event of stream) {
      if (event.type !== "content_block_start") continue;
      const block = event.content_block;
      if (block.type === "server_tool_use") onProgress?.(block.name === "web_search" ? "search" : "fetch");
      else if (block.type === "tool_use") onProgress?.("write");
      else if (block.type === "thinking") onProgress?.("think");
    }
    return stream.finalMessage();
  };
  try {
    for (let turn = 0; turn < 8; turn++) {
      let message;
      try {
        message = await send();
      } catch (err) {
        if (!(extras && err instanceof Anthropic.BadRequestError && /fallback|eager_input_streaming|beta/i.test(err.message))) throw err;
        extras = false;
        message = await send();
      }

      evidence.push(...toolEvidence(message.content));
      if (message.stop_reason === "refusal") {
        throw new FriendlyError("Claude couldn't help with this one. Try a different link or photo.");
      }
      const call = message.content.find((b) => b.type === "tool_use" && b.name === toolName);
      if (call) {
        if (message.stop_reason === "max_tokens") throw new FriendlyError("That was too long for Claude to finish. Try again.");
        const problem = validate(call.input, evidence);
        if (!problem) return call.input;
        messages.push(
          { role: "assistant", content: message.content },
          { role: "user", content: [{ type: "tool_result", tool_use_id: call.id, is_error: true, content: problem }] },
        );
        continue;
      }
      if (message.stop_reason === "pause_turn") {
        // The web tools hit their step limit; sending the turn back lets them carry on.
        messages.push({ role: "assistant", content: message.content });
        continue;
      }
      if (message.stop_reason === "max_tokens") throw new FriendlyError("That was too long for Claude to finish. Try again.");
      messages.push(
        { role: "assistant", content: message.content },
        { role: "user", content: `Please call ${toolName} now with what you have.` },
      );
    }
    throw new FriendlyError("Claude took too many steps. Try again.");
  } catch (err) {
    throw friendly(err);
  }
}

function str(v, max = 2000) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function int(v, fallback, max) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= 0 ? Math.min(n, max) : fallback;
}

/** Tidies a recipe Claude returned so the app can rely on every field. Returns null if unusable. */
export function cleanRecipe(r) {
  if (!r || typeof r !== "object") return null;
  // Caps keep a strange page from filling the menu with thousands of lines.
  const lines = (a, most) => (Array.isArray(a) ? a.map((l) => str(l, 300)).filter(Boolean).slice(0, most) : []);
  const recipe = {
    name: str(r.name, 120),
    nameKo: str(r.nameKo, 60),
    emoji: str(r.emoji, 16) || "🍽️",
    description: str(r.description, 300),
    meals: (Array.isArray(r.meals) ? r.meals : []).filter((m) => MEAL_KEYS.includes(m)),
    categories: (Array.isArray(r.categories) ? r.categories : []).filter((c) => CATEGORY_KEYS.includes(c)),
    servings: int(r.servings, 4, 50) || 4,
    prepMinutes: int(r.prepMinutes, 0, 24 * 60),
    cookMinutes: int(r.cookMinutes, 0, 24 * 60),
    spicy: [0, 1, 2].includes(r.spicy) ? r.spicy : 0,
    ingredients: lines(r.ingredients, 80),
    steps: lines(r.steps, 60),
    notes: str(r.notes),
    sourceName: str(r.sourceName, 120),
    sourceUrl: cleanLink(str(r.sourceUrl)),
    imageUrl: /^https:\/\//.test(str(r.imageUrl)) ? str(r.imageUrl) : "",
    // Only links the app can actually play or open as a video.
    videoUrl: videoInfo(str(r.videoUrl)) ? cleanLink(str(r.videoUrl)) : "",
  };
  if (!recipe.meals.length) recipe.meals = ["dinner"];
  if (!recipe.name || !recipe.ingredients.length || !recipe.steps.length) return null;
  return recipe;
}

const IMPORT_SYSTEM = `You turn recipes into clean recipe cards for a family's meal-planning app. The family has young kids and cooks a lot of Korean food as well as other cuisines.

You may get a link (a recipe website, Instagram, TikTok, YouTube or a blog), a pasted caption or recipe text, a photo of a cookbook page, or a screenshot.

How to work:
- For a link, read the page with web_fetch. For TikTok, the oEmbed link you're given returns the video's caption, which often holds the recipe.
- Social posts often show only part of a recipe, or say "recipe on my blog" or "link in bio". Then use web_search to find that creator's own written version of the same dish and read it. Prefer the creator's version over someone else's.
- If no written recipe exists anywhere, rebuild a sensible one from what the post shows and set confidence to "guessed".
- Keep the original amounts and units. Don't invent ingredients the recipe doesn't use.
- Write the steps in your own words, short and simple, one action each, so a 7-year-old helper can follow along with a grown-up.
- Fill in the Korean name in Hangul for Korean dishes.
- Set videoUrl so the family can watch while they cook: the post itself if it's a video, otherwise the creator's own video of this recipe if the page embeds or links one. For a short TikTok link (vm.tiktok.com/…), give the full tiktok.com/@account/video/<number> link it leads to. Only use a link that appears in what you were given or read; never make one up.
- If there's truly nothing recipe-like (for example a private or deleted post), call save_recipe with found=false, a short friendly problem, and empty placeholders in the recipe.

Finish by calling save_recipe exactly once.`;

/**
 * Imports a recipe. Pass any of url, text, image ({media_type, data}).
 * Returns { found, problem, confidence, recipe }.
 */
export async function importRecipe({ apiKey, url, text, image, onProgress, signal }) {
  const parts = [];
  if (url) {
    parts.push(`Link: ${url}`);
    if (/tiktok\.com/i.test(url)) parts.push(`TikTok caption (oEmbed): https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
  }
  if (text) parts.push(`Text the family pasted or shared:\n"""\n${text}\n"""`);
  if (image) parts.push("The image above is a photo or screenshot of the recipe.");
  parts.push("Make a recipe card from this.");

  const content = [];
  if (image) content.push({ type: "image", source: { type: "base64", media_type: image.media_type, data: image.data } });
  content.push({ type: "text", text: parts.join("\n\n") });

  // What Claude was given or read; a video link has to come from here, not from memory.
  const evidence = [url, text].filter(Boolean);
  const result = await runUntilTool({
    apiKey,
    evidence,
    system: IMPORT_SYSTEM,
    content,
    tools: [...(url || text ? WEB_TOOLS : []), SAVE_RECIPE_TOOL],
    toolName: "save_recipe",
    effort: url ? "medium" : "low",
    maxTokens: 32000,
    onProgress,
    signal,
    validate: (input) => {
      if (input?.found === false) return null;
      return cleanRecipe(input?.recipe) ? null : "The recipe needs a name, at least one ingredient and at least one step.";
    },
  });
  if (result.found === false) {
    return { found: false, problem: str(result.problem) || "There was no recipe there.", confidence: "guessed", recipe: null };
  }
  const recipe = cleanRecipe(result.recipe);
  if (!recipe.sourceUrl && url) recipe.sourceUrl = url;
  // A made-up video link could play anything, so only keep one Claude actually saw.
  if (!videoSeenIn(recipe.videoUrl, evidence)) recipe.videoUrl = "";
  // A recipe shared from a video post keeps that video, unless it's a short link
  // and Claude found the full one (which plays inside the app).
  const posted = url && videoInfo(url) ? cleanLink(url) : "";
  if (posted && (!recipe.videoUrl || videoInfo(posted).embedUrl)) recipe.videoUrl = posted;
  return { found: true, problem: "", confidence: result.confidence || "adapted", recipe };
}

const PLAN_SYSTEM = `You plan a week of family meals for a home meal-planning app. You'll get the family's menu (dishes they already have, with ratings), wishes from the kids, food notes, and the meal slots to fill.

Plan meals the family will enjoy and that are good for growing kids:
- Mostly use dishes from their menu. Favor favorites and well-rated dishes, and dishes they haven't had lately. Avoid dishes rated "no thanks".
- Don't repeat a dinner in the same week. Lunch can be leftovers of the night before (use the same dish id and say so in "why"), or a lunchbox-friendly dish.
- Honor the wishes where it makes sense, and say who asked in "why".
- Balance the week: vegetables every day, fish once or twice, a mix of beef, chicken, pork, tofu and eggs, not much fried or sugary food.
- For a Korean-style dinner you may add one or two side dishes (banchan or a soup) from the menu after the main dish, like a real Korean table with rice.
- Breakfasts are quick on weekdays (15 minutes or less) and can be special on weekends. Repeating a breakfast or snack is fine.
- Keep it mild for the kids unless the notes say otherwise. If you include a spicy dish, say how to make it milder in "why".
- New ideas: add the requested number of new dishes that aren't on the menu yet. Find real recipes with web_search and read them with web_fetch. For Korean dishes prefer Seonkyoung Longest (seonkyounglongest.com), then Korean Bapsang, Maangchi or My Korean Kitchen; for other cuisines use well-known family-friendly recipe sites. Set sourceName and sourceUrl (and videoUrl if the page has the creator's video of it), keep the recipe's amounts, and write the steps in your own words, short and clear enough for a 7-year-old helper. Refer to each new dish in slots as "new:<key>".
- Only fill the slots you're asked to fill.

Finish by calling save_week_plan exactly once.`;

/**
 * Plans meals. Returns { summary, slots: [{date, meal, dishes, why}], newDishes: [{key, recipe}] }
 * with every dish reference checked against the menu.
 */
export async function planWeek({ apiKey, request, menuIds, onProgress, signal }) {
  const wanted = new Set(request.slotsToFill.map((s) => `${s.date}|${s.meal}`));
  const check = (input) => {
    if (!Array.isArray(input?.slots) || !input.slots.length) return "The plan has no meals in it.";
    if (!Array.isArray(input?.newDishes)) return "newDishes must be a list (it can be empty).";
    const keys = new Set(input.newDishes.map((n) => n?.key));
    const bad = [];
    for (const s of input.slots) {
      if (!Array.isArray(s?.dishes)) return "Every slot needs a dishes list.";
      for (const ref of s.dishes) {
        if (typeof ref !== "string") bad.push(String(ref));
        else if (ref.startsWith("new:") ? !keys.has(ref.slice(4)) : !menuIds.has(ref)) bad.push(ref);
      }
    }
    for (const n of input.newDishes) if (!cleanRecipe(n?.recipe)) bad.push(`new:${n?.key}`);
    return bad.length ? `These dish references don't match the menu or newDishes: ${bad.slice(0, 10).join(", ")}. Use ids from the menu or 'new:<key>' for complete new dishes.` : null;
  };
  const evidence = [];
  const result = await runUntilTool({
    apiKey,
    evidence,
    system: PLAN_SYSTEM,
    content: [{ type: "text", text: `Here is everything you need, as JSON:\n${JSON.stringify(request, null, 1)}` }],
    tools: [...(request.newIdeas > 0 ? WEB_TOOLS : []), SAVE_PLAN_TOOL],
    toolName: "save_week_plan",
    effort: "medium",
    maxTokens: 64000,
    onProgress,
    signal,
    validate: check,
  });
  const newDishes = (result.newDishes || [])
    .map((n) => ({ key: str(n.key), recipe: cleanRecipe(n.recipe) }))
    .filter((n) => n.key && n.recipe);
  for (const n of newDishes) if (!videoSeenIn(n.recipe.videoUrl, evidence)) n.recipe.videoUrl = "";
  const newKeys = new Set(newDishes.map((n) => n.key));
  const slots = (result.slots || [])
    .filter((s) => s && wanted.has(`${s.date}|${s.meal}`))
    .map((s) => ({
      date: s.date,
      meal: s.meal,
      why: str(s.why),
      dishes: (s.dishes || []).filter((ref) => (ref.startsWith("new:") ? newKeys.has(ref.slice(4)) : menuIds.has(ref))),
    }))
    .filter((s) => s.dishes.length);
  return { summary: str(result.summary), slots, newDishes };
}

const SAVE_VIDEO_TOOL = {
  name: "save_video",
  description: "Save the video you picked. Call this exactly once, at the end.",
  input_schema: {
    type: "object",
    properties: {
      found: { type: "boolean", description: "False if you couldn't find a good video." },
      url: { type: "string", description: "The video's full link, exactly as it appeared in the search results. Empty if found is false." },
      channel: { type: "string", description: "Who made it (channel or account name), or empty." },
      problem: { type: "string", description: "If found is false: a short, friendly reason. Otherwise empty." },
    },
    required: ["found", "url", "channel", "problem"],
    additionalProperties: false,
  },
};

const VIDEO_SYSTEM = `You find one cooking video for a dish in a family's recipe app, so the family (including young kids) can watch how it's made while they cook.

- Use web_search to look for videos of this dish. Prefer YouTube; TikTok or an Instagram reel is fine.
- Pick a video that clearly shows how to make this dish, is kid-appropriate, and matches the recipe's style (for example, not a much spicier version). Prefer well-known cooks: for Korean food Seonkyoung Longest, Maangchi, Aaron and Claire, Korean Bapsang or My Korean Kitchen; for other food, trusted family cooks and recipe channels.
- Only use a link that appeared in your search results. Never make up or guess a video link.
- Finish by calling save_video exactly once.`;

/** Finds a video for a dish. Returns { found, url, channel, problem }. */
export async function findVideo({ apiKey, dish, onProgress, signal }) {
  const about = [
    `Dish: ${dish.name}${dish.nameKo ? ` (${dish.nameKo})` : ""}`,
    dish.description ? `About it: ${dish.description}` : "",
    dish.sourceName ? `The recipe is from: ${dish.sourceName}` : "",
    `Ingredients: ${(dish.ingredients || []).slice(0, 15).join("; ")}`,
  ].filter(Boolean).join("\n");
  const result = await runUntilTool({
    apiKey,
    system: VIDEO_SYSTEM,
    content: [{ type: "text", text: `${about}\n\nFind one good video of how to make this.` }],
    tools: [
      { type: "web_search_20260209", name: "web_search", max_uses: 3, allowed_domains: ["youtube.com", "tiktok.com", "instagram.com"] },
      SAVE_VIDEO_TOOL,
    ],
    toolName: "save_video",
    effort: "low",
    maxTokens: 8000,
    onProgress,
    signal,
    validate: (input, evidence) => {
      if (input?.found === false) return null;
      if (!videoInfo(str(input?.url))) return "That link isn't a YouTube, TikTok or Instagram video. Use a video link from your search results.";
      // A made-up link would play the wrong video (or anything at all), so it has to be one the search really found.
      return videoSeenIn(str(input.url), evidence) ? null : "That video wasn't in your search results. Search, then pick a video link from the results.";
    },
  });
  if (result.found === false) {
    return { found: false, url: "", channel: "", problem: str(result.problem, 200) || "Claude couldn't find a good video for this one." };
  }
  return { found: true, url: cleanLink(str(result.url)), channel: str(result.channel, 80), problem: "" };
}

/** Cheap check that a key works (lists the model; no tokens used). */
export async function testKey(apiKey) {
  try {
    await client(apiKey).models.retrieve(MODEL);
    return true;
  } catch (err) {
    throw friendly(err);
  }
}
