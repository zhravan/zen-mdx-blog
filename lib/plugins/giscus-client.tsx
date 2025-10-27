'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { GiscusConfig } from './giscus';

const GiscusComments = dynamic(() => import('../../components/plugins/GiscusComments'), { ssr: false });

function toFlag(value: boolean | string | number | undefined, defaultBool: boolean): '1' | '0' {
  if (typeof value === 'boolean') return value ? '1' : '0';
  if (typeof value === 'number') return value ? '1' : '0';
  if (typeof value === 'string') {
    const v = value.toLowerCase();
    if (v === '1' || v === 'true') return '1';
    if (v === '0' || v === 'false') return '0';
  }
  return defaultBool ? '1' : '0';
}

interface GiscusClientProps {
  config: GiscusConfig;
}

export function GiscusClient({ config }: GiscusClientProps) {
  return (
    <GiscusComments
      repo={config.repo}
      repoId={config.repoId}
      category={config.category}
      categoryId={config.categoryId}
      mapping={config.mapping || 'pathname'}
      reactionsEnabled={toFlag(config.reactionsEnabled, true)}
      emitMetadata={toFlag(config.emitMetadata, false)}
      inputPosition={config.inputPosition || 'bottom'}
      theme={config.theme || 'preferred_color_scheme'}
      lang={config.lang || 'en'}
      strict={toFlag(config.strict, false)}
    />
  );
}
