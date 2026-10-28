// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";

// Preserve legacy bundled URLs stored in CMS rows during local development too.
function mediaRedirects(): Plugin {
  const rules = JSON.parse(readFileSync(new URL("./vercel.json", import.meta.url), "utf8"))
    .redirects as { source: string; destination: string }[];
  const destinations = new Map(rules.map(rule => [rule.source, rule.destination]));
  const middleware = (request: { url?: string }, response: { writeHead: (status: number, headers: Record<string, string>) => unknown; end: () => void }, next: () => void) => {
    const url = new URL(request.url || "/", "http://localhost");
    const destination = destinations.get(url.pathname);
    if (!destination) return next();
    response.writeHead(301, { Location: destination + url.search });
    response.end();
  };
  return {
    name: "legacy-media-redirects",
    configureServer(server) { server.middlewares.use(middleware); },
    configurePreviewServer(server) { server.middlewares.use(middleware); },
  };
}

export default defineConfig({
  vite: { plugins: [mediaRedirects()] },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
