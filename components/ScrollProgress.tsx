'use client';

import { useEffect, useRef, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) {
        setVisible(false);
        setProgress(0);
        return;
      }
      const val = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(val);
      setVisible(true);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        calc();
        rafRef.current && cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      });
    };

    calc();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', calc);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', calc);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  const width = `${Math.round(progress * 100)}%`;

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-[3px]"
      style={{
        width,
        backgroundColor: 'var(--color-link)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
        transition: 'width 120ms linear',
        pointerEvents: 'none'
      }}
    />
  );
}

