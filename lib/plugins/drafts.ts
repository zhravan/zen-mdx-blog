import { getPluginConfig } from './registry';
import { getAllPosts, type BlogPost } from '@/lib/blog';

export interface DraftsConfig {
  enabled: boolean;
  showInList: boolean;
  previewToken: string;
}

/**
 * Check if a post is a draft
 */
export function isDraft(post: BlogPost): boolean {
  return post.draft === true;
}

/**
 * Filter out drafts from post list
 */
export function filterDrafts(posts: BlogPost[]): BlogPost[] {
  const config = getPluginConfig<DraftsConfig>('drafts');
  
  // In development, show drafts if showInList is true
  if (process.env.NODE_ENV === 'development' && config?.showInList) {
    return posts;
  }
  
  // In production, always filter out drafts
  return posts.filter(post => !isDraft(post));
}

/**
 * Check if draft preview is allowed with token
 */
export function canPreviewDraft(token?: string): boolean {
  const config = getPluginConfig<DraftsConfig>('drafts');
  
  if (!config?.enabled) {
    return false;
  }
  
  // In development, always allow preview
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // In production, check token
  if (!config.previewToken) {
    return false;
  }
  
  return token === config.previewToken;
}

/**
 * Get all posts including drafts if allowed
 */
export function getAllPostsWithDrafts(includesDrafts: boolean = false): BlogPost[] {
  const allPosts = getAllPosts();
  
  if (includesDrafts) {
    return allPosts;
  }
  
  return filterDrafts(allPosts);
}
