// Settings (grown-ups only, behind the PIN if one is set) and the first-run
// welcome that sets up the family and the starter menu.
import { h, toast, confirmSheet, downloadFile, clearChildren, openSheet, confetti, once, unlockGrownUp } from "../ui.js";
import { dateKey } from "../planner.js";
import { MEALS, AVATARS, STARTER_DISHES, LATEST_STARTER_BATCH } from "../seed.js";
import { SPICE_LEVELS } from "../recipe.js";
import { state, saveSettings, addStarterDishes, loadAll, go, refresh, db, cookPrefs } from "../store.js";
import { grownUp, backHeader, stepper, chip } from "../components.js";
import { shareConfig, validSetup, newFamilyId, joinLink, parseJoin, startList, readList, forgetToken } from "../share.js";

/** Healthy swaps, spice level and units: the same switches as on every recipe. */
function cookWayCard() {
  const box = h("div.stack");
  const draw = () => {
    clearChildren(box);
    const p = cookPrefs();
    const set = async (patch) => { await saveSettings(patch); draw(); };
    box.append(
      h("span.field-label", "Healthy swaps (brown rice, less sugar, low-sodium soy sauce…)"),
      h("div.row.wrap", chip("Healthy", { emoji: "🥗", on: p.healthy, onclick: () => set({ healthy: !p.healthy }) })),
      h("span.field-label", "How spicy we like it"),
      h("div.row.wrap", SPICE_LEVELS.map((l) => chip(l.label, { emoji: l.emoji, on: p.spice === l.key, onclick: () => set({ spice: l.key }) }))),
      h("span.field-label", "Amounts"),
      h("div.row.wrap",
        chip("Cups & pounds", { emoji: "🥄", on: !p.metric, onclick: () => set({ metric: false }) }),
        chip("Grams & ml", { emoji: "⚖️", on: p.metric, onclick: () => set({ metric: true }) }),
      ),
    );
  };
  draw();
  return h("section.card",
    h("h2", "🍳 How we cook"),
    h("p.muted", "Every recipe and the shopping list follow these. You can also change them on any recipe."),
    box,
  );
}

/** Share the shopping list with a second phone, through the family's own free Firebase project. */
function shareCard() {
  const box = h("div.stack");
  const draw = () => {
    clearChildren(box);
    const cfg = shareConfig();
    if (cfg) {
      const link = joinLink(cfg);
      box.append(...[
        h("p", cfg.role === "member"
          ? "✅ This phone uses the family's shared shopping list."
          : "✅ The shopping list is shared. Open this link on the other phone to join:"),
        cfg.role === "member" ? null : h("input.text", { value: link, readonly: true, "aria-label": "Join link", onfocus: (e) => e.target.select() }),
        h("div.row.wrap",
          cfg.role === "member" ? null : h("button.btn.primary", {
            onclick: async () => {
              try {
                if (navigator.share) await navigator.share({ title: "Join our shopping list", text: "Open this to share our Family Menu shopping list:", url: link });
                else {
                  await navigator.clipboard.writeText(link);
                  toast("Link copied! Send it to the other phone.", { emoji: "📋" });
                }
              } catch (err) {
                if (err?.name !== "AbortError") toast("Copy the link from the box above.", { emoji: "📋" });
              }
            },
          }, "📤 Send the join link"),
          h("button.btn.ghost", {
            onclick: async () => {
              if (!(await confirmSheet("Stop sharing the shopping list on this phone?", { yes: "Stop sharing" }))) return;
              forgetToken();
              await saveSettings({ share: null });
              draw();
            },
          }, "Stop sharing"),
        ),
        h("p.muted.small", "Anyone with the link can see and tick the list, so only send it to family."),
      ].filter(Boolean));
      return;
    }
    let apiKey = "";
    let projectId = "";
    const status = h("p.muted.small", { role: "status" });
    box.append(
      h("p", "Both grown-ups' phones can tick the same list in the store. It needs a free Firebase project (10 minutes, once). The ",
        h("a", { href: "https://github.com/pcbsc/Family-Meals#shared-shopping-list", target: "_blank", rel: "noopener" }, "README"), " has the steps."),
      h("label.field", h("span.field-label", "Web API key"),
        h("input.text", { autocomplete: "off", placeholder: "AIza…", oninput: (e) => (apiKey = e.target.value.trim()) })),
      h("label.field", h("span.field-label", "Project ID"),
        h("input.text", { autocomplete: "off", placeholder: "our-family-menu", oninput: (e) => (projectId = e.target.value.trim()) })),
      status,
      h("button.btn.primary", {
        onclick: async () => {
          if (!validSetup(apiKey, projectId)) {
            status.textContent = "❌ That doesn't look like a Firebase web API key and project ID.";
            return;
          }
          status.textContent = "Setting up…";
          const cfg = { apiKey, projectId, familyId: newFamilyId(), role: "owner" };
          await saveSettings({ share: cfg });
          try {
            forgetToken();
            await startList(cfg, dateKey(new Date()));
            confetti(["📱", "🛒", "🎉"]);
            draw();
          } catch (err) {
            await saveSettings({ share: null });
            status.textContent = `❌ ${err.status === 403 || err.status === 400
              ? "Firebase said no. Check that Anonymous sign-in is on and the rules are pasted in (see the README)."
              : err.message}`;
          }
        },
      }, "📱 Start sharing"),
    );
  };
  draw();
  return h("section.card", h("h2", "📱 Shared shopping list"), box);
}

// ---------- Joining another phone's list ----------

export function viewJoin({ params }) {
  const cfg = parseJoin(params);
  const body = h("div.stack");
  if (!cfg) {
    body.append(h("div.empty-state", h("div.huge-emoji", "🤔"), h("p", "This join link looks broken. Ask for a new one."),
      h("button.btn.primary", { onclick: () => go("#/today", { replace: true }) }, "🏠 Go home")));
  } else {
    const status = h("p.muted", { role: "status" });
    body.append(
      h("div.huge-emoji.center", "📱"),
      h("h1.center", "Join the family shopping list?"),
      h("p.big-text.center", "This phone will see the same list and ticks as the planning phone."),
      status,
      h("button.btn.primary.big.wide", {
        onclick: once(async () => {
          status.textContent = "Joining…";
          await saveSettings({ share: { ...cfg, role: "member" } });
          forgetToken();
          try {
            const list = await readList(cfg);
            if (!list) throw Object.assign(new Error("gone"), { status: 404 });
            await saveSettings({ share: { ...state.settings.share, last: list } });
            confetti(["🛒", "🎉"]);
            if (state.settings.onboarded) go("#/shop", { replace: true });
            else {
              // A brand-new phone: set up the family and menu next. The list stays joined.
              toast("Joined! Now let's set up this phone.", { emoji: "📱" });
              go("#/welcome", { replace: true });
            }
          } catch (err) {
            await saveSettings({ share: null });
            status.textContent = err.status === 404 ? "❌ That list isn't there anymore. Ask for a new link."
              : err.status === 403 ? "❌ Firebase said no. Check the rules (see the README)."
                : "❌ Couldn't reach the list. Check the internet and try again.";
            refresh();
          }
        }),
      }, "✅ Join"),
      h("button.btn.ghost.wide", { onclick: () => go("#/today", { replace: true }) }, "Not now"),
    );
  }
  return h("div.screen.join", body);
}

function avatarPicker(current, onPick) {
  openSheet((close) =>
    h("div.emoji-grid", AVATARS.map((a) =>
      h(`button.emoji-choice${a === current ? ".on" : ""}`, { onclick: () => { onPick(a); close(); } }, a))),
  { title: "Pick a face" });
}

/**
 * Someone's food: allergies (warned about everywhere, never picked by the
 * fill buttons or Claude), dislikes, how spicy, and foods they always eat.
 */
function foodSheet(member, onSaved) {
  const m = { ...member };
  openSheet((close) => {
    const spiceRow = h("div.segmented", { role: "group", "aria-label": "How spicy" });
    const drawSpice = () => {
      clearChildren(spiceRow);
      for (const [key, label] of [["", "Family way"], ["mild", "😊 Mild"], ["medium", "🌶️ Medium"], ["spicy", "🔥 Spicy"]]) {
        spiceRow.append(h(`button.seg${(m.spice || "") === key ? ".on" : ""}`, {
          "aria-pressed": String((m.spice || "") === key),
          onclick: () => { m.spice = key; drawSpice(); },
        }, label));
      }
    };
    drawSpice();
    const field = (key, label, placeholder) => [
      h("label.field-label", { for: `food-${key}` }, label),
      h(`input.text#food-${key}`, { value: m[key] || "", placeholder, maxlength: 160, oninput: (e) => (m[key] = e.target.value) }),
    ];
    return h("div.stack",
      ...field("allergies", "⚠️ Allergies", "Like: peanuts, egg, shellfish"),
      h("p.muted.small", "Dishes with these get a red warning, and \"Fill our week\", the ideas and Claude never pick them. Sauces count too: soy sauce and gochujang have wheat and soy."),
      ...field("dislikes", "🙅 Doesn't like", "Like: mushrooms, cilantro"),
      ...field("safeFoods", "😋 Always eats", "Like: rice, eggs, cucumber"),
      h("p.muted.small", "Brave Bites suggests serving these next to a new food."),
      h("label.field-label", "🌶️ How spicy"),
      spiceRow,
      h("p.muted.small", "Mild for someone in a spicy family? Cook-along says when to scoop out their share."),
      h("button.btn.primary.wide", {
        onclick: async () => {
          const clean = (t) => String(t || "").split(/[,;\n]/).map((x) => x.trim()).filter(Boolean).join(", ");
          const patch = { allergies: clean(m.allergies), dislikes: clean(m.dislikes), safeFoods: clean(m.safeFoods), spice: m.spice || "" };
          await saveSettings({ members: state.settings.members.map((x) => (x.id === member.id ? { ...x, ...patch } : x)) });
          await close();
          onSaved?.();
        },
      }, "Save"),
    );
  }, { title: `🍽️ ${member.name}'s food` });
}

/** "⚠️ peanuts · 🙅 mushrooms · 😊 mild" under someone's name. */
function foodSummary(m) {
  const bits = [m.allergies && `⚠️ ${m.allergies}`, m.dislikes && `🙅 ${m.dislikes}`, m.spice && { mild: "😊 mild", medium: "🌶️ medium", spicy: "🔥 spicy" }[m.spice]].filter(Boolean);
  return bits.length ? h("p.muted.small.food-summary", bits.join(" · ")) : null;
}

function familyEditor({ onChange } = {}) {
  const wrap = h("div.stack");
  const draw = () => {
    clearChildren(wrap);
    const list = state.settings.members;
    list.forEach((m, i) => {
      const update = async (patch) => {
        const members = state.settings.members.map((x, j) => (j === i ? { ...x, ...patch } : x));
        await saveSettings({ members });
        onChange?.();
      };
      wrap.append(h("div.member-row",
        h("button.avatar-btn.small", { "aria-label": "Change face", onclick: () => avatarPicker(m.avatar, async (a) => { await update({ avatar: a }); draw(); }) },
          h("span.avatar.lg", m.avatar)),
        h("input.text.grow", { value: m.name, "aria-label": "Name", placeholder: "Name", onchange: (e) => update({ name: e.target.value.trim() || "Someone" }) }),
        h(`button.chip${m.kid ? ".on" : ""}`, { onclick: async () => { await update({ kid: !m.kid }); draw(); } }, m.kid ? "🧒 Kid" : "🧑 Grown-up"),
        h("button.icon-btn", { "aria-label": `${m.name}'s food: allergies, likes, spice`, onclick: () => foodSheet(m, () => { onChange?.(); draw(); }) }, "🍽️"),
        h("button.icon-btn", {
          "aria-label": `Remove ${m.name}`,
          onclick: async () => {
            await saveSettings({ members: state.settings.members.filter((_, j) => j !== i) });
            onChange?.();
            draw();
          },
        }, "✕"),
      ), ...[foodSummary(m)].filter(Boolean));
    });
    wrap.append(h("button.btn.soft", {
      onclick: async () => {
        const used = new Set(list.map((m) => m.avatar));
        const avatar = AVATARS.find((a) => !used.has(a)) || "🙂";
        await saveSettings({ members: [...state.settings.members, { id: db.newId("m-"), name: "Kid", avatar, kid: true }] });
        onChange?.();
        draw();
        wrap.querySelectorAll("input")[list.length]?.focus();
      },
    }, "➕ Add someone"));
  };
  draw();
  return wrap;
}

function pinSheet() {
  let pin = "";
  openSheet((close) =>
    h("div.stack",
      h("p", "A 4-digit PIN keeps Settings, editing and deleting for grown-ups. Kids can still look, cook, rate, wish and pick dinner."),
      h("input.text.pin-input", { type: "password", inputmode: "numeric", maxlength: 4, autofocus: true, placeholder: "••••", oninput: (e) => (pin = e.target.value.replace(/\D/g, "")) }),
      h("button.btn.primary.wide", {
        onclick: async () => {
          if (pin.length !== 4) return toast("Use exactly 4 numbers.", { emoji: "🔢" });
          await saveSettings({ pin });
          // They just typed it: setting a PIN shouldn't lock them out of the screen they're on.
          unlockGrownUp();
          await close();
          toast("PIN saved. Don't forget it!", { emoji: "🔒" });
          refresh();
        },
      }, "Save PIN"),
    ),
  { title: "🔒 Grown-up PIN" });
}

const saveBackup = once(async () => {
  const data = await db.exportAll();
  downloadFile(`family-menu-backup-${dateKey(new Date())}.json`, JSON.stringify(data));
  await saveSettings({ lastBackupAt: Date.now() });
  toast("Backup saved to Downloads. Keep it somewhere safe (like Google Drive).", { emoji: "💾", ms: 5000 });
  refresh();
});

function restoreBackup() {
  const input = h("input", { type: "file", accept: "application/json,.json", style: { display: "none" } });
  input.onchange = async () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const when = data.savedAt ? new Date(data.savedAt).toLocaleString() : "an unknown date";
      if (!(await confirmSheet(`Replace everything on this device with the backup from ${when}?`, { yes: "Restore", danger: true }))) return;
      await db.importAll(data);
      await loadAll();
      toast("Backup restored!", { emoji: "✅" });
      refresh();
    } catch (err) {
      toast(err.message || "That file couldn't be read.", { emoji: "😕", ms: 5000 });
    }
  };
  document.body.append(input);
  input.click();
}

export async function viewSettings() {
  if (!(await grownUp())) {
    go("#/today", { replace: true });
    return null;
  }
  const s = state.settings;
  let key = s.apiKey;
  const keyStatus = h("p.muted.small", s.apiKey ? "✅ A key is saved on this device." : "No key yet.");

  const mealRow = h("div.row.wrap");
  const drawMeals = () => {
    clearChildren(mealRow);
    for (const m of MEALS) {
      const on = state.settings.meals.includes(m.key);
      mealRow.append(chip(m.label, {
        emoji: m.emoji,
        on,
        onclick: async () => {
          const meals = on ? state.settings.meals.filter((k) => k !== m.key) : MEALS.map((x) => x.key).filter((k) => k === m.key || state.settings.meals.includes(k));
          if (!meals.length) return toast("Keep at least one meal.", { emoji: "☝️" });
          await saveSettings({ meals });
          drawMeals();
        },
      }));
    }
  };
  drawMeals();

  const weekRow = h("div.row.wrap");
  const drawWeek = () => {
    clearChildren(weekRow);
    weekRow.append(
      chip("Sunday", { on: state.settings.weekStartsOn === 0, onclick: async () => { await saveSettings({ weekStartsOn: 0 }); drawWeek(); } }),
      chip("Monday", { on: state.settings.weekStartsOn === 1, onclick: async () => { await saveSettings({ weekStartsOn: 1 }); drawWeek(); } }),
    );
  };
  drawWeek();

  return h("div.screen.settings",
    backHeader("⚙️ Settings", { back: "#/today" }),
    h("p.muted", "For grown-ups. Everything is saved on this device only (except the shopping list, if you share it)."),

    h("section.card", h("h2", "👨‍👩‍👧 Our family"), h("p.muted", "Everyone gets a face for rating dishes and making wishes."), familyEditor()),

    h("section.card",
      h("h2", "🍽️ Meals"),
      h("span.field-label", "We plan"), mealRow,
      h("span.field-label", "Usually cooking for (people)"),
      stepper(s.servings, { max: 20, label: "Servings", onchange: (n) => saveSettings({ servings: n }) }),
      h("span.field-label", "Our week starts on"), weekRow,
    ),

    cookWayCard(),
    shareCard(),

    h("section.card",
      h("h2", "🥗 Food notes for Claude"),
      h("label.field", h("span.field-label", "Allergies, dislikes, spice level"),
        h("textarea.text", { rows: 3, value: s.foodNotes, placeholder: "No peanuts. Our 7-year-old likes spicy food. Dad doesn't eat mushrooms.", onchange: (e) => saveSettings({ foodNotes: e.target.value }) })),
      h("label.field", h("span.field-label", "What we like to eat"),
        h("textarea.text", { rows: 3, value: s.cuisineMix, onchange: (e) => saveSettings({ cuisineMix: e.target.value }) })),
    ),

    h("section.card",
      h("h2", "✨ Claude (AI helper)"),
      h("p", "Claude turns links, Instagram and TikTok posts, and photos into recipes, and plans the week. It needs a key from your Anthropic account:"),
      h("ol.small-list",
        h("li", "Go to ", h("a", { href: "https://console.anthropic.com/settings/keys", target: "_blank", rel: "noopener" }, "console.anthropic.com"), " and sign in (or sign up)."),
        h("li", "Add a little credit under Billing ($5 lasts a long time)."),
        h("li", "Create an API key, copy it, and paste it here."),
      ),
      h("input.text", { type: "password", value: key, placeholder: "sk-ant-…", autocomplete: "off", "aria-label": "Claude API key", oninput: (e) => (key = e.target.value.trim()) }),
      keyStatus,
      h("div.row.wrap",
        h("button.btn.primary", {
          onclick: async () => {
            keyStatus.textContent = "Checking…";
            try {
              const { testKey } = await import("../ai.js");
              if (key) await testKey(key);
              await saveSettings({ apiKey: key });
              keyStatus.textContent = key ? "✅ The key works and is saved on this device." : "Key removed.";
              if (key) confetti(["✨", "🎉"]);
            } catch (err) {
              keyStatus.textContent = `❌ ${err.message}`;
            }
          },
        }, "Save & test"),
        s.apiKey ? h("button.btn.ghost", { onclick: async () => { await saveSettings({ apiKey: "" }); refresh(); } }, "Remove key") : null,
      ),
      h("p.muted.small", "Typical cost: about 10–15¢ to import a recipe and 25–40¢ to plan a week with new dishes. The key never leaves this device except to talk to Claude, and isn't included in backups."),
      h("p.muted.small", "What Claude sees: the link, text or photo you import. When planning: your dish names and ratings, the food notes above, and the first names of the family (so it can say who asked for what)."),
    ),

    h("section.card",
      h("h2", "🔒 Grown-up PIN"),
      h("p.muted", s.pin ? "A PIN is set. Settings, editing and deleting ask for it." : "No PIN yet. Anyone can open Settings and edit dishes."),
      h("div.row.wrap",
        h("button.btn.soft", { onclick: pinSheet }, s.pin ? "Change PIN" : "Set a PIN"),
        s.pin ? h("button.btn.ghost", { onclick: async () => { await saveSettings({ pin: "" }); refresh(); } }, "Remove PIN") : null,
      ),
    ),

    h("section.card",
      h("h2", "💾 Backup"),
      h("p", "Recipes and photos live only on this device. Save a backup file every month or so, and keep a copy in Google Drive or email it to yourself."),
      h("p.muted.small", s.lastBackupAt ? `Last backup: ${new Date(s.lastBackupAt).toLocaleDateString()}` : "No backup yet."),
      h("div.row.wrap",
        h("button.btn.primary", { onclick: saveBackup }, "💾 Save backup file"),
        h("button.btn.soft", { onclick: restoreBackup }, "📂 Restore from file"),
      ),
    ),

    h("section.card",
      h("h2", "🧰 More"),
      h("div.button-list",
        h("button.btn.soft", {
          onclick: async () => {
            const n = await addStarterDishes();
            toast(n ? `Added ${n} starter dishes.` : "All the starter dishes are already here.", { emoji: "📖" });
          },
        }, "📖 Add the starter dishes again"),
        h("button.btn.danger", {
          onclick: async () => {
            if (!(await confirmSheet("Erase ALL dishes, photos and plans on this device? This can't be undone. Save a backup first!", { yes: "Erase everything", danger: true }))) return;
            for (const store of ["dishes", "photos", "plan", "wishes", "shopping", "settings"]) await db.clear(store);
            await loadAll();
            go("#/welcome", { replace: true });
          },
        }, "🗑️ Erase everything"),
      ),
    ),
    h("p.muted.small.center", "Family Menu · made for our family · ", h("a", { href: "https://github.com/pcbsc/Family-Meals#readme", target: "_blank", rel: "noopener" }, "help")),
  );
}

// ---------- First run ----------

export function viewWelcome() {
  const body = h("div.welcome-body");
  const stepHello = () => {
    clearChildren(body);
    body.append(
      h("img.mascot.welcome-mascot", { src: "img/mascot.png", alt: "" }),
      h("h1", "Welcome to Family Menu!"),
      h("p.big-text", "Our dishes, our recipes, and what's for dinner this week."),
      h("button.btn.primary.big.wide", { onclick: stepFamily }, "Let's set up ▶"),
    );
  };
  const stepFamily = async () => {
    if (!state.settings.members.length) {
      await saveSettings({
        members: [
          { id: db.newId("m-"), name: "Mom", avatar: "👩", kid: false },
          { id: db.newId("m-"), name: "Dad", avatar: "👨", kid: false },
          { id: db.newId("m-"), name: "Kiddo", avatar: "🧒", kid: true },
        ],
      });
    }
    clearChildren(body);
    body.append(
      h("h1", "Who eats with us?"),
      h("p.muted", "Change the names and tap a face to pick a different one."),
      familyEditor(),
      h("button.btn.primary.big.wide", { onclick: stepMenu }, "Next ▶"),
    );
  };
  const stepMenu = () => {
    clearChildren(body);
    const korean = STARTER_DISHES.filter((d) => d.cuisine === "korean" || d.cuisine === "fusion").length;
    const finish = async (withStarters) => {
      const people = state.settings.members.length;
      await saveSettings({
        onboarded: true, onboardedAt: Date.now(), starterBatch: LATEST_STARTER_BATCH, braveTries: state.settings.braveTries || [],
        servings: people >= 2 ? people : state.settings.servings,
      });
      if (withStarters) await addStarterDishes();
      confetti();
      go("#/today", { replace: true });
    };
    body.append(
      h("h1", "Start with some dishes?"),
      h("p.big-text", `We have ${STARTER_DISHES.length} family recipes ready, almost all with a cooking video: ${korean} Korean and Korean-American favorites (bulgogi, tteokbokki, bulgogi tacos, kimchi quesadillas…), plus American, Italian, Mexican, Chinese, Japanese, Indian, Thai and Mediterranean dishes kids love.`),
      h("button.btn.primary.big.wide", { onclick: () => finish(true) }, "✅ Yes, add them"),
      h("button.btn.ghost.wide", { onclick: () => finish(false) }, "No thanks, we'll add our own"),
    );
  };
  stepHello();
  return h("div.screen.welcome", body);
}
