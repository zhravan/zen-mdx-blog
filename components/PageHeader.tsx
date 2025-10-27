interface PageHeaderProps {
  metadata: {
    title: string;
    description?: string;
  };
}

export function PageHeader({ metadata }: PageHeaderProps) {
  return (
    <section className="animate-fade-in">
      <h1 className="text-sm mb-4">{metadata.title}</h1>
      {metadata.description && (
        <p className="mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
          {metadata.description}
        </p>
      )}
    </section>
  );
}
