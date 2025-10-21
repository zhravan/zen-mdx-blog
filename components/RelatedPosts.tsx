import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface RelatedPostsProps {
  posts: BlogPost[];
  showDate?: boolean;
  showDescription?: boolean;
}

export function RelatedPosts({ 
  posts, 
  showDate = true,
  showDescription = true 
}: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t">
      <h2 className="text-sm font-medium mb-6 opacity-90">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-4 rounded-lg border hover:border-current transition-colors"
          >
            <div className="space-y-2">
              <h3 className="font-medium text-xxs group-hover:opacity-100 opacity-90 transition-opacity">
                {post.title}
              </h3>
              {showDate && post.date && (
                <p className="text-xxs opacity-60">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              )}
              {showDescription && post.description && (
                <p className="text-xxs opacity-70 line-clamp-2">
                  {post.description}
                </p>
              )}
              <div className="flex items-center gap-1 text-xxs opacity-60 group-hover:opacity-100 transition-opacity">
                <span>Read more</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
