'use client';

interface MobileSearchButtonProps {
  onClick: () => void;
}

export function MobileSearchButton({ onClick }: MobileSearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 transition-opacity hover:opacity-80"
      style={{
        backgroundColor: 'var(--color-muted)',
        color: 'var(--color-foreground)',
        border: '1px solid var(--color-border)',
        borderRadius: '0.375rem',
        fontSize: '0.75rem',
      }}
      aria-label="Search"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </button>
  );
}
