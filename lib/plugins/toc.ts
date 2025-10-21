import { getPluginConfig } from './registry';

export interface TocConfig {
  enabled: boolean;
  position: 'left' | 'right' | 'inline';
  minHeadings: number;
  maxDepth: number;
  showScrollProgress: boolean;
  sticky: boolean;
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Extract headings from MDX content
 */
export function extractHeadings(content: string): TocHeading[] | null {
  const config = getPluginConfig<TocConfig>('toc');
  
  if (!config) {
    return null;
  }

  const headings: TocHeading[] = [];
  
  // Match markdown headings (# Title) and JSX headings (<h2 id="...">Title</h2>)
  const markdownHeadingRegex = /^(#{1,6})\s+(.+)$/gm;
  const jsxHeadingRegex = /<h([1-6])[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h\1>/g;
  
  // Extract markdown headings
  let match;
  while ((match = markdownHeadingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    
    if (level <= config.maxDepth) {
      const id = generateHeadingId(text);
      headings.push({ id, text, level });
    }
  }
  
  // Extract JSX headings
  while ((match = jsxHeadingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, '').trim();
    
    if (level <= config.maxDepth) {
      headings.push({ id, text, level });
    }
  }
  
  // Only return if we have enough headings
  return headings.length >= config.minHeadings ? headings : null;
}

/**
 * Generate a URL-friendly ID from heading text
 */
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Remove consecutive hyphens
    .trim();
}

/**
 * Get table of contents for a blog post by slug
 */
export async function getTocForPost(slug: string): Promise<TocHeading[] | null> {
  const config = getPluginConfig<TocConfig>('toc');
  
  if (!config) {
    return null;
  }

  try {
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    return extractHeadings(content);
  } catch (error) {
    console.error(`Failed to extract TOC for ${slug}:`, error);
    return null;
  }
}
