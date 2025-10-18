'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  // Consider subroutes active (e.g., /blog/[slug] should activate /blog)
  const isActive = href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className="text-xxs transition-opacity hover:opacity-90 focus:opacity-90 flex items-center gap-1"
      style={{
        color: isActive
          ? 'var(--color-foreground)'
          : 'var(--color-muted-foreground)',
        textDecoration: 'none',
        borderBottom: 'none',
        paddingBottom: 0
      }}
    >
      {isActive && (
        <span aria-hidden className="leading-none" style={{ color: 'var(--color-foreground)' }}>
          •
        </span>
      )}
      {children}
    </Link>
  );
}

