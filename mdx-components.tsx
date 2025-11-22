import Link from 'next/link';
import { H1, H2, H3, H4, H5, H6 } from '@/components/mdx/Heading';
import { Paragraph, Strong, Em, Blockquote } from '@/components/mdx/Text';
import { UnorderedList, OrderedList, ListItem } from '@/components/mdx/List';
import { InlineCode, Pre } from '@/components/mdx/Code';
import { ExternalLink } from '@/components/mdx/ExternalLink';
import { DocumentViewer, PDF, PPT } from '@/components/mdx/DocumentViewer';

// Allow both sync and async server components
type MDXComponent = React.ComponentType<any> | ((props: any) => Promise<React.JSX.Element>);
type MDXComponents = Record<string, MDXComponent>;

export function useMDXComponents(): MDXComponents {
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: Paragraph,
    strong: Strong,
    em: Em,
    blockquote: Blockquote,
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem,
    code: InlineCode,
    pre: Pre,
    a: ExternalLink,
    // Document viewers
    DocumentViewer,
    PDF,
    PPT,
  };
}
