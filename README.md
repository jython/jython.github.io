# Jython Website

This is the source repository for the Jython website, built with [Astro](https://astro.build).

## To develop the website

A quick guide to developing the website locally:

1.  Clone this repository.
2.  Install [Bun](https://bun.sh), then install the dependencies:
    `bun install`
3.  Run `bun run dev` and browse to the printed URL (usually http://localhost:4321).
4.  Make changes to the source in `src/`; the page will hot-reload.
5.  Run `bun run build` to produce a static site in `dist/`.
6.  Once you're happy with the changes create a pull request.

## Project structure

- `src/pages/*.md` — Markdown content pages (one file per page).
- `src/layouts/BaseLayout.astro` — the page layout (header, navigation, footer).
- `src/components/Navbar.astro` — the navigation bar.
- `src/data/navbar.ts` — the navigation bar entries.
- `public/` — static files copied as-is into the build (`CNAME`, `.well-known/`, assets, stylesheet).
- `assets/` (top level) — the original source images, now mirrored under `public/assets/`.

## Deployment

The site is published to GitHub Pages from `master` by the workflow in
`.github/workflows/deploy.yml`, which builds with Bun and uploads `dist/`.