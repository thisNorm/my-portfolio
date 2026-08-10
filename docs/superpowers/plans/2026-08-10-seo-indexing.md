# Search Indexing Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align every indexable portfolio URL with `https://www.thisnorm.dev`, remove the invalid `/projects` sitemap entry, and preserve old `/projects` visits with a permanent redirect.

**Architecture:** Keep Vercel's existing www primary-domain behavior and make Next.js metadata match it. A small Node test reads the metadata and routing sources so the incorrect apex URLs and missing redirect fail before production code changes; the production build then verifies Next.js accepts the resulting configuration.

**Tech Stack:** Next.js 16 App Router, TypeScript, Node.js built-in test runner, Vercel

## Global Constraints

- Public canonical origin is exactly `https://www.thisnorm.dev`.
- `/projects` must not appear as a standalone sitemap URL.
- `/projects` must permanently redirect to `/#projects`.
- Do not add a separate projects index page or new dependency.

---

### Task 1: Add the failing SEO configuration regression test

**Files:**
- Create: `tests/seo-config.test.mjs`
- Inspect: `app/layout.tsx`, `app/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`, `README.md`

**Interfaces:**
- Consumes: UTF-8 source files from the repository root.
- Produces: `node --test tests/seo-config.test.mjs`, which exits non-zero when canonical origin, sitemap membership, robots sitemap, redirect, or README URL diverges.

- [ ] **Step 1: Write the failing test**

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/seo-config.test.mjs`

Expected: FAIL because the sources still use the apex origin, the home canonical and redirect are missing, and sitemap still lists `/projects`.

### Task 2: Normalize metadata and route behavior

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`
- Modify: `next.config.ts`
- Modify: `README.md`
- Test: `tests/seo-config.test.mjs`

**Interfaces:**
- Consumes: `https://www.thisnorm.dev` as the single public origin.
- Produces: www canonical metadata, a www sitemap, and a permanent `/projects` redirect.

- [ ] **Step 1: Make the minimal production changes**

```ts
// app/layout.tsx
const siteUrl = "https://www.thisnorm.dev";

// app/page.tsx metadata
alternates: { canonical: "/" },

// app/sitemap.ts
const base = "https://www.thisnorm.dev";
// Return the home URL and dynamic project-detail URLs only.

// app/robots.ts
sitemap: "https://www.thisnorm.dev/sitemap.xml",

// next.config.ts
async redirects() {
  return [{ source: "/projects", destination: "/#projects", permanent: true }];
},
```

Update the README Website value to `https://www.thisnorm.dev`.

- [ ] **Step 2: Run the focused test to verify it passes**

Run: `node --test tests/seo-config.test.mjs`

Expected: two passing tests.

- [ ] **Step 3: Run repository verification**

Run: `npm run lint && npm run build`

Expected: both commands exit 0 and Next.js reports the `/`, `/robots.txt`, `/sitemap.xml`, and project-detail routes without configuration errors.

- [ ] **Step 4: Commit the implementation**

```bash
git add README.md app/layout.tsx app/page.tsx app/robots.ts app/sitemap.ts next.config.ts tests/seo-config.test.mjs docs/superpowers/plans/2026-08-10-seo-indexing.md
git commit -m "fix: 포트폴리오 검색 색인 URL 통일"
```

### Task 3: Publish and verify production

**Files:**
- Publish the committed versions of all files from Tasks 1 and 2 to `thisNorm/my-portfolio` branch `main`.

**Interfaces:**
- Consumes: the verified local source tree and the current remote `main` commit as parent.
- Produces: one fast-forward GitHub commit, a Vercel production deployment, and live HTTP evidence.

- [ ] **Step 1: Re-fetch remote state and ensure the publish is a fast-forward**

Run: `git fetch origin main && git rev-parse origin/main`

Expected: remote `main` remains the parent commit used for publication; if it changed, review the new diff before publishing.

- [ ] **Step 2: Publish through the connected GitHub app**

Create blobs for the changed/new files, create a tree based on the remote tree SHA, create one commit with the remote `main` SHA as its parent, then update `main` with `force: false`.

Expected: GitHub returns the new commit SHA and `main` points to it.

- [ ] **Step 3: Verify Vercel deployment**

Use the connected Vercel project `prj_6KFygfW6kGROxN3ZSUZXlwZTCqln` under team `team_IQdX5HctSe9ou4QveELkxnad` to find the new production deployment and confirm it reaches `READY`.

- [ ] **Step 4: Verify live SEO behavior**

Check:

```text
https://www.thisnorm.dev/          -> 200 + canonical https://www.thisnorm.dev/
https://www.thisnorm.dev/projects  -> permanent redirect to /#projects
https://www.thisnorm.dev/sitemap.xml -> www URLs only; no standalone /projects URL
https://www.thisnorm.dev/robots.txt  -> www sitemap URL
```

Expected: all four conditions hold. Search Console history may remain visible until Google recrawls; request validation after these live checks pass.
