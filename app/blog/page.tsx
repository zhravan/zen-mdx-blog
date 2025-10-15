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
        <p className="text-muted-foreground text-xs mb-6">
          Thoughts on technology, development, and building products.
        </p>
      </section>

      <section>
        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="space-y-1 animate-fade-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xs mb-1 group-hover:text-link transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground/70 text-xs mb-1">
                  {post.date}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
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

