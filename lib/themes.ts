/**
 * Theme configuration inspired by VS Code themes
 * You can easily swap themes by changing the ACTIVE_THEME in site.ts
 */

export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  ring: string;
  link: string;
  linkHover: string;
};

export type Theme = {
  name: string;
  colors: ThemeColors;
  syntaxTheme: string; // Shiki theme name
};

/**
 * Available VS Code-inspired themes
 * Add your own by following the same structure
 */
export const themes = {
  'vitesse-dark': {
    name: 'Vitesse Dark',
    colors: {
      background: 'hsl(220 15% 8%)',
      foreground: 'hsl(220 10% 85%)',
      card: 'hsl(220 15% 10%)',
      cardForeground: 'hsl(220 10% 85%)',
      primary: 'hsl(220 10% 85%)',
      primaryForeground: 'hsl(220 15% 10%)',
      secondary: 'hsl(220 15% 12%)',
      secondaryForeground: 'hsl(220 10% 85%)',
      muted: 'hsl(220 15% 12%)',
      mutedForeground: 'hsl(220 8% 45%)',
      accent: 'hsl(220 15% 15%)',
      accentForeground: 'hsl(220 10% 85%)',
      border: 'hsl(220 12% 15%)',
      input: 'hsl(220 12% 15%)',
      ring: 'hsl(220 10% 85%)',
      link: 'hsl(220 10% 70%)',
      linkHover: 'hsl(220 10% 85%)',
    },
    syntaxTheme: 'vitesse-dark',
  },
  'github-dark': {
    name: 'GitHub Dark',
    colors: {
      background: 'hsl(220 13% 12%)',
      foreground: 'hsl(213 23% 85%)',
      card: 'hsl(215 14% 14%)',
      cardForeground: 'hsl(213 23% 85%)',
      primary: 'hsl(213 23% 85%)',
      primaryForeground: 'hsl(220 13% 12%)',
      secondary: 'hsl(215 14% 16%)',
      secondaryForeground: 'hsl(213 23% 85%)',
      muted: 'hsl(215 14% 16%)',
      mutedForeground: 'hsl(215 10% 50%)',
      accent: 'hsl(215 14% 20%)',
      accentForeground: 'hsl(213 23% 85%)',
      border: 'hsl(215 12% 18%)',
      input: 'hsl(215 12% 18%)',
      ring: 'hsl(213 23% 85%)',
      link: 'hsl(212 92% 60%)',
      linkHover: 'hsl(212 92% 70%)',
    },
    syntaxTheme: 'github-dark',
  },
  'dracula': {
    name: 'Dracula',
    colors: {
      background: 'hsl(231 15% 18%)',
      foreground: 'hsl(60 30% 96%)',
      card: 'hsl(232 14% 20%)',
      cardForeground: 'hsl(60 30% 96%)',
      primary: 'hsl(326 100% 74%)',
      primaryForeground: 'hsl(231 15% 18%)',
      secondary: 'hsl(232 14% 25%)',
      secondaryForeground: 'hsl(60 30% 96%)',
      muted: 'hsl(232 14% 25%)',
      mutedForeground: 'hsl(231 11% 65%)',
      accent: 'hsl(265 89% 78%)',
      accentForeground: 'hsl(231 15% 18%)',
      border: 'hsl(232 14% 30%)',
      input: 'hsl(232 14% 30%)',
      ring: 'hsl(326 100% 74%)',
      link: 'hsl(326 100% 74%)',
      linkHover: 'hsl(265 89% 78%)',
    },
    syntaxTheme: 'dracula',
  },
  'monokai': {
    name: 'Monokai',
    colors: {
      background: 'hsl(60 3% 15%)',
      foreground: 'hsl(60 17% 89%)',
      card: 'hsl(60 3% 17%)',
      cardForeground: 'hsl(60 17% 89%)',
      primary: 'hsl(186 100% 69%)',
      primaryForeground: 'hsl(60 3% 15%)',
      secondary: 'hsl(60 3% 20%)',
      secondaryForeground: 'hsl(60 17% 89%)',
      muted: 'hsl(60 3% 20%)',
      mutedForeground: 'hsl(55 8% 56%)',
      accent: 'hsl(80 76% 53%)',
      accentForeground: 'hsl(60 3% 15%)',
      border: 'hsl(60 3% 25%)',
      input: 'hsl(60 3% 25%)',
      ring: 'hsl(186 100% 69%)',
      link: 'hsl(186 100% 69%)',
      linkHover: 'hsl(80 76% 53%)',
    },
    syntaxTheme: 'monokai',
  },
  'nord': {
    name: 'Nord',
    colors: {
      background: 'hsl(220 16% 22%)',
      foreground: 'hsl(218 27% 94%)',
      card: 'hsl(220 17% 25%)',
      cardForeground: 'hsl(218 27% 94%)',
      primary: 'hsl(193 43% 67%)',
      primaryForeground: 'hsl(220 16% 22%)',
      secondary: 'hsl(220 17% 28%)',
      secondaryForeground: 'hsl(218 27% 94%)',
      muted: 'hsl(220 17% 28%)',
      mutedForeground: 'hsl(220 17% 60%)',
      accent: 'hsl(179 25% 65%)',
      accentForeground: 'hsl(220 16% 22%)',
      border: 'hsl(220 17% 32%)',
      input: 'hsl(220 17% 32%)',
      ring: 'hsl(193 43% 67%)',
      link: 'hsl(193 43% 67%)',
      linkHover: 'hsl(179 25% 65%)',
    },
    syntaxTheme: 'nord',
  },
  'one-dark-pro': {
    name: 'One Dark Pro',
    colors: {
      background: 'hsl(220 13% 18%)',
      foreground: 'hsl(220 14% 71%)',
      card: 'hsl(220 13% 20%)',
      cardForeground: 'hsl(220 14% 71%)',
      primary: 'hsl(207 82% 66%)',
      primaryForeground: 'hsl(220 13% 18%)',
      secondary: 'hsl(220 13% 23%)',
      secondaryForeground: 'hsl(220 14% 71%)',
      muted: 'hsl(220 13% 23%)',
      mutedForeground: 'hsl(220 10% 50%)',
      accent: 'hsl(286 60% 67%)',
      accentForeground: 'hsl(220 13% 18%)',
      border: 'hsl(220 13% 26%)',
      input: 'hsl(220 13% 26%)',
      ring: 'hsl(207 82% 66%)',
      link: 'hsl(207 82% 66%)',
      linkHover: 'hsl(286 60% 67%)',
    },
    syntaxTheme: 'one-dark-pro',
  },
  'tokyo-night': {
    name: 'Tokyo Night',
    colors: {
      background: 'hsl(232 23% 13%)',
      foreground: 'hsl(223 13% 75%)',
      card: 'hsl(232 23% 15%)',
      cardForeground: 'hsl(223 13% 75%)',
      primary: 'hsl(199 89% 48%)',
      primaryForeground: 'hsl(232 23% 13%)',
      secondary: 'hsl(232 23% 18%)',
      secondaryForeground: 'hsl(223 13% 75%)',
      muted: 'hsl(232 23% 18%)',
      mutedForeground: 'hsl(223 11% 55%)',
      accent: 'hsl(267 84% 81%)',
      accentForeground: 'hsl(232 23% 13%)',
      border: 'hsl(232 23% 22%)',
      input: 'hsl(232 23% 22%)',
      ring: 'hsl(199 89% 48%)',
      link: 'hsl(199 89% 48%)',
      linkHover: 'hsl(267 84% 81%)',
    },
    syntaxTheme: 'tokyo-night',
  },
  'catppuccin-mocha': {
    name: 'Catppuccin Mocha',
    colors: {
      background: 'hsl(240 21% 15%)',
      foreground: 'hsl(226 64% 88%)',
      card: 'hsl(240 21% 17%)',
      cardForeground: 'hsl(226 64% 88%)',
      primary: 'hsl(189 71% 73%)',
      primaryForeground: 'hsl(240 21% 15%)',
      secondary: 'hsl(240 21% 20%)',
      secondaryForeground: 'hsl(226 64% 88%)',
      muted: 'hsl(240 21% 20%)',
      mutedForeground: 'hsl(227 25% 60%)',
      accent: 'hsl(267 84% 81%)',
      accentForeground: 'hsl(240 21% 15%)',
      border: 'hsl(240 21% 25%)',
      input: 'hsl(240 21% 25%)',
      ring: 'hsl(189 71% 73%)',
      link: 'hsl(189 71% 73%)',
      linkHover: 'hsl(267 84% 81%)',
    },
    syntaxTheme: 'catppuccin-mocha',
  },
} as const;

export type ThemeName = keyof typeof themes;

/**
 * Get a theme by name
 */
export function getTheme(name: ThemeName): Theme {
  return themes[name];
}

/**
 * Get all available theme names
 */
export function getThemeNames(): ThemeName[] {
  return Object.keys(themes) as ThemeName[];
}
