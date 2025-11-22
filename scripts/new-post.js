#!/usr/bin/env node

/**
 * CLI tool to create new content from templates
 * Usage: node scripts/new-post.js
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

const TEMPLATES = {
  'tutorial': {
    label: 'Tutorial / How-To Guide',
    description: 'Step-by-step guide to accomplish a task',
    file: 'tutorial.mdx'
  },
  'showcase': {
    label: 'Project Showcase',
    description: 'Highlight a project with features, tech stack, and results',
    file: 'showcase.mdx'
  },
  'deep-dive': {
    label: 'Deep Dive / Technical Analysis',
    description: 'In-depth exploration of a complex topic',
    file: 'deep-dive.mdx'
  },
  'comparison': {
    label: 'Comparison / Tech A vs Tech B',
    description: 'Compare two technologies or approaches',
    file: 'comparison.mdx'
  },
  'quick-tip': {
    label: 'Quick Tip / Code Snippet',
    description: 'Short, focused solution to a specific problem',
    file: 'quick-tip.mdx'
  },
  'talk': {
    label: 'Talk / Conference Presentation',
    description: 'Conference talk with slides and recording',
    file: 'talk.mdx'
  },
  'blank': {
    label: 'Blank Post',
    description: 'Start from scratch with minimal frontmatter',
    file: null
  }
};

const CONTENT_TYPES = {
  'blog': 'content/blog',
  'talks': 'content/talks',
  'custom': null
};

async function main() {
  console.log('\nCreate New Content from Template\n');

  // 1. Choose content type
  console.log('Available content types:');
  Object.entries(CONTENT_TYPES).forEach(([key, value]) => {
    console.log(`  ${key}: ${value || '(specify custom path)'}`);
  });
  
  const contentTypeInput = await question('\nContent type (blog/talks/custom): ');
  const contentType = contentTypeInput.trim().toLowerCase() || 'blog';
  
  let contentDir;
  if (contentType === 'custom') {
    const customPath = await question('Custom content directory path: ');
    contentDir = customPath.trim();
  } else {
    contentDir = CONTENT_TYPES[contentType] || CONTENT_TYPES['blog'];
  }

  // 2. Choose template
  console.log('\nAvailable templates:');
  Object.entries(TEMPLATES).forEach(([key, template]) => {
    console.log(`  ${key}: ${template.label}`);
    console.log(`     ${template.description}`);
  });

  const templateInput = await question('\nChoose template (tutorial/showcase/deep-dive/comparison/quick-tip/talk/blank): ');
  const templateKey = templateInput.trim().toLowerCase() || 'blank';
  
  const template = TEMPLATES[templateKey];
  if (!template) {
    console.error(`Error: Template "${templateKey}" not found`);
    process.exit(1);
  }

  // 3. Get post details
  const title = await question('\nPost title: ');
  if (!title.trim()) {
    console.error('Error: Title is required');
    process.exit(1);
  }

  const slug = slugify(title);
  const customSlug = await question(`Slug (default: ${slug}): `);
  const finalSlug = customSlug.trim() || slug;

  const description = await question('Description (optional): ');
  const tags = await question('Tags (comma-separated, optional): ');

  // 4. Generate content
  const today = new Date().toISOString().split('T')[0];
  
  let content;
  if (template.file) {
    // Load template
    const templatePath = path.join(process.cwd(), 'templates', template.file);
    if (!fs.existsSync(templatePath)) {
      console.error(`Error: Template file not found: ${templatePath}`);
      process.exit(1);
    }
    content = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders
    content = content.replace(/date: ".*?"/, `date: "${today}"`);
    content = content.replace('draft: true', 'draft: false');
  } else {
    // Blank template
    const tagArray = tags.trim() 
      ? tags.split(',').map(t => `"${t.trim()}"`).join(', ')
      : '"general"';
    
    content = `export const frontmatter = {
  title: "${title}",
  date: "${today}",
  description: "${description || title}",
  tags: [${tagArray}],
  draft: false
};

# ${title}

${description ? description + '\n\n' : ''}Start writing your content here...
`;
  }

  // 5. Save file
  const outputDir = path.join(process.cwd(), contentDir);
  if (!fs.existsSync(outputDir)) {
    console.error(`Error: Content directory does not exist: ${outputDir}`);
    console.log('Create it first or use a different content type.');
    process.exit(1);
  }

  const outputPath = path.join(outputDir, `${finalSlug}.mdx`);
  
  if (fs.existsSync(outputPath)) {
    const overwrite = await question(`\nFile ${finalSlug}.mdx already exists. Overwrite? (y/n): `);
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('Cancelled');
      rl.close();
      return;
    }
  }

  fs.writeFileSync(outputPath, content);
  console.log(`\nCreated: ${outputPath}`);
  
  console.log('\nNext steps:');
  console.log(`  1. Edit the file: ${outputPath}`);
  console.log(`  2. Fill in the template placeholders (search for brackets [])`);
  console.log(`  3. Add your content`);
  console.log(`  4. Remove "draft: false" when ready to publish`);
  console.log('');

  rl.close();
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
