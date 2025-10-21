import { getPluginConfig } from './registry';

export interface ScrollToTopConfig {
  enabled: boolean;
  showAfter: number;
  position: 'bottom-right' | 'bottom-left';
  smooth: boolean;
}

export function getScrollToTopConfig(): ScrollToTopConfig | null {
  return getPluginConfig<ScrollToTopConfig>('scroll-to-top');
}
