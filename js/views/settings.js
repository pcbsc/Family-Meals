// Settings (grown-ups only, behind the PIN if one is set) and the first-run
// welcome that sets up the family and the starter menu.
import { h, toast, confirmSheet, grownUpCheck, downloadFile, clearChildren, openSheet, confetti } from "../ui.js";
import { MEALS, AVATARS, STARTER_DISHES } from "../seed.js";
import { state, saveSettings, addStarterDishes, loadAll, go, refresh, db } from "../store.js";
import { backHeader, stepper, chip } from "../components.js";

function avatarPicker(current, onPick) {
  openSheet((close) =>
    h("div.emoji-grid", AVATARS.map((a) =>
      h(`button.emoji-choice${a === current ? ".on" : ""}`, { onclick: () => { onPick(a); close(); } }, a))),
  { title: "Pick a face" });
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
        h("button.icon-btn", {
          "aria-label": `Remove ${m.name}`,
          onclick: async () => {
            await saveSettings({ members: state.settings.members.filter((_, j) => j !== i) });
            onChange?.();
            draw();
          },
        }, "✕"),
      ));
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
          await close();
          toast("PIN saved. Don't forget it!", { emoji: "🔒" });
          refresh();
        },
      }, "Save PIN"),
    ),
  { title: "🔒 Grown-up PIN" });
}

async function saveBackup() {
  const data = await db.exportAll();
  downloadFile(`family-menu-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data));
  await saveSettings({ lastBackupAt: Date.now() });
  toast("Backup saved to Downloads. Keep it somewhere safe (like Google Drive).", { emoji: "💾", ms: 5000 });
  refresh();
}

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
  if (!(await grownUpCheck(state.settings.pin))) {
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
    h("p.muted", "For grown-ups. Everything is saved on this device only."),

    h("section.card", h("h2", "👨‍👩‍👧 Our family"), h("p.muted", "Everyone gets a face for rating dishes and making wishes."), familyEditor()),

    h("section.card",
      h("h2", "🍽️ Meals"),
      h("span.field-label", "We plan"), mealRow,
      h("span.field-label", "Usually cooking for (people)"),
      stepper(s.servings, { max: 20, label: "Servings", onchange: (n) => saveSettings({ servings: n }) }),
      h("span.field-label", "Our week starts on"), weekRow,
    ),

    h("section.card",
      h("h2", "🥗 Food notes for Claude"),
      h("label.field", h("span.field-label", "Allergies, dislikes, spice level"),
        h("textarea.text", { rows: 3, value: s.foodNotes, placeholder: "No peanuts. Kids like mild food. Dad doesn't eat mushrooms.", onchange: (e) => saveSettings({ foodNotes: e.target.value }) })),
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
    h("p.muted.small.center", "Family Menu · made for our family · ", h("a", { href: "https://github.com/pcbsc/family-meals#readme", target: "_blank", rel: "noopener" }, "help")),
  );
}

// ---------- First run ----------

export function viewWelcome() {
  const body = h("div.welcome-body");
  const stepHello = () => {
    clearChildren(body);
    body.append(
      h("img.welcome-icon", { src: "icons/icon-192.png", alt: "" }),
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
    const korean = STARTER_DISHES.filter((d) => d.categories.includes("korean")).length;
    const finish = async (withStarters) => {
      const people = state.settings.members.length;
      await saveSettings({ onboarded: true, servings: people >= 2 ? people : state.settings.servings });
      if (withStarters) await addStarterDishes();
      confetti();
      go("#/today", { replace: true });
    };
    body.append(
      h("h1", "Start with some dishes?"),
      h("p.big-text", `We have ${STARTER_DISHES.length} family recipes ready: ${korean} healthy Korean favorites (bulgogi, japchae, miyeok guk, gyeran jjim…) plus pancakes, tacos, spaghetti and more.`),
      h("button.btn.primary.big.wide", { onclick: () => finish(true) }, "✅ Yes, add them"),
      h("button.btn.ghost.wide", { onclick: () => finish(false) }, "No thanks, we'll add our own"),
    );
  };
  stepHello();
  return h("div.screen.welcome", body);
}
