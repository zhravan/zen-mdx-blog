'use client';

import { useState } from 'react';
import { Share2, Link as LinkIcon, Check, MessageCircle, Twitter, Globe, Linkedin } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
  showIcon?: boolean;
}

export function SocialShare({ title, url, showIcon = true }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    mastodon: `https://mastodon.social/share?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="space-y-2">
      {showIcon && (
        <div className="flex items-center gap-1.5 text-[10px] opacity-50">
          <Share2 size={11} />
          <span>Share</span>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={handleCopyLink}
          className="p-1.5 rounded bg-opacity-10 border border-current opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Copy link"
          title="Copy link"
        >
          {copied ? <Check size={12} /> : <LinkIcon size={12} />}
        </button>
        
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded bg-opacity-10 border border-current opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <MessageCircle size={12} />
        </a>
        
        <a
          href={shareLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded bg-opacity-10 border border-current opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Share on X"
          title="Share on X"
        >
          <Twitter size={12} />
        </a>
        
        <a
          href={shareLinks.mastodon}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded bg-opacity-10 border border-current opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Share on Mastodon"
          title="Share on Mastodon"
        >
          <Globe size={12} />
        </a>
        
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded bg-opacity-10 border border-current opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin size={12} />
        </a>
      </div>
    </div>
  );
}
