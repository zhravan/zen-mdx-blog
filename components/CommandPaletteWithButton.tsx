'use client';

import { useRef } from 'react';
import { CommandPalette, CommandPaletteHandle } from './CommandPalette';
import { MobileSearchButton } from './MobileSearchButton';

interface CommandPaletteWithButtonProps {
  posts: Array<{
    slug: string;
    title: string;
    date: string;
    description: string;
  }>;
  fuzzyThreshold?: number;
  showPages?: boolean;
  showPosts?: boolean;
}

export function CommandPaletteWithButton(props: CommandPaletteWithButtonProps) {
  const paletteRef = useRef<CommandPaletteHandle>(null);

  return (
    <>
      <div className="fixed top-6 right-4 sm:right-8 z-30 lg:hidden">
        <MobileSearchButton onClick={() => paletteRef.current?.open()} />
      </div>
      <CommandPalette ref={paletteRef} {...props} />
    </>
  );
}
