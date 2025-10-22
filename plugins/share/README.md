# Share Buttons Plugin

Social sharing buttons for blog posts with support for Twitter, LinkedIn, Reddit, copy link, and native share API.

## Features

- **Multiple platforms**: Twitter, LinkedIn, Reddit
- **Copy to clipboard**: One-click URL copying with visual feedback
- **Native share**: Mobile-friendly native share API
- **Configurable**: Enable/disable individual buttons
- **Preview mode**: Show only in preview/admin mode if needed
- **Responsive**: Adapts to mobile and desktop layouts
- **Accessible**: Proper ARIA labels and keyboard navigation

## Configuration

Edit `config/plugins.yaml`:

```yaml
share-buttons:
  enabled: true           # Enable/disable the plugin
  previewOnly: false      # If true, only show in preview mode
  buttons:
    twitter: true         # Show Twitter share button
    linkedin: true        # Show LinkedIn share button
    reddit: true          # Show Reddit share button
    copy: true            # Show copy link button
    native: true          # Show native share button (mobile only)
  showLabels: false       # Show "Share:" text label
  position: "bottom"      # Position in post (bottom, top, both)
```

## Usage

The plugin is automatically integrated into blog posts. No manual integration needed.

### Manual Usage

If you need to use the component elsewhere:

```tsx
import { ShareButtons } from '@/plugins/share/components/ShareButtons';

<ShareButtons 
  title="My Blog Post"
  url="https://example.com/blog/my-post"
  preview={false}
  config={shareButtonsConfig}
/>
```

## Preview Mode

When `previewOnly: true` is set in the config, the share buttons will only appear when:
- The `preview` prop is explicitly set to `true`
- You're in development mode and want to test the feature

This is useful for:
- Testing the feature before enabling it for all users
- Showing share buttons only to authenticated users
- A/B testing different configurations

## Customization

### Button Configuration

You can enable/disable individual buttons:

```yaml
buttons:
  twitter: true
  linkedin: false   # Disable LinkedIn
  reddit: true
  copy: true
  native: true
```

### Styling

The component uses Tailwind CSS classes. To customize the appearance, edit:
- `plugins/share/components/ShareButtons.tsx`

### Adding New Platforms

To add a new sharing platform:

1. Add the platform to the button configuration in `ShareButtons.tsx`
2. Add the share URL template
3. Import the appropriate icon from `lucide-react`
4. Update the configuration schema

## Browser Support

- **Copy to clipboard**: Modern browsers with Clipboard API
- **Native share**: Mobile browsers with Web Share API
- **Social sharing**: All browsers (opens in new tab)

## Privacy

This plugin does not:
- Track user interactions
- Send data to third parties
- Use cookies or local storage
- Require external scripts

All sharing happens through direct links to social platforms.
