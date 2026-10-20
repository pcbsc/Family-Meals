// Dish: the recipe card. Photos, hearts and faces, a video to watch, servings
// that rescale the ingredients, and Cook-along: one big step at a time with timers.
import {
  h, toast, confetti, confirmSheet, preparePhoto, pickImage, ding, speak, keepScreenOn,
  minutesText, clearChildren, openSheet, once, stopSpeaking,
} from "../ui.js";
import { SPICE, CUISINES, cuisineOf } from "../seed.js";
import {
  scaleIngredient, parseIngredient, findTimers, cleanLink, cookedLines, toMetric, metricText, SPICE_LEVELS, keyIngredients,
  isChiliLine, haveCovers, normalizeItemName,
} from "../recipe.js";
import { dateKey } from "../planner.js";
import { videoInfo } from "../video.js";
import {
  state, updateDish, addPhoto, removePhotoFromDish, photoUrl, go, refresh, addRecipeToShopping, cookPrefs, saveSettings,
  addToFreezer,
} from "../store.js";
import {
  grownUp, dishArt, backHeader, stepper, rateSheet, familyFaces, planItSheet, progressSheet, needKeySheet, icon,
} from "../components.js";

function notFound() {
  return h("div.screen", backHeader("Oops", { back: "#/menu" }), h("div.empty-state", h("div.huge-emoji", "🤷"), h("p", "That dish isn't in our menu anymore.")));
}

async function addPhotoFlow(dish) {
  const file = await pickImage();
  if (!file) return;
  try {
    await addPhoto(dish.id, await preparePhoto(file));
    confetti(["📸", "😋", "⭐"]);
    toast("Yum! Photo added.", { emoji: "📸" });
    refresh();
  } catch {
    toast("That photo didn't work. Try another one.", { emoji: "😕" });
  }
}

function photoStrip(dish) {
  const ids = dish.photoIds || [];
  const strip = h("div.hero");
  if (!ids.length) {
    strip.append(dishArt(dish, { kind: "full", className: "art-hero" }));
  } else {
    const track = h("div.hero-track");
    for (const id of ids) {
      const slide = h("div.hero-slide");
      photoUrl(id, "full").then((url) => url && slide.append(h("img", { src: url, alt: dish.name })));
      slide.append(h("button.icon-btn.photo-x", {
        "aria-label": "Remove this photo",
        onclick: async () => {
          if (!(await grownUp())) return;
          if (!(await confirmSheet("Remove this photo?", { yes: "Remove", danger: true }))) return;
          await removePhotoFromDish(dish.id, id);
          refresh();
        },
      }, "🗑️"));
      track.append(slide);
    }
    strip.append(track);
    if (ids.length > 1) strip.append(h("span.hero-count", `${ids.length} photos ▸`));
  }
  // One button: Android offers "Camera" or the gallery.
  // The tomato from the Canva design peeks over the edge of the recipe.
  strip.append(icon("mascot-peek", "hero-mascot"));
  strip.append(h("div.hero-buttons",
    h("button.btn.photo-btn", { onclick: () => addPhotoFlow(dish) }, "📷 Add photo"),
  ));
  return strip;
}

const servingsMemory = new Map();

function sourceLine(dish) {
  // Old or restored dishes may hold a link that isn't a web address; never put that behind a tap.
  const link = cleanLink(dish.sourceUrl);
  if (!link && !dish.sourceName) return null;
  return h("p.source", "From ",
    link ? h("a", { href: link, target: "_blank", rel: "noopener" }, dish.sourceName || new URL(link).hostname, " ↗") : dish.sourceName);
}

// ---------- Video ----------

/** The player: a poster to tap, then the site's own player. autoload skips the poster. */
function videoBox(info, name, { autoload = false, key = "" } = {}) {
  const box = h(`div.video.${info.site}${info.tall ? ".tall" : ""}`, key ? { dataset: { key } } : {});
  const play = (fromTap) => {
    if (!navigator.onLine) return toast("Videos need the internet.", { emoji: "📶" });
    const src = new URL(info.embedUrl);
    if (fromTap && info.site !== "instagram") src.searchParams.set("autoplay", "1");
    clearChildren(box);
    box.append(h("iframe", {
      src: src.href,
      title: `${name} video on ${info.siteName}`,
      allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
      allowfullscreen: true,
      referrerpolicy: "strict-origin-when-cross-origin",
    }));
  };
  // Offline, the poster stays so it can be tapped once the internet is back.
  if (autoload && navigator.onLine) play(true);
  else {
    box.append(h("button.video-poster", { type: "button", "aria-label": `Play the video on ${info.siteName}`, onclick: () => play(true) },
      info.thumbUrl ? h("img", { src: info.thumbUrl, alt: "", loading: "lazy" }) : null,
      h("span.video-play", "▶"),
      h("span.video-site", info.siteName),
    ));
  }
  return box;
}

function openVideo(info) {
  window.open(info.watchUrl, "_blank", "noopener");
}

function videoCard(dish) {
  const info = videoInfo(dish.videoUrl);
  if (!info) return null;
  const outside = h("a", { href: info.watchUrl, target: "_blank", rel: "noopener" }, `Open in ${info.siteName} ↗`);
  return h("section.card.video-card",
    h("div.section-head",
      h("h2", "📺 Watch how"),
      h("button.btn.ghost.small", { "aria-label": "Change the video", onclick: () => videoSheet(dish) }, "Change"),
    ),
    info.embedUrl
      ? videoBox(info, dish.name, { key: `${dish.id} ${info.watchUrl}` })
      : h("button.btn.soft.big.wide", { onclick: () => openVideo(info) }, `▶ Watch on ${info.siteName}`),
    h("p.muted.small.video-from", info.by ? `${info.by} on ${info.siteName} · ` : "", outside),
    // Starter recipes and videos Claude found are someone else's version of the dish.
    dish.seedKey || dish.videoFound ? h("p.muted.small", "The video's amounts may be a little different from this recipe.") : null,
  );
}

let finding = false;

async function findVideoFlow(dish) {
  if (!state.settings.apiKey) return needKeySheet("Finding videos");
  if (finding) return;
  finding = true;
  const progress = progressSheet("✨ Claude is looking for a video…");
  try {
    const { findVideo } = await import("../ai.js");
    const result = await findVideo({
      apiKey: state.settings.apiKey, dish, onProgress: progress.update, signal: progress.signal,
    });
    await progress.close();
    if (!result.found) return toast(result.problem, { emoji: "🤷", ms: 5000 });
    await updateDish(dish.id, { videoUrl: result.url, videoFound: true, videoRemoved: false });
    toast(result.channel ? `Found one from ${result.channel}!` : "Found a video!", { emoji: "📺", ms: 3500 });
    refresh();
  } catch (err) {
    await progress.close();
    if (err.message !== "Stopped.") toast(err.message, { emoji: "😕", ms: 6000 });
  } finally {
    finding = false;
  }
}

async function videoSheet(dish) {
  if (!(await grownUp())) return;
  let typed = "";
  const search = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${dish.name} recipe`)}`;
  openSheet((close) => {
    const save = async () => {
      if (!videoInfo(typed)) return toast("That isn't a YouTube, TikTok or Instagram video link.", { emoji: "🤔", ms: 4000 });
      await updateDish(dish.id, { videoUrl: cleanLink(typed.trim()), videoFound: false, videoRemoved: false });
      await close();
      toast("Video added!", { emoji: "📺" });
      refresh();
    };
    return h("div.stack",
      h("button.btn.primary.big.wide", { onclick: async () => { await close(); findVideoFlow(dish); } }, "✨ Find one for me"),
      h("a.btn.soft.wide", { href: search, target: "_blank", rel: "noopener" }, "🔎 Look on YouTube"),
      h("p.muted.small", "Found one? In YouTube, TikTok or Instagram tap Share → Copy link, then paste it here."),
      h("input.text", {
        type: "url", inputmode: "url", placeholder: "Paste a video link", "aria-label": "Video link",
        oninput: (e) => (typed = e.target.value),
      }),
      h("button.btn.soft.wide", { onclick: save }, "💾 Save this video"),
      dish.videoUrl
        ? h("button.btn.ghost.danger-text", {
          onclick: async () => {
            // Remembered, so an app update doesn't put a starter video back.
            await updateDish(dish.id, { videoUrl: "", videoFound: false, videoRemoved: true });
            await close();
            toast("Video removed.", { emoji: "🗑️" });
            refresh();
          },
        }, "🗑️ Remove the video")
        : null,
    );
  }, { title: dish.videoUrl ? "📺 Change the video" : "📺 Add a video" });
}

/** "1 1/2 cups milk, warm" → { amount: "1 1/2 cups", name: "Milk, warm" }, like the Canva recipe card. */
function splitAmount(text) {
  const p = parseIngredient(text);
  if (p.qty == null || !p.item) return { amount: "", name: text };
  const at = text.indexOf(p.item);
  if (at <= 0) return { amount: "", name: text };
  const amount = text.slice(0, at).replace(/\s+of\s*$/i, "").trim();
  const name = text.slice(at);
  return { amount, name: name.charAt(0).toUpperCase() + name.slice(1) };
}

/** The ingredient lines to show: our way (healthier, spice level), scaled, in our units. */
function shownLines(dish, factor) {
  const prefs = cookPrefs();
  const cooked = cookedLines(dish, prefs);
  const fix = (line) => {
    const scaled = scaleIngredient(line, factor);
    return prefs.metric ? toMetric(scaled) : scaled;
  };
  return {
    ...cooked,
    prefs,
    lines: cooked.lines.map((l) => ({ ...l, header: parseIngredient(l.line).header, text: fix(l.line) })),
    step: (text) => (prefs.metric ? metricText(text) : text),
  };
}

/** Healthy, how spicy, cups or grams: one tap each, saved for the family. */
function cookWay(dish, onchange) {
  const prefs = cookPrefs();
  const set = async (patch) => {
    await saveSettings(patch);
    onchange();
  };
  const hot = dish.spicy > 0 || dish.ingredients.some(isChiliLine);
  const SPICE_ICONS = { mild: "smile", medium: "chili", spicy: "flame" };
  return h("div.cook-way",
    h("button.way-switch", {
      role: "switch",
      "aria-checked": String(prefs.healthy),
      onclick: () => set({ healthy: !prefs.healthy }),
    }, icon("salad"), h("span.grow", "Healthy"), h(`span.switch${prefs.healthy ? ".on" : ""}`, { "aria-hidden": "true" })),
    hot || prefs.spice === "spicy"
      ? h("div.segmented.spice", { role: "group", "aria-label": "How spicy" }, SPICE_LEVELS.map((lvl) =>
        h(`button.seg${prefs.spice === lvl.key ? ".on" : ""}`, {
          "aria-pressed": String(prefs.spice === lvl.key),
          onclick: () => set({ spice: lvl.key }),
        }, icon(SPICE_ICONS[lvl.key]), lvl.label)))
      : null,
    h("div.segmented.units", { role: "group", "aria-label": "Amounts" },
      h(`button.seg${prefs.metric ? "" : ".on"}`, { "aria-pressed": String(!prefs.metric), onclick: () => set({ metric: false }) }, icon("spoon"), "Cups"),
      h(`button.seg${prefs.metric ? ".on" : ""}`, { "aria-pressed": String(prefs.metric), onclick: () => set({ metric: true }) }, icon("scale"), "Grams"),
    ),
  );
}

export function viewDish({ match }) {
  const dish = state.dishes.get(match[1]);
  if (!dish) return notFound();
  let servings = servingsMemory.get(dish.id) || dish.servings || state.settings.servings || 4;
  const checked = new Set();
  const list = h("ul.ingredients");
  const way = h("div");
  const stepList = h("div");
  const tipBox = h("div");
  const drawIngredients = () => {
    clearChildren(list);
    clearChildren(way);
    clearChildren(stepList);
    clearChildren(tipBox);
    const shown = shownLines(dish, servings / (dish.servings || servings));
    way.append(cookWay(dish, drawIngredients));
    if (shown.swaps.length) way.append(h("p.way-note", icon("leaf"), h("span", "Healthier: ", shown.swaps.join(", "))));
    shown.lines.forEach((l, i) => {
      if (l.header) return list.append(h("li.ing-header", parseIngredient(l.line).item));
      const tag = l.off ? h("span.ing-tag.off", "skip for mild") : l.label ? h("span.ing-tag", l.label) : null;
      const { amount, name } = splitAmount(l.text);
      list.append(h(`li.ing${checked.has(i) ? ".done" : ""}${l.off ? ".off" : ""}`,
        h("button.ing-btn", {
          "aria-pressed": checked.has(i) ? "true" : "false",
          "aria-label": l.text,
          title: l.was ? `Recipe says: ${l.was}` : null,
          onclick: () => { checked.has(i) ? checked.delete(i) : checked.add(i); drawIngredients(); },
        }, h("span.check", checked.has(i) ? "✓" : ""), h("span.ing-name", name, tag ? " " : "", tag), amount ? h("span.ing-amount", amount) : null),
      ));
    });
    stepList.append(dish.steps.length
      ? h("ol.steps", dish.steps.map((s) => h("li", shown.step(s))))
      : h("p.muted", "No steps yet."));
    const tips = [...shown.tips.map(shown.step), dish.notes ? shown.step(dish.notes) : ""].filter(Boolean);
    if (tips.length) tipBox.append(h("section.card.notes", h("h2", "💡 Tips"), tips.map((t) => h("p", t))));
  };
  drawIngredients();
  const total = (dish.prepMinutes || 0) + (dish.cookMinutes || 0);
  const cuisine = CUISINES.find((c) => c.key === cuisineOf(dish) && c.key !== "other");

  return h("div.screen.dish",
    backHeader(null, {
      back: "#/menu",
      right: h("button.icon-btn", {
        "aria-label": "Edit dish",
        onclick: async () => (await grownUp()) && go(`#/edit/${dish.id}`),
      }, "✏️"),
    }),
    photoStrip(dish),
    h("div.dish-title",
      h("h1", dish.name),
      dish.nameKo ? h("p.ko", dish.nameKo) : null,
      dish.description ? h("p.desc", dish.description) : null,
    ),
    h("div.facts",
      cuisine ? h("span.fact", h("span.fact-emoji", cuisine.emoji), cuisine.label) : null,
      total ? h("span.fact", icon("clock"), minutesText(total)) : null,
      h("span.fact", icon(dish.spicy ? "chili" : "smile"), SPICE[dish.spicy || 0]),
    ),
    h("div.dish-actions",
      h(`button.action${dish.favorite ? ".on" : ""}`, {
        "aria-pressed": dish.favorite ? "true" : "false",
        onclick: async () => {
          await updateDish(dish.id, { favorite: !dish.favorite });
          if (!dish.favorite) confetti(["❤️", "💖", "⭐"]);
          refresh();
        },
      }, dish.favorite ? h("span.action-emoji", "❤️") : icon("heart"), "Favorite"),
      h("button.action", { onclick: () => rateSheet(dish) }, icon("star"), "Rate"),
      h("button.action", { onclick: () => planItSheet(dish) }, icon("calendar"), "Plan it"),
    ),
    familyFaces(dish),
    h("button.btn.cook.big.wide.cook-kids", { onclick: () => go(`#/cook/${dish.id}?s=${servings}`) }, icon("chef-kids"), "Cook together"),
    videoCard(dish),
    h("section.card",
      h("div.section-head",
        h("h2", "🛒 Ingredients"),
        h("div.servings", h("span.muted", "people"), stepper(servings, {
          label: "Servings",
          max: 40,
          onchange: (n) => { servings = n; servingsMemory.set(dish.id, n); drawIngredients(); },
        })),
      ),
      dish.ingredients.length ? way : null,
      dish.ingredients.length ? list : h("p.muted", "No ingredients yet."),
      dish.ingredients.length
        ? h("button.btn.soft.wide", {
          onclick: async () => {
            await addRecipeToShopping(dish.id, servings);
            toast(`On the shopping list, for ${servings} people.`, { emoji: "🛒" });
          },
        }, "🛒 Add to shopping list")
        : null,
    ),
    h("section.card",
      h("h2", "👣 Steps"),
      stepList,
    ),
    tipBox,
    h("div.row.wrap.center.no-print",
      dish.videoUrl ? null : h("button.btn.ghost", { onclick: () => videoSheet(dish) }, "📺 Add a video"),
      h("button.btn.ghost", { onclick: () => window.print() }, "🖨️ Print recipe card"),
    ),
    sourceLine(dish),
    dish.timesCooked ? h("p.muted.center", `We've cooked this ${dish.timesCooked} time${dish.timesCooked === 1 ? "" : "s"}! 🎉`) : null,
  );
}

// ---------- Cook-along ----------

/** After cooking: tap what got used up, and it comes off "what we have". */
function usedUp(dish) {
  const need = keyIngredients(dish);
  const have = (state.settings.have || []).filter((x) => [...need].some((k) => haveCovers(normalizeItemName(x), k)));
  if (!have.length) return null;
  const box = h("section.card.stack.used-up",
    h("h3", "Did we use anything up?"),
    h("p.muted.small", "Tap it and it comes off our \"what we have\" list."),
    h("div.row.wrap", have.map((item) => h("button.chip", {
      onclick: async (e) => {
        await saveSettings({ have: (state.settings.have || []).filter((x) => x !== item) });
        e.currentTarget.remove();
        toast(`Okay, no more ${item}.`, { emoji: "🧺" });
      },
    }, `${item} ✕`))),
  );
  return box;
}

const GROWN_UP = /\b(knife|cut|slice|chop|dice|mince|grate|boil|fry|fried|oven|sear|blanch|hot|drain|blend|simmer|stove|pan|bake|roast|grill|broil|steam|skillet|pot)/i;

let activeTimer = null;

function timerPill() {
  const pill = h("div.timer-pill", { role: "timer" });
  const tick = () => {
    if (!activeTimer) return pill.remove();
    const left = Math.max(0, Math.round((activeTimer.end - Date.now()) / 1000));
    clearChildren(pill);
    pill.append(
      h("span.timer-time", `⏰ ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`),
      h("button.timer-btn", { onclick: () => { activeTimer.end += 60000; tick(); } }, "+1 min"),
      h("button.timer-btn", { "aria-label": "Stop timer", onclick: () => { clearInterval(activeTimer.id); activeTimer = null; tick(); } }, "✕"),
    );
    if (left === 0) {
      clearInterval(activeTimer.id);
      activeTimer = null;
      ding();
      document.body.classList.add("flash");
      setTimeout(() => document.body.classList.remove("flash"), 1600);
      toast("Time's up!", { emoji: "⏰", ms: 6000 });
      pill.remove();
    }
  };
  return { pill, tick };
}

function startTimer(seconds) {
  if (activeTimer) clearInterval(activeTimer.id);
  document.querySelector(".timer-pill")?.remove();
  const { pill, tick } = timerPill();
  activeTimer = { end: Date.now() + seconds * 1000, id: setInterval(() => tick(), 1000) };
  document.body.append(pill);
  tick();
}

export function viewCook({ match, params, setCleanup }) {
  const dish = state.dishes.get(match[1]);
  if (!dish) return notFound();
  const servings = Number(params.get("s")) || dish.servings || 4;
  const shown = shownLines(dish, servings / (dish.servings || servings));
  const steps = dish.steps.map(shown.step);
  const last = steps.length + 1;
  let index = 0;
  const stage = h("div.cook-stage");
  const dots = h("div.cook-dots");
  const backBtn = h("button.btn.soft.cook-nav", { onclick: () => show(index - 1) }, "◀ Back");
  const nextBtn = h("button.btn.primary.cook-nav.cook-next", { onclick: () => show(index + 1) }, "Next ▶");
  const readBtn = h("button.btn.soft.cook-nav", { "aria-label": "Read it to me", onclick: () => readAloud() }, "🔊");
  const gathered = new Set();

  // The video sits above the steps, so you can watch and follow along at the same time.
  const video = videoInfo(dish.videoUrl);
  const videoPanel = h("div.cook-video");
  videoPanel.hidden = true;
  const videoBtn = video
    ? h("button.icon-btn", {
      "aria-label": "Show the video",
      "aria-pressed": "false",
      onclick: () => {
        if (!video.embedUrl) return openVideo(video);
        const on = videoPanel.hidden;
        clearChildren(videoPanel);
        if (on) videoPanel.append(videoBox(video, dish.name, { autoload: true }));
        videoPanel.hidden = !on;
        videoBtn.setAttribute("aria-pressed", String(on));
        videoBtn.setAttribute("aria-label", on ? "Hide the video" : "Show the video");
      },
    }, "📺")
    : h("span.spacer-36");

  const readAloud = () => {
    const text = index === 0
      ? "Let's get ready! Gather these: " + shown.lines.filter((l) => !l.header && !l.off).map((l) => l.text).join(", ")
      : index === last ? "You did it! Great job!" : `Step ${index}. ${steps[index - 1]}`;
    if (!speak(text)) toast("This device can't read aloud.", { emoji: "🔇" });
  };

  const show = (i) => {
    index = Math.max(0, Math.min(last, i));
    clearChildren(stage);
    clearChildren(dots);
    for (let d = 0; d <= last; d++) dots.append(h(`span${d === index ? ".on" : d < index ? ".done" : ""}`));
    backBtn.disabled = index === 0;
    nextBtn.style.visibility = index === last ? "hidden" : "visible";
    nextBtn.textContent = index === last - 1 ? "Finish 🎉" : index === 0 ? "Let's cook ▶" : "Next ▶";
    if (index === 0) {
      const lines = shown.lines.map((l, n) => ({ line: l.text, n })).filter(({ n }) => !shown.lines[n].header && !shown.lines[n].off);
      stage.append(
        h("h2.cook-title", "🧺 Get ready!"),
        h("p.cook-sub", `Gather everything for ${servings} people. Tap each one when you have it.`),
        h("ul.gather", lines.map(({ line, n }) => {
          const li = h(`li${gathered.has(n) ? ".done" : ""}`,
            h("button.ing-btn", {
              onclick: () => {
                gathered.has(n) ? gathered.delete(n) : gathered.add(n);
                li.classList.toggle("done");
                li.querySelector(".check").textContent = gathered.has(n) ? "✓" : "";
              },
            }, h("span.check", gathered.has(n) ? "✓" : ""), h("span", line)));
          return li;
        })),
      );
    } else if (index === last) {
      confetti();
      updateDish(dish.id, { timesCooked: (dish.timesCooked || 0) + 1, lastCooked: dateKey(new Date()) });
      stage.append(
        h("div.huge-emoji.center", "🎉"),
        h("h2.cook-title.center", "You did it!"),
        h("p.cook-sub.center", "Great cooking, chefs! Take a picture before you eat it?"),
        h("div.button-list",
          h("button.btn.primary.big", {
            onclick: async () => {
              const file = await pickImage({ camera: true });
              if (file) {
                await addPhoto(dish.id, await preparePhoto(file));
                toast("Photo saved!", { emoji: "📸" });
              }
            },
          }, "📷 Take a picture"),
          h("button.btn.soft.big", { onclick: () => rateSheet(dish) }, "⭐ How was it?"),
          h("button.btn.soft", {
            onclick: once(async () => {
              await addToFreezer(dish.id, 1);
              toast(`${dish.name} is in the freezer list. Plan it any night!`, { emoji: "🧊" });
            }),
          }, "🧊 We froze some for later"),
          usedUp(dish),
          h("button.btn.ghost", { onclick: () => go(`#/dish/${dish.id}`, { replace: true }) }, "Back to the recipe"),
        ),
      );
    } else {
      const text = steps[index - 1];
      const timers = findTimers(text);
      stage.append(...[
        h("div.step-num", index),
        h("p.step-text", text),
        GROWN_UP.test(text) ? h("p.grown-up", "🧑 A grown-up helps with this step") : null,
        timers.length
          ? h("div.row.wrap.center", timers.map((t) =>
            h("button.btn.timer-start", { onclick: () => startTimer(t.seconds) }, `⏰ Start ${t.label} timer`)))
          : null,
      ].filter(Boolean));
    }
  };

  // Swipe left/right to change steps.
  let startX = null;
  stage.addEventListener("pointerdown", (e) => (startX = e.clientX));
  stage.addEventListener("pointerup", (e) => {
    if (startX == null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 70) show(index + (dx < 0 ? 1 : -1));
  });

  // Android drops the keep-awake lock when you switch apps; ask again on return.
  const wake = () => document.visibilityState === "visible" && keepScreenOn(true);
  wake();
  document.addEventListener("visibilitychange", wake);
  setCleanup(() => {
    document.removeEventListener("visibilitychange", wake);
    keepScreenOn(false);
    stopSpeaking();
  });
  show(0);
  return h("div.screen.cook",
    h("header.cook-top",
      h("button.icon-btn", { "aria-label": "Stop cooking", onclick: () => go(`#/dish/${dish.id}`, { replace: true }) }, "✕"),
      h("div.cook-name", dish.emoji, " ", dish.name),
      videoBtn,
    ),
    videoPanel,
    dots,
    stage,
    h("div.cook-bar", backBtn, readBtn, nextBtn),
  );
}

