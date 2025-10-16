import React from 'react';
import { ClientHighlighter } from './ClientHighlighter';
import { CopyButton } from './CopyButton';

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

export function Pre({ children }: { children: React.ReactNode }) {
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

  return (
    <div className="relative group" style={{ margin: '1rem 0' }}>
      <div
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ zIndex: 1 }}
      >
        <CopyButton text={codeText} />
      </div>
      {/* Fallback pre while client highlighter loads or when language unknown */}
      <pre
        style={{
          backgroundColor: 'var(--color-muted)',
          padding: '1rem',
          borderRadius: '0.5rem',
          overflowX: 'auto'
        }}
      >
        {children}
      </pre>
      {/* Client-side highlight overlay replaces the above visually via absolute flow */}
      <ClientHighlighter code={codeText} lang={lang} />
    </div>
  );
}
