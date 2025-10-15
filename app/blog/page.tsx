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
        <h1 className="text-sm mb-4">Writing</h1>
        <p className="text-xs mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
          Thoughts on technology, development, and building products.
        </p>
      </section>

      <section>
        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="space-y-1 group"
              style={{
                animation: 'fade-up 0.5s ease-out',
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-xs mb-1 transition-colors">
                  {post.title}
                </h2>
                <p className="text-xs mb-1" style={{ color: 'var(--color-muted-foreground)', opacity: 0.7 }}>
                  {post.date}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
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

