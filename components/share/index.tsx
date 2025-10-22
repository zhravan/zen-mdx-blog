'use client';

import { cn } from '@/lib/utils';
import { TwitterShareButton } from './TwitterShareButton';
import { LinkedInShareButton } from './LinkedInShareButton';
import { RedditShareButton } from './RedditShareButton';
import { CopyLinkButton } from './CopyLinkButton';
import { NativeShareButton } from './NativeShareButton';

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-[10px] opacity-60">Share</span>
      <div className="flex items-center gap-1">
        <TwitterShareButton title={title} url={url} />
        <LinkedInShareButton url={url} />
        <RedditShareButton title={title} url={url} />
        <CopyLinkButton url={url} />
        <NativeShareButton title={title} url={url} />
      </div>
    </div>
  );
}
