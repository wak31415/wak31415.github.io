// Verifies that every internal link, image, video, and #anchor in the built site (dist/) resolves.
// Usage: npm run build && npm run check:links
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;
if (!existsSync(root)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? htmlFiles(path) : path.endsWith(".html") ? [path] : [];
  });

const pages = new Map(htmlFiles(root).map((file) => [file, readFileSync(file, "utf8")]));
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));

/** Map a URL path to the file GitHub Pages would serve. */
function resolve(pathname) {
  const path = join(root, decodeURIComponent(pathname));
  if (!pathname.endsWith("/") && existsSync(path) && statSync(path).isFile()) return path;
  if (existsSync(join(path, "index.html"))) return join(path, "index.html");
  return null;
}

const problems = [];
let checked = 0;
for (const [file, html] of pages) {
  const page = "/" + relative(root, file).replace(/index\.html$/, "");
  for (const [, attr, value] of html.matchAll(/\s(href|src|poster)="([^"]*)"/g)) {
    if (/^(https?:|mailto:|data:|\/\/)/.test(value)) continue;
    checked++;
    const url = new URL(value, `https://site${page}`);
    const target = url.pathname === page && value.startsWith("#") ? file : resolve(url.pathname);
    if (!target) {
      problems.push(`${page}: ${attr}="${value}" → not found`);
    } else if (url.hash && target.endsWith(".html") && !ids(pages.get(target) ?? "").has(url.hash.slice(1))) {
      problems.push(`${page}: ${attr}="${value}" → missing #${url.hash.slice(1)}`);
    }
  }
}

if (problems.length) {
  console.error(`${problems.length} broken link(s):\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`✓ ${checked} internal links across ${pages.size} pages resolve.`);
