# Plugin System

Configure blog features via `config/plugins.yaml`. Enable/disable plugins without code changes.

## Quick Start

```yaml
plugins:
  command-palette:
    enabled: true
  scroll-progress:
    enabled: true
  scroll-to-top:
    enabled: true
  toc:
    enabled: true
  reading-time:
    enabled: true
  related-posts:
    enabled: true
```

## Available Plugins

### Command Palette
Quick search with keyboard shortcut (⌘K).

```yaml
command-palette:
  enabled: true
  shortcut: "cmd+k"        # Keyboard shortcut
  fuzzyThreshold: 0.3      # Search sensitivity (0-1)
  showPages: true          # Include static pages
  showPosts: true          # Include blog posts
```

### Scroll Progress
Visual reading progress indicator.

```yaml
scroll-progress:
  enabled: true
  position: "top"          # top, bottom
  height: 3                # Height in pixels
```

### Scroll to Top
Quick navigation button to top of page.

```yaml
scroll-to-top:
  enabled: true
  showAfter: 400           # Show after pixels scrolled
  position: "bottom-right" # bottom-right, bottom-left
  smooth: true             # Smooth scroll animation
```

### Table of Contents
Auto-generated navigation from headings.

```yaml
toc:
  enabled: true
  position: "right"        # left, right, inline
  minHeadings: 2
  maxDepth: 3
  sticky: true
```

### Reading Time
Estimated reading duration.

```yaml
reading-time:
  enabled: true
  wordsPerMinute: 200
  showWordCount: true
  showIcon: true
```

### Related Posts
Suggest similar content.

```yaml
related-posts:
  enabled: true
  count: 3
  algorithm: "tags"        # tags, similarity, recent
  showDate: true
  showDescription: true
```

### Social Share

Share buttons for social platforms.

```yaml
social-share:
  enabled: true
  showIcon: true           # Show share icon label
  platforms:
    copyLink: true         # Enable copy link button
    whatsapp: true         # Enable WhatsApp share
    x: true                # Enable X (Twitter) share
    mastodon: true         # Enable Mastodon share
    linkedin: true         # Enable LinkedIn share
```

See [social-share.md](social-share.md) for detailed documentation.

## Creating a Plugin

1. Create `lib/plugins/your-plugin.ts`:

```typescript
import { getPluginConfig } from './registry';

export interface YourConfig {
  enabled: boolean;
  option: string;
}

export function yourPlugin() {
  const config = getPluginConfig<YourConfig>('your-plugin');
  if (!config) return null;
  // Your logic here
}
```

2. Add config to `config/plugins.yaml`:

```yaml
plugins:
  your-plugin:
    enabled: true
    option: "value"
```

3. Use in pages:

```typescript
import { yourPlugin } from '@/lib/plugins/your-plugin';

const data = yourPlugin();
if (data) {
  // Render plugin
}
```

## API

- `getPluginConfig<T>(name)` - Get plugin configuration
- `isPluginEnabled(name)` - Check if plugin is enabled
- `getEnabledPlugins()` - List all enabled plugins

