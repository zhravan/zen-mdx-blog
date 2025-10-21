'use client';

import { useEffect, useState } from 'react';

interface ScrollToTopProps {
  showAfter?: number;
  position?: 'bottom-right' | 'bottom-left';
  smooth?: boolean;
}

export function ScrollToTop({ 
  showAfter = 400, 
  position = 'bottom-right',
  smooth = true 
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  if (!isVisible) {
    return null;
  }

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  return (
    <button
      onClick={scrollToTop}
      className={`fixed ${positionClasses} p-2 transition-opacity hover:opacity-80`}
      style={{
        backgroundColor: 'var(--color-muted)',
        color: 'var(--color-foreground)',
        border: '1px solid var(--color-border)',
        borderRadius: '0.375rem',
        fontSize: '0.75rem',
        lineHeight: '1'
      }}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
