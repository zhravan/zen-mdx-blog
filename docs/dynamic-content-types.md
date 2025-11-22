# Dynamic Content Types

The zen-mdx-blog supports a flexible, configuration-driven system for adding new content types. This allows you to easily extend your blog with new sections like "Tech Talks", "Bug Bash", "Tutorials", etc., without modifying core code.

## Overview

With dynamic content types, you can:

- Add new content sections with a single command
- Automatically generate routes and navigation items
- Reuse all existing features (tags, series, drafts, etc.)
- Maintain type safety with TypeScript
- Keep your content organized in separate directories

## Quick Start

### Creating a New Content Type

Use the CLI tool to create a new content type:

```bash
pnpm new:content-type
```

The tool will prompt you for:
- **Label**: Display name (e.g., "Tech Talks")
- **Path**: URL path (e.g., "/talks")
- **Description**: Optional description for the listing page
- **Icon**: Optional Lucide React icon name (e.g., "Mic", "Bug")

### Example

```bash
$ pnpm new:content-type

Create a new content type

Content type label (e.g., "Tech Talks"): Tech Talks
URL path (default: /tech-talks): /talks
Description (optional): Presentations and speaking engagements
Icon name from lucide-react (optional, e.g., "Mic", "Bug"): Mic

Summary:
  ID: tech-talks
  Label: Tech Talks
  Path: /talks
  Content Dir: content/tech-talks
  Description: Presentations and speaking engagements
  Icon: Mic

Create this content type? (y/n): y

Updated config/content-types.yaml
Created content/tech-talks/
Created content/tech-talks/sample.mdx
Created app/talks/page.tsx
Created app/talks/[slug]/page.tsx

Content type created successfully!
```

## What Gets Created

When you create a new content type, the tool automatically:

1. **Updates `config/content-types.yaml`** - Adds the new content type configuration
2. **Creates content directory** - Creates `content/{id}/` for your MDX files
3. **Creates sample MDX file** - Adds a sample post to get you started
4. **Creates listing page** - Generates `app/{path}/page.tsx` for the listing view
5. **Creates detail page** - Generates `app/{path}/[slug]/page.tsx` for individual posts

## Manual Configuration

You can also manually add content types by editing `config/content-types.yaml`:

```yaml
contentTypes:
  - id: bugbash           # Unique identifier (used in URLs and directories)
    label: Bug Bash        # Display name
    path: /bugbash         # URL path
    contentDir: content/bugbash  # Where MDX files are stored
    icon: Bug              # Optional Lucide React icon name
    enabled: true          # Enable/disable this content type
    description: Bug hunting sessions and security findings.
    showInNav: true        # Show in navigation menu
```

### Configuration Options

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | | Unique identifier for the content type |
| `label` | string | | Display name shown in navigation |
| `path` | string | | URL path (e.g., `/talks`) |
| `contentDir` | string | null | | Directory containing MDX files (use `null` for non-MDX types like Work) |
| `enabled` | boolean | | Whether the content type is active |
| `icon` | string | null | | Lucide React icon name (optional) |
| `description` | string | | Description for the listing page |
| `showInNav` | boolean | | Show in navigation menu (default: true) |

## Creating Content

Once a content type is created, add MDX files to its content directory:

```mdx
// content/talks/my-awesome-talk.mdx

export const frontmatter = {
  title: "Building Scalable Systems",
  date: "2025-03-15",
  description: "Talk about microservices architecture",
  tags: ["architecture", "microservices"],
  draft: false
};

# Building Scalable Systems

Your content here...
```

### Supported Frontmatter

All content types support the same frontmatter fields:

```typescript
{
  title: string;           // Post title
  date: string;            // ISO date string
  description: string;     // Short description
  tags?: string[];         // Optional tags
  series?: string;         // Optional series name
  seriesPart?: number;     // Optional series part number
  draft?: boolean;         // Draft status (default: false)
}
```

## Features

All existing features work with new content types:

### Automatic Features
- Listing pages with year grouping
- Individual post pages with full MDX support
- Navigation menu integration
- SEO metadata
- Draft mode (visible in dev, hidden in production)
- Tags display
- Series support

### Plugin Support
All plugins work automatically:
- Code syntax highlighting
- Table of contents
- Reading time
- Social sharing
- Comments (Giscus)
- Command palette search
- And more!

## Examples

### Tech Talks

```yaml
- id: talks
  label: Tech Talks
  path: /talks
  contentDir: content/talks
  icon: Mic
  enabled: true
  description: Presentations and speaking engagements
  showInNav: true
```

### Bug Bash

```yaml
- id: bugbash
  label: Bug Bash
  path: /bugbash
  contentDir: content/bugbash
  icon: Bug
  enabled: true
  description: Bug hunting sessions and security findings
  showInNav: true
```

### Tutorials

```yaml
- id: tutorials
  label: Tutorials
  path: /tutorials
  contentDir: content/tutorials
  icon: BookOpen
  enabled: true
  description: Step-by-step guides and tutorials
  showInNav: true
```

### Case Studies

```yaml
- id: case-studies
  label: Case Studies
  path: /case-studies
  contentDir: content/case-studies
  icon: FileText
  enabled: true
  description: Real-world project case studies
  showInNav: true
```

## Advanced Usage

### Disabling a Content Type

Set `enabled: false` to temporarily hide a content type:

```yaml
- id: talks
  enabled: false  # Won't appear in navigation or routes
```

### Hiding from Navigation

Keep the content type active but hide from navigation:

```yaml
- id: archive
  showInNav: false  # Still accessible via URL, but not in menu
```

### Custom Listing Page

You can override the default listing page by creating a custom component:

```typescript
// app/talks/page.tsx
import { getContentTypeById } from '@/lib/content-types';
import { getContentForType } from '@/lib/content';

export default function TalksPage() {
  const contentType = getContentTypeById('talks');
  const items = getContentForType(contentType);
  
  // Custom rendering logic here
  return <div>Custom layout for talks</div>;
}
```

## API Reference

### Functions

#### `getContentTypeById(id: string)`
Get a content type configuration by its ID.

```typescript
const talks = getContentTypeById('talks');
```

#### `getNavigationContentTypes()`
Get all content types that should appear in navigation.

```typescript
const navItems = getNavigationContentTypes();
```

#### `getContentForType(contentType, includeDrafts?)`
Get all content items for a specific content type.

```typescript
const talkItems = getContentForType(talks, false);
```

#### `getContentBySlug(contentType, slug)`
Get a specific content item by slug.

```typescript
const talk = getContentBySlug(talks, 'my-awesome-talk');
```

## Migration Guide

### From Hardcoded Routes

If you have existing content types with hardcoded routes:

1. Add them to `config/content-types.yaml`
2. Move content to the new directory structure
3. Update page components to use the dynamic system
4. Remove hardcoded navigation items

### Backward Compatibility

The system maintains backward compatibility with existing code:

- `getAllPosts()` still works for blog posts
- Existing blog routes and pages continue to function
- No breaking changes to existing content

## Troubleshooting

### Content Type Not Appearing

1. Check `enabled: true` in config
2. Verify content directory exists
3. Restart dev server after config changes
4. Check `showInNav: true` for navigation visibility

### MDX Files Not Loading

1. Verify `contentDir` path is correct
2. Ensure files end with `.mdx`
3. Check frontmatter syntax
4. Look for compile errors in terminal

### Icons Not Displaying

1. Verify icon name matches Lucide React (case-sensitive)
2. Check spelling: "Mic" not "Microphone"
3. Browse available icons: https://lucide.dev/icons/

## Best Practices

1. **Use descriptive IDs**: Use kebab-case (e.g., `tech-talks`, `bug-bash`)
2. **Add descriptions**: Help users understand what each section contains
3. **Choose appropriate icons**: Pick icons that visually represent the content
4. **Organize content**: Keep related content in the same type
5. **Use drafts**: Mark WIP content as `draft: true`

## Next Steps

- Add more content types for your use case
- Customize the listing page layout
- Add content-type-specific features
- Integrate with CMS for easier content management

For more information, see the main [documentation](./index.md).
