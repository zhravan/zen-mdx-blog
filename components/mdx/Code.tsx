import React from 'react';
import { CopyButton } from './CopyButton';
import { getTheme } from '@/lib/themes';
import { ACTIVE_THEME } from '@/lib/site';
// Server-side syntax highlighting to avoid FOUC on refresh
import { codeToHtml } from 'shiki';

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        backgroundColor: 'var(--color-muted)',
        padding: '0.125rem 0.375rem',
        borderRadius: '0.25rem',
        fontSize: '0.75rem',
        fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace"
      }}
    >
      {children}
    </code>
  );
}

export async function Pre({ children }: { children: React.ReactNode }) {
  let lang: string | undefined;
  let codeText = '';

  if (React.isValidElement(children)) {
    const child: any = children;
    const className: string | undefined = child.props?.className;
    const match = className?.match(/language-([\w-]+)/);
    lang = match?.[1];
    const raw = child.props?.children;
    codeText = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw.join('') : '';
  }

  // Resolve the active syntax theme once on the server
  const theme = getTheme(ACTIVE_THEME);
  const syntaxTheme = theme.syntaxTheme;

  // Try server-side highlighting. If it fails or lang is missing, we'll fallback.
  let highlightedHtml: string | null = null;
  if (codeText && lang) {
    try {
      highlightedHtml = await codeToHtml(codeText, {
        lang,
        theme: syntaxTheme,
      } as any);
    } catch {
      highlightedHtml = null;
    }
  }

  return (
    <div className="relative group" style={{ margin: '1rem 0', maxWidth: '100%', overflow: 'hidden' }}>
      <div
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ zIndex: 1 }}
      >
        <CopyButton text={codeText} />
      </div>
      {/* Prefer server-side highlighted HTML to avoid theme flash */}
      {highlightedHtml ? (
        <div
          // Shiki returns a full <pre class="shiki">...</pre> block
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          // Ensure consistent spacing/rounding/scroll
          style={{
            borderRadius: '0.5rem',
            overflowX: 'auto',
            maxWidth: '100%',
          }}
        />
      ) : (
        // Fallback when no language or SSR highlighting failed
        <pre
          style={{
            backgroundColor: 'var(--color-muted)',
            padding: '1rem',
            borderRadius: '0.5rem',
            overflowX: 'auto',
            whiteSpace: 'pre',
            maxWidth: '100%',
          }}
        >
          {children}
        </pre>
      )}
    </div>
  );
}
