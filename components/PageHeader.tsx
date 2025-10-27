interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="animate-fade-in">
      <h1 className="text-sm mb-4">{title}</h1>
      {description && (
        <p className="mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
          {description}
        </p>
      )}
    </section>
  );
}
