## Plugin System

All features are controlled via `config/plugins.yaml`. Enable/disable without code changes.

### Configuration

# Documentation

Monolog MDX Blog - A minimal, plugin-based MDX blog built with Next.js 15.

## Quick Links

- **[Configuration Guide](configuration.md)** - Quick start and basic setup
- **[Plugin System](plugins.md)** - Complete plugin reference and custom plugin creation
- **[Draft Access System](draft-access.md)** - Draft post preview with token authentication

## Quick Start

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Enable plugins** in `config/plugins.yaml`:
   ```yaml
   plugins:
     command-palette:
       enabled: true
     scroll-progress:
       enabled: true
     toc:
       enabled: true
   ```

3. **Create a post** in `content/blog/my-post.mdx`:
   ```mdx
   export const frontmatter = {
     title: "My Post",
     date: "October 22, 2025",
     description: "Post description",
     tags: ["nextjs", "mdx"]
   };

   # Hello World

   Your content here.
   ```

4. **Run dev server**:
   ```bash
   pnpm dev
   ```

## Features

- Plugin-based architecture (enable/disable via YAML config)
- MDX blog posts with frontmatter
- Command palette search (⌘K)
- Reading progress indicator
- Table of contents
- Related posts
- Draft post system with token authentication
- Tag-based navigation
- RSS/Atom/JSON feeds
- Dark mode support

## Project Structure

```
├── app/              # Next.js app router pages
├── components/       # React components
├── config/           # Configuration files (plugins.yaml, seo.yaml)
├── content/blog/     # MDX blog posts
├── docs/             # Documentation (you are here)
└── lib/              # Utilities and business logic
```

## Documentation

- See [configuration.md](configuration.md) for quick setup
- See [plugins.md](plugins.md) for plugin details
- See [draft-access.md](draft-access.md) for draft post workflow

### Available Plugins

| Plugin | Description | Key Options |
|--------|-------------|-------------|
| command-palette | Quick search (⌘K) | shortcut, fuzzyThreshold |
| scroll-progress | Reading progress bar | position, height |
| scroll-to-top | Back to top button | showAfter, position |
| toc | Table of contents | position, maxDepth |
| reading-time | Reading duration | wordsPerMinute |
| related-posts | Similar content | count, algorithm |

### Creating Plugins

1. Create `lib/plugins/your-plugin.ts`:

```typescript
import { getPluginConfig } from './registry';

export interface YourConfig {
  enabled: boolean;
  option: string;
}

export function getYourConfig(): YourConfig | null {
  return getPluginConfig<YourConfig>('your-plugin');
}
```

2. Add to `config/plugins.yaml`:

```yaml
your-plugin:
  enabled: true
  option: "value"
```

3. Use in components:

```typescript
import { getYourConfig } from '@/lib/plugins/your-plugin';

const config = getYourConfig();
if (config) {
  // Use plugin
}
```

## Tags

Add tags to MDX frontmatter:

```typescript
export const frontmatter = {
  title: "Post Title",
  date: "2024-01-15",
  description: "Description",
  tags: ["typescript", "nextjs"],
  series: "Series Name",
  seriesPart: 1,
  draft: false
};
```

## Writing Posts

Create `content/blog/post-name.mdx`:

```mdx
export const frontmatter = {
  title: "Post Title",
  date: "October 22, 2025",
  description: "Brief description",
  tags: ["tag1", "tag2"]
};

# Heading

Content here.
```

Run `pnpm build` to generate.
