'use client';

import { useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';

interface SearchItem {
  title: string;
  path: string;
  type: 'page' | 'post';
  description?: string;
}

interface CommandPaletteProps {
  posts: Array<{
    slug: string;
    title: string;
    date: string;
    description: string;
  }>;
  fuzzyThreshold?: number;
  showPages?: boolean;
  showPosts?: boolean;
}

export interface CommandPaletteHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const CommandPalette = forwardRef<CommandPaletteHandle, CommandPaletteProps>(({ 
  posts, 
  fuzzyThreshold = 0.3,
  showPages = true,
  showPosts = true 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => {
      setIsOpen(false);
      setQuery('');
      setSelectedIndex(0);
    },
    toggle: () => setIsOpen(prev => !prev)
  }));

  const items: SearchItem[] = [
    ...(showPages ? [
      { title: 'Home', path: '/', type: 'page' as const },
      { title: 'Blog', path: '/blog', type: 'page' as const },
      { title: 'Work', path: '/work', type: 'page' as const },
      { title: 'About', path: '/about', type: 'page' as const },
    ] : []),
    ...(showPosts ? posts.map(post => ({
      title: post.title,
      path: `/blog/${post.slug}`,
      type: 'post' as const,
      description: post.description
    })) : [])
  ];

  const fuse = new Fuse(items, {
    keys: ['title', 'description'],
    threshold: fuzzyThreshold,
    includeScore: true
  });

  const results = query
    ? fuse.search(query).map(result => result.item)
    : items;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(prev => !prev);
      setQuery('');
      setSelectedIndex(0);
    }

    if (!isOpen) return;

    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      setSelectedIndex(0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      router.push(results[selectedIndex].path);
      setIsOpen(false);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen, results, selectedIndex, router]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => {
          setIsOpen(false);
          setQuery('');
          setSelectedIndex(0);
        }}
      />
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
        <div
          className="w-full max-w-lg mx-4"
          style={{
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages and posts..."
              className="w-full bg-transparent outline-none text-sm"
              style={{ color: 'var(--color-foreground)' }}
              autoFocus
            />
          </div>
          <div className="max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-4 text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                No results found
              </div>
            ) : (
              results.map((item, index) => (
                <button
                  key={item.path}
                  onClick={() => {
                    router.push(item.path);
                    setIsOpen(false);
                    setQuery('');
                    setSelectedIndex(0);
                  }}
                  className="w-full text-left p-4 text-xs transition-opacity"
                  style={{
                    backgroundColor: index === selectedIndex ? 'var(--color-muted)' : 'transparent',
                    color: 'var(--color-foreground)',
                    borderBottom: index < results.length - 1 ? '1px solid var(--color-border)' : 'none'
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{item.title}</span>
                    <span
                      className="text-xs opacity-70"
                      style={{ color: 'var(--color-muted-foreground)' }}
                    >
                      {item.type === 'page' ? 'Page' : 'Post'}
                    </span>
                  </div>

                </button>
              ))
            )}
          </div>
          <div
            className="p-2 text-xs flex items-center justify-between border-t"
            style={{
              color: 'var(--color-muted-foreground)',
              borderColor: 'var(--color-border)'
            }}
          >
            <div className="flex items-center gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

CommandPalette.displayName = 'CommandPalette';
