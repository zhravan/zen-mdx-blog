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

    // Only observe h2-h6 headings
    const filteredHeadings = headings.filter(heading => heading.level > 1);
    filteredHeadings.forEach(({ id }) => {
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
      // Calculate offset for sticky header (adjust as needed)
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash
      window.history.pushState(null, '', `#${id}`);
    }
  };

  // Filter out h1 headings (level 1)
  const filteredHeadings = headings.filter(heading => heading.level > 1);

  if (filteredHeadings.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn(
        'text-[10px]',
        sticky && 'sticky top-24',
        position === 'inline' && 'mb-8 pb-6 border-b border-gray-200 dark:border-gray-800',
        position !== 'inline' && 'max-h-[calc(100vh-8rem)] overflow-y-auto'
      )}
      aria-label="Table of contents"
    >
      <p className="text-[10px] font-medium opacity-40 mb-3 uppercase tracking-wider">
        Contents
      </p>
      
      <div className="space-y-0 border-l border-gray-200 dark:border-gray-800">
        {filteredHeadings.map(({ id, text, level }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={cn(
              'block py-1.5 -ml-px border-l transition-all duration-150',
              'hover:border-gray-400 dark:hover:border-gray-600',
              'overflow-hidden',
              level === 2 && 'pl-1.5',
              level === 3 && 'pl-3',
              level > 3 && 'pl-4.5',
              activeId === id
                ? 'border-gray-900 dark:border-gray-100 opacity-100 font-medium'
                : 'border-transparent opacity-40 hover:opacity-70'
            )}
            title={text}
          >
            <span className="block truncate">{text}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
