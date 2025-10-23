'use client';

import { Twitter, Linkedin, MessageSquare, Copy, Share2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareButtons({ 
  title, 
  url, 
  className = ''
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

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

  // Don't render on server to avoid hydration issues
  if (!mounted) {
    return null;
  }

  const buttonClass = "h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm opacity-60">Share:</span>
      <div className="flex items-center gap-1">
        {/* Twitter */}
        <Link
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          className={buttonClass}
        >
          <Twitter className="h-3.5 w-3.5" />
        </Link>

        {/* LinkedIn */}
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className={buttonClass}
        >
          <Linkedin className="h-3.5 w-3.5" />
        </Link>

        {/* Reddit */}
        <Link
          href={`https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Reddit"
          className={buttonClass}
        >
          <MessageSquare className="h-3.5 w-3.5" />
        </Link>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy link"
          className={buttonClass}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>

        {/* Native Share (mobile only) */}
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="Share"
          className={`${buttonClass} sm:hidden`}
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>
      {copied && <span className="text-xs opacity-60 ml-1">Copied!</span>}
    </div>
  );
}
