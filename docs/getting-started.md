# Getting Started

## Installation

```bash
git clone <repository-url>
cd zen-mdx-blog
pnpm install
```

## Development

```bash
pnpm dev
```

Visit `http://localhost:3000`

## Create Your First Post

1. **Using CLI:**

```bash
pnpm new:post
```

Follow prompts to create a post from templates (Tutorial, Showcase, Quick Tip, etc.)

1. **Manual creation:**

Create `content/blog/my-post.mdx`:

```mdx
export const frontmatter = {
  title: "My First Post",
  date: "2025-11-22",
  description: "Post description",
  tags: ["nextjs", "mdx"]
};

# Hello World

Your content here.
```

## Enable Plugins

Edit `config/plugins.yaml`:

```yaml
plugins:
  command-palette:
    enabled: true
  scroll-progress:
    enabled: true
  toc:
    enabled: true
  reading-time:
    enabled: true
```

Restart dev server to apply changes.

## Build for Production

```bash
pnpm build
```

Deploy the `out/` directory to any static hosting.

## Next Steps

- [Setup](setup.md) - Configure plugins and SEO
- [Content](content.md) - Learn MDX and content types
- [Features](features.md) - Explore advanced features
