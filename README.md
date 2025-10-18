<samp>
## Zen — Minimal MDX Blog

Clean, fast, content‑first blog starter built with Next.js 15, React 19, MDX, and Tailwind CSS.

## Quick start

Prereqs: Node 18+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>

## Write a post

- Add an MDX file to `content/blog/`, e.g. `content/blog/my-first-post.mdx`.
- Commit and redeploy when you're ready.

## Project structure

```text
app/        Pages and routes
components/ UI and MDX components
content/    Blog posts (MDX)
lib/        Utilities and site config
config/     YAML config (seo, projects)
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
