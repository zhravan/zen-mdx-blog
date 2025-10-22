import { getPluginConfig } from './registry';

export interface ExternalLinksConfig {
  enabled: boolean;
  icon: string;
  openInNewTab: boolean;
  nofollow: boolean;
}

/**
 * Check if a URL is external (not same domain)
 */
export function isExternalLink(href: string): boolean {
  if (!href) return false;
  
  // Internal links start with / or # or are relative
  if (href.startsWith('/') || href.startsWith('#') || href.startsWith('?')) {
    return false;
  }
  
  // Check if it's a full URL to external domain
  try {
    const url = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'https://example.com');
    if (typeof window !== 'undefined') {
      return url.hostname !== window.location.hostname;
    }
    // In SSR, assume external if it has a protocol
    return href.startsWith('http://') || href.startsWith('https://');
  } catch {
    return false;
  }
}

/**
 * Get attributes for external links based on plugin config
 */
export function getExternalLinkProps(href: string): {
  target?: string;
  rel?: string;
  icon?: string;
} {
  const config = getPluginConfig<ExternalLinksConfig>('external-links');
  
  if (!config || !isExternalLink(href)) {
    return {};
  }

  const props: { target?: string; rel?: string; icon?: string } = {};

  if (config.openInNewTab) {
    props.target = '_blank';
    props.rel = 'noopener noreferrer';
  }

  if (config.nofollow) {
    props.rel = props.rel ? `${props.rel} nofollow` : 'nofollow';
  }

  if (config.icon) {
    props.icon = config.icon;
  }

  return props;
}

/**
 * Check if external links plugin is enabled
 */
export function shouldEnhanceExternalLinks(): boolean {
  const config = getPluginConfig<ExternalLinksConfig>('external-links');
  return config?.enabled ?? false;
}
