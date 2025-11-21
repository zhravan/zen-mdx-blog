'use client';

import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface LanguageBadgeProps {
  languageName: string;
  iconName?: string;
  showIcon: boolean;
  badgeStyle: React.CSSProperties;
}

export function LanguageBadge({ languageName, iconName, showIcon, badgeStyle }: LanguageBadgeProps) {
  // Dynamically get the icon component
  const IconComponent = iconName ? (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon) : null;

  return (
    <span style={badgeStyle}>
      {showIcon && IconComponent && (
        <IconComponent size={12} strokeWidth={2} />
      )}
      <span>{languageName}</span>
    </span>
  );
}
