import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  series?: string;
  seriesPart?: number;
  draft?: boolean;
}

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatter(content: string): Partial<BlogPost> {
  // Match: export const frontmatter = { ... }; (handles multiline)
  const frontmatterMatch = content.match(/export const frontmatter = \{([\s\S]*?)\};/);
  
  if (!frontmatterMatch) {
    return {};
  }

  const frontmatterContent = frontmatterMatch[1];
  
  // Extract title, date, and description
  const titleMatch = frontmatterContent.match(/title:\s*["']([^"']+)["']/);
  const dateMatch = frontmatterContent.match(/date:\s*["']([^"']+)["']/);
  const descriptionMatch = frontmatterContent.match(/description:\s*["']([^"']+)["']/);
  
  // Extract tags (array format)
  const tagsMatch = frontmatterContent.match(/tags:\s*\[([\s\S]*?)\]/);
  let tags: string[] | undefined;
  if (tagsMatch) {
    try {
      // Parse the array content, handling both quoted and unquoted strings
      const tagsContent = tagsMatch[1];
      tags = tagsContent
        .split(',')
        .map(tag => tag.trim().replace(/^["']|["']$/g, ''))
        .filter(tag => tag.length > 0);
    } catch (e) {
      tags = undefined;
    }
  }
  
  // Extract series information
  const seriesMatch = frontmatterContent.match(/series:\s*["']([^"']+)["']/);
  const seriesPartMatch = frontmatterContent.match(/seriesPart:\s*(\d+)/);
  
  // Extract draft status
  const draftMatch = frontmatterContent.match(/draft:\s*(true|false)/);

  return {
    title: titleMatch ? titleMatch[1] : '',
    date: dateMatch ? dateMatch[1] : '',
    description: descriptionMatch ? descriptionMatch[1] : '',
    tags: tags,
    series: seriesMatch ? seriesMatch[1] : undefined,
    seriesPart: seriesPartMatch ? parseInt(seriesPartMatch[1]) : undefined,
    draft: draftMatch ? draftMatch[1] === 'true' : false
  };
}

export function getAllPosts(includeDrafts = false): BlogPost[] {
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
        description: frontmatter.description || '',
        tags: frontmatter.tags,
        series: frontmatter.series,
        seriesPart: frontmatter.seriesPart,
        draft: frontmatter.draft || false
      };
    })
    .filter(post => includeDrafts || !post.draft); // Filter out drafts in production

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
