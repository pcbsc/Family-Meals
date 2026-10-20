// Renders icons/icon.svg to the PNG sizes Android and browsers ask for.
// Uses the Playwright Chromium that's already installed for the tests.
import { chromium } from "playwright";
import { readFileSync, readdirSync, existsSync } from "node:fs";

const svg = readFileSync("icons/icon.svg", "utf8");
const browser = await chromium.launch();
const page = await browser.newPage();

async function render(size, file, { padding = 0, radius = 0 } = {}) {
  await page.setViewportSize({ width: size, height: size });
  const inner = size - padding * 2;
  await page.setContent(`<html><body style="margin:0;background:#FF5A3C">
    <div style="width:${size}px;height:${size}px;display:grid;place-items:center">
      <div style="width:${inner}px;height:${inner}px;border-radius:${radius}px;overflow:hidden">${svg.replace("<svg ", `<svg width="${inner}" height="${inner}" `)}</div>
    </div></body></html>`);
  await page.screenshot({ path: file, omitBackground: false });
}

await render(192, "icons/icon-192.png");
await render(512, "icons/icon-512.png");
// Maskable: Android crops to a circle or squircle, so keep the art in the middle 80%.
await render(512, "icons/maskable-512.png", { padding: 51 });
await render(180, "icons/apple-touch-icon.png");
await render(32, "icons/favicon-32.png");

// ---------- The Android app (android/, made by Capacitor) ----------
// Launcher icons: a plain rounded icon and a round one for older phones, and
// for newer ones the bowl alone (the background is a gradient drawable), small
// enough that a circle mask never cuts the chopsticks.
const RES = "android/app/src/main/res";
const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const art = svg.replace(/<rect [^>]*\/>/, "");
async function shot(width, height, html, file, transparent = false) {
  await page.setViewportSize({ width, height });
  await page.setContent(`<html><body style="margin:0">${html}</body></html>`);
  await page.screenshot({ path: file, omitBackground: transparent });
}
const sized = (s, size) => s.replace("<svg ", `<svg width="${size}" height="${size}" `);
if (existsSync(RES)) {
  for (const [name, k] of Object.entries(DENSITIES)) {
    const dir = `${RES}/mipmap-${name}`;
    const legacy = Math.round(48 * k);
    await shot(legacy, legacy, `<div style="width:${legacy}px;height:${legacy}px;border-radius:${legacy * 0.22}px;overflow:hidden">${sized(svg, legacy)}</div>`, `${dir}/ic_launcher.png`, true);
    await shot(legacy, legacy, `<div style="width:${legacy}px;height:${legacy}px;border-radius:50%;overflow:hidden">${sized(svg, legacy)}</div>`, `${dir}/ic_launcher_round.png`, true);
    const fg = Math.round(108 * k);
    const box = Math.round(fg * 0.74);
    await shot(fg, fg, `<div style="width:${fg}px;height:${fg}px;display:grid;place-items:center">${sized(art, box)}</div>`, `${dir}/ic_launcher_foreground.png`, true);
  }
  // Splash screens: the icon on the app's cream background, for every size Capacitor made.
  for (const dir of readdirSync(RES).filter((d) => d.startsWith("drawable"))) {
    const file = `${RES}/${dir}/splash.png`;
    if (!existsSync(file)) continue;
    const { width, height } = pngSize(file);
    const icon = Math.round(Math.min(width, height) * 0.28);
    await shot(width, height, `<div style="width:${width}px;height:${height}px;display:grid;place-items:center;background:#FFF8EE">
      <div style="width:${icon}px;height:${icon}px;border-radius:${icon * 0.22}px;overflow:hidden;box-shadow:0 ${icon * 0.04}px ${icon * 0.12}px rgba(120,80,40,.18)">${sized(svg, icon)}</div></div>`, file);
  }
}

await browser.close();
console.log("icons written");

function pngSize(file) {
  const b = readFileSync(file);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}
