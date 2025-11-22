# Setup

## Configuration Files

All configuration via YAML files in `config/`:

- **plugins.yaml** - Enable/disable plugins
- **seo.yaml** - SEO metadata
- **content-types.yaml** - Custom content sections
- **projects.yaml** - Project showcase

## Plugins

Edit `config/plugins.yaml` to enable features:

### Navigation Plugins

**Command Palette** - Quick search (K)
```yaml
command-palette:
  enabled: true
  shortcut: "cmd+k"
  fuzzyThreshold: 0.3
```

**Scroll Progress** - Reading progress bar
```yaml
scroll-progress:
  enabled: true
  position: "top"
  height: 3
```

**Scroll to Top** - Back to top button
```yaml
scroll-to-top:
  enabled: true
  showAfter: 400
  position: "bottom-right"
```

**Search** - Local fuzzy search
```yaml
search:
  enabled: true
  provider: "local"
  fuzzyThreshold: 0.3
  searchFields:
    - title
    - description
    - tags
```

### Content Plugins

**Table of Contents** - Auto-generated TOC
```yaml
toc:
  enabled: true
  position: "right"
  maxDepth: 3
  sticky: true
```

**Reading Time** - Estimated duration
```yaml
reading-time:
  enabled: true
  wordsPerMinute: 200
  showWordCount: true
```

**Related Posts** - Suggest similar content
```yaml
related-posts:
  enabled: true
  count: 3
  algorithm: "tags"  # tags, similarity, or recent
```

**Series Navigator** - Multi-part posts
```yaml
series:
  enabled: true
```

**View Counter** - Track post views (privacy-friendly)
```yaml
view-counter:
  enabled: true
  provider: "local"  # local or api
  showCount: true
```

### Code Plugins

**Code Enhancements** - Advanced code block features
```yaml
code-enhancements:
  enabled: true
  showFileName: true
  showLineNumbers: true
  enableCopy: true
  highlightLines: true  # Support {1-3,7} syntax
```

**Code Language Badge** - Language labels on code blocks
```yaml
code-language-badge:
  enabled: true
  showIcon: true
  style: "default"  # default, minimal, or pill
```

### Social Plugins

**External Links** - Auto-mark external links
```yaml
external-links:
  enabled: true
  icon: "↗"
  openInNewTab: true
  nofollow: false
```

**Social Share** - Share buttons
```yaml
social-share:
  enabled: true
  showIcon: true
  platforms:
    copyLink: true
    whatsapp: true
    x: true
    mastodon: true
    linkedin: true
```

**Giscus Comments** - GitHub Discussions comments
```yaml
giscus:
  enabled: true
  repo: "username/repo"
  repoId: "your-repo-id"
  category: "General"
  categoryId: "your-category-id"
  mapping: "pathname"
  theme: "preferred_color_scheme"
```

### Analytics

**Privacy-Friendly Analytics** - Plausible, Umami, or Simple Analytics
```yaml
analytics:
  enabled: true
  provider: "plausible"  # plausible, umami, or simple-analytics
  domain: "yourdomain.com"
```

**Setup:**
1. Sign up at provider's website
2. Add domain/website ID
3. Update config with domain value
4. Restart server

## SEO Configuration

Edit `config/seo.yaml`:

```yaml
site:
  name: "Your Blog Name"
  title: "Your Blog Title"
  description: "Your blog description"
  url: "https://yourdomain.com"
  author: "Your Name"
  email: "your@email.com"
  twitter: "@yourhandle"

metadata:
  keywords:
    - nextjs
    - mdx
    - blog
  ogImage: "/og-image.jpg"
  twitterCard: "summary_large_image"
```

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
DRAFT_ACCESS_TOKEN=your-secret-token
```

**Optional variables:**
- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPO_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

## Deployment

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### Static Export
```bash
pnpm build
```

Outputs to `out/` directory for any static host.

## Troubleshooting

**Plugins not working:**
1. Check `enabled: true` in config
2. Restart dev server
3. Clear cache: `rm -rf .next`

**Build errors:**
1. Check MDX syntax in posts
2. Verify frontmatter is valid
3. Run `pnpm type-check`
