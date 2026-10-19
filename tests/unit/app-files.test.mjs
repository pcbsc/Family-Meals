// Checks on the app's files: everything the app needs offline is cached, and
// button colors are readable.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");

test("every app script is in the service worker's offline list", () => {
  const sw = read("sw.js");
  const files = [
    ...readdirSync(new URL("js/", root)).filter((f) => f.endsWith(".js")).map((f) => `js/${f}`),
    ...readdirSync(new URL("js/views/", root)).filter((f) => f.endsWith(".js")).map((f) => `js/views/${f}`),
  ];
  for (const f of files) assert.ok(sw.includes(`"./${f}"`), `${f} is missing from APP_FILES in sw.js`);
});

function luminance(hex) {
  const [r, g, b] = hex.match(/[0-9a-f]{2}/gi).map((x) => parseInt(x, 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

test("text colors meet WCAG AA contrast (4.5:1)", () => {
  const css = read("styles.css");
  const vars = Object.fromEntries([...css.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
  const pairs = [
    ["#ffffff", vars.primary, "white on primary buttons"],
    ["#ffffff", vars["green"], "white on the Cook together button"],
    ["#ffffff", vars.danger, "white on red buttons"],
    [vars["primary-dark"], "#ffffff", "amounts and links on white"],
    [vars.muted, vars.bg, "grey text on the page"],
    [vars.muted, "#ffffff", "grey text on cards"],
    [vars.ink, vars.bg, "text on the page"],
    [vars["primary-dark"], vars.bg, "cook-along step words"],
    ...Object.entries(vars).filter(([k]) => k.startsWith("aisle-")).flatMap(([k, color]) => [
      ["#ffffff", color, `white on the ${k} header`],
      [color, "#ffffff", `${k} amounts on white`],
    ]),
  ];
  for (const [fg, bg, what] of pairs) {
    const ratio = contrast(fg, bg);
    assert.ok(ratio >= 4.5, `${what}: ${ratio.toFixed(2)}:1`);
  }
  // Big orange titles only need 3:1 (WCAG "large text").
  assert.ok(contrast(vars.primary, vars.bg) >= 3, "orange titles on the page");
});
