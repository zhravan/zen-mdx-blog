# Content Templates

Professional templates for different types of blog posts. Each template includes structured frontmatter, sections, and helpful placeholders.

## Quick Start

```bash
# Interactive CLI
pnpm new:post

# Follow the prompts to select template and create your post
```

## Available Templates

### 1. Tutorial (`tutorial.mdx`)

**Best for**: Step-by-step guides, how-to articles, implementation walkthroughs

**Structure**:
- Prerequisites & requirements
- What you'll build
- Numbered steps with code examples
- Testing instructions
- Troubleshooting section
- Best practices
- Next steps & additional resources

**Example topics**:
- "How to Build a REST API with Node.js"
- "Setting Up CI/CD with GitHub Actions"
- "Creating a React Component Library"

---

### 2. Showcase (`showcase.mdx`)

**Best for**: Project highlights, portfolio pieces, case studies

**Structure**:
- Project overview with banner
- Key features with screenshots
- Tech stack table
- Design decisions & architecture
- Results & metrics
- Screenshots/demos
- Lessons learned
- Future plans

**Example topics**:
- "Building a Real-Time Chat Application"
- "My Side Project: AI-Powered Task Manager"
- "Redesigning the Company Dashboard"

---

### 3. Deep Dive (`deep-dive.mdx`)

**Best for**: Technical analysis, advanced concepts, architectural discussions

**Structure**:
- Why it matters (motivation)
- Fundamentals revisited
- How it really works (internals)
- Advanced patterns
- Performance analysis with benchmarks
- Real-world case studies
- Common misconceptions
- Practical guidelines

**Example topics**:
- "Understanding React Fiber Architecture"
- "Deep Dive: JavaScript Event Loop"
- "Database Indexing Strategies Explained"

---

### 4. Comparison (`comparison.mdx`)

**Best for**: Technology comparisons, framework evaluations, tool reviews

**Structure**:
- Quick comparison table
- Overview of each option
- Architecture & philosophy
- Performance benchmarks
- Developer experience comparison
- Example implementations (same feature in both)
- Ecosystem analysis
- Use cases for each
- Migration paths
- Decision matrix

**Example topics**:
- "React vs Vue: Which to Choose in 2024?"
- "PostgreSQL vs MongoDB for Your Next Project"
- "Docker vs Kubernetes: Understanding the Difference"

---

### 5. Quick Tip (`quick-tip.mdx`)

**Best for**: Short solutions, code snippets, one-liners, gotchas

**Structure**:
- The problem (concise)
- The solution (code)
- Why it works (brief explanation)
- Alternative approaches
- Related tips

**Example topics**:
- "Quick Tip: Center a Div with Flexbox"
- "Fix: Module Not Found Error in Next.js"
- "One-Liner: Remove Duplicates from Array"

---

### 6. Talk (`talk.mdx`)

**Best for**: Conference presentations, meetup talks, webinar writeups

**Structure**:
- Talk metadata (event, date, location)
- Abstract
- Embedded slides (PDF/PPT)
- Video recording embed
- Talk outline with timestamps
- Key takeaways
- Resources mentioned
- Photos from event
- Q&A highlights
- Speaking notes

**Example topics**:
- "React Performance: My Talk at React Conf 2024"
- "Building Scalable APIs - DevFest Presentation"

---

### 7. Blank (`blank`)

**Best for**: Custom structures, opinion pieces, announcements

**Structure**:
- Minimal frontmatter
- Empty body
- Maximum flexibility

---

## Using Templates

### Via CLI (Recommended)

```bash
pnpm new:post
```

Interactive prompts will guide you through:
1. Choosing content type (blog/talks/custom)
2. Selecting a template
3. Entering title, slug, description
4. Specifying tags

### Manual Copy

1. Copy a template from `/templates/`
2. Paste into your content directory
3. Rename the file
4. Update frontmatter and content

## ✏Customizing Templates

Templates are just `.mdx` files in the `/templates` folder. Feel free to:

- **Edit existing templates** to match your style
- **Create new templates** for your common post types
- **Add custom components** specific to your needs
- **Update frontmatter fields** based on your requirements

### Creating a Custom Template

1. Create a new `.mdx` file in `/templates/`:

```mdx
export const frontmatter = {
  title: "Your Template Title",
  date: "2024-01-01",
  description: "Template description",
  tags: ["template"],
  draft: true
};

# Your Template Structure

Add your preferred structure here...
```

2. Update `/scripts/new-post.js` to include your template:

```javascript
const TEMPLATES = {
  // ... existing templates
  'your-template': {
    label: 'Your Template Name',
    description: 'What this template is for',
    file: 'your-template.mdx'
  }
};
```

## Template Features

All templates include:

- **Structured frontmatter** with relevant fields
- **Section headings** following best practices
- **Code blocks** with syntax highlighting
- **Placeholder text** in [brackets] for easy search
- **Emoji indicators** (, , ) for visual hierarchy
- **Common patterns** for each content type
- **Draft mode** enabled by default

## Frontmatter Fields

### Standard Fields (All Templates)

```yaml
title: "Post Title"           # Required
date: "2024-01-01"            # Auto-set to today
description: "Brief summary"   # For SEO & listings
tags: ["tag1", "tag2"]        # For categorization
draft: false                   # Hide from production
readingTime: 10               # Minutes (auto-calculated if omitted)
```

### Optional Fields

```yaml
# For series posts
series: "series-name"
seriesOrder: 1

# For talks
event: "Conference Name 2024"
venue: "City, Country"
slides: "/slides/talk.pdf"
video: "https://youtube.com/watch?v=..."

# Custom fields (add as needed)
author: "Your Name"
featured: true
canonical: "https://original-url.com"
```

## Best Practices

### Before Creating a Post

1. **Choose the right template** for your content type
2. **Review similar posts** in your blog for consistency
3. **Gather resources** (code samples, images, links)

### While Writing

1. **Search for [brackets]** and replace with actual content
2. **Remove unused sections** if they don't apply
3. **Add real code examples** - avoid Lorem Ipsum
4. **Include alt text** for all images
5. **Test code samples** before publishing

### Before Publishing

1. **Remove `draft: false`** when ready
2. **Update date** to publish date
3. **Check all links** are working
4. **Review for placeholder text**
5. **Test on mobile** view

## Workflow Examples

### Quick Blog Post

```bash
$ pnpm new:post
Content type: blog
Template: quick-tip
Title: Fix TypeScript Type Errors
# ... edit the generated file
# ... publish
```

### Conference Talk

```bash
$ pnpm new:post
Content type: talks
Template: talk
Title: Building Better APIs
# ... add slides PDF
# ... embed video recording
# ... publish
```

### Tutorial Series

```bash
# Part 1
$ pnpm new:post
Template: tutorial
Title: Building a Blog - Part 1: Setup

# Part 2
$ pnpm new:post
Template: tutorial
Title: Building a Blog - Part 2: Posts

# Add series metadata to frontmatter:
series: "building-a-blog"
seriesOrder: 1  # or 2
```

## Finding Placeholders

After generating from a template, search for these patterns:

- `[Text in brackets]` - Replace with your content
- `TODO:` - Action items to complete
- `https://example.com` - Replace with real URLs
- `2024-01-01` - Update dates as needed

## Additional Resources

- [MDX Documentation](https://mdxjs.com/)
- [Frontmatter Specification](https://frontmatter.codes/)
- [Writing Tips](../docs/index.md)

---

**Questions?** Check the main docs or create an issue on GitHub!
