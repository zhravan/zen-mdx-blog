'use client';

import Script from 'next/script';
import type { AnalyticsConfig } from '@/lib/plugins/analytics';

interface AnalyticsProps {
  config: AnalyticsConfig | null;
  scriptSrc: string;
  scriptAttrs: Record<string, string>;
}

export function Analytics({ config, scriptSrc, scriptAttrs }: AnalyticsProps) {
  if (!config?.enabled || !config.domain) {
    return null;
  }

  return (
    <Script
      src={scriptSrc}
      strategy="afterInteractive"
      defer
      {...scriptAttrs}
    />
  );
}
