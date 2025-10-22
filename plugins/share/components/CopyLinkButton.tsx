'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface CopyLinkButtonProps {
  url: string;
  className?: string;
}

export function CopyLinkButton({ url, className }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="relative">
      <ShareButton
        onClick={handleClick}
        label={copied ? 'Link copied' : 'Copy link'}
        icon={copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        className={className}
        aria-live="polite"
      />
    </div>
  );
}
