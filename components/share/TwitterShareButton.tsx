import { Twitter } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface TwitterShareButtonProps {
  title: string;
  url: string;
}

export function TwitterShareButton({ title, url }: TwitterShareButtonProps) {
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  
  return (
    <ShareButton
      as="a"
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      label="Share on X (Twitter)"
      icon={<Twitter className="h-3.5 w-3.5" />}
    />
  );
}
