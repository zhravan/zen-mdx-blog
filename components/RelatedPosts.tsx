import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface RelatedPostsProps {
  posts: BlogPost[];
  showDate?: boolean;
  showDescription?: boolean;
}

export function RelatedPosts({ 
  posts, 
  showDate = true,
  showDescription = false 
}: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
      aria-labelledby="related-posts-heading"
    >
      <h2
        id="related-posts-heading"
        className="text-[10px] font-medium mb-4 opacity-40 uppercase tracking-wider"
      >
        Related Posts
      </h2>
      <nav aria-label="Related posts">
        <ul className="space-y-2" role="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-1.5 hover:opacity-100 opacity-60 transition-opacity text-xs"
                aria-label={showDate && post.date
                  ? `${post.title}, published ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`
                  : post.title
                }
              >
                <span className="block">{post.title}</span>
                {showDate && post.date && (
                  <time
                    className="text-[10px] opacity-50 block mt-0.5"
                    dateTime={post.date}
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
