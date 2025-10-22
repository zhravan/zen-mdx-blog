'use client';

import { Share2 } from 'lucide-react';
import { ShareButton } from './ShareButton';
import { CopyLinkButton } from './CopyLinkButton';

interface NativeShareButtonProps {
  title: string;
  url: string;
  className?: string;
}

export function NativeShareButton({ title, url, className }: NativeShareButtonProps) {
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    }
  };

  if (!navigator.share) {
    return <CopyLinkButton url={url} className={className} />;
  }

  return (
    <ShareButton
      onClick={handleNativeShare}
      label="Share"
      icon={<Share2 className="h-3.5 w-3.5" />}
      className={className}
    />
  );
}
