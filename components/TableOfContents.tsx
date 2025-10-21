'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocHeading[];
  position?: 'left' | 'right' | 'inline';
  sticky?: boolean;
}

export function TableOfContents({ 
  headings, 
  position = 'right',
  sticky = true 
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn(
        'space-y-2 text-xxs',
        sticky && 'sticky top-24',
        position === 'inline' && 'mb-8 p-4 border rounded-lg',
        position !== 'inline' && 'max-h-[calc(100vh-8rem)] overflow-y-auto'
      )}
      aria-label="Table of contents"
    >
      <p className="font-medium mb-3 opacity-70">On this page</p>
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            style={{ paddingLeft: `${(level - 1) * 0.75}rem` }}
          >
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={cn(
                'block py-1 transition-colors hover:opacity-100 border-l-2 pl-3',
                activeId === id
                  ? 'opacity-100 border-current font-medium'
                  : 'opacity-60 border-transparent'
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
