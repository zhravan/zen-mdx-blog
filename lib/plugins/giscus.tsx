import React from 'react';
import { getPluginConfig, isPluginEnabled } from './registry';
import { GiscusClient } from './giscus-client';

export interface GiscusConfig {
  enabled: boolean;
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: 'pathname' | 'url' | 'title' | 'og:title';
  reactionsEnabled?: boolean; // default true
  emitMetadata?: boolean; // default false
  inputPosition?: 'top' | 'bottom'; // default bottom
  theme?: string; // e.g., 'light', 'dark', 'preferred_color_scheme'
  lang?: string; // e.g., 'en', 'es'
  strict?: boolean; // default false
}

// Type for partial config from YAML that may not have all required fields
type PartialGiscusConfig = Partial<GiscusConfig> & {
  enabled?: boolean;
};

// Type guard to check if config has all required fields
function isValidGiscusConfig(config: PartialGiscusConfig): config is GiscusConfig {
  return Boolean(
    config.enabled !== false &&
    config.repo &&
    config.repoId &&
    config.category &&
    config.categoryId
  );
}

export function getGiscusConfig(): GiscusConfig | null {
  const cfg = getPluginConfig<PartialGiscusConfig>('giscus');
  if (!cfg) return null;

  const defaults: Partial<GiscusConfig> = {
    mapping: 'pathname',
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: 'bottom',
    theme: 'preferred_color_scheme',
    lang: 'en',
    strict: false
  };

  const merged = { ...defaults, ...cfg };

  // Validate that all required fields are present
  if (!isValidGiscusConfig(merged)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[giscus] Invalid config: missing required fields (repo, repoId, category, categoryId)');
    }
    return null;
  }

  return merged;
}

// Server Component wrapper
export function Giscus(props?: Partial<GiscusConfig>) {
  if (!isPluginEnabled('giscus')) return null;
  const cfg = getGiscusConfig();
  if (!cfg) return null;

  // cfg is already validated as GiscusConfig, so merging with props maintains type safety
  // If props override required fields, the type system ensures they're still strings
  const merged: GiscusConfig = { ...cfg, ...props };

  return <GiscusClient config={merged} />;
}
