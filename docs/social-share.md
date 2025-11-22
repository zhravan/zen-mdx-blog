# Social Share Plugin

The Social Share plugin adds minimal, accessible share buttons to blog posts, allowing readers to share content across multiple platforms.

## Features

- **Copy Link**: One-click link copying with visual feedback
- **WhatsApp**: Share via WhatsApp
- **X (Twitter)**: Share on X/Twitter
- **Mastodon**: Share on Mastodon
- **LinkedIn**: Share on LinkedIn
- **Minimal Design**: Matches the blog's aesthetic with subtle styling
- **Responsive**: Works on mobile and desktop
- **Plugin-based**: Easy to enable/disable via configuration

## Configuration

Enable and configure the plugin in `config/plugins.yaml`:

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

## Usage

The social share buttons are automatically displayed on blog post pages in the right sidebar (desktop) and above the content (mobile), alongside tags and reading time.

### Disabling the Plugin

To disable social share buttons, set `enabled: false` in the configuration:

```yaml
social-share:
  enabled: false
```

### Customizing Platforms

You can selectively enable or disable individual platforms:

```yaml
social-share:
  enabled: true
  showIcon: true
  platforms:
    copyLink: true
    whatsapp: false        # Disable WhatsApp
    x: true
    mastodon: false        # Disable Mastodon
    linkedin: true
```

## Implementation Details

### Component Location

- **Component**: `components/SocialShare.tsx`
- **Plugin Logic**: `lib/plugins/social-share.ts`
- **Integration**: `app/blog/[slug]/page.tsx`

### Share URLs

The plugin generates platform-specific share URLs:

- **WhatsApp**: `https://wa.me/?text={title}%20{url}`
- **X**: `https://twitter.com/intent/tweet?text={title}&url={url}`
- **Mastodon**: `https://mastodon.social/share?text={title}%20{url}`
- **LinkedIn**: `https://www.linkedin.com/sharing/share-offsite/?url={url}`

### Styling

The social share buttons use:

- Minimal design matching the blog's aesthetic
- Opacity-based hover states (50% → 100%)
- Border and background matching other UI elements
- Small text size (10px) for consistency
- Responsive layout with flex-wrap

## Accessibility

The plugin includes:

- Proper `aria-label` attributes on all buttons
- Visual feedback for copy action (icon changes to checkmark)
- Keyboard-accessible buttons and links
- Semantic HTML with proper `target` and `rel` attributes

## Technical Notes

### URL Generation

The plugin uses the `SITE_URL` from `lib/site.ts` to generate absolute URLs:

```typescript
export function getPostShareUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}
```

Make sure `NEXT_PUBLIC_SITE_URL` is set in your environment variables for production.

### Copy Link Functionality

Uses the Clipboard API with error handling:

```typescript
await navigator.clipboard.writeText(url);
```

Falls back gracefully if the API is not available.

## Example

When enabled, readers will see share buttons below the tags:

```text
[Date]
[3 min read • 600 words]
[tags] [here]
[Share ↗] Copy | WhatsApp | X | Mastodon | LinkedIn
```

## Future Enhancements

Possible future additions:

- Reddit share button
- Email share option
- Custom platform configurations
- Share count tracking
- Native Web Share API support
