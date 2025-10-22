'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface CopyLinkButtonProps {
  url: string;
}

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
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
        label="Copy link"
        icon={copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        aria-live="polite"
        aria-label={copied ? 'Link copied' : 'Copy link'}
      />
    </div>
  );
}
