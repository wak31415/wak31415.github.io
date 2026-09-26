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
    links: z.array(link).default([]),
    /** Overrides the "Read the note" / "Plain-language note" pill. */
    noteLabel: z.string().optional(),
    card: z.discriminatedUnion("type", [image, video]),
    hero: z.discriminatedUnion("type", [image, video]).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    /** Short description for the overview page. The Markdown body is used on the projects page. */
    summary: z.string(),
    meta: z.string(),
    badge: z.string(),
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
    intro: z.string().optional(),
    tagline: z.string().optional(),
    aside: z.object({ label: z.string(), text: z.string() }).optional(),
    contact: z.object({ eyebrow: z.string(), heading: z.string() }).optional(),
  }),
});

export const collections = { papers, projects, talks, news, pages };
