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
  return (
    <pre
      style={{
        backgroundColor: 'var(--color-muted)',
        padding: '1rem',
        borderRadius: '0.5rem',
        overflowX: 'auto',
        margin: '1rem 0'
      }}
    >
      {children}
    </pre>
  );
}

