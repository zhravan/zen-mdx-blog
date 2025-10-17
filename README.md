<samp>

### Zen - Just another minimalist mdx blog

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
| MDX Support                |   ✓    |
| Syntax Highlighting        |   ✓    |
| Code Copy Button           |   ✓    |
| RSS/Atom/JSON Feeds        |   ✓    |
| Sitemap Generation         |   ✓    |
| Command Palette            |   ✓    |
| Scroll Progress Bar        |   ✓    |
| Scroll to Top Button       |   ✓    |
| Responsive Design          |   ✓    |
| Search Functionality       |   ✓    |
| Fast Page Loads            |   ✓    |
| Static Site Generation     |   ✓    |
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

### Theme Configuration

The blog now supports multiple VS Code-inspired themes. Simply change the `ACTIVE_THEME` in `lib/site.ts`:

```typescript
export const ACTIVE_THEME: ThemeName = "vitesse-dark"; // Change this!
```

**Available Themes:**
- `vitesse-dark` - Clean, modern dark theme (default)
- `github-dark` - GitHub's dark theme
- `dracula` - Popular Dracula theme
- `monokai` - Classic Monokai
- `nord` - Cool, blue-tinted Nord theme
- `one-dark-pro` - Atom's One Dark Pro
- `tokyo-night` - Cozy Tokyo Night
- `catppuccin-mocha` - Soothing Catppuccin Mocha

**How it works:**
- All color variables are defined in `lib/themes.ts`
- The `ThemeProvider` dynamically applies CSS variables
- Code highlighting automatically matches the theme
- Add your own theme by following the pattern in `lib/themes.ts`

**Customizing themes:**
1. Open `lib/themes.ts`
2. Add a new theme object with your colors
3. Update `ACTIVE_THEME` in `lib/site.ts`
4. Restart the dev server

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
