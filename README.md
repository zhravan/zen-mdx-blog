<samp>

<p align="center">
  <h1 align="center">Zen — Minimal MDX Blog</h1>
</p>

<p align="center">
  <a href="https://github.com/zhravan/zen-mdx-blog"><img src="app/favicon.ico" alt="zen blogs"  align="center" width="25%" /></a>
</p>

<p align="center">
Clean, fast, content‑first blog starter with Next.js 15, React 19, and MDX.
</p>

## Lets gooo

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>

## Features

| Feature | Status |
| --- | :---: |
| MDX Support | Yes |
| Syntax Highlighting (Shiki) | Yes |
| Code Copy Button | Yes |
| Custom MDX Components | Yes |
| Static Site Generation | Yes |
| Fast Page Loads | Yes |
| Responsive Design | Yes |
| Table of Contents (scroll-spy) | Yes |
| Reading Time Estimate | Yes |
| Related Posts (tag-based) | Yes |
| Tags & Tagging | Yes |
| Series/Multi-part Posts | Yes |
| Draft Posts | Yes |
| Command Palette (⌘K) | Yes |
| Scroll Progress Bar | Yes |
| Scroll to Top Button | Yes |
| RSS/Atom/JSON Feeds | Yes |
| Sitemap Generation | Yes |
| SEO Optimized | Yes |
| Theme Mode | Yes |
| Theme-aware Components | Yes |
| YAML-based Plugin Config | Yes |
| Plugin arch / easy to extend setup | Yes |
| Comments (Giscus) | Yes |
| Open Graph Images (Dynamic) | |
| Search (Fuse.js) | Yes |
| Code Line Numbers | Yes |
| Code Language Badges | Yes |
| Code Diff Highlighting | |
| View Counter | |
| Analytics (umami, plausible or simple-analytics) | Yes |
| Social Share Buttons | Yes |
| Keyboard Shortcuts | |
| Series Navigation | Yes |
| Content Warnings | |
| Diagrams (Mermaid) | |

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

## Giscus Comments

Giscus enables GitHub Discussions-powered comments on blog posts.

1. Visit [giscus.app](https://giscus.app)
2. Enter your repo (e.g., `username/repo`)
3. Enable Discussions in your GitHub repo settings
4. Copy the generated IDs
5. Update `config/plugins.yaml`:

```yaml
giscus:
  enabled: true
  repo: "username/repo"
  repoId: "your-repo-id"
  category: "General"
  categoryId: "your-category-id"
```

See `config/plugins.yaml` for all options (theme, position, etc).

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
