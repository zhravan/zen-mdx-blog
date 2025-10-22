'use client';

import { Twitter, Linkedin, MessageCircle as Reddit, Copy, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
  preview?: boolean;
  config?: {
    enabled?: boolean;
    previewOnly?: boolean;
    buttons?: {
      twitter?: boolean;
      linkedin?: boolean;
      reddit?: boolean;
      copy?: boolean;
      native?: boolean;
    };
    showLabels?: boolean;
  };
}

export function ShareButtons({ 
  title, 
  url, 
  className = '',
  preview = false,
  config
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render if plugin is disabled and not in preview mode
  if (config && !config.enabled && !preview) {
    return null;
  }

  // If previewOnly is true, only show in preview mode
  if (config?.previewOnly && !preview) {
    return null;
  }

  // Default button configuration
  const buttonConfig = config?.buttons || {
    twitter: true,
    linkedin: true,
    reddit: true,
    copy: true,
    native: true
  };

  const shareTargets = [
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: <Twitter className="h-3.5 w-3.5" />,
      enabled: buttonConfig.twitter !== false
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: <Linkedin className="h-3.5 w-3.5" />,
      enabled: buttonConfig.linkedin !== false
    },
    {
      name: 'Reddit',
      href: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      icon: <Reddit className="h-3.5 w-3.5" />,
      enabled: buttonConfig.reddit !== false
    }
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
      } catch (error) {
        // User aborted the share
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

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {config?.showLabels && <span className="text-sm opacity-60">Share:</span>}
      <div className="flex items-center gap-1">
        {shareTargets.map(({ name, href, icon, enabled }) => (
          enabled && (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${name}`}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              {icon}
            </Link>
          )
        ))}
        
        {buttonConfig.copy !== false && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy link"
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            {copied ? <span className="text-xs">✓</span> : <Copy className="h-3.5 w-3.5" />}
          </button>
        )}
        
        {buttonConfig.native !== false && (
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="Share"
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition sm:hidden"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {showCopied && <span className="text-xs opacity-60 ml-1">Copied!</span>}
    </div>
  );
}
