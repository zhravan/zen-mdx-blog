'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { getTheme, type ThemeName } from '@/lib/themes';
import { ACTIVE_THEME } from '@/lib/site';

type ThemeContextType = {
  themeName: ThemeName;
};

const ThemeContext = createContext<ThemeContextType>({ themeName: ACTIVE_THEME });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeName = ACTIVE_THEME;
  const theme = getTheme(themeName);

  useEffect(() => {
    // Apply CSS variables to :root
    const root = document.documentElement;
    const { colors } = theme;

    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-foreground', colors.foreground);
    root.style.setProperty('--color-card', colors.card);
    root.style.setProperty('--color-card-foreground', colors.cardForeground);
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-foreground', colors.primaryForeground);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-secondary-foreground', colors.secondaryForeground);
    root.style.setProperty('--color-muted', colors.muted);
    root.style.setProperty('--color-muted-foreground', colors.mutedForeground);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-accent-foreground', colors.accentForeground);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-input', colors.input);
    root.style.setProperty('--color-ring', colors.ring);
    root.style.setProperty('--color-link', colors.link);
    root.style.setProperty('--color-link-hover', colors.linkHover);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ themeName }}>
      {children}
    </ThemeContext.Provider>
  );
}
