# Zen MDX Blog

Minimal, plugin-based MDX blog built with Next.js 15.

## Documentation

- **[Getting Started](getting-started.md)** - Installation and quick start
- **[Setup](setup.md)** - Configuration and plugins
- **[Content](content.md)** - Writing posts and MDX
- **[Features](features.md)** - Advanced features

## Quick Start

```bash
git clone <repository-url>
cd zen-mdx-blog
pnpm install
pnpm dev
```

Visit `http://localhost:3000`

## Core Features

- **16 plugins** - Enable/disable via YAML config
- **MDX blog posts** - Write with React components
- **Dynamic content types** - Add custom sections
- **Command palette** - Quick search (⌘K)
- **Draft preview** - Token-based access
- **55+ themes** - VS Code-inspired colors
- **Multiple feeds** - RSS/Atom/JSON
- **Privacy-friendly analytics** - Plausible/Umami
- **Code enhancements** - Line numbers, copy, highlighting
- **Document viewers** - Embed PDF/PowerPoint
- **Search** - Local fuzzy search
- **Comments** - GitHub Discussions via Giscus

## Structure

```txt
zen-mdx-blog/
├── app/              # Next.js routes
├── components/       # React components
├── config/           # YAML configuration
├── content/blog/     # MDX posts
└── lib/              # Utilities
```

## Commands

```bash
pnpm dev               # Development server
pnpm build             # Production build
pnpm new:post          # Create post
pnpm new:content-type  # Add content type
```
