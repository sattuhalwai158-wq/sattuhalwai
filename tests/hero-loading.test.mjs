import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ts from "typescript";
const asModule = (source) =>
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
// Only the public database transport is mocked; use the real query cache and hooks.
const transportUrl = asModule(`
let reads=0;
export const media=[{id:"admin-photo",section:"hero",media_type:"image",url:"https://assets.example.test/customer-photo.jpg",title:"Wedding lunch",caption:"",storage_path:"hero/customer-photo.jpg",sort_order:1}];
export const readCount=()=>reads;
export function getPublicContentClient(){return {from(){return {select(){return {order(){return {abortSignal(){reads++;return Promise.resolve({data:media,error:null});}};}};}};}};}
`);
const fixture = await import(transportUrl);
const source = readFileSync(new URL("../src/lib/site-data.ts", import.meta.url), "utf8");
const compiled = ts
  .transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  })
  .outputText.replaceAll(
    '"@tanstack/react-query"',
    JSON.stringify(import.meta.resolve("@tanstack/react-query")),
  )
  .replaceAll('"@/lib/public-content-client"', JSON.stringify(transportUrl));
const { siteMediaQueryOptions, useMedia } = await import(asModule(compiled));
function Hero({ snapshot }) {
  const slides = useMedia("hero", snapshot);
  return React.createElement("img", {
    src: slides[0]?.url || "/media/home-mithai.webp",
    "data-slides": slides.length,
  });
}
function render(client, snapshot) {
  return renderToString(
    React.createElement(QueryClientProvider, { client }, React.createElement(Hero, { snapshot })),
  );
}
test("server and first client render use the same admin image without a default-photo flash", async () => {
  const server = new QueryClient();
  const loaded = await server.ensureQueryData(siteMediaQueryOptions);
  const serverHtml = render(server, loaded);
  const serialized = JSON.parse(JSON.stringify(loaded));
  const browser = new QueryClient();
  const browserHtml = render(browser, serialized);
  assert.equal(browserHtml, serverHtml);
  assert.ok(browserHtml.includes(fixture.media[0].url));
  assert.ok(!browserHtml.includes("home-mithai.webp"));
  assert.deepEqual(browser.getQueryData(["site_media"]), serialized);
  server.clear();
  browser.clear();
});
test("an empty or failed-load snapshot stays a fallback rather than fetching a replacement on mount", () => {
  const client = new QueryClient();
  const before = fixture.readCount();
  const html = render(client, []);
  assert.ok(html.includes("home-mithai.webp"));
  assert.equal(fixture.readCount(), before);
  assert.deepEqual(client.getQueryData(["site_media"]), []);
  client.clear();
});
test("custom image and storage references survive serialization unchanged", () => {
  const snapshot = JSON.parse(JSON.stringify(fixture.media));
  assert.equal(snapshot[0].url, fixture.media[0].url);
  assert.equal(snapshot[0].storage_path, fixture.media[0].storage_path);
  const client = new QueryClient();
  render(client, snapshot);
  assert.equal(client.getQueryData(["site_media"])[0].url, fixture.media[0].url);
  client.clear();
});
