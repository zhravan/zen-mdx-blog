# Features

## Draft Preview System

Preview unpublished posts with token authentication.

### Setup

1. **Set access token** in `.env.local`:

```bash
DRAFT_ACCESS_TOKEN=your-secret-token
```

Generate with: `openssl rand -hex 32`

2. **Mark post as draft:**

```mdx
export const frontmatter = {
  title: "Draft Post",
  draft: true
};
```

### Access Drafts

Visit post URL with preview token:

```txt
https://yourdomain.com/blog/draft-post?preview=your-secret-token
```

**Development mode:** All drafts visible without token

**Production mode:** Requires valid token to access

### Publishing

Remove `draft: true` from frontmatter and rebuild.

## Themes

55+ VS Code-inspired color schemes.

**Dark themes:** Vitesse Dark, GitHub Dark, Dracula, Monokai, Nord, Tokyo Night, Catppuccin, One Dark Pro, and more

**Light themes:** Atom One Light, Light Plus, Solarized Light, GitHub Light, and more

Themes include full color system and syntax highlighting.

## Feeds

Auto-generated feeds for all content.

**RSS:** `/feed.xml`

**Atom:** `/atom.xml`

**JSON Feed:** `/feed.json`

**Sitemap:** `/sitemap.xml`

Drafts automatically excluded from feeds.

## Search & Command Palette

Quick navigation with K keyboard shortcut.

**Features:**
- Fuzzy search across posts and pages
- Keyboard navigation
- Configurable search threshold
- Filter by content type

Enable in `config/plugins.yaml`:

```yaml
command-palette:
  enabled: true
  shortcut: "cmd+k"
```

### Local Search

Dedicated search with fuzzy matching across multiple fields:

```yaml
search:
  enabled: true
  provider: "local"
  searchFields:
    - title
    - description
    - tags
    - headings
```

## Code Features

### Syntax Highlighting

Powered by Shiki with 60+ language support.

### Language Badges

Display language labels on code blocks:

```yaml
code-language-badge:
  enabled: true
  showIcon: true
  style: "default"  # default, minimal, or pill
```

### Line Highlighting

Highlight specific lines in code blocks:

````mdx
```typescript {1-3,7}
const a = 1;  // highlighted
const b = 2;  // highlighted
const c = 3;  // highlighted

const d = 4;

const e = 5;  // highlighted
```
````

### Code Enhancements

Advanced code block features:

```yaml
code-enhancements:
  enabled: true
  showFileName: true      # Display filename badge
  showLineNumbers: true   # Line numbers
  enableCopy: true        # Copy button
  highlightLines: true    # {1-3,7} syntax support
```

**Features:**
- Filename badges (e.g., `app.ts`)
- Line numbers
- Copy to clipboard button
- Highlight specific lines

## Analytics

Privacy-friendly analytics with no cookies or tracking.

**Supported providers:**
- Plausible
- Umami
- Simple Analytics

Setup in `config/plugins.yaml`:

```yaml
analytics:
  enabled: true
  provider: "plausible"
  domain: "yourdomain.com"
```

**Custom events:**

```typescript
import { trackEvent } from '@/lib/plugins/analytics';

trackEvent('button_click', { location: 'header' });
```

## Comments

GitHub Discussions-based comments via Giscus.

**Setup:**

1. Enable GitHub Discussions on your repo
2. Install Giscus app
3. Get repo ID and category ID from [giscus.app](https://giscus.app)
4. Configure in `config/plugins.yaml`:

```yaml
giscus:
  enabled: true
  repo: "username/repo"
  repoId: "your-repo-id"
  category: "General"
  categoryId: "your-category-id"
```

## Document Viewers

Embed PDFs and PowerPoint presentations:

```mdx
<PDF src="/slides/presentation.pdf" title="My Slides" />

<PPT src="https://example.com/deck.pptx" title="Talk" />
```

**Features:**
- Fullscreen mode
- Download option
- Responsive design
- Native browser rendering (PDF)

## Related Posts

Automatically suggest similar content.

**Algorithms:**
- **tags** - Match by shared tags
- **similarity** - Match by title/description
- **recent** - Show most recent

Configure in `config/plugins.yaml`:

```yaml
related-posts:
  enabled: true
  count: 3
  algorithm: "tags"
```

## Table of Contents

Auto-generated from headings.

**Features:**
- Active heading highlighting
- Sticky positioning
- Mobile-responsive
- Configurable depth

```yaml
toc:
  enabled: true
  position: "right"
  maxDepth: 3
```

## Reading Progress

Visual indicators of reading progress:

**Scroll Progress Bar** - Top/bottom progress bar

**Reading Time** - Estimated duration

**Scroll to Top Button** - Quick navigation

**View Counter** - Track post popularity (privacy-friendly)

```yaml
view-counter:
  enabled: true
  provider: "local"  # local storage or API
  showCount: true
```

## Social Sharing

### Share Buttons

One-click sharing to multiple platforms:

- Copy link
- WhatsApp
- X (Twitter)
- Mastodon
- LinkedIn

```yaml
social-share:
  enabled: true
  platforms:
    copyLink: true
    x: true
    linkedin: true
```

### External Links

Automatically mark external links with icon:

```yaml
external-links:
  enabled: true
  icon: "↗"
  openInNewTab: true
  nofollow: false
```

External links open in new tab with visual indicator.

## Series Navigation

Group related posts together:

```mdx
export const frontmatter = {
  series: "React Guide",
  seriesPart: 1
};
```

Series navigator shows progress and links between parts.

## Performance

- Static site generation
- Optimized images
- Code splitting
- Minimal bundle size
- Fast page loads

## SEO

- Automatic metadata
- Open Graph tags
- Twitter Cards
- Canonical URLs
- Sitemap generation
- RSS/Atom/JSON feeds
