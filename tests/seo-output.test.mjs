// Checks what the production build actually emits. Run `npm run build` first.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const origin = "https://www.thisnorm.dev";
const built = (path) => new URL(`.next/${path}`, root);

if (!existsSync(built("BUILD_ID"))) {
  throw new Error("No production build found in .next — run `npm run build` before `npm test`.");
}

const readBuilt = (path) => readFile(built(path), "utf8");
const meta = (html, attr, name) =>
  html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1];
// Hangul text mis-decoded as CP949 shows up as CJK ideographs (e.g. "?꾨줈?앺듃"); the site uses none.
const MOJIBAKE = /[一-鿿豈-﫿�]/;

test("home page emits consistent indexable metadata", async () => {
  const html = await readBuilt("server/app/index.html");
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const description = meta(html, "name", "description");

  assert.match(html, /<html lang="ko"/);
  assert.ok(title?.includes("황규범"), `unexpected title: ${title}`);
  assert.ok(description, "missing meta description");
  assert.match(html, new RegExp(`<link rel="canonical" href="${origin}"/>`));
  assert.equal(meta(html, "property", "og:title"), title);
  assert.equal(meta(html, "property", "og:description"), description);
  assert.equal(meta(html, "name", "twitter:title"), title);
  assert.ok(meta(html, "property", "og:image")?.startsWith(`${origin}/opengraph-image`));
  assert.ok(meta(html, "name", "twitter:image")?.startsWith(`${origin}/opengraph-image`));
  assert.doesNotMatch(html, MOJIBAKE);
});

test("OG image is a 1200x630 PNG", async () => {
  const png = await readFile(built("server/app/opengraph-image.body"));
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});

test("robots.txt allows crawling and points at the www sitemap", async () => {
  const robots = await readBuilt("server/app/robots.txt.body");
  assert.match(robots, /^Allow: \/$/m);
  assert.doesNotMatch(robots, /^Disallow:/m);
  assert.match(robots, new RegExp(`^Sitemap: ${origin}/sitemap\\.xml$`, "m"));
});

test("sitemap lists only www URLs with real lastmod dates", async () => {
  const xml = await readBuilt("server/app/sitemap.xml.body");
  const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  const lastmods = [...xml.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)].map((m) => m[1]);

  assert.equal(locs[0], `${origin}/`);
  assert.equal(lastmods.length, locs.length);
  for (const loc of locs.slice(1)) assert.match(loc, new RegExp(`^${origin}/projects/[^/]+$`));
  assert.ok(!locs.includes(`${origin}/projects`), "redirected /projects index must not be listed");
  for (const date of lastmods) assert.ok(!Number.isNaN(Date.parse(date)), `bad lastmod: ${date}`);
});

test("removed /projects index permanently redirects to the home section", async () => {
  const { redirects } = JSON.parse(await readBuilt("routes-manifest.json"));
  const redirect = redirects.find((r) => r.source === "/projects");
  assert.equal(redirect?.destination, "/#projects");
  assert.equal(redirect?.statusCode, 308);
});

test("app source has no mis-decoded Korean text", async () => {
  // Dynamic pages (e.g. /projects/[slug]) are not prerendered, so guard their literal strings at the source.
  const files = (await readdir(new URL("app/", root), { recursive: true })).filter((f) => /\.(tsx?|css)$/.test(f));
  for (const file of files) {
    const source = await readFile(new URL(`app/${file}`, root), "utf8");
    assert.doesNotMatch(source, MOJIBAKE, `mojibake in app/${file}`);
  }
});
