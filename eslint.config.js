// Catches mistakes (undefined names, unused imports) in the app's code.
export default [
  {
    files: ["js/**/*.js", "sw.js", "tools/**/*.mjs", "tests/**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        window: "readonly", document: "readonly", navigator: "readonly", location: "readonly", history: "readonly",
        indexedDB: "readonly", crypto: "readonly", fetch: "readonly", URL: "readonly", URLSearchParams: "readonly",
        Blob: "readonly", FileReader: "readonly", Response: "readonly", caches: "readonly", self: "readonly",
        setTimeout: "readonly", clearTimeout: "readonly", setInterval: "readonly", clearInterval: "readonly",
        requestAnimationFrame: "readonly", matchMedia: "readonly", createImageBitmap: "readonly", AudioContext: "readonly",
        speechSynthesis: "readonly", SpeechSynthesisUtterance: "readonly", AbortController: "readonly", Node: "readonly",
        btoa: "readonly", console: "readonly", process: "readonly", structuredClone: "readonly", Uint8Array: "readonly",
        Uint32Array: "readonly", Event: "readonly", TextEncoder: "readonly", File: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }],
      "no-unreachable": "error",
      "no-dupe-keys": "error",
      "no-redeclare": "error",
    },
  },
];
