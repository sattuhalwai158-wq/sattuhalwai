import { readdir, readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.argv[2] || "http://127.0.0.1:8081";
assert.match(base, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/, "Use a local server only.");
const files = await readdir(new URL("../src/routes/", import.meta.url), { recursive: true });
const routes = [];
for (const file of files.filter((file) => file.endsWith(".tsx"))) {
  const source = await readFile(new URL(`../src/routes/${file}`, import.meta.url), "utf8");
  const match = source.match(/createFileRoute\("([^"]+)"\)/);
  if (match) routes.push(match[1]);
}
const images = new Set();
for (const route of routes.sort()) {
  for (let visit = 0; visit < 2; visit++) {
    const response = await fetch(base + route, { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, `${route}: HTTP error`);
    const html = await response.text();
    assert.match(html, /<title>[^<]+<\/title>/, `${route}: missing title`);
    assert.match(html, /<main[^>]+id="main-content"/, `${route}: missing application content`);
    assert.match(html, /<header/, `${route}: missing navigation`);
    if (route !== "/admin")
      assert.equal(
        (html.match(/<h1(?:\s|>)/g) || []).length,
        1,
        `${route}: expected one page heading`,
      );
    assert.match(html, /<footer/, `${route}: missing footer`);
    assert.match(html, /rel="canonical"/, `${route}: missing canonical`);
    assert.ok(!html.includes("This page didn&#x27;t load"), `${route}: error boundary`);
    if (route === "/admin") assert.match(html, /noindex/, "Admin must not be indexed");
    if (route === "/")
      assert.ok(
        !html.includes("500+") && !html.includes("Years of mastery"),
        "Unverified public statistics",
      );
    if (route === "/reviews")
      assert.ok(
        !html.includes("Verified client experiences") && !html.includes("fill-current"),
        "Unverified review claims",
      );
    for (const match of html.matchAll(/<img[^>]+src="(\/media\/[^"?]+)"/g)) images.add(match[1]);
  }
  console.log(`PASS direct + reload: ${route}`);
}
for (const path of images) {
  const response = await fetch(base + path, { signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 200, `Missing image: ${path}`);
  assert.match(
    response.headers.get("content-type") || "",
    /^image\//,
    `Invalid image response: ${path}`,
  );
}
const missing = await fetch(base + "/route-that-does-not-exist", {
  signal: AbortSignal.timeout(15000),
});
assert.equal(missing.status, 404, "Missing route should return HTTP 404");
console.log(
  `PASS: ${routes.length} routes twice, ${images.size} image URLs, and 404 handling. GET requests only; no production writes.`,
);
