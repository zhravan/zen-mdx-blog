import { getPluginConfig } from './registry';

export interface ViewCounterConfig {
  enabled: boolean;
  provider: 'local' | 'api';
  showCount: boolean;
}

const VIEW_COUNT_KEY = 'blog_view_counts';

/**
 * Get view counts from localStorage (client-side only)
 */
export function getViewCounts(): Record<string, number> {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const stored = localStorage.getItem(VIEW_COUNT_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Get view count for a specific post
 */
export function getViewCount(slug: string): number {
  const counts = getViewCounts();
  return counts[slug] || 0;
}

/**
 * Increment view count for a post
 */
export function incrementViewCount(slug: string): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const counts = getViewCounts();
  const newCount = (counts[slug] || 0) + 1;
  counts[slug] = newCount;

  try {
    localStorage.setItem(VIEW_COUNT_KEY, JSON.stringify(counts));
  } catch {
    // Handle localStorage errors silently
  }

  return newCount;
}

/**
 * Check if view counter should be shown
 */
export function shouldShowViewCount(): boolean {
  const config = getPluginConfig<ViewCounterConfig>('view-counter');
  return config?.showCount ?? false;
}

/**
 * Format view count for display
 */
export function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
