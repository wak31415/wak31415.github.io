// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { katexPlugin } from "./src/lib/katex.ts";

export default defineConfig({
  site: "https://www.william-koch.com",
  build: { format: "directory" },
  devToolbar: { enabled: false },
  // Astro minifies CSS without browser targets, so lightningcss adds no vendor
  // prefixes (and collapses hand-written prefixed/unprefixed pairs into one,
  // which dropped backdrop-filter for Firefox). With explicit targets it emits
  // both backdrop-filter and -webkit-backdrop-filter; don't hand-write prefixes.
  vite: { build: { cssTarget: ["chrome111", "edge111", "firefox114", "safari16.4", "ios16.4"] } },
  // $inline$ and $$display$$ math in Markdown; the Article layout loads katex.min.css.
  markdown: { processor: satteri({ features: { math: true }, hastPlugins: [katexPlugin] }) },
  // Old Jekyll URLs that may still be linked from elsewhere.
  redirects: {
    "/research/": "/",
    "/resume/": "/cv/",
    "/publications/": "/papers/",
    "/preprints/": "/papers/",
    "/papers/2025-10-30-HEIR/": "https://light.princeton.edu/HEIR/",
    "/papers/2026-04-18-ScenarioControl/": "/papers/scenario-control/",
    "/papers/2023-08-30-efficient-non-rigid-neural-radiance-fields/": "/files/master-thesis.pdf",
    "/papers/2020-12-14-privacy-preserving-face-recognition/": "/files/thesis.pdf",
    "/talks/2021-02-11-privacy-preserving-face-recognition/": "/talks/",
    "/talks/2021-11-20-privacy-preserving-face-recognition/": "/talks/",
    // Former paper pages; these papers now link straight to their project page or PDF.
    "/papers/scion/": "https://princeton-computational-imaging.github.io/SCION/",
    "/papers/heir/": "https://light.princeton.edu/HEIR/",
    "/papers/non-rigid-nerfs/": "/files/master-thesis.pdf",
    "/papers/privacy-face-recognition/": "/files/thesis.pdf",
  },
});
