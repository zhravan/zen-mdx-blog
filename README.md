<samp>

# Zen — Minimal MDX Blog

Clean, fast, content‑first blog starter with Next.js 15, React 19, and MDX.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>

## Features

| Feature | Status |
| --- | :---: |
| MDX Support | ✓ |
| Syntax Highlighting (Shiki) | ✓ |
| Code Copy Button | ✓ |
| Custom MDX Components | ✓ |
| Static Site Generation | ✓ |
| Fast Page Loads | ✓ |
| Responsive Design | ✓ |
| Table of Contents (scroll-spy) | ✓ |
| Reading Time Estimate | ✓ |
| Related Posts (tag-based) | ✓ |
| Tags & Tagging | ✓ |
| Series/Multi-part Posts | ✓ |
| Draft Posts | ✓ |
| Command Palette (⌘K) | ✓ |
| Scroll Progress Bar | ✓ |
| Scroll to Top Button | ✓ |
| RSS/Atom/JSON Feeds | ✓ |
| Sitemap Generation | ✓ |
| SEO Optimized | ✓ |
| Light/Dark Mode | ✓ |
| Theme-aware Components | ✓ |
| YAML-based Plugin Config | ✓ |
| Easy to Extend | ✓ |
| Comments (Giscus) | |
| Open Graph Images | |
| Search (Fuse.js) | |
| Code Line Numbers | |
| Code Language Badges | |
| View Counter | |
| Analytics Integration | |

See [docs/index.md](docs/index.md) for plugin documentation.

## Project structure

```text
app/        Pages and routes
components/ UI and MDX components
content/    Blog posts (MDX)
lib/        Utilities and site config
  plugins/  Plugin implementations
config/     YAML config (seo, projects, plugins)
docs/       Documentation
```

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — production build
- `pnpm start` — run the production server
- `pnpm export` — static export to `out/`
- `pnpm preview` — serve the exported site from `out/`

## Run in production (Docker)

Build and run the static site with Caddy on port 80:

```bash
docker build -t monolog-blog .
docker run -d -p 80:80 --name monolog monolog-blog
```

Then open <http://localhost>.

Note: Static export is handled during `next build` via `output: 'export'` in `next.config.ts`.

## Run in development

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## License

MIT

## Credits

Inspired by [leerob.com](https://leerob.com/) and based on
[leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog).

</samp>
