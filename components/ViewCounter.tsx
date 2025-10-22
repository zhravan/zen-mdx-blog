'use client';

import { useEffect, useState } from 'react';
import { incrementViewCount, formatViewCount, shouldShowViewCount } from '@/lib/plugins/view-counter';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const showCount = shouldShowViewCount();

  useEffect(() => {
    setMounted(true);
    
    // Increment view on mount
    const newCount = incrementViewCount(slug);
    setCount(newCount);
  }, [slug]);

  if (!mounted || !showCount) {
    return null;
  }

  return (
    <span className="text-[10px] opacity-40">
      {formatViewCount(count)} views
    </span>
  );
}
