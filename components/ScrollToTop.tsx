'use client';

import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-2 transition-opacity hover:opacity-80"
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
