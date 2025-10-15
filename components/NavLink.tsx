'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="text-xs no-underline border-none pb-0 transition-colors duration-150"
      style={{
        color: isActive
          ? 'var(--color-foreground)'
          : 'var(--color-muted-foreground)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--color-foreground)';
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = 'var(--color-muted-foreground)';
        }
      }}
    >
      {children}
    </Link>
  );
}

