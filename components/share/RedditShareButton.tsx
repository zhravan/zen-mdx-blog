import { MessageCircle as Reddit } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface RedditShareButtonProps {
  title: string;
  url: string;
}

export function RedditShareButton({ title, url }: RedditShareButtonProps) {
  const shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  
  return (
    <ShareButton
      as="a"
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      label="Share on Reddit"
      icon={<Reddit className="h-3.5 w-3.5" />}
    />
  );
}
