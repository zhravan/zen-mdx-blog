import Link from 'next/link';
import { H1, H2, H3 } from '@/components/mdx/Heading';
import { Paragraph, Strong, Em, Blockquote } from '@/components/mdx/Text';
import { UnorderedList, OrderedList, ListItem } from '@/components/mdx/List';
import { InlineCode, Pre } from '@/components/mdx/Code';

// Allow both sync and async server components
type MDXComponent = React.ComponentType<any> | ((props: any) => Promise<React.JSX.Element>);
type MDXComponents = Record<string, MDXComponent>;

export function useMDXComponents(): MDXComponents {
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    p: Paragraph,
    strong: Strong,
    em: Em,
    blockquote: Blockquote,
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem,
    code: InlineCode,
    pre: Pre,
    a: ({ href, children, ...props }: any) => {
      if (href?.startsWith('/')) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      if (href?.startsWith('#')) {
        return (
          <a href={href} {...props}>
            {children}
          </a>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
  };
}
