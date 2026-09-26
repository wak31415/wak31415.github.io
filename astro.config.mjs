// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.william-koch.com",
  build: { format: "directory" },
  // Old Jekyll URLs that may still be linked from elsewhere.
  redirects: {
    "/research/": "/",
    "/resume/": "/cv/",
    "/publications/": "/papers/",
    "/preprints/": "/papers/",
    "/papers/2025-10-30-HEIR/": "/papers/heir/",
    "/papers/2026-04-18-ScenarioControl/": "/papers/scenario-control/",
    "/papers/2023-08-30-efficient-non-rigid-neural-radiance-fields/": "/papers/non-rigid-nerfs/",
    "/papers/2020-12-14-privacy-preserving-face-recognition/": "/papers/privacy-face-recognition/",
    "/talks/2021-02-11-privacy-preserving-face-recognition/": "/talks/",
    "/talks/2021-11-20-privacy-preserving-face-recognition/": "/talks/",
  },
});
