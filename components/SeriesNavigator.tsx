import Link from 'next/link';
import type { SeriesInfo } from '@/lib/plugins/series';

interface SeriesNavigatorProps {
  series: SeriesInfo;
}

export function SeriesNavigator({ series }: SeriesNavigatorProps) {
  const { name, posts, currentIndex, totalParts } = series;
  const prev = posts[currentIndex - 1];
  const next = posts[currentIndex + 1];

  return (
    <div className="my-6 p-4 border-l-2 border-gray-300 dark:border-gray-700">
      <div className="text-xs opacity-50 mb-2">
        Series: {name} · Part {currentIndex + 1} of {totalParts}
      </div>
      
      <ol className="text-sm space-y-1 mb-3">
        {posts.map((post, index) => {
          const isCurrent = index === currentIndex;
          return (
            <li key={post.slug}>
              {isCurrent ? (
                <span className="font-medium">{post.title}</span>
              ) : (
                <Link href={`/blog/${post.slug}`} className="opacity-60 hover:opacity-100">
                  {post.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
