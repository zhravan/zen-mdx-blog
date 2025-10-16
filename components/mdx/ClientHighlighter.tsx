'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  code: string;
  lang?: string;
};

export function ClientHighlighter({ code, lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!code || !lang) return;
      try {
        // Dynamically import Shiki in the browser via ESM CDN
        const { getHighlighter } = await import('https://esm.sh/shiki@1.22.0');
        const highlighter = await getHighlighter({
          themes: ['vitesse-dark'],
          langs: [lang]
        });
        const html = highlighter.codeToHtml(code, {
          lang,
          theme: 'vitesse-dark'
        });
        if (cancelled) return;
        if (ref.current) {
          ref.current.innerHTML = html;
          const prev = ref.current.previousElementSibling as HTMLElement | null;
          if (prev) prev.style.display = 'none';
          setReady(true);
        }
      } catch (e) {
        // Silently fall back to the server-rendered <pre>
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  // The highlighter renders its own <pre><code>...</code></pre> markup.
  // We overlay it visually on top of the server-rendered fallback by
  // positioning it after in the DOM with natural flow; the fallback remains
  // visible until this one is ready, then this one takes space.
  return <div ref={ref} style={{ display: ready ? 'block' : 'none' }} aria-hidden={!ready} />;
}
