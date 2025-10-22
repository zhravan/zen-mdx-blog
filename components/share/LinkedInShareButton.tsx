import { Linkedin } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface LinkedInShareButtonProps {
  url: string;
}

export function LinkedInShareButton({ url }: LinkedInShareButtonProps) {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  
  return (
    <ShareButton
      as="a"
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      label="Share on LinkedIn"
      icon={<Linkedin className="h-3.5 w-3.5" />}
    />
  );
}
