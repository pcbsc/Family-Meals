// Copies the app's files (the same list the service worker keeps offline) into
// www/, which Capacitor packs into the Android app. Run by `npm run android:sync`.
import { readFileSync, mkdirSync, copyFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "www");
const sw = readFileSync(join(ROOT, "sw.js"), "utf8");
const list = sw.slice(sw.indexOf("const APP_FILES = ["), sw.indexOf("];", sw.indexOf("const APP_FILES = [")));
const files = [...list.matchAll(/"\.\/([^"]+)"/g)].map((m) => m[1]);
if (files.length < 20) throw new Error(`Only found ${files.length} app files in sw.js`);

rmSync(OUT, { recursive: true, force: true });
for (const f of [...files, "sw.js"]) {
  mkdirSync(dirname(join(OUT, f)), { recursive: true });
  copyFileSync(join(ROOT, f), join(OUT, f));
}
console.log(`Copied ${files.length + 1} files into www/`);
