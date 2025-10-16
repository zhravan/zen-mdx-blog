<samp>

### Monolog - Just another minimalist mdx blog

#### Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

#### Stack

Next.js 15, React 19, MDX, Tailwind CSS

### Features

| Feature                    | Status |
| -------------------------- | :----: |
| MDX Support                |   [x]  |
| Syntax Highlighting        |   [x]  |
| Code Copy Button           |   [x]  |
| RSS/Atom/JSON Feeds        |   [x]  |
| Sitemap Generation         |   [x]  |
| Command Palette            |   [x]  |
| Scroll Progress Bar        |   [x]  |
| Scroll to Top Button       |   [x]  |
| Responsive Design          |   [x]  |
| Search Functionality       |   [x]  |
| Fast Page Loads            |   [x]  |
| Static Site Generation     |   [x]  |
| Comments System (Giscus)   |        |
| Zero-Config Deploy         |        |
| SEO Optimized              |        |
| Reading Time Estimate      |        |
| Print-Friendly Styles      |        |
| Keyboard Navigation        |        |
| Open Graph Images          |        |
| Breadcrumb Navigation      |        |
| Code Line Numbers          |        |
| Code Language Badges       |        |
| Footnotes Support          |        |
| Image Optimization         |        |
| LaTeX/Math Equations       |        |
| Mermaid Diagrams           |        |
| Email Newsletter           |        |
| Related Posts              |        |
| Series/Multi-part Posts    |        |
| Draft Posts                |        |
| Post Scheduling            |        |
| Custom MDX Components      |        |
| Callouts/Admonitions       |        |
| Code Diff Highlighting     |        |

> **Philosophy**: Keep it minimal. Every feature should enhance the reading experience without adding bloat.

#### Structure

```text
app/              # Pages and routes
components/       # UI components
  navigation/     # Navigation components
  mdx/           # MDX content components
content/         # Blog posts (MDX)
lib/             # Utilities
```

#### Adding Posts

1. Create `content/blog/your-post.mdx`
2. Redeploy, voila done

## Feeds

The blog exposes three feed formats:

- RSS: `/feed.xml`
- Atom: `/atom.xml`
- JSON Feed: `/feed.json`

Feeds are rebuilt every hour and use the site URL configured in `lib/site.ts`.

#### Credits

- Design inspired by [leerob.com](https://leerob.com/)
- Built with boilerplate from [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog)

#### License

MIT

</samp>
