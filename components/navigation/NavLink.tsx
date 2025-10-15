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
      className="text-xs transition-all duration-150"
      style={{
        color: isActive
          ? 'var(--color-foreground)'
          : 'var(--color-muted-foreground)',
        textDecoration: 'none',
        borderBottom: isActive ? '1px solid var(--color-foreground)' : 'none',
        paddingBottom: isActive ? '1px' : '0'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--color-foreground)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = isActive
          ? 'var(--color-foreground)'
          : 'var(--color-muted-foreground)';
      }}
    >
      {children}
    </Link>
  );
}

