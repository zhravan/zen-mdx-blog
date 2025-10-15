export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1
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
  return (
    <h2
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
  return (
    <h3
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

