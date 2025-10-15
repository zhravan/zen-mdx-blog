import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="text-base font-normal mb-3 mt-6" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-sm font-normal mb-2 mt-5" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-xs font-normal mb-2 mt-4" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-xs font-normal mb-2 mt-4" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="mb-3 leading-relaxed text-xs text-muted-foreground" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="mb-4 ml-6 text-xs list-decimal" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="mb-4 ml-6 text-xs list-disc" {...props} />
  ),
  li: (props: ListItemProps) => (
    <li className="mb-2 text-muted-foreground" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="italic" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-link hover:text-link-hover';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-4 border-border pl-4 italic my-4 text-muted-foreground"
      {...props}
    />
  )
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
