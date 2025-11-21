#!/usr/bin/env node

/**
 * CLI tool to create a new content type
 * Usage: node scripts/new-content-type.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('\nCreate a new content type\n');

  // Get content type details
  const label = await question('Content type label (e.g., "Tech Talks"): ');
  if (!label.trim()) {
    console.error('Error: Label is required');
    process.exit(1);
  }

  const id = slugify(label);
  const defaultPath = `/${id}`;
  const pathInput = await question(`URL path (default: ${defaultPath}): `);
  const contentPath = pathInput.trim() || defaultPath;

  const description = await question('Description (optional): ');
  const iconInput = await question('Icon name from lucide-react (optional, e.g., "Mic", "Bug"): ');
  const icon = iconInput.trim() || null;

  // Confirm
  console.log('\nSummary:');
  console.log(`  ID: ${id}`);
  console.log(`  Label: ${label}`);
  console.log(`  Path: ${contentPath}`);
  console.log(`  Content Dir: content/${id}`);
  console.log(`  Description: ${description || '(none)'}`);
  console.log(`  Icon: ${icon || '(none)'}`);
  
  const confirm = await question('\nCreate this content type? (y/n): ');
  if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
    console.log('Cancelled');
    rl.close();
    return;
  }

  try {
    // 1. Update config/content-types.yaml
    const configPath = path.join(process.cwd(), 'config', 'content-types.yaml');
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    const newContentType = `
  - id: ${id}
    label: ${label}
    path: ${contentPath}
    contentDir: content/${id}
    icon: ${icon ? icon : 'null'}
    enabled: true
    description: ${description ? `"${description}"` : 'null'}
    showInNav: true`;
    
    // Add before the example section
    const exampleIndex = configContent.indexOf('  # Example: Add new content types below');
    if (exampleIndex !== -1) {
      configContent = configContent.slice(0, exampleIndex) + newContentType + '\n    \n' + configContent.slice(exampleIndex);
    } else {
      configContent += newContentType;
    }
    
    fs.writeFileSync(configPath, configContent);
    console.log(`[+] Updated ${configPath}`);

    // 2. Create content directory
    const contentDir = path.join(process.cwd(), 'content', id);
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
      console.log(`[+] Created ${contentDir}/`);
    }

    // 3. Create a sample MDX file
    const sampleMdx = `export const frontmatter = {
  title: "Sample ${label} Post",
  date: "${new Date().toISOString().split('T')[0]}",
  description: "This is a sample ${label.toLowerCase()} post. Edit or delete this file.",
  tags: ["sample"],
  draft: true
};

# Sample ${label} Post

This is a sample post for the **${label}** content type.

## Getting Started

1. Edit this file in \`content/${id}/sample.mdx\`
2. Create more MDX files in this directory
3. Each file will automatically appear in the listing

## Features

All the features you're used to work here:

- Code syntax highlighting
- Tables of contents
- Series navigation
- Tags and more!

\`\`\`javascript
console.log("Hello from ${label}!");
\`\`\`

---

**Note:** This post is marked as \`draft: true\`, so it will only be visible in development mode.
`;

    const samplePath = path.join(contentDir, 'sample.mdx');
    fs.writeFileSync(samplePath, sampleMdx);
    console.log(`[+] Created ${samplePath}`);

    // 4. Create the dynamic route page
    const routeDir = path.join(process.cwd(), 'app', id);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    const pageContent = `import { getContentTypeById } from '@/lib/content-types';
import { getContentForType } from '@/lib/content';
import { filterDrafts } from '@/lib/plugins/drafts';
import { ContentListing } from '@/components/ContentListing';

export async function generateMetadata() {
  const contentType = getContentTypeById('${id}');
  return {
    title: contentType?.label || '${label}',
    description: contentType?.description || '${description || label}'
  };
}

export default function ${id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Page() {
  const contentType = getContentTypeById('${id}');
  
  if (!contentType) {
    return <div>Content type not found</div>;
  }

  const allItems = getContentForType(contentType);
  const items = filterDrafts(allItems);

  return <ContentListing items={items} contentType={contentType} />;
}
`;

    const pagePath = path.join(routeDir, 'page.tsx');
    fs.writeFileSync(pagePath, pageContent);
    console.log(`[+] Created ${pagePath}`);

    // 5. Create the [slug] route
    const slugDir = path.join(routeDir, '[slug]');
    if (!fs.existsSync(slugDir)) {
      fs.mkdirSync(slugDir, { recursive: true });
    }

    const slugPageContent = `import { notFound } from 'next/navigation';
import { getContentTypeById } from '@/lib/content-types';
import { getContentForType, getContentBySlug } from '@/lib/content';
import { filterDrafts, DraftPreviewGate } from '@/lib/plugins/drafts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const contentType = getContentTypeById('${id}');
  if (!contentType) return [];
  
  const allItems = getContentForType(contentType);
  const items = filterDrafts(allItems);
  
  return items.map((item) => ({
    slug: item.slug
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const contentType = getContentTypeById('${id}');
  
  if (!contentType) return {};
  
  const item = getContentBySlug(contentType, slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.description
  };
}

export default async function ${id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Post({ params }: PageProps) {
  const { slug } = await params;
  const contentType = getContentTypeById('${id}');
  
  if (!contentType) {
    notFound();
  }
  
  const item = getContentBySlug(contentType, slug);
  if (!item) {
    notFound();
  }

  // Import the MDX content dynamically
  let MdxContent;
  try {
    MdxContent = (await import(\`@/content/${id}/\${slug}.mdx\`)).default;
  } catch (e) {
    notFound();
  }

  return (
    <DraftPreviewGate isDraft={item.draft}>
      <article>
        <header className="mb-8 space-y-2">
          <h1 className="text-2xl font-bold">{item.title}</h1>
          {item.description && (
            <p className="text-sm opacity-70">{item.description}</p>
          )}
          <time className="text-xs opacity-50" dateTime={item.date}>
            {new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>
        <MdxContent />
      </article>
    </DraftPreviewGate>
  );
}
`;

    const slugPagePath = path.join(slugDir, 'page.tsx');
    fs.writeFileSync(slugPagePath, slugPageContent);
    console.log(`[+] Created ${slugPagePath}`);

    console.log('\nContent type created successfully!\n');
    console.log('Next steps:');
    console.log(`  1. Visit http://localhost:3000${contentPath} to see your new content type`);
    console.log(`  2. Add more MDX files to content/${id}/`);
    console.log(`  3. Restart your dev server to see the new navigation item`);
    console.log('');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  rl.close();
}

main();
