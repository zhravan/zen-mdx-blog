"use client";
import React, { useEffect, useRef } from 'react';

export interface GiscusCommentsProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: string;
  reactionsEnabled?: string;
  emitMetadata?: string;
  inputPosition?: string;
  theme?: string;
  lang?: string;
  strict?: string;
}

const GiscusComments: React.FC<GiscusCommentsProps> = ({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'bottom',
  theme = 'light',
  lang = 'en',
  strict = '0',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous if re-rendering (hot reload/theme change)
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-reactions-enabled', reactionsEnabled);
    script.setAttribute('data-emit-metadata', emitMetadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-strict', strict);

    container.appendChild(script);

    return () => {
      // Cleanup if component unmounts
      container.innerHTML = '';
    };
  }, [
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    reactionsEnabled,
    emitMetadata,
    inputPosition,
    theme,
    lang,
    strict,
  ]);

  return <div className="giscus-comments" ref={containerRef} />;
};

export default GiscusComments;
