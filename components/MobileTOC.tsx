'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface MobileTOCProps {
  headings: TocHeading[];
}

export function MobileTOC({ headings }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Filter out h1 headings (level 1)
  const filteredHeadings = headings.filter(heading => heading.level > 1);

  if (filteredHeadings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for sticky header
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash and close the TOC
      window.history.pushState(null, '', `#${id}`);
      setIsOpen(false);
    }
  };

  return (
    <details 
      className="lg:hidden mb-8 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden text-[10px] bg-gray-50 dark:bg-gray-900/50 [&_*]:list-none"
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary 
        className="cursor-pointer select-none flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
      >
        <span className="text-[10px] font-medium opacity-40 uppercase tracking-wider">
          Contents ({filteredHeadings.length})
        </span>
        <svg
          className={cn('w-3.5 h-3.5 opacity-40 transition-transform duration-200', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      
      <div className="px-4 pb-4 pt-2 bg-white dark:bg-gray-900">
        <div className="space-y-0 border-l border-gray-200 dark:border-gray-800">
          {filteredHeadings.map(({ id, text, level }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={cn(
                'block py-1.5 -ml-px border-l transition-all duration-150',
                'hover:border-gray-400 dark:hover:border-gray-600',
                'opacity-40 hover:opacity-100',
                'overflow-hidden',
                level === 2 && 'pl-1.5',
                level === 3 && 'pl-3',
                level > 3 && 'pl-4.5'
              )}
              title={text}
            >
              <span className="block truncate">{text}</span>
            </a>
          ))}
        </div>
      </div>
    </details>
  );
}
