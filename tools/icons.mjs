// Renders icons/icon.svg to the PNG sizes Android and browsers ask for.
// Uses the Playwright Chromium that's already installed for the tests.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

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
await browser.close();
console.log("icons written");
