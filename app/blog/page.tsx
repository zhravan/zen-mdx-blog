import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on technology, development, and building products.'
};

export default function Blog() {
  const posts = getAllPosts();
  const total = posts.length;

  const getSuffix = (n: number) => {
    const j = n % 10, k = n % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  };

  const formatDateNoYear = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const day = d.getDate();
    const month = d.toLocaleString(undefined, { month: 'long' });
    return `${month} ${day}${getSuffix(day)}`;
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
    <div className="space-y-4 text-xxs">
      <section>
        <h1 className="text-sm mb-3">Blog</h1>
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          Posts about tiny projects and various other things.
        </p>
      </section>

      {(() => {
        return (
          <div className="space-y-6">
            {yearKeys.map((year) => {
              const items = byYear[year];
              return (
                <section key={year} className="space-y-2">
                  <h2 className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                    {year}
                  </h2>
                  <ul className="list-none p-0 m-0 space-y-[6px]">
                    {items.map((post) => (
                      <li key={post.slug} className="relative pl-4 leading-6">
                        {/* tiny custom bullet */}
                        <span
                          aria-hidden
                          className="absolute left-0 top-[0.6em] w-[3px] h-[3px] rounded-full"
                          style={{ backgroundColor: 'var(--color-muted-foreground)' }}
                        />
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                          <div className="flex items-baseline gap-2 flex-1">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="hover:opacity-90 focus:opacity-90"
                              title={post.description}
                            >
                              {post.title}
                            </Link>
                            <span className="hidden sm:inline" aria-hidden />
                            <time
                              className="whitespace-nowrap"
                              style={{ color: 'var(--color-muted-foreground)' }}
                              dateTime={post.date}
                            >
                              {formatDateNoYear(post.date)}
                            </time>
                          </div>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-1.5 mt-1 sm:mt-0 flex-wrap">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-1.5 py-0.5 rounded border opacity-60"
                                  style={{ borderColor: 'var(--color-muted-foreground)' }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}
