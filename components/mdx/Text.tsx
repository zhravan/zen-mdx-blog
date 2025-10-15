export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: '0.6875rem',
        lineHeight: '1.7',
        marginBottom: '1rem',
        color: 'var(--color-muted-foreground)'
      }}
    >
      {children}
    </p>
  );
}

export function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong
      style={{
        fontWeight: 600,
        color: 'var(--color-foreground)'
      }}
    >
      {children}
    </strong>
  );
}

export function Em({ children }: { children: React.ReactNode }) {
  return <em style={{ fontStyle: 'italic' }}>{children}</em>;
}

export function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: '4px solid var(--color-border)',
        paddingLeft: '1rem',
        fontStyle: 'italic',
        margin: '1.5rem 0',
        color: 'var(--color-muted-foreground)',
        fontSize: '0.6875rem',
        lineHeight: '1.7'
      }}
    >
      {children}
    </blockquote>
  );
}

