'use client';

import { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <button
      onClick={onCopy}
      className="text-[10px] px-2 py-1 rounded border"
      style={{
        backgroundColor: 'var(--color-card)',
        color: 'var(--color-foreground)',
        borderColor: 'var(--color-border)'
      }}
      aria-label="Copy code"
      title="Copy code"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

