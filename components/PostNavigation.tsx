import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface PostNavigationProps {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-1">
          {previous && (
            <Link
              href={`/blog/${previous.slug}`}
              className="group block hover:opacity-100 opacity-60 transition-opacity"
            >
              <div className="text-[10px] font-medium mb-2 opacity-40 uppercase tracking-wider">
                Previous
              </div>
              <div className="text-xs">{previous.title}</div>
            </Link>
          )}
        </div>
        <div className="col-span-1 text-right">
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group block hover:opacity-100 opacity-60 transition-opacity"
            >
              <div className="text-[10px] font-medium mb-2 opacity-40 uppercase tracking-wider">
                Next
              </div>
              <div className="text-xs">{next.title}</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
