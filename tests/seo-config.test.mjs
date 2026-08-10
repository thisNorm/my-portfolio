import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("uses the www origin for indexable metadata", async () => {
  const [layout, page, sitemap, robots, readme] = await Promise.all([
    read("app/layout.tsx"),
    read("app/page.tsx"),
    read("app/sitemap.ts"),
    read("app/robots.ts"),
    read("README.md"),
  ]);

  assert.match(layout, /const siteUrl = "https:\/\/www\.thisnorm\.dev"/);
  assert.match(page, /alternates:\s*\{ canonical: "\/" \}/);
  assert.match(sitemap, /const base = "https:\/\/www\.thisnorm\.dev"/);
  assert.doesNotMatch(sitemap, /url: `\$\{base\}\/projects`/);
  assert.match(robots, /https:\/\/www\.thisnorm\.dev\/sitemap\.xml/);
  assert.match(readme, /Website: https:\/\/www\.thisnorm\.dev/);
});

test("permanently redirects the removed projects index", async () => {
  const config = await read("next.config.ts");

  assert.match(config, /async redirects\(\)/);
  assert.match(config, /source: "\/projects"/);
  assert.match(config, /destination: "\/#projects"/);
  assert.match(config, /permanent: true/);
});
