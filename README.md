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
| Dynamic Content Types | Yes |
| PDF/PPT Viewer | Yes |
| Content Templates | Yes |
| Content Warnings | |
| Diagrams (Mermaid) | |

See [docs/README.md](docs/README.md) for complete documentation.

<details>
  <summary><strong>Using as a Template</strong></summary>

When using this as your blog template, update/delete the following:

### Items to Update

**Site Configuration:**

- `config/seo.yaml` — Your site name, description, URL, social handles
- `config/plugins.yaml` — Analytics domain, Giscus repo (if using comments)
- `config/projects.yaml` — Your projects (or delete if not needed)
- `.env.local` — Add `NEXT_PUBLIC_SITE_URL` and `DRAFT_ACCESS_TOKEN`

**Personal Content:**

- `app/about/page.tsx` — Your bio and information
- `app/page.tsx` — Homepage introduction text
- `app/favicon.ico` — Your favicon
- `public/` — Replace any images/assets with yours

**Branding:**

- `README.md` — Update project name and description
- `package.json` — Update name, description, author

### Items to Delete

**Example Content:**

- `content/blog/*.mdx` — Delete all example blog posts
- `content/talks/*.mdx` — Delete example talks (or the entire folder if not needed)
- `config/projects.yaml` — Clear example projects

**Optional Cleanup:**

- Remove any unused content types from `config/content-types.yaml`
- Remove unused plugins from `config/plugins.yaml`
- Delete `docs/` folder if you don't need documentation

### Quick Setup Checklist

1. Clone/fork the repository
2. Run `pnpm install`
3. Update `config/seo.yaml` with your info
4. Create `.env.local` with your site URL
5. Delete example posts in `content/blog/`
6. Update `app/about/page.tsx`
7. Replace `app/favicon.ico`
8. Create your first post: `pnpm new:post`
9. Test locally: `pnpm dev`
10. Deploy!

</details>

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
- `pnpm new:content-type` — create a new content type (interactive CLI)
- `pnpm new:post` — create a new post from a template (interactive CLI)

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
