"use client";
import { useState } from "react";
import Link from "next/link";
import { Twitter, Linkedin, MessageCircle, Copy, Share2 } from "lucide-react";

interface Props {
  title: string;
  url: string;
  className?: string;
}

export function ShareButtons({ title, url, className }: Props) {
  const [copied, setCopied] = useState(false);

  const shareTargets = [
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      Icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      Icon: Linkedin,
    },
    {
      name: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      Icon: MessageCircle,
    },
  ];

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
    <div className={"flex items-center gap-2 " + (className || "")}> 
      <span className="text-[10px] opacity-60">Share</span>
      {shareTargets.map(({ name, href, Icon }) => (
        <Link
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${name}`}
          className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
        >
          <Icon className="h-3.5 w-3.5" />
        </Link>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
      >
        <Copy className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={handleNativeShare}
        aria-label="Share"
        className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition sm:hidden"
      >
        <Share2 className="h-3.5 w-3.5" />
      </button>
      {copied && <span className="text-[10px] opacity-60">Copied</span>}
    </div>
  );
}
