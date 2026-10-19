# Family Menu 🍚

Our family's own digital menu: every dish we love, with recipes, photos and ratings,
plus a weekly meal plan and a shopping list that makes itself. Simple enough for a
7-year-old: big pictures, big buttons, very little reading.

- **Today**: what's for breakfast, lunch, dinner and snack. When a grown-up sets out
  2–3 choices, the kids pick tonight's dinner. Rate last night's dinner with faces 😍 😋 😐 😖.
- **Week**: plan seven days. Tap a spot to pick a dish, add sides, or let the kids choose.
  **🎲 Fill with favorites** fills the empty spots from the dishes the family rates highest.
  **✨ Plan with Claude** builds a balanced, healthy week and finds new recipes from
  Seonkyoung Longest and other well-known cooks.
- **Menu**: all our dishes as picture tiles. Each has servings you can change (the
  ingredients rescale), steps, tips, food photos, hearts and everyone's faces.
  **👩‍🍳 Cook together** shows one big step at a time, with timers and read-aloud.
- **Shop**: the week's ingredients merged into one list, sorted by aisle (including an
  Asian-market aisle). Tick things off, or send the list to a phone.
- **Add a dish**: paste a link (recipe sites, Instagram, TikTok, YouTube), snap a photo
  of a cookbook page or a screenshot, paste a caption, or write our own.
- **🙋 I want to eat…**: kids make wishes, and the grown-ups see them when planning.

It starts with 38 family recipes: 24 healthy Korean home dishes (bulgogi, japchae,
miyeok guk, gyeran jjim, namul, kimbap…) and everyday favorites like pancakes, tacos,
spaghetti and salmon.

---

## 1. Put it online (once, about 2 minutes)

The app is a website that installs on the tablet like a real app. GitHub hosts it for free.

1. On GitHub, open this repository → **Settings** → **Pages** (left side).
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to **main** and the folder to **/ (root)**, then **Save**.
4. Wait a minute or two. The address appears at the top of that page:
   **https://pcbsc.github.io/family-meals/**

Only the app's code is public. Your recipes, photos, ratings and Claude key stay on
your own device and are never uploaded to GitHub.

## 2. Install it on the Android tablet or phone

1. Open **https://pcbsc.github.io/family-meals/** in **Chrome**.
2. Tap the **⋮** menu → **Install app** (on some phones it's **Add to Home screen**).
   The app may also offer an **Install** button on its Today screen.
3. Open **Family Menu** from the home screen and follow the welcome steps: family
   names and faces, then the starter dishes.

## 3. Turn on Claude (recommended)

Claude is the AI helper that turns links, Instagram/TikTok posts and photos into recipe
cards, and plans the week. It needs a key from an Anthropic account:

1. Go to **https://console.anthropic.com** and sign in (or sign up).
2. Under **Billing**, add a little credit. $5 lasts a long time.
3. Under **API keys**, create a key and copy it.
4. In Family Menu tap **⚙️** (top right of Today) → paste the key under
   **✨ Claude** → **Save & test**.

**Cost:** about 10–15¢ to import a recipe, and 25–40¢ to plan a week that includes new
dishes from the web. "Fill with favorites" and everything else are free and work offline.

The key is saved only on this device. It isn't put in backup files, and it's only ever
sent to Claude.

## Sharing recipes from Instagram or TikTok

After the app is installed (step 2), Android lists it in the **Share** menu:

1. In Instagram or TikTok, open the post and tap **Share** (the paper airplane or arrow).
2. Choose **Family Menu**. If you don't see it, tap **More** or **Other apps**.
3. Claude reads the post, finds the creator's written recipe if there is one, and
   opens the recipe form so you can check it, add a photo and tap **Save**.

If the recipe only exists in the video, Claude rebuilds it from the caption and says
it had to guess, so check the amounts. If a post is private, copy its caption or take a
screenshot and share or paste that instead. Screenshots can be shared straight to
Family Menu too.

## Grown-up PIN

In **⚙️ Settings → 🔒 Grown-up PIN**, set a 4-digit PIN. Then Settings, editing,
deleting and clearing the week ask for it. Kids can still look at everything, cook along,
rate, wish, add photos and pick dinner.

## Backups (important)

Because everything lives on the device, save a backup now and then:
**⚙️ Settings → 💾 Save backup file**. It saves one file (with all recipes and photos)
to Downloads. Keep a copy in Google Drive or email it to yourself. To move to a new
tablet, install the app there and use **📂 Restore from file**. The app reminds you
monthly.

## About the recipes

The starter recipes are home-style versions written for this app. The **✨ Discover**
list (Menu tab) links to recipes by Seonkyoung Longest, Korean Bapsang and Maangchi.
When you tap **Add**, Claude reads that page and saves a copy on your device for your
family to cook from, with a link back to the creator. Please visit their sites; their
videos are wonderful to watch together.

---

## For developers

A static web app with no build step. Open `index.html` through any web server.

| Path | What it is |
|---|---|
| `index.html`, `styles.css` | Page shell and all styles |
| `js/app.js` | Starts the app and routes `#/screens` |
| `js/views/*.js` | One file per screen |
| `js/store.js` | In-memory data plus saving to IndexedDB |
| `js/components.js`, `js/ui.js` | Shared pieces: tiles, sheets, PIN pad, photos |
| `js/recipe.js` | Ingredient parsing, servings scaling, shopping list, timers |
| `js/planner.js` | Dates and the no-AI "Fill with favorites" |
| `js/ai.js` | Claude: recipe import and week planning |
| `js/seed.js` | Starter recipes and the Discover list |
| `sw.js`, `manifest.webmanifest` | Offline support and the Android share target |
| `vendor/` | The official Anthropic SDK bundled as one module |

```sh
npm install        # dev tools only: esbuild, Playwright, the SDK source
npm test           # unit tests (Node)
npm run e2e        # drives the app in Chromium with Claude's API mocked
npm run vendor     # rebuild vendor/anthropic-sdk.mjs and the font after an upgrade
npm run icons      # re-render icons/*.png from icons/icon.svg
npm run serve      # http://localhost:8080
```

Claude calls go from the browser straight to the API with the family's key
(`dangerouslyAllowBrowser`), because there is no server. They use `claude-opus-5-5`
with the `web_fetch` / `web_search` server tools and a client tool that returns the
structured result. They also handle `pause_turn`, retry when the result is incomplete,
and opt into server-side fallbacks (`fallbacks: "default"`) in case a request is
declined. If you add a file the app needs offline, list it in `APP_FILES` in `sw.js`
and bump `VERSION`.
