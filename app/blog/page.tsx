import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on technology, development, and building products.'
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="space-y-6">
      <section className="animate-fade-in">
        <h1 className="text-sm mb-4">Writing</h1>
        <p className="text-xs mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
          Thoughts on technology, development, and building products.
        </p>
      </section>

      <section>
        <div className="space-y-3">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-baseline gap-3 transition-opacity hover:opacity-80"
                title={post.description}
              >
                <h2
                  className="text-xs flex-1"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {post.title}
                </h2>
                <time
                  className="text-xs opacity-70 whitespace-nowrap"
                  style={{ color: 'var(--color-muted-foreground)' }}
                  dateTime={post.date}
                >
                  {post.date}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
