'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { getAnalyticsConfig, getAnalyticsScriptSrc, getAnalyticsScriptAttrs, shouldLoadAnalytics } from '@/lib/plugins/analytics';

export function Analytics() {
  const config = getAnalyticsConfig();
  const shouldLoad = shouldLoadAnalytics();

  if (!shouldLoad || !config) {
    return null;
  }

  const scriptSrc = getAnalyticsScriptSrc(config.provider, config.domain);
  const scriptAttrs = getAnalyticsScriptAttrs(config);

  return (
    <Script
      src={scriptSrc}
      strategy="afterInteractive"
      defer
      {...scriptAttrs}
    />
  );
}
