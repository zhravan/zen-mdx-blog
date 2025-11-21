import fs from 'fs';
import path from 'path';
import { ContentType, hasContentDirectory } from './content-types';

export interface ContentItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  series?: string;
  seriesPart?: number;
  draft?: boolean;
  contentType: string;
}

function parseFrontmatter(content: string): Partial<ContentItem> {
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

/**
 * Get all content items for a specific content type
 */
export function getContentForType(
  contentType: ContentType,
  includeDrafts = false
): ContentItem[] {
  // Skip if no content directory
  if (!hasContentDirectory(contentType) || !contentType.contentDir) {
    return [];
  }

  const contentDirectory = path.join(process.cwd(), contentType.contentDir);

  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const items = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
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
        draft: frontmatter.draft || false,
        contentType: contentType.id
      };
    })
    .filter(item => {
      // In development, always include drafts
      if (process.env.NODE_ENV === 'development') {
        return true;
      }
      // In production, respect the includeDrafts parameter
      return includeDrafts || !item.draft;
    });

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a specific content item by slug
 */
export function getContentBySlug(
  contentType: ContentType,
  slug: string
): ContentItem | undefined {
  // In development, include drafts when looking up by slug
  const includeDrafts = process.env.NODE_ENV === 'development';
  return getContentForType(contentType, includeDrafts).find((item) => item.slug === slug);
}

/**
 * Get all content items across all content types (useful for search, command palette, etc.)
 */
export function getAllContent(includeDrafts = false): ContentItem[] {
  // This would require importing all content types, but to avoid circular deps,
  // we'll export this function but implement it where needed
  return [];
}
