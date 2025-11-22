# Content Templates & PDF/PPT Viewer

## PDF/PPT Viewer Component

A new MDX component for embedding PDF and PowerPoint presentations directly in your blog posts.

### Usage in MDX

#### PDF Viewer
```mdx
<PDF src="/slides/my-presentation.pdf" title="My Presentation" height="600px" />
```

#### PowerPoint Viewer
```mdx
<PPT src="https://example.com/presentation.pptx" title="Conference Talk" />
```

#### Full Document Viewer (with more options)
```mdx
<DocumentViewer 
  src="/docs/whitepaper.pdf"
  title="Technical Whitepaper"
  type="pdf"
  height="700px"
  allowDownload={true}
  allowFullscreen={true}
/>
```

### Features

- **Native PDF viewing**: Uses browser's built-in PDF viewer
- **PowerPoint support**: Embeds PPT/PPTX via Microsoft Office Online Viewer
- **Fullscreen mode**: Click to expand to fullscreen
- **Download button**: Allow readers to download documents
- **Responsive**: Works on mobile and desktop
- **Dark mode aware**: Integrates with your theme
- **Error handling**: Graceful fallback if document fails to load

### Supported Formats

- **PDF** (.pdf) - Native browser viewer
- **PowerPoint** (.ppt, .pptx) - Microsoft Office Online Viewer

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | required | URL or path to the document |
| `title` | string | optional | Display title in header |
| `type` | 'pdf' \| 'ppt' \| 'pptx' \| 'auto' | 'auto' | Document type (auto-detected from extension) |
| `height` | string | '600px' | Height of the viewer |
| `allowDownload` | boolean | true | Show download button |
| `allowFullscreen` | boolean | true | Allow fullscreen mode |

---

## Content Templates

Six professionally structured templates for different content types, now available via CLI.

### Available Templates

1. **Tutorial** - Step-by-step how-to guides
2. **Showcase** - Project highlights with features and tech stack
3. **Deep Dive** - In-depth technical analysis
4. **Comparison** - Technology/approach comparisons
5. **Quick Tip** - Short, focused solutions
6. **Talk** - Conference presentation writeups
7. **Blank** - Minimal starting point

### Quick Start

```bash
# Create a new post from a template
pnpm new:post

# Follow the interactive prompts:
# 1. Choose content type (blog/talks/custom)
# 2. Select template
# 3. Enter title, slug, description
# 4. Template is created and ready to edit
```

### Template Features

Each template includes:

- **Pre-structured frontmatter** with relevant fields
- **Section headings** following best practices
- **Code examples** and placeholders
- **Common patterns** for that content type
- **Emoji indicators** for visual scanning
- **Placeholder text** in brackets [like this]

### Example: Creating a Tutorial

```bash
$ pnpm new:post

Create New Content from Template

Content type (blog/talks/custom): blog
Choose template: tutorial
Post title: How to Build a REST API
Slug (default: how-to-build-a-rest-api): 
Description: Learn to build a REST API with Node.js
Tags (comma-separated): tutorial, node, api

Created: content/blog/how-to-build-a-rest-api.mdx
```

### Template Structure Examples

#### Tutorial Template
- Prerequisites
- What You'll Build
- Step-by-step instructions
- Testing section
- Troubleshooting
- Best practices
- Next steps

#### Showcase Template
- Project overview
- Key features (with screenshots)
- Tech stack table
- Design decisions
- Results & metrics
- Live demo links
- Lessons learned

#### Deep Dive Template
- Fundamentals revisited
- How it really works
- Advanced patterns
- Performance analysis
- Real-world case studies
- Common misconceptions

### Customizing Templates

Templates are stored in `/templates` directory:

```
templates/
  tutorial.mdx
  showcase.mdx
  deep-dive.mdx
  comparison.mdx
  quick-tip.mdx
  talk.mdx
```

You can edit these files to match your preferred structure!

---

## Usage Examples

### Blog Post with PDF

```mdx
export const frontmatter = {
  title: "My Conference Talk on React Performance",
  date: "2024-01-15",
  tags: ["react", "performance"],
};

# My Conference Talk on React Performance

Here are my slides from the talk:

<PDF 
  src="/slides/react-performance-2024.pdf" 
  title="React Performance Tips"
  height="700px"
/>

## Key Takeaways

...
```

### Tutorial with Embedded Presentation

```mdx
# How to Use Docker

First, watch this introduction:

<PPT src="https://example.com/docker-intro.pptx" title="Docker 101" />

Now let's implement it step by step...
```

---

## Getting Started

The components are already integrated into your MDX setup! Just start using them in your `.mdx` files.

### Tips

1. **Host PDFs locally**: Place PDFs in `/public/slides/` for fast loading
2. **External PPTs**: PowerPoint files must be publicly accessible for Office Online Viewer
3. **File size**: Keep PDFs under 10MB for best performance
4. **Mobile**: Viewers work on mobile but consider adding download link for small screens

### Creating Your First Templated Post

```bash
# Interactive CLI will guide you
pnpm new:post
```

That's it! Your template-based post is ready to customize. 