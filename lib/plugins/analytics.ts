import { getPluginConfig } from './registry';

export interface AnalyticsConfig {
  enabled: boolean;
  provider: 'plausible' | 'umami' | 'simple-analytics';
  domain: string;
}

/**
 * Get analytics configuration
 */
export function getAnalyticsConfig(): AnalyticsConfig | null {
  return getPluginConfig<AnalyticsConfig>('analytics');
}

/**
 * Get script source URL based on provider
 */
export function getAnalyticsScriptSrc(provider: string, domain?: string): string {
  switch (provider) {
    case 'plausible':
      return 'https://plausible.io/js/script.js';
    case 'umami':
      return 'https://analytics.umami.is/script.js';
    case 'simple-analytics':
      return 'https://scripts.simpleanalyticscdn.com/latest.js';
    default:
      return '';
  }
}

/**
 * Get script attributes based on provider
 */
export function getAnalyticsScriptAttrs(config: AnalyticsConfig): Record<string, string> {
  const attrs: Record<string, string> = {};

  switch (config.provider) {
    case 'plausible':
      if (config.domain) {
        attrs['data-domain'] = config.domain;
      }
      break;
    case 'umami':
      if (config.domain) {
        attrs['data-website-id'] = config.domain;
      }
      break;
    case 'simple-analytics':
      // Simple Analytics doesn't need special attributes
      break;
  }

  return attrs;
}

/**
 * Check if analytics should be loaded
 */
export function shouldLoadAnalytics(): boolean {
  const config = getAnalyticsConfig();
  return !!(config?.enabled && config?.domain);
}
