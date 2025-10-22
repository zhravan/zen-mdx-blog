import { getPluginConfig } from './registry';

// TypeScript declarations for analytics providers
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
    umami?: {
      track: (eventName: string | { url: string }, props?: Record<string, any>) => void;
    };
    sa_event?: (eventName: string) => void;
  }
}

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

/**
 * Track custom event (client-side only)
 * @param eventName - Name of the event to track
 * @param props - Optional event properties
 */
export function trackEvent(eventName: string, props?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  
  const config = getAnalyticsConfig();
  if (!config?.enabled) return;

  try {
    switch (config.provider) {
      case 'plausible':
        // @ts-ignore - Plausible is loaded externally
        if (window.plausible) {
          window.plausible(eventName, { props });
        }
        break;
      
      case 'umami':
        // @ts-ignore - Umami is loaded externally
        if (window.umami) {
          window.umami.track(eventName, props);
        }
        break;
      
      case 'simple-analytics':
        // @ts-ignore - Simple Analytics is loaded externally
        if (window.sa_event) {
          window.sa_event(eventName);
        }
        break;
    }
  } catch (error) {
    // Silently fail - analytics should never break the app
    console.warn('Analytics tracking error:', error);
  }
}

/**
 * Track page view (usually automatic, but can be called manually for SPA navigation)
 * @param url - Optional URL to track (defaults to current page)
 */
export function trackPageView(url?: string): void {
  if (typeof window === 'undefined') return;
  
  const config = getAnalyticsConfig();
  if (!config?.enabled) return;

  const pageUrl = url || window.location.pathname + window.location.search;

  try {
    switch (config.provider) {
      case 'plausible':
        // @ts-ignore
        if (window.plausible) {
          window.plausible('pageview', { props: { url: pageUrl } });
        }
        break;
      
      case 'umami':
        // @ts-ignore
        if (window.umami) {
          window.umami.track({ url: pageUrl });
        }
        break;
      
      case 'simple-analytics':
        // Simple Analytics automatically tracks page views
        break;
    }
  } catch (error) {
    console.warn('Analytics page view tracking error:', error);
  }
}
