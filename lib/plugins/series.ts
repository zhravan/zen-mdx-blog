import { getPluginConfig } from './registry';
import { getAllPosts } from '@/lib/blog';

export interface SeriesConfig {
  enabled: boolean;
  showProgress: boolean;
  autoGenerateIndex: boolean;
}

export interface SeriesPost {
  slug: string;
  title: string;
  order: number;
}

export interface SeriesInfo {
  name: string;
  description?: string;
  posts: SeriesPost[];
  currentIndex: number;
  totalParts: number;
}

/**
 * Extract series information from post frontmatter
 * Expected frontmatter format:
 * series: "Building a Blog"
 * seriesOrder: 1
 */
export function getSeriesForPost(slug: string): SeriesInfo | null {
  const config = getPluginConfig<SeriesConfig>('series');
  
  if (!config) {
    return null;
  }

  const allPosts = getAllPosts();
  const currentPost = allPosts.find(p => p.slug === slug);
  
  if (!currentPost?.series) {
    return null;
  }

  const seriesName = currentPost.series;
  const currentOrder = currentPost.seriesPart ?? 1;
  
  // Find all posts in the same series
  const seriesPosts = allPosts
    .filter(p => p.series === seriesName)
    .map(p => ({
      slug: p.slug,
      title: p.title,
      order: p.seriesPart ?? 1,
    }))
    .sort((a, b) => a.order - b.order);

  const currentIndex = seriesPosts.findIndex(p => p.slug === slug);

  return {
    name: seriesName,
    description: undefined, // Can be added to BlogPost interface if needed
    posts: seriesPosts,
    currentIndex,
    totalParts: seriesPosts.length,
  };
}

/**
 * Get previous and next posts in series
 */
export function getSeriesNavigation(slug: string): {
  previous: SeriesPost | null;
  next: SeriesPost | null;
} | null {
  const series = getSeriesForPost(slug);
  
  if (!series) {
    return null;
  }

  const { posts, currentIndex } = series;

  return {
    previous: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}

/**
 * Check if a post is part of a series
 */
export function isPartOfSeries(slug: string): boolean {
  const allPosts = getAllPosts();
  const post = allPosts.find(p => p.slug === slug);
  return !!post?.series;
}
