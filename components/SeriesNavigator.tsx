import Link from 'next/link';
import type { SeriesInfo } from '@/lib/plugins/series';

interface SeriesNavigatorProps {
  series: SeriesInfo;
}

export function SeriesNavigator({ series }: SeriesNavigatorProps) {
  const { name, description, posts, currentIndex, totalParts } = series;

  return (
    <div
      className="my-8 p-6 rounded-lg border"
      style={{
        backgroundColor: 'var(--color-muted)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs opacity-40 uppercase tracking-wider font-medium">
            Series
          </span>
          <span className="text-xs opacity-40">
            Part {currentIndex + 1} of {totalParts}
          </span>
        </div>
        <h3 className="text-base font-medium mb-2">{name}</h3>
        {description && (
          <p className="text-sm opacity-60 mb-3">{description}</p>
        )}
      </div>

      <div className="space-y-1">
        {posts.map((post, index) => {
          const isCurrent = index === currentIndex;
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`
                block px-3 py-2 rounded text-sm transition-colors
                ${isCurrent 
                  ? 'bg-gray-200 dark:bg-gray-800 font-medium' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 opacity-60 hover:opacity-100'
                }
              `}
            >
              <span className="text-xs opacity-40 mr-2">{index + 1}.</span>
              {post.title}
              {isCurrent && (
                <span className="ml-2 text-xs opacity-40">(current)</span>
              )}
            </Link>
          );
        })}
      </div>

      {(posts[currentIndex - 1] || posts[currentIndex + 1]) && (
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          {posts[currentIndex - 1] && (
            <Link
              href={`/blog/${posts[currentIndex - 1].slug}`}
              className="text-xs hover:opacity-70 transition-opacity"
            >
              <div className="opacity-40 mb-1">← Previous</div>
              <div className="font-medium">{posts[currentIndex - 1].title}</div>
            </Link>
          )}
          {posts[currentIndex + 1] && (
            <Link
              href={`/blog/${posts[currentIndex + 1].slug}`}
              className="text-xs text-right hover:opacity-70 transition-opacity"
            >
              <div className="opacity-40 mb-1">Next →</div>
              <div className="font-medium">{posts[currentIndex + 1].title}</div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
