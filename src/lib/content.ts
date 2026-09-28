import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type Paper = CollectionEntry<"papers">;
export type Project = CollectionEntry<"projects">;
export type Talk = CollectionEntry<"talks">;
export type NewsItem = CollectionEntry<"news">;

const published = <T extends { data: { draft?: boolean } }>(entry: T) => !entry.data.draft;

/** Papers, newest first. */
export async function getPapers(): Promise<Paper[]> {
  const papers = await getCollection("papers", published);
  return papers.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Projects by `order`, then title. */
export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection("projects", published);
  return projects.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

/** Talks, newest first. */
export async function getTalks(): Promise<Talk[]> {
  const talks = await getCollection("talks", published);
  return talks.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** News, newest first; items with the same date keep their order in news.yaml. */
export async function getNews(): Promise<NewsItem[]> {
  const news = await getCollection("news");
  return news.sort((a, b) => b.data.date.localeCompare(a.data.date) || Number(a.id) - Number(b.id));
}

export async function getPage(id: string) {
  const page = await getEntry("pages", id);
  if (!page) throw new Error(`Missing src/content/pages/${id}.md`);
  return page;
}

export const paperUrl = (paper: Paper) => `/papers/${paper.id}/`;

const monthYear = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

/** "2026-09" or a Date → "September 2026" */
export function formatMonth(value: string | Date): string {
  const date = typeof value === "string" ? new Date(`${value.slice(0, 7)}-01T00:00:00Z`) : value;
  return monthYear.format(date);
}

export const isExternal = (url: string) => /^(https?:)?\/\//.test(url) || url.startsWith("mailto:");

/** Pills for a paper: Project, then its other links, then (unless on the post itself) the blog post. */
export function paperLinks(paper: Paper, { includePost = true } = {}) {
  const { url, links, noteLabel } = paper.data;
  return [
    ...(url ? [{ label: "Project", url }] : []),
    ...links,
    ...(includePost ? [{ label: noteLabel ?? "Blog post", url: paperUrl(paper) }] : []),
  ];
}

/** Where a paper's card and title link: its project website, else its blog post. */
export const paperHref = (paper: Paper) => paper.data.url ?? paperUrl(paper);
