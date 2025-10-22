import React from 'react';
import { CopyButton } from './CopyButton';
import { getTheme } from '@/lib/themes';
import { ACTIVE_THEME } from '@/lib/site';
import { codeToHtml } from 'shiki';
import { parseCodeMeta, shouldShowCopyButton } from '@/lib/plugins/code-enhancements';

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        backgroundColor: 'var(--color-muted)',
        padding: '0.125rem 0.375rem',
        borderRadius: '0.25rem',
        fontSize: '0.75rem',
        fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace"
      }}
    >
      {children}
    </code>
  );
}

export async function Pre({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  let lang: string | undefined;
  let codeText = '';
  let meta: string | undefined;

  if (React.isValidElement(children)) {
    const child: any = children;
    const className: string | undefined = child.props?.className;
    const match = className?.match(/language-([\w-]+)/);
    lang = match?.[1];
    meta = child.props?.meta;
    const raw = child.props?.children;
    codeText = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw.join('') : '';
  }

  const theme = getTheme(ACTIVE_THEME);
  const syntaxTheme = theme.syntaxTheme;
  const showCopy = shouldShowCopyButton();
  const { fileName, highlightLines, showLineNumbers } = parseCodeMeta(meta);

  let highlightedHtml: string | null = null;
  if (codeText && lang) {
    try {
      const html = await codeToHtml(codeText, {
        lang,
        theme: syntaxTheme,
      } as any);
      
      // Add line numbers and highlight lines if enabled
      if (showLineNumbers) {
        const lines = codeText.split('\n');
        const preMatch = html.match(/<pre[^>]*>([\s\S]*)<\/pre>/);
        if (preMatch) {
          const codeMatch = preMatch[1].match(/<code[^>]*>([\s\S]*)<\/code>/);
          if (codeMatch) {
            const codeLines = codeMatch[1].split('\n');
            const numberedLines = codeLines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = highlightLines.includes(lineNumber);
              const highlightStyle = isHighlighted ? 'background: rgba(253, 224, 71, 0.1);' : '';
              
              return `<div style="display: flex; ${highlightStyle}">
                <span style="min-width: 2.5rem; text-align: right; padding-right: 1rem; user-select: none; opacity: 0.4; font-size: 0.75rem;">${lineNumber}</span>
                <span style="flex: 1;">${line}</span>
              </div>`;
            }).join('\n');
            
            highlightedHtml = html.replace(codeMatch[1], numberedLines);
          } else {
            highlightedHtml = html;
          }
        } else {
          highlightedHtml = html;
        }
      } else {
        highlightedHtml = html;
      }
    } catch {
      highlightedHtml = null;
    }
  }

  return (
    <div className="relative group" style={{ margin: '1rem 0', maxWidth: '100%', overflow: 'hidden' }}>
      {fileName && (
        <div
          className="text-[10px] opacity-40 px-4 pt-3 pb-1 font-medium"
          style={{
            fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
            backgroundColor: 'var(--color-muted)',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
          }}
        >
          {fileName}
        </div>
      )}
      {showCopy && (
        <div
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ zIndex: 1 }}
        >
          <CopyButton text={codeText} />
        </div>
      )}
      {highlightedHtml ? (
        <div
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          style={{
            borderRadius: fileName ? '0 0 0.5rem 0.5rem' : '0.5rem',
            overflowX: 'auto',
            maxWidth: '100%',
          }}
        />
      ) : (
        <pre
          style={{
            backgroundColor: 'var(--color-muted)',
            padding: '1rem',
            borderRadius: fileName ? '0 0 0.5rem 0.5rem' : '0.5rem',
            overflowX: 'auto',
            whiteSpace: 'pre',
            maxWidth: '100%',
          }}
        >
          {children}
        </pre>
      )}
    </div>
  );
}
