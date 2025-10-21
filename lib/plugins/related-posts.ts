import { getAllPosts, BlogPost } from '../blog';
import { getPluginConfig } from './registry';

export interface RelatedPostsConfig {
  enabled: boolean;
  count: number;
  algorithm: 'tags' | 'similarity' | 'recent';
  showDate: boolean;
  showDescription: boolean;
}

/**
 * Find related posts based on the configured algorithm
 */
export function findRelatedPosts(currentSlug: string): BlogPost[] | null {
  const config = getPluginConfig<RelatedPostsConfig>('related-posts');
  
  if (!config) {
    return null;
  }

  const allPosts = getAllPosts();
  const currentPost = allPosts.find(p => p.slug === currentSlug);
  
  if (!currentPost) {
    return null;
  }

  // Filter out current post
  const otherPosts = allPosts.filter(p => p.slug !== currentSlug);
  
  if (otherPosts.length === 0) {
    return null;
  }

  let relatedPosts: BlogPost[] = [];

  switch (config.algorithm) {
    case 'tags':
      relatedPosts = findRelatedByTags(currentPost, otherPosts);
      break;
    case 'similarity':
      relatedPosts = findRelatedBySimilarity(currentPost, otherPosts);
      break;
    case 'recent':
      relatedPosts = findRelatedByRecent(otherPosts);
      break;
  }

  return relatedPosts.slice(0, config.count);
}

/**
 * Find related posts by tag similarity (future: add tags to frontmatter)
 */
function findRelatedByTags(currentPost: BlogPost, otherPosts: BlogPost[]): BlogPost[] {
  // For now, fallback to similarity since tags aren't in the schema yet
  // TODO: Add tags to BlogPost interface and frontmatter parsing
  return findRelatedBySimilarity(currentPost, otherPosts);
}

/**
 * Find related posts by title/description similarity
 */
function findRelatedBySimilarity(currentPost: BlogPost, otherPosts: BlogPost[]): BlogPost[] {
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Calculate word overlap in titles
    const currentTitleWords = new Set(
      currentPost.title.toLowerCase().split(/\s+/).filter(w => w.length > 3)
    );
    const postTitleWords = post.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    
    postTitleWords.forEach(word => {
      if (currentTitleWords.has(word)) {
        score += 2;
      }
    });
    
    // Calculate word overlap in descriptions
    if (currentPost.description && post.description) {
      const currentDescWords = new Set(
        currentPost.description.toLowerCase().split(/\s+/).filter(w => w.length > 4)
      );
      const postDescWords = post.description.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      
      postDescWords.forEach(word => {
        if (currentDescWords.has(word)) {
          score += 1;
        }
      });
    }
    
    return { post, score };
  });

  // Sort by score (descending), then by date (newest first)
  return scoredPosts
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .filter(({ score }) => score > 0) // Only include posts with some similarity
    .map(({ post }) => post);
}

/**
 * Find related posts by most recent
 */
function findRelatedByRecent(otherPosts: BlogPost[]): BlogPost[] {
  // Posts are already sorted by date in getAllPosts
  return otherPosts;
}
