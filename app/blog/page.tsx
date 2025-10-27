import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { filterDrafts } from '@/lib/plugins/drafts';

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on technology, development, and building products.'
};

export default function Blog() {
  const allPosts = getAllPosts();
  const posts = filterDrafts(allPosts);

  const formatDate = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    return `${month} ${day}`;
  };

  // Group posts by year (descending)
  const byYear = posts.reduce<Record<string, typeof posts>>((acc, p) => {
    const y = (new Date(p.date)).getFullYear();
    const key = isNaN(y) ? 'Unknown' : String(y);
    (acc[key] ||= []).push(p);
    return acc;
  }, {});
  const yearKeys = Object.keys(byYear)
    .sort((a, b) => (b === 'Unknown' ? -1 : a === 'Unknown' ? 1 : Number(b) - Number(a)));

  return (
    <div className="space-y-4 text-xs">
      <section>
        <h1 className="text-sm mb-2">Blog</h1>
        <p className="text-xs opacity-60">
          Posts about tiny projects and various other things.
        </p>
      </section>

      <div className="space-y-5">
        {yearKeys.map((year) => {
          const items = byYear[year];
          return (
            <section key={year} className="space-y-1.5">
              <h2 className="text-xs opacity-50 mb-2">{year}</h2>
              <ul className="list-none p-0 m-0 space-y-1.5">
                {items.map((post) => (
                  <li key={post.slug} className="flex items-baseline gap-2 text-xs leading-relaxed">
                    <span className="opacity-30">·</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:opacity-70 transition-opacity"
                    >
                      {post.title}
                    </Link>
                    <time className="opacity-50 text-[11px]" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                      <span className="opacity-40 text-[10px] ml-auto">
                        {post.tags.slice(0, 3).join(', ')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}