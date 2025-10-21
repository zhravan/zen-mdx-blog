## Plugin System

All features are controlled via `config/plugins.yaml`. Enable/disable without code changes.

### Configuration

```yaml
plugins:
  command-palette:
    enabled: true
    shortcut: "cmd+k"
    fuzzyThreshold: 0.3
    
  scroll-progress:
    enabled: true
    position: "top"
    height: 3
    
  scroll-to-top:
    enabled: true
    showAfter: 400
    position: "bottom-right"
    
  toc:
    enabled: true
    position: "right"
    minHeadings: 2
    maxDepth: 3
    
  reading-time:
    enabled: true
    wordsPerMinute: 200
    showWordCount: true
    
  related-posts:
    enabled: true
    count: 3
    algorithm: "tags"
```

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
