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
      <section style={{ animation: 'fade-in 0.4s ease-out' }}>
        <h1 className="text-sm mb-4 font-normal">Writing</h1>
        <p
          className="text-xs mb-6"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Thoughts on technology, development, and building products.
        </p>
      </section>

      <section>
        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="space-y-1"
              style={{
                animation: 'fade-up 0.5s ease-out',
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xs mb-1 font-normal transition-colors group-hover:opacity-80">
                  {post.title}
                </h2>
                <p
                  className="text-xs mb-1 opacity-70"
                  style={{ color: 'var(--color-muted-foreground)' }}
                >
                  {post.date}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--color-muted-foreground)' }}
                >
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
