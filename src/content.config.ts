import { existsSync } from "node:fs";
import { join } from "node:path";
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { parse as parseYaml } from "yaml";

/** A root-relative path to a file in `public/`, e.g. `/assets/heir-method.webp`. Checked at build time. */
const publicFile = z
  .string()
  .startsWith("/", { error: "Local media paths must start with / (relative to public/)" })
  .refine((path) => existsSync(join(process.cwd(), "public", path)), {
    error: (issue) => `File not found: public${issue.input}`,
  });

/** An absolute URL, a root-relative path on this site (page or file), mailto:, or #anchor. Checked by `npm run check:links`. */
const href = z.union([z.url(), z.string().regex(/^(\/|mailto:|#)/, "Use a full URL or a path starting with /")]);

const link = z.object({ label: z.string(), url: href });

const image = z.object({
  type: z.literal("image"),
  src: publicFile,
  alt: z.string(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  /** cover: fill the frame · contain: whole figure on a light panel · document: a page/cover centered with a shadow */
  fit: z.enum(["cover", "contain", "document"]).default("cover"),
  /** Any CSS background, shown behind contained images and documents. */
  background: z.string().optional(),
});

const video = z.object({
  type: z.literal("video"),
  src: publicFile,
  poster: publicFile.optional(),
});

/** Abstract placeholder for work without imagery yet, e.g. `steps: [listen, reason, act]`. */
const flow = z.object({
  type: z.literal("flow"),
  steps: z.array(z.string()).min(1),
  label: z.string(),
  theme: z.enum(["teal", "sand"]).default("teal"),
});

const papers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/papers" }),
  schema: z.object({
    title: z.string(),
    /** Used in previous/next links between articles. Defaults to `title`. */
    shortTitle: z.string().optional(),
    /** Full paper title, used on the CV. Defaults to `title`. */
    fullTitle: z.string().optional(),
    /** The article's <h1>. Defaults to `title`. */
    headline: z.string().optional(),
    /** Search-engine / link-preview description. */
    description: z.string(),
    /** Sort order (newest first). */
    date: z.coerce.date(),
    section: z.enum(["publications", "earlier"]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    /** Frosted label on the card image, e.g. "ECCV 2026". */
    badge: z.string(),
    /** Card meta line on the overview page, e.g. "ECCV 2026". */
    venue: z.string(),
    /** Card meta line on the papers page. Defaults to `venue`. */
    topic: z.string().optional(),
    /** Meta line above the article title. Defaults to "venue · topic". */
    articleMeta: z.string().optional(),
    summary: z.string(),
    authors: z.string().optional(),
    /** Shorter author list for the papers page. Defaults to `authors`. */
    authorsShort: z.string().optional(),
    /** Large intro sentence under the article title. */
    deck: z.string().optional(),
    aside: z
      .object({
        label: z.string().default("In one sentence"),
        text: z.string(),
      })
      .optional(),
    /** Project website. Card image and title link here (falling back to the blog post), and it's the first pill. */
    url: z.url().optional(),
    /** Further pills (arXiv, GitHub, PDF, …), shown after "Project" and before "Blog post". */
    links: z.array(link).default([]),
    /** Overrides the "Blog post" pill label. */
    noteLabel: z.string().optional(),
    card: z.discriminatedUnion("type", [image, video]),
    hero: z.discriminatedUnion("type", [image, video]).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    /** Used in previous/next links between write-ups. Defaults to `title`. */
    shortTitle: z.string().optional(),
    /** Short description for the overview page. The Markdown body is used on the projects page. */
    summary: z.string(),
    /** Card meta line, also shown above the write-up title. */
    meta: z.string(),
    badge: z.string(),
    /** "earlier" projects are listed in their own section below the current ones. */
    section: z.enum(["current", "earlier"]).default("current"),
    /** Render the Markdown body as its own page at /projects/<id>/. The card then shows `summary` and links there. */
    article: z.boolean().default(false),
    /** Write-up only: search-engine / link-preview description. Defaults to `summary`. */
    description: z.string().optional(),
    /** Write-up only: large intro sentence under the title. */
    deck: z.string().optional(),
    /** Write-up only: sidebar note next to the body. */
    aside: z
      .object({
        label: z.string().default("In one sentence"),
        text: z.string(),
      })
      .optional(),
    hero: image.optional(),
    /** Card image and title link here, falling back to the write-up. */
    url: z.url().optional(),
    links: z.array(link).default([]),
    /** Lower numbers come first. */
    order: z.number().default(100),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    media: z.discriminatedUnion("type", [image, flow]),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/talks" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string(),
    location: z.string().optional(),
    links: z.array(link).default([]),
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: file("src/content/news.yaml", {
    parser: (text) =>
      (parseYaml(text) as Record<string, unknown>[]).map((item, index) => ({ id: String(index), ...item })),
  }),
  schema: z.object({
    /** YYYY-MM or YYYY-MM-DD */
    date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "Use YYYY-MM or YYYY-MM-DD"),
    title: z.string(),
    text: z.string().optional(),
    link: href.optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    tagline: z.string().optional(),
    contact: z.object({ eyebrow: z.string(), heading: z.string() }).optional(),
  }),
});

const cvEntry = z.object({
  period: z.coerce.string().optional(),
  title: z.string(),
  org: z.string().optional(),
  details: z.array(z.string()).default([]),
});

/** src/content/cv.yaml, loaded as a single entry with id "cv". */
const cv = defineCollection({
  loader: file("src/content/cv.yaml", { parser: (text) => ({ cv: parseYaml(text) }) }),
  schema: z.object({
    intro: z.string().optional(),
    current: z.object({ label: z.string(), text: z.string() }).optional(),
    education: z.array(cvEntry).default([]),
    experience: z.array(cvEntry).default([]),
    skills: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    activities: z.array(cvEntry).default([]),
  }),
});

export const collections = { papers, projects, talks, news, pages, cv };
