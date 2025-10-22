'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { searchPosts, type SearchResult } from '@/lib/plugins/search';

interface SearchProps {
  onClose?: () => void;
}

export function Search({ onClose }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const searchResults = await searchPosts(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(performSearch, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = (slug: string) => {
    router.push(`/blog/${slug}`);
    onClose?.();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2"
        style={{
          backgroundColor: 'var(--color-background)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text)',
        }}
        autoFocus
      />

      {isSearching && (
        <div className="mt-4 text-sm opacity-40">Searching...</div>
      )}

      {!isSearching && results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map((result) => (
            <button
              key={result.slug}
              onClick={() => handleResultClick(result.slug)}
              className="w-full text-left p-4 rounded-lg border hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              style={{
                backgroundColor: 'var(--color-muted)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="font-medium mb-1">{result.title}</div>
              <div className="text-sm opacity-60 mb-2">{result.description}</div>
              <div className="flex items-center gap-2 text-xs opacity-40">
                <span>{result.date}</span>
                {result.tags && result.tags.length > 0 && (
                  <>
                    <span>·</span>
                    <span>{result.tags.join(', ')}</span>
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {!isSearching && query.trim() && results.length === 0 && (
        <div className="mt-4 text-sm opacity-40">No results found for "{query}"</div>
      )}
    </div>
  );
}
