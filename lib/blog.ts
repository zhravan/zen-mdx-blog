import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
}

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatter(content: string): { title: string; date: string; description: string } {
  // Match: export const frontmatter = { ... }; (handles multiline)
  const frontmatterMatch = content.match(/export const frontmatter = \{([\s\S]*?)\};/);
  
  if (!frontmatterMatch) {
    return { title: '', date: '', description: '' };
  }

  const frontmatterContent = frontmatterMatch[1];
  
  // Extract title, date, and description
  const titleMatch = frontmatterContent.match(/title:\s*["']([^"']+)["']/);
  const dateMatch = frontmatterContent.match(/date:\s*["']([^"']+)["']/);
  const descriptionMatch = frontmatterContent.match(/description:\s*["']([^"']+)["']/);

  return {
    title: titleMatch ? titleMatch[1] : '',
    date: dateMatch ? dateMatch[1] : '',
    description: descriptionMatch ? descriptionMatch[1] : ''
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const frontmatter = parseFrontmatter(fileContents);

      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || '',
        description: frontmatter.description || ''
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
