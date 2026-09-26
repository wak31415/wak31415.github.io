# Research website redesign

Current static website snapshot, imported from the personal-site-concepts workspace. No Astro migration has been performed.

## Local preview

From this directory run:

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173/. Serve `dist` as the website root: asset and page URLs are root-relative.

## Structure

- `dist/index.html`: overview and highlighted cards
- `dist/papers/`: paper catalog and individual articles
- `dist/projects/`: projects catalog
- `dist/talks/`: talks
- `dist/assets/site.css`: shared styling
- `dist/assets/hover-video.js`: card video interactions
- `dist/avatar/index.html`: interactive Gaussian splat renderer
- `dist/assets/avatar/`: portrait images and Gaussian splat assets
- `dist/assets/vendor/`: browser-side graphics dependencies and licenses

There is no build step. HTML files are source files, despite the directory name. Content currently lives in HTML; Markdown/content collections and a possible Astro migration are future work.

## Publishing

This branch does not modify the existing website's deployment. To publish this design with GitHub Pages later, configure a workflow to upload `research-redesign/dist` as the Pages artifact, preserving the existing custom domain configuration. Do not deploy it as a nested subdirectory without first adapting the root-relative URLs.

## Content safety

The SCION entry contains only the approved placeholder and teaser assets, not the private paper or details extracted from it. Never commit confidential manuscripts or unpublished details without explicit approval: this repository is public, including branches.

## Editing

Keep overview and catalog card metadata consistent until shared templates are introduced. Keep video conversion and Gaussian splat generation outside ordinary website builds. Preserve vendor license files.
