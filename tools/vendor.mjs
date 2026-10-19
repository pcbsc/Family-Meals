// Copies third-party code into the repo so the app runs with no build step
// and keeps working offline: the official Anthropic SDK as one ES module, and
// the Nunito font. Run `npm install && npm run vendor` after bumping versions.
import { build } from "esbuild";
import { copyFileSync, readFileSync } from "node:fs";

const sdkVersion = JSON.parse(
  readFileSync("node_modules/@anthropic-ai/sdk/package.json", "utf8"),
).version;

await build({
  stdin: {
    contents: 'export { default, Anthropic } from "@anthropic-ai/sdk";',
    resolveDir: process.cwd(),
  },
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  minify: true,
  legalComments: "eof",
  banner: { js: `// @anthropic-ai/sdk ${sdkVersion}, bundled by tools/vendor.mjs` },
  outfile: "vendor/anthropic-sdk.mjs",
});

copyFileSync(
  "node_modules/@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2",
  "fonts/nunito-latin.woff2",
);
copyFileSync("node_modules/@fontsource-variable/nunito/LICENSE", "fonts/OFL.txt");
copyFileSync("node_modules/@anthropic-ai/sdk/LICENSE", "vendor/anthropic-sdk-LICENSE.txt");
console.log(`vendored @anthropic-ai/sdk ${sdkVersion} and Nunito`);
