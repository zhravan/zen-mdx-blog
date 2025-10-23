import { getAllPosts, type BlogPost } from '@/lib/blog';
import { filterDrafts } from '@/lib/plugins/drafts';
import Link from 'next/link';

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on technology, development, and building products.'
};

export default function Blog() {
  const allPosts = getAllPosts();
  const posts = filterDrafts(allPosts);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-8">Blog</h1>
      
      <div className="font-mono space-y-2">
        {posts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((post) => (
            <div key={post.slug} className="group flex items-baseline gap-2">
              <span className="text-xs text-muted-foreground select-none">•</span>
              <time
                dateTime={post.date}
                className="text-sm text-muted-foreground whitespace-nowrap"
              >
                {formatDate(post.date)}
              </time>
              <span className="text-muted-foreground">:</span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm relative hover:text-foreground/80 transition-colors"
              >
                <span>{post.title}</span>
                {post.description && (
                  <span className="absolute left-0 -bottom-8 hidden group-hover:block bg-background border border-border px-3 py-1 rounded text-xs text-muted-foreground whitespace-normal max-w-[24rem] z-10">
                    {post.description}
                  </span>
                )}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
