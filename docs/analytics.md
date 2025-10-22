# Analytics Integration

Privacy-friendly analytics integration supporting Plausible, Umami, and Simple Analytics.

## Setup

### 1. Enable in Configuration

Edit `config/plugins.yaml`:

```yaml
analytics:
  enabled: true
  provider: "plausible"    # Options: "plausible", "umami", "simple-analytics"
  domain: "yourdomain.com"  # Your website domain or tracking ID
```

### 2. Provider-Specific Setup

#### Plausible

```yaml
analytics:
  enabled: true
  provider: "plausible"
  domain: "yourdomain.com"
```

- Sign up at [plausible.io](https://plausible.io)
- Add your domain in the dashboard
- Use your domain as the `domain` value

#### Umami

```yaml
analytics:
  enabled: true
  provider: "umami"
  domain: "your-website-id"  # Get from Umami dashboard
```

- Sign up at [umami.is](https://umami.is) or self-host
- Create a website in the dashboard
- Use the website ID as the `domain` value

#### Simple Analytics

```yaml
analytics:
  enabled: true
  provider: "simple-analytics"
  domain: "yourdomain.com"
```

- Sign up at [simpleanalytics.com](https://simpleanalytics.com)
- Add your domain
- Use your domain as the `domain` value

## Features

### Automatic Page View Tracking

Page views are automatically tracked on all pages. No additional code needed.

### Custom Event Tracking

Track custom events in your components:

```tsx
import { trackEvent } from '@/lib/plugins/analytics';

// Simple event
trackEvent('button_click');

// Event with properties
trackEvent('purchase', {
  product: 'Blog Template',
  price: 99,
  currency: 'USD'
});
```

### Manual Page View Tracking

For custom navigation or SPA routing:

```tsx
import { trackPageView } from '@/lib/plugins/analytics';

// Track current page
trackPageView();

// Track specific URL
trackPageView('/custom-path');
```

## Example Use Cases

### Track Blog Post Reads

```tsx
'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/plugins/analytics';

export function BlogPost({ slug, title }) {
  useEffect(() => {
    // Track when user finishes reading
    const timer = setTimeout(() => {
      trackEvent('post_read', {
        slug,
        title,
        readTime: '5min'
      });
    }, 30000); // After 30 seconds

    return () => clearTimeout(timer);
  }, [slug, title]);

  return <article>{/* ... */}</article>;
}
```

### Track External Link Clicks

```tsx
'use client';
import { trackEvent } from '@/lib/plugins/analytics';

export function ExternalLink({ href, children }) {
  const handleClick = () => {
    trackEvent('external_link_click', {
      destination: href
    });
  };

  return (
    <a href={href} onClick={handleClick} target="_blank" rel="noopener">
      {children}
    </a>
  );
}
```

### Track Newsletter Signups

```tsx
'use client';
import { trackEvent } from '@/lib/plugins/analytics';

export function NewsletterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... submit logic
    
    trackEvent('newsletter_signup', {
      location: 'blog_footer'
    });
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

## Privacy

All supported providers are privacy-friendly:

- ✅ No cookies
- ✅ No personal data collection
- ✅ GDPR compliant
- ✅ CCPA compliant
- ✅ No cross-site tracking

## Troubleshooting

### Analytics not loading?

1. Check `enabled: true` in `plugins.yaml`
2. Verify `domain` is set correctly
3. Check browser console for errors
4. Verify ad blockers aren't blocking the script

### Events not tracking?

1. Ensure analytics script has loaded (`window.plausible`, `window.umami`, etc.)
2. Check browser console for errors
3. Use browser dev tools to see network requests
4. Verify you're calling `trackEvent` from client components

### Testing

To test analytics locally:

1. Enable in `plugins.yaml`
2. Configure with your domain
3. Run `pnpm dev`
4. Open browser dev tools → Network tab
5. Check for analytics script requests
6. Trigger events and watch network activity

## API Reference

### `trackEvent(eventName, props?)`

Track a custom event.

**Parameters:**

- `eventName` (string) - Name of the event
- `props` (object, optional) - Event properties

**Example:**

```tsx
trackEvent('cta_click', { location: 'header', button: 'signup' });
```

### `trackPageView(url?)`

Manually track a page view.

**Parameters:**

- `url` (string, optional) - URL to track (defaults to current page)

**Example:**

```tsx
trackPageView('/custom-page');
```

### `shouldLoadAnalytics()`

Check if analytics should be loaded.

**Returns:** `boolean`

**Example:**

```tsx
if (shouldLoadAnalytics()) {
  // Analytics is enabled
}
```

## Dashboard Access

- **Plausible**: <https://plausible.io/yourdomain.com>
- **Umami**: <https://analytics.umami.is> (or your self-hosted URL)
- **Simple Analytics**: <https://simpleanalytics.com/yourdomain.com>

## Cost Comparison

| Provider | Free Tier | Paid From |
|----------|-----------|-----------|
| Plausible | No | $9/month |
| Umami | Self-hosted | $20/month (cloud) |
| Simple Analytics | No | $19/month |

## Best Practices

1. **Don't over-track** - Only track events that provide actionable insights
2. **Use meaningful names** - Event names should be descriptive
3. **Keep properties simple** - Avoid sending sensitive data
4. **Test before deploying** - Verify tracking works in development
5. **Monitor dashboard** - Regularly check your analytics to understand your audience

## Support

For provider-specific help:

- Plausible: [docs.plausible.io](https://docs.plausible.io)
- Umami: [umami.is/docs](https://umami.is/docs)
- Simple Analytics: [docs.simpleanalytics.com](https://docs.simpleanalytics.com)
