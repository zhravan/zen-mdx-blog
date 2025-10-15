'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
}

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-xs no-underline border-none pb-0 transition-colors"
      style={{ color: 'var(--color-muted-foreground)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--color-foreground)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--color-muted-foreground)';
      }}
    >
      <ArrowLeft className="w-3 h-3" />
      {children}
    </Link>
  );
}

