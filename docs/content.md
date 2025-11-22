# Content

## Writing Posts

### Frontmatter

All posts require frontmatter:

```mdx
export const frontmatter = {
  title: "Post Title",
  date: "2025-11-22",
  description: "Brief description",
  tags: ["tag1", "tag2"],
  series: "Series Name",      // optional
  seriesPart: 1,               // optional
  draft: false                 // optional
};
```

### MDX Syntax

Use Markdown with React components:

```mdx
# Heading

Regular **markdown** _syntax_ works.

<DocumentViewer src="/slides/presentation.pdf" title="My Slides" />

## Code Blocks

```typescript
const greeting: string = "Hello";
```

## Lists

- Item 1
- Item 2

1. Numbered
1. Items
```

## Content Types

Create custom content sections beyond blog posts.

### Add Content Type

Using CLI:
```bash
pnpm new:content-type
```

Manual - edit `config/content-types.yaml`:
```yaml
contentTypes:
  - id: talks
    label: Tech Talks
    path: /talks
    contentDir: content/talks
    icon: Mic
    enabled: true
    showInNav: true
```

### Create Content

Add MDX files to content directory:

```mdx
// content/talks/my-talk.mdx
export const frontmatter = {
  title: "Building Scalable Systems",
  date: "2025-03-15",
  description: "Microservices architecture",
  tags: ["architecture"]
};

# Building Scalable Systems

Content here...
```

## Templates

Create posts from templates via CLI:

```bash
pnpm new:post
```

**Available templates:**
- **Tutorial** - Step-by-step guides
- **Showcase** - Project highlights
- **Deep Dive** - Technical analysis
- **Comparison** - Tech comparisons
- **Quick Tip** - Short solutions
- **Talk** - Presentation writeups
- **Blank** - Minimal starting point

Templates include pre-structured sections and placeholders.

## MDX Components

### Document Viewers

**PDF Viewer:**
```mdx
<PDF src="/slides/presentation.pdf" title="My Slides" height="600px" />
```

**PowerPoint Viewer:**
```mdx
<PPT src="https://example.com/presentation.pptx" title="Talk" />
```

**Full Document Viewer:**
```mdx
<DocumentViewer
  src="/docs/whitepaper.pdf"
  title="Whitepaper"
  height="700px"
  allowDownload={true}
  allowFullscreen={true}
/>
```

### External Links

Links to external sites automatically get icon and open in new tab:

```mdx
[External Site](https://example.com)
```

## File Organization

Place files in `public/` for references:

```txt
public/
  slides/
    talk-2024.pdf
  docs/
    guide.pdf
```

Reference with relative paths:
```mdx
<PDF src="/slides/talk-2024.pdf" />
```

## Tags

Add tags to frontmatter for categorization:

```mdx
export const frontmatter = {
  title: "My Post",
  tags: ["typescript", "nextjs", "tutorial"]
};
```

Tags appear on post pages and enable related post suggestions.

## Series Posts

Group related posts into series:

```mdx
// Part 1
export const frontmatter = {
  title: "React Basics - Part 1",
  series: "React Guide",
  seriesPart: 1
};

// Part 2
export const frontmatter = {
  title: "React Hooks - Part 2",
  series: "React Guide",
  seriesPart: 2
};
```

Series navigator shows progress and links between parts.
