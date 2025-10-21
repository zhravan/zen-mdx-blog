import React from 'react';
import { generateHeadingId } from '@/lib/plugins/toc';

/**
 * Extract text content from React children
 */
function getTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(getTextContent).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return getTextContent((children as any).props.children);
  }
  return '';
}

export function H1({ children }: { children: React.ReactNode }) {
  const text = getTextContent(children);
  const id = generateHeadingId(text);
  
  return (
    <h1
      id={id}
      style={{
        fontSize: '0.9375rem',
        lineHeight: '1.6',
        fontWeight: 400,
        marginBottom: '1rem',
        marginTop: '0',
        color: 'var(--color-foreground)'
      }}
    >
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  const text = getTextContent(children);
  const id = generateHeadingId(text);
  
  return (
    <h2
      id={id}
      style={{
        fontSize: '0.8125rem',
        lineHeight: '1.5',
        fontWeight: 400,
        marginBottom: '0.75rem',
        marginTop: '2rem',
        color: 'var(--color-foreground)'
      }}
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  const text = getTextContent(children);
  const id = generateHeadingId(text);
  
  return (
    <h3
      id={id}
      style={{
        fontSize: '0.6875rem',
        lineHeight: '1.4',
        fontWeight: 400,
        marginBottom: '0.75rem',
        marginTop: '1.5rem',
        color: 'var(--color-foreground)'
      }}
    >
      {children}
    </h3>
  );
}

export function H4({ children }: { children: React.ReactNode }) {
  const text = getTextContent(children);
  const id = generateHeadingId(text);
  
  return (
    <h4
      id={id}
      style={{
        fontSize: '0.625rem',
        lineHeight: '1.4',
        fontWeight: 400,
        marginBottom: '0.5rem',
        marginTop: '1.25rem',
        color: 'var(--color-foreground)'
      }}
    >
      {children}
    </h4>
  );
}

export function H5({ children }: { children: React.ReactNode }) {
  const text = getTextContent(children);
  const id = generateHeadingId(text);
  
  return (
    <h5
      id={id}
      style={{
        fontSize: '0.5625rem',
        lineHeight: '1.4',
        fontWeight: 400,
        marginBottom: '0.5rem',
        marginTop: '1rem',
        color: 'var(--color-foreground)'
      }}
    >
      {children}
    </h5>
  );
}

export function H6({ children }: { children: React.ReactNode }) {
  const text = getTextContent(children);
  const id = generateHeadingId(text);
  
  return (
    <h6
      id={id}
      style={{
        fontSize: '0.5625rem',
        lineHeight: '1.4',
        fontWeight: 400,
        marginBottom: '0.5rem',
        marginTop: '1rem',
        color: 'var(--color-foreground)'
      }}
    >
      {children}
    </h6>
  );
}
