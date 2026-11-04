# AGENTS.md

Working contract for coding agents in this repository.

## Project

Personal portfolio at https://www.thisnorm.dev — Next.js 16 App Router, React 19, Tailwind v4, Sanity (content only; no Studio in this repo). Deployed on Vercel.

- `app/page.tsx` → `app/components/PortfolioHome.tsx` renders the whole home page (client component).
- Home content is static in `app/components/portfolioData.ts`; edit copy there, not in JSX.
- `app/projects/[slug]/page.tsx` renders Sanity `project` documents; unknown slugs must call `notFound()`.
- `app/api/visit/route.ts` is the visitor counter (Sanity `visitor` document, needs `SANITY_API_TOKEN`).
- Site-wide title, description, OG and Twitter copy live once in `app/layout.tsx`.
- `app/sitemap.ts` and the project page read Sanity through `sanity/lib/client.ts`.

## Commands

```bash
npm ci
npm run lint
node --test tests/*.test.mjs
npm run build
```

`npm run build` needs `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (public values; see Vercel project env). Never commit `.env*` or `SANITY_API_TOKEN`.

TypeScript is pinned to `~6.0` because `typescript-eslint` (via `eslint-config-next`) does not support newer versions; do not bump it until that changes.

## Done means

- Lint, tests and build pass.
- Behavior is shown with real output, not just a green build: HTTP status and rendered `<title>`/meta for routes you touched, `/sitemap.xml` contents for SEO changes, a browser check for UI changes.
- Refactors keep rendered markup identical; compare before/after DOM.
- When running `next start` for checks, stop it afterwards (`pkill -f next-server`) — killing `next start` alone leaves the server running on the port.

## Boundaries

- Keep Korean copy UTF-8; check diffs for mojibake (e.g. `?꾨줈`) before committing.
- Do not write to the production Sanity dataset from local checks.
- Commits follow Conventional Commits (`fix:`, `feat:`, `refactor:`, `ci:`, `docs:`, `chore(deps):`), one feature per commit.
- Do not merge, deploy, or push to `main` without the owner's explicit request.
