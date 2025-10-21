import { getPluginConfig } from './registry';

export interface ReadingTimeConfig {
  enabled: boolean;
  wordsPerMinute: number;
  showWordCount: boolean;
  showIcon: boolean;
}

export interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string;
}

/**
 * Calculate reading time and word count for content
 */
export function calculateReadingTime(content: string): ReadingTimeResult | null {
  const config = getPluginConfig<ReadingTimeConfig>('reading-time');
  
  if (!config) {
    return null;
  }

  // Remove MDX/JSX syntax, code blocks, and frontmatter
  const cleanContent = content
    .replace(/export const frontmatter = \{[\s\S]*?\};/, '') // Remove frontmatter
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/<[^>]+>/g, '') // Remove HTML/JSX tags
    .replace(/[{}<>]/g, '') // Remove remaining brackets
    .replace(/\n+/g, ' ') // Normalize whitespace
    .trim();

  // Count words (split by whitespace and filter empty strings)
  const words = cleanContent.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate reading time
  const minutes = Math.ceil(words / config.wordsPerMinute);
  
  // Generate readable text
  const minuteText = minutes === 1 ? '1 min' : `${minutes} min`;
  const wordText = config.showWordCount ? ` · ${words.toLocaleString()} words` : '';
  
  return {
    minutes,
    words,
    text: `${minuteText}${wordText}`
  };
}

/**
 * Get reading time for a blog post by slug
 */
export async function getReadingTimeForPost(slug: string): Promise<ReadingTimeResult | null> {
  const config = getPluginConfig<ReadingTimeConfig>('reading-time');
  
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
    return calculateReadingTime(content);
  } catch (error) {
    console.error(`Failed to calculate reading time for ${slug}:`, error);
    return null;
  }
}
