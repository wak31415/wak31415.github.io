import katex from "katex";
import type { Element } from "hast";
import type { HastPluginDefinition } from "satteri";

const render = (value: string, displayMode: boolean) =>
  katex.renderToString(value, { displayMode, throwOnError: true, output: "htmlAndMathml" });

const hasClass = (node: Readonly<Element>, name: string) => {
  const className = node.properties?.className;
  return Array.isArray(className) ? className.includes(name) : String(className ?? "").split(" ").includes(name);
};

/**
 * Renders math to static KaTeX HTML at build time. With `features.math`, Sätteri emits
 * `$inline$` as `<code class="math-inline">` and `$$display$$` as `<pre><code class="math-display">`.
 */
export const katexPlugin = {
  name: "katex",
  element: {
    filter: ["pre", "code"],
    visit(node, ctx) {
      const code = node.tagName === "pre" ? node.children.find((child) => child.type === "element") : node;
      if (code?.type !== "element") return;
      if (node.tagName === "pre" && hasClass(code, "math-display")) {
        ctx.replaceNode(node, { type: "raw", value: render(ctx.textContent(code), true) });
      } else if (node.tagName === "code" && hasClass(node, "math-inline")) {
        ctx.replaceNode(node, { type: "raw", value: render(ctx.textContent(node), false) });
      }
    },
  },
} satisfies HastPluginDefinition;
