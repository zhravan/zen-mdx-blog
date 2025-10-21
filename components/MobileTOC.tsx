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

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
      setIsOpen(false);
    }
  };

  return (
    <details 
      className="lg:hidden mb-6 p-4 border rounded-lg text-xxs"
      style={{ 
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-muted)'
      }}
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary 
        className="font-medium cursor-pointer select-none list-none flex items-center justify-between"
        style={{ color: 'var(--color-foreground)' }}
      >
        <span>Table of Contents</span>
        <svg
          className={cn('transition-transform', isOpen && 'rotate-180')}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <ul className="space-y-2 mt-3">
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            style={{ paddingLeft: `${(level - 1) * 0.75}rem` }}
          >
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className="block py-1 transition-colors hover:opacity-100 opacity-70"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
