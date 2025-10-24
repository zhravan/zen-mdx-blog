"use client";
import { useState } from "react";
import { Copy, Share2, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareButtons({ title, url, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-[10px] opacity-60">Share</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <button
        type="button"
        onClick={handleNativeShare}
        aria-label="Share"
        className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
      >
        <Share2 className="h-3.5 w-3.5" />
      </button>
      {copied && <span className="text-[10px] opacity-60">Copied</span>}
    </div>
  );
}
