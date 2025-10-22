import { getPluginConfig } from './registry';
import { getAllPosts, type BlogPost } from '@/lib/blog';
import { getTocForPost } from './toc';

export interface SearchConfig {
  enabled: boolean;
  provider: 'local' | 'algolia';
  fuzzyThreshold: number;
  searchFields: string[];
}

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  score: number;
}

/**
 * Build search index from all posts
 */
export async function buildSearchIndex(): Promise<SearchResult[]> {
  const config = getPluginConfig<SearchConfig>('search');
  
  if (!config) {
    return [];
  }

  const posts = getAllPosts();
  const searchResults: SearchResult[] = [];

  for (const post of posts) {
    const result: SearchResult = {
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags,
      score: 0,
    };

    // Add headings to search if configured
    if (config.searchFields.includes('headings')) {
      const headings = await getTocForPost(post.slug);
      if (headings && headings.length > 0) {
        result.excerpt = headings.map(h => h.text).join(' ');
      }
    }

    searchResults.push(result);
  }

  return searchResults;
}

/**
 * Simple fuzzy search implementation
 */
export function fuzzySearch(query: string, text: string, threshold: number = 0.3): number {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();

  // Exact match gets highest score
  if (textLower.includes(queryLower)) {
    return 1.0;
  }

  // Calculate simple fuzzy match score
  let matches = 0;
  let lastIndex = -1;

  for (const char of queryLower) {
    const index = textLower.indexOf(char, lastIndex + 1);
    if (index > lastIndex) {
      matches++;
      lastIndex = index;
    }
  }

  const score = matches / queryLower.length;
  return score >= threshold ? score : 0;
}

/**
 * Search posts with query
 */
export async function searchPosts(query: string): Promise<SearchResult[]> {
  const config = getPluginConfig<SearchConfig>('search');
  
  if (!config || !query.trim()) {
    return [];
  }

  const index = await buildSearchIndex();
  const results: SearchResult[] = [];

  for (const item of index) {
    let maxScore = 0;

    // Search in configured fields
    if (config.searchFields.includes('title')) {
      const score = fuzzySearch(query, item.title, config.fuzzyThreshold);
      maxScore = Math.max(maxScore, score * 1.5); // Title matches get higher weight
    }

    if (config.searchFields.includes('description')) {
      const score = fuzzySearch(query, item.description, config.fuzzyThreshold);
      maxScore = Math.max(maxScore, score);
    }

    if (config.searchFields.includes('tags') && item.tags) {
      const tagsText = item.tags.join(' ');
      const score = fuzzySearch(query, tagsText, config.fuzzyThreshold);
      maxScore = Math.max(maxScore, score * 1.2); // Tags get moderate weight
    }

    if (config.searchFields.includes('headings') && item.excerpt) {
      const score = fuzzySearch(query, item.excerpt, config.fuzzyThreshold);
      maxScore = Math.max(maxScore, score * 0.8); // Headings get lower weight
    }

    if (maxScore > 0) {
      results.push({ ...item, score: maxScore });
    }
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Check if search is enabled
 */
export function isSearchEnabled(): boolean {
  const config = getPluginConfig<SearchConfig>('search');
  return config?.enabled ?? false;
}
