import { getPluginConfig } from './registry';
import { SITE_URL } from '@/lib/site';

export interface SocialShareConfig {
  enabled: boolean;
  showIcon: boolean;
  platforms: {
    copyLink: boolean;
    whatsapp: boolean;
    x: boolean;
    mastodon: boolean;
    linkedin: boolean;
  };
}

/**
 * Get social share configuration
 */
export function getSocialShareConfig(): SocialShareConfig | null {
  return getPluginConfig<SocialShareConfig>('social-share');
}

/**
 * Generate the full URL for a blog post
 */
export function getPostShareUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

/**
 * Check if social share is enabled
 */
export function isSocialShareEnabled(): boolean {
  const config = getSocialShareConfig();
  return config !== null && config.enabled;
}
