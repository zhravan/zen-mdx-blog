import { getAllPosts, BlogPost } from '../blog';

export interface PostNavigation {
  previous: BlogPost | null;
  next: BlogPost | null;
}

/**
 * Get previous and next posts based on chronological order
 */
export function getPostNavigation(currentSlug: string): PostNavigation {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  // Posts are sorted by date (newest first), so:
  // - previous = older post (index + 1)
  // - next = newer post (index - 1)
  
  return {
    previous: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null
  };
}
