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
    <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-[10px] font-medium mb-4 opacity-40 uppercase tracking-wider">
        Related
      </h2>
      <div className="space-y-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-1.5 hover:opacity-100 opacity-60 transition-opacity text-xs"
          >
            <span className="block">{post.title}</span>
            {showDate && post.date && (
              <span className="text-[10px] opacity-50 block mt-0.5">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
