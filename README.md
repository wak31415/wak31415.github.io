# william-koch.com

Personal research website, built with [Astro](https://astro.build). Content lives in Markdown/YAML files; pages and cards are generated from them.

```sh
npm install
npm run dev        # http://localhost:4321, reloads on save
npm test           # type-check + build + verify every internal link/image/anchor
npm run preview    # serve the production build from dist/
```

Node 22.12 or newer is required.

## Where things live

| What | File(s) |
| --- | --- |
| Papers (cards + plain-language article pages) | `src/content/papers/*.md` |
| Projects | `src/content/projects/*.md` |
| Talks | `src/content/talks/*.md` |
| "Recently" news list on the home page | `src/content/news.yaml` |
| Home hero text, contact heading | `src/content/pages/home.md` |
| CV (education, experience, skills, activities) | `src/content/cv.yaml` |
| Name, email, navigation, social links | `src/site.config.ts` |
| Images, videos, PDFs | `public/assets/`, `public/files/` |
| Styles | `src/styles/site.css` |
| Page templates / components | `src/pages/`, `src/components/`, `src/layouts/` |

Every field is described and validated in `src/content.config.ts`. A typo in a field name or a media path that doesn't exist in `public/` fails the build with a message naming the file.

## Adding content

### A paper

Create `src/content/papers/<slug>.md`. The file name becomes the URL (`/papers/<slug>/`). Papers are ordered by `date`, newest first; that order also drives the previous/next links between articles.

```md
---
title: MyMethod
fullTitle: "MyMethod: A Longer Paper Title"   # used on the CV; defaults to title
headline: MyMethod, in plain language   # article <h1>; defaults to title
shortTitle: MyMethod                    # used in prev/next links; defaults to title
description: A plain-language explanation of MyMethod by William Koch.
date: 2027-03-01
section: publications                   # publications | earlier (preprints & theses)
featured: true                          # show on the home page
badge: CVPR 2027                        # frosted label on the card image
venue: CVPR 2027                        # card meta line on the home page
topic: Neural rendering                 # card meta line on the papers page (defaults to venue)
summary: One sentence for the card.
authors: Jane Doe*, William Koch*, Felix Heide
authorsShort: Jane Doe*, William Koch*, and collaborators   # optional, papers page only
deck: The large intro sentence under the title.
aside:
  text: The "In one sentence" box next to the article.
url: https://mymethod.github.io/         # project website: the card image and title link here, and it's the first pill
links:                                  # further pills, after "Project" and before "Blog post"
  - { label: arXiv, url: "https://arxiv.org/abs/…" }
  - { label: GitHub, url: "https://github.com/…" }
card:                                   # image on the card
  type: image                           # or: type: video, src: /assets/video/x.mp4, poster: /assets/x.webp
  src: /assets/mymethod-teaser.webp
  alt: Describe the figure
  width: 1600
  height: 900
  fit: cover                            # cover | contain (whole figure on a light panel) | document (a page/cover on a colored background)
  background: "#15274b"                 # optional
hero:                                   # optional large figure on the article page, same fields as card
  type: image
  src: /assets/mymethod-results.webp
  alt: …
---

Plain-language article in Markdown. The first paragraph is set larger.

## Section heading

> A blockquote at the end becomes the highlighted takeaway.
```

Cards link to the project website (`url`) when there is one, and to the blog post otherwise. Pills appear in the order Project, then `links`, then Blog post; `noteLabel` renames the last one (SCION uses "View preview").

Set `draft: true` to hide an entry without deleting it (works for papers, projects and talks).

### A project

`src/content/projects/<slug>.md`: the Markdown body is the description on the projects page, and `summary` is the shorter text on the home page. Projects are sorted by `order`. `media` is an image (same fields as above) or an abstract placeholder:

```yaml
media:
  type: flow
  steps: [listen, reason, act]
  label: Abstract voice pipeline reading listen, reason, act
  theme: teal          # teal | sand
```

The slug doubles as the anchor, so `/projects/#<slug>` links straight to the card.

### A talk

`src/content/talks/<slug>.md` needs `title`, `date`, and `venue`; `location` and `links` are optional, and the body is the description. It's reachable at `/talks/#<slug>`. The two 2021 talks migrated from the old site are marked `draft: true`; remove that line to publish them.

### CV

Edit `src/content/cv.yaml`. Education, experience, and activities are lists of entries with `period` (optional), `title`, `org` (optional), and `details` (optional list); they appear in the order written. The Publications section is generated from the papers, with your name in bold and full titles from `fullTitle`.

### News

Add an entry to `src/content/news.yaml`. It is sorted by date, and the home page shows the latest five (`newsLimit` in `src/site.config.ts`).

```yaml
- date: 2027-03
  title: MyMethod accepted at CVPR
  text: Optional second line.
  link: /papers/mymethod/
```

## Deployment

`.github/workflows/deploy.yml` builds, tests, and deploys to GitHub Pages on every push to `master`, and builds and tests every pull request. For the first deployment, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The custom domain is kept by `public/CNAME`.

Old Jekyll URLs (`/publications/`, `/resume/`, `/papers/2025-10-30-HEIR/`, …) redirect to their new pages; see `redirects` in `astro.config.mjs`.

## Notes

- **Interactive portrait.** `src/pages/avatar.astro` renders the Gaussian splat in `public/assets/avatar/` with the vendored three.js and Spark modules in `public/assets/vendor/`. It is embedded as an iframe by `src/components/Portrait.astro`, and a still image is shown on small screens or when WebGL fails. Splat generation and video conversion happen outside the site build. The splat was produced with Apple's SHARP model, whose checkpoint is licensed for research use only (see `public/assets/avatar/*.json`). Keep the vendor license files.
- **Content safety.** This repository is public, including branches. The SCION entry contains only the approved placeholder and teaser assets. Never commit confidential manuscripts or unpublished details without explicit approval.
