export function UnorderedList({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{
        listStyleType: 'disc',
        fontSize: '0.6875rem',
        lineHeight: '1.7',
        marginBottom: '1rem',
        marginLeft: '1.5rem',
        marginTop: '0.5rem',
        color: 'var(--color-muted-foreground)'
      }}
    >
      {children}
    </ul>
  );
}

export function OrderedList({ children }: { children: React.ReactNode }) {
  return (
    <ol
      style={{
        listStyleType: 'decimal',
        fontSize: '0.6875rem',
        lineHeight: '1.7',
        marginBottom: '1rem',
        marginLeft: '1.5rem',
        marginTop: '0.5rem',
        color: 'var(--color-muted-foreground)'
      }}
    >
      {children}
    </ol>
  );
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        marginBottom: '0.25rem',
        color: 'var(--color-muted-foreground)'
      }}
    >
      {children}
    </li>
  );
}

