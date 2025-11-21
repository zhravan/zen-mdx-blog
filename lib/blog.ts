import { getContentTypeById } from './content-types';
import { getContentForType, getContentBySlug as getGenericContentBySlug, ContentItem } from './content';

// BlogPost is now an alias for ContentItem for backward compatibility
export type BlogPost = ContentItem;

/**
 * Get all blog posts
 * @deprecated Use getContentForType with blog content type instead
 */
export function getAllPosts(includeDrafts = false): BlogPost[] {
  const blogContentType = getContentTypeById('blog');
  if (!blogContentType) {
    return [];
  }
  return getContentForType(blogContentType, includeDrafts);
}

/**
 * Get a blog post by slug
 * @deprecated Use getContentBySlug with blog content type instead
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const blogContentType = getContentTypeById('blog');
  if (!blogContentType) {
    return undefined;
  }
  return getGenericContentBySlug(blogContentType, slug);
}
