import { getPluginConfig } from './registry';

export interface ScrollProgressConfig {
  enabled: boolean;
  position: 'top' | 'bottom';
  height: number;
}

export function getScrollProgressConfig(): ScrollProgressConfig | null {
  return getPluginConfig<ScrollProgressConfig>('scroll-progress');
}
