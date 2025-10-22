# Understading Plugin setup

## Enable Plugins

Edit `config/plugins.yaml`:

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

Rebuild: `pnpm build`

## Configure

```yaml
command-palette:
  fuzzyThreshold: 0.4     # Adjust search sensitivity

scroll-progress:
  position: "bottom"      # Move to bottom
  height: 5               # Thicker bar

scroll-to-top:
  showAfter: 600          # Show later
  position: "bottom-left" # Move to left

toc:
  position: "inline"      # Show above post

reading-time:
  wordsPerMinute: 250     # Adjust speed

related-posts:
  count: 5                # More suggestions
```

## Disable

```yaml
plugins:
  scroll-progress:
    enabled: false
```

See [plugins.md](plugins.md) for full documentation.
