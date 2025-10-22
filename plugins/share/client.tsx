'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the ShareButtons component with no SSR
const ShareButtons = dynamic(
  () => import('./components/ShareButtons').then(mod => mod.ShareButtons),
  { ssr: false }
);

export function ShareButtonsClient() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Find all share button placeholders
    const shareContainers = document.querySelectorAll('#share-buttons');
    
    shareContainers.forEach(container => {
      const title = container.getAttribute('data-title') || '';
      const url = container.getAttribute('data-url') || window.location.href;
      
      // Only render if not already initialized
      if (!container.hasAttribute('data-initialized')) {
        container.setAttribute('data-initialized', 'true');
        
        // Create a new div to mount the ShareButtons component
        const shareRoot = document.createElement('div');
        container.appendChild(shareRoot);
        
        // Render the ShareButtons component
        import('react-dom/client').then(({ createRoot }) => {
          const root = createRoot(shareRoot);
          root.render(
            <ShareButtons 
              title={title} 
              url={url} 
              preview={process.env.NODE_ENV === 'development'}
            />
          );
        });
      }
    });
    
    // Cleanup function
    return () => {
      shareContainers.forEach(container => {
        container.removeAttribute('data-initialized');
      });
    };
  }, []);
  
  // Don't render anything on the server
  if (!isMounted) return null;
  
  return null;
}
