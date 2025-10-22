import Link from 'next/link';
import { getExternalLinkProps, isExternalLink } from '@/lib/plugins/external-links';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  [key: string]: any;
}

export function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  const isExternal = isExternalLink(href);
  const externalProps = getExternalLinkProps(href);

  if (isExternal && externalProps.icon) {
    return (
      <a
        href={href}
        target={externalProps.target}
        rel={externalProps.rel}
        className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
        {...props}
      >
        {children}
        <span className="text-[10px] opacity-40" aria-label="external link">
          {externalProps.icon}
        </span>
      </a>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target={externalProps.target}
        rel={externalProps.rel}
        className="hover:opacity-70 transition-opacity"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className="hover:opacity-70 transition-opacity" {...props}>
      {children}
    </Link>
  );
}
