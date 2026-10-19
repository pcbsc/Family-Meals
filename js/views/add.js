// Add: bring in a recipe from a link (websites, Instagram, TikTok, YouTube), a
// photo or screenshot, pasted text, or write our own. Edit: the recipe form.
import { h, toast, openSheet, confirmSheet, preparePhoto, pickImage, imageForClaude, clearChildren, once } from "../ui.js";
import { MEALS, CATEGORIES, SPICE } from "../seed.js";
import { parseRecipeText, stripStepNumber, cleanLink } from "../recipe.js";
import { isVideoLink } from "../video.js";
import { state, blankDish, saveDish, updateDish, deleteDish, addPhoto, go, redrawScreen, db } from "../store.js";
import { backHeader, stepper, chip, progressSheet, needKeySheet, dishArt } from "../components.js";

const URL_RE = /https?:\/\/[^\s"'<>]+/i;

function notFoundSheet(problem) {
  openSheet((close) =>
    h("div.stack",
      h("div.huge-emoji.center", "🔎"),
      h("p.big-text", "Claude couldn't find the recipe there."),
      problem ? h("p.muted", problem) : null,
      h("p", "Try this: open the post, copy its caption (or take a screenshot), then come back and paste it or add the screenshot."),
      h("button.btn.primary.wide", { onclick: () => close() }, "OK"),
    ),
  { title: "Hmm…" });
}

let importing = false;

/** Asks Claude to make a recipe card, then opens the form to check and save it. */
export async function runImport({ url = "", text = "", imageFile = null }) {
  if (!state.settings.apiKey) return needKeySheet("Reading recipes");
  if (importing) return;
  importing = true;
  const progress = progressSheet("✨ Claude is reading the recipe…");
  try {
    const [{ importRecipe }, image] = await Promise.all([
      import("../ai.js"),
      imageFile ? imageForClaude(imageFile) : null,
    ]);
    const result = await importRecipe({
      apiKey: state.settings.apiKey,
      url,
      text,
      image,
      onProgress: progress.update,
      signal: progress.signal,
    });
    await progress.close();
    if (!result.found) return notFoundSheet(result.problem);
    state.draft = { ...result.recipe, confidence: result.confidence };
    go("#/new?draft=1");
  } catch (err) {
    await progress.close();
    if (err.message !== "Stopped.") toast(err.message, { emoji: "😕", ms: 6000 });
  } finally {
    importing = false;
  }
}

export async function viewAdd({ params }) {
  const hasKey = !!state.settings.apiKey;
  let pasted = "";
  const box = h("textarea.text", {
    rows: 3,
    placeholder: "Paste a link (Instagram, TikTok, a website) or the recipe",
    "aria-label": "Link or recipe",
    oninput: (e) => (pasted = e.target.value),
  });

  if (params.get("shared")) {
    const shared = await db.takeSharedItem();
    if (shared) {
      const all = [shared.title, shared.text, shared.url].filter(Boolean).join("\n");
      const found = (shared.url || all).match(URL_RE)?.[0] || "";
      const caption = all.replace(found, "").trim();
      if (hasKey) {
        setTimeout(() => runImport({ url: found, text: caption.length > 30 ? caption : "", imageFile: shared.image }), 50);
      } else {
        pasted = all;
        box.value = all;
      }
    }
  }

  // One box for both: a link goes to Claude to read; recipe text is tidied by Claude, or
  // (without a Claude key) sorted into ingredients and steps right here.
  const go_ = () => {
    const text = pasted.trim();
    if (!text) return toast("Paste a link or a recipe first.", { emoji: "📋" });
    const url = text.match(URL_RE)?.[0] || "";
    const rest = text.replace(url, "").trim();
    if (hasKey) return runImport({ url, text: url && rest.length <= 30 ? "" : text });
    if (url && rest.length <= 30) {
      if (!isVideoLink(url)) return needKeySheet("Reading links");
      // Without Claude a video link can't become a recipe, but it can still be the dish's video.
      state.draft = { ...blankDish(), sourceUrl: url, videoUrl: cleanLink(url), confidence: "video" };
      return go("#/new?draft=1");
    }
    const r = parseRecipeText(text);
    state.draft = { ...blankDish(), ...r, servings: r.servings || state.settings.servings, sourceUrl: url, confidence: "sorted" };
    if (isVideoLink(url)) state.draft.videoUrl = cleanLink(url);
    go("#/new?draft=1");
  };

  return h("div.screen.add",
    backHeader("➕ Add a dish", { back: "#/menu" }),
    h("section.card.add-card",
      box,
      h("button.btn.primary.big.wide", { onclick: go_ }, hasKey ? "✨ Get the recipe" : "➡️ Next"),
      h("p.tip", "📲 Or in Instagram or TikTok, tap ", h("strong", "Share"), " → ", h("strong", "Family Menu"), "."),
    ),
    h("div.add-choices",
      h("button.add-choice", { onclick: async () => { const f = await pickImage(); if (f) runImport({ imageFile: f }); } },
        h("span.add-emoji", "📸"), "Photo of a recipe"),
      h("button.add-choice", { onclick: () => { state.draft = null; go("#/new"); } },
        h("span.add-emoji", "✍️"), "Write our own recipe"),
      h("button.add-choice", { onclick: () => go("#/discover") },
        h("span.add-emoji", "✨"), "Ideas from famous cooks"),
    ),
  );
}

// ---------- The recipe form ----------

const FOOD_EMOJIS = "🍚 🍙 🍜 🍲 🥣 🍳 🥚 🥩 🍗 🍖 🐟 🦐 🥗 🥬 🥦 🥕 🥔 🍠 🌽 🍄 🧅 🧄 🥒 🌶️ 🍅 🥑 🍝 🍕 🌮 🌯 🥪 🍔 🌭 🍟 🥞 🧇 🥯 🍞 🧀 🥛 🍓 🍎 🍌 🍇 🍉 🍊 🍑 🥭 🍪 🧁 🍰 🍩 🍦 🥟 🍱 🥘 🍛 🍢 🍡 🫓 🥥 🥜 🫘 🍯".split(" ");

function lines(text) {
  return text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

function minutes(n) {
  return Math.min(24 * 60, Math.max(0, Math.round(Number(n) || 0)));
}

// The fields this form edits. Saving writes only these, so a photo, rating or
// heart added while the form was open isn't overwritten.
const FORM_FIELDS = [
  "name", "nameKo", "emoji", "description", "meals", "categories", "servings", "prepMinutes", "cookMinutes",
  "spicy", "ingredients", "steps", "notes", "sourceName", "sourceUrl", "imageUrl", "videoUrl",
];

const DRAFT_BANNERS = {
  guessed: ["🤔", "Claude had to guess some of this", "There wasn't a written recipe, so check the amounts before cooking."],
  sorted: ["📋", "We sorted your recipe", "Check the ingredients and steps, then Save."],
  video: ["📺", "The video is attached", "Give the dish a name, add the ingredients and steps if you like, then Save."],
  claude: ["✨", "Claude filled this in", "Have a quick look, add a photo if you like, then Save."],
};

function draftBanner(confidence) {
  const [emoji, title, text] = DRAFT_BANNERS[confidence] || DRAFT_BANNERS.claude;
  return h("section.card.banner", h("span.banner-emoji", emoji), h("div.grow", h("strong", title), h("p.muted", text)));
}

// What someone was typing, kept if they tap away before saving (until the app closes).
const unsaved = new Map();

export function viewEdit({ match, params }) {
  const existing = match?.[1] ? state.dishes.get(match[1]) : null;
  if (match?.[1] && !existing) return h("div.screen", backHeader("Oops"), h("p", "That dish isn't here anymore."));
  const draft = !existing && params.get("draft") ? state.draft : null;
  const formKey = existing ? existing.id : "new";
  if (draft) unsaved.delete("new");
  const kept = unsaved.get(formKey);
  const entry = kept || { f: structuredClone(existing || { ...blankDish(), ...(draft || {}) }), pendingPhotos: [] };
  const { f, pendingPhotos } = entry;
  const touch = () => unsaved.set(formKey, entry);
  const pendingWrap = h("div.row.wrap", pendingPhotos.map((p) => h("img.pending-photo", { src: URL.createObjectURL(p.thumb), alt: "New photo" })));

  const field = (label, input, hint) => h("label.field", h("span.field-label", label), input, hint ? h("span.hint", hint) : null);
  const text = (key, props = {}) => h("input.text", { value: f[key] || "", oninput: (e) => { f[key] = e.target.value; touch(); }, ...props });
  const area = (key, rows, props = {}) => h("textarea.text", {
    rows,
    value: Array.isArray(f[key]) ? f[key].join("\n") : f[key] || "",
    oninput: (e) => {
      f[key] = Array.isArray(f[key]) ? lines(e.target.value) : e.target.value;
      touch();
    },
    ...props,
  });

  const emojiBtn = h("button.emoji-pick", { type: "button", "aria-label": "Pick an emoji" }, f.emoji || "🍽️");
  emojiBtn.onclick = () => openSheet((close) =>
    h("div.emoji-grid", FOOD_EMOJIS.map((e) =>
      h("button.emoji-choice", { onclick: () => { f.emoji = e; emojiBtn.textContent = e; touch(); close(); } }, e))),
  { title: "Pick a picture" });

  const toggles = (key, options) => {
    const row = h("div.row.wrap");
    const draw = () => {
      clearChildren(row);
      for (const o of options) {
        const on = (f[key] || []).includes(o.key);
        row.append(chip(o.label, {
          emoji: o.emoji,
          on,
          onclick: () => {
            f[key] = on ? f[key].filter((k) => k !== o.key) : [...(f[key] || []), o.key];
            touch();
            draw();
          },
        }));
      }
    };
    draw();
    return row;
  };

  const spiceRow = h("div.row.wrap");
  const drawSpice = () => {
    clearChildren(spiceRow);
    SPICE.forEach((label, i) => spiceRow.append(chip(label, {
      emoji: i ? "🌶️".repeat(i) : "😊",
      on: (f.spicy || 0) === i,
      onclick: () => { f.spicy = i; touch(); drawSpice(); },
    })));
  };
  drawSpice();

  // One button: Android offers "Camera" or the gallery.
  const addPhotoBtn = () => h("button.btn.soft", {
    type: "button",
    onclick: async () => {
      const file = await pickImage();
      if (!file) return;
      const photo = await preparePhoto(file);
      if (existing) {
        await addPhoto(existing.id, photo);
        toast("Photo added!", { emoji: "📸" });
      } else {
        pendingPhotos.push(photo);
        touch();
        pendingWrap.append(h("img.pending-photo", { src: URL.createObjectURL(photo.thumb), alt: "New photo" }));
      }
    },
  }, "📷 Add photo");

  const save = once(async () => {
    f.name = (f.name || "").trim();
    if (!f.name) return toast("Give the dish a name first.", { emoji: "✏️" });
    f.steps = (f.steps || []).map(stripStepNumber).filter(Boolean);
    f.prepMinutes = minutes(f.prepMinutes);
    f.cookMinutes = minutes(f.cookMinutes);
    const typedLink = (f.sourceUrl || "").trim();
    f.sourceUrl = cleanLink(typedLink);
    const typedVideo = (f.videoUrl || "").trim();
    f.videoUrl = isVideoLink(typedVideo) ? cleanLink(typedVideo) : "";
    const fields = Object.fromEntries(FORM_FIELDS.map((k) => [k, f[k]]));
    let saved;
    if (existing) saved = await updateDish(existing.id, fields);
    else {
      saved = await saveDish(fields);
      for (const p of pendingPhotos) await addPhoto(saved.id, p);
    }
    unsaved.delete(formKey);
    state.draft = null;
    const linkNote = (typedLink && !f.sourceUrl ? " (The link didn't look like a web address, so it was left out.)" : "")
      + (typedVideo && !f.videoUrl ? " (The video link wasn't YouTube, TikTok or Instagram, so it was left out.)" : "");
    toast((existing ? "Saved!" : `${saved.name} is on our menu!`) + linkNote, { emoji: existing ? "💾" : "🎉", ms: linkNote ? 5000 : 2600 });
    go(`#/dish/${saved.id}`, { replace: true });
  });

  return h("div.screen.edit",
    backHeader(existing ? "✏️ Edit dish" : "🍳 New dish", { back: "#/menu" }),
    kept
      ? h("section.card.banner",
        h("span.banner-emoji", "✏️"),
        h("div.grow", h("strong", "We kept what you were typing."), h("p.muted", "Finish it and tap Save, or start again.")),
        h("button.btn.soft", { onclick: () => { unsaved.delete(formKey); redrawScreen(); } }, "Start over"),
      )
      : null,
    !kept && draft ? draftBanner(draft.confidence) : null,
    h("section.card.form",
      h("div.form-top",
        existing ? dishArt(existing, { className: "art-sm" }) : null,
        emojiBtn,
        h("div.grow", field("Name", text("name", { placeholder: "Grandma's Japchae", autofocus: !existing && !draft }))),
      ),
      h("div.row.wrap", addPhotoBtn(), pendingWrap),
      h("span.field-label", "Good for"), toggles("meals", MEALS),
      h("div.field", h("span.field-label", "Makes (people)"), stepper(f.servings || 4, { onchange: (n) => { f.servings = n; touch(); }, max: 40, label: "Servings" })),
      field("Ingredients", area("ingredients", 8, { placeholder: "2 cups rice\n1 lb beef, sliced\n3 tbsp soy sauce" }), "One per line, amount first."),
      field("Steps", area("steps", 8, { placeholder: "Wash the rice.\nCook the beef for 5 minutes." }), "One step per line."),
      h("details.more",
        h("summary", "More details (optional)"),
        h("div.stack",
          field("Korean name", text("nameKo", { placeholder: "잡채", lang: "ko" })),
          field("Short description", text("description", { placeholder: "Chewy noodles with lots of veggies" })),
          h("span.field-label", "What kind?"), toggles("categories", CATEGORIES),
          h("span.field-label", "How spicy?"), spiceRow,
          h("div.row.wrap.form-numbers",
            h("label.field.small-field", h("span.field-label", "Prep min"), text("prepMinutes", { type: "number", inputmode: "numeric", min: 0, oninput: (e) => { f.prepMinutes = minutes(e.target.value); touch(); } })),
            h("label.field.small-field", h("span.field-label", "Cook min"), text("cookMinutes", { type: "number", inputmode: "numeric", min: 0, oninput: (e) => { f.cookMinutes = minutes(e.target.value); touch(); } })),
          ),
          field("Tips", area("notes", 3, { placeholder: "Kids like it with extra sesame seeds." })),
          field("Recipe from", text("sourceName", { placeholder: "Seonkyoung Longest, Grandma…" })),
          field("Link", text("sourceUrl", { type: "url", placeholder: "https://…" })),
          field("Video link", text("videoUrl", { type: "url", placeholder: "https://youtube.com/…" }), "YouTube, TikTok or Instagram. Watch it on the dish page and while cooking."),
        ),
      ),
    ),
    h("div.save-bar", h("button.btn.primary.big.wide", { onclick: save }, "💾 Save")),
    existing
      ? h("button.btn.ghost.danger-text.center-btn", {
        onclick: async () => {
          if (!(await confirmSheet(`Delete ${existing.name} from our menu? Its photos go too.`, { yes: "Delete", danger: true }))) return;
          await deleteDish(existing.id);
          unsaved.delete(formKey);
          toast(`${existing.name} was deleted.`, { emoji: "🗑️" });
          go("#/menu", { replace: true });
        },
      }, "🗑️ Delete this dish")
      : null,
  );
}
