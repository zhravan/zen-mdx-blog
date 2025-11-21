import Link from 'next/link';
import { ContentItem } from '@/lib/content';
import { ContentType } from '@/lib/content-types';
import { PageHeader } from '@/components/PageHeader';

interface ContentListingProps {
  items: ContentItem[];
  contentType: ContentType;
}

export function ContentListing({ items, contentType }: ContentListingProps) {
  const formatDate = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    return `${month} ${day}`;
  };

  // Group items by year (descending)
  const byYear = items.reduce<Record<string, typeof items>>((acc, item) => {
    const y = (new Date(item.date)).getFullYear();
    const key = isNaN(y) ? 'Unknown' : String(y);
    (acc[key] ||= []).push(item);
    return acc;
  }, {});
  
  const yearKeys = Object.keys(byYear)
    .sort((a, b) => (b === 'Unknown' ? -1 : a === 'Unknown' ? 1 : Number(b) - Number(a)));

  const pageMetadata = {
    title: contentType.label,
    description: contentType.description || `${contentType.label} content`
  };

  return (
    <div className="space-y-6 text-xxs">
      <PageHeader metadata={pageMetadata} />

      <div className="space-y-5">
        {yearKeys.map((year) => {
          const yearItems = byYear[year];
          return (
            <section key={year} className="space-y-1.5">
              <h2 className="text-xs opacity-50 mb-2">{year}</h2>
              <ul className="list-none p-0 m-0 space-y-2.5 sm:space-y-1.5">
                {yearItems.map((item) => (
                  <li key={item.slug} className="group">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-xs leading-relaxed">
                      <div className="flex items-baseline gap-2 min-w-0 flex-1">
                        <span className="opacity-30 hidden sm:inline">·</span>
                        <Link
                          href={`${contentType.path}/${item.slug}`}
                          className="hover:opacity-70 transition-opacity truncate"
                        >
                          {item.title}
                        </Link>
                        <time className="opacity-50 text-[11px] shrink-0" dateTime={item.date}>
                          {formatDate(item.date)}
                        </time>
                      </div>
                      {item.tags && item.tags.length > 0 && (
                        <div className="opacity-0 group-hover:opacity-70 text-[10px] transition-all duration-200 flex gap-1 flex-wrap pl-0 sm:pl-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded border"
                              style={{ borderColor: 'var(--color-border)' }}
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
    </div>
  );
}
