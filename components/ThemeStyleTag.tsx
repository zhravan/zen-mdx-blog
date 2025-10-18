import { ACTIVE_THEME } from '@/lib/site';
import { getTheme } from '@/lib/themes';

// Server component that injects the active theme CSS variables eagerly in <head>
export default function ThemeStyleTag() {
  const { colors } = getTheme(ACTIVE_THEME);

  const css = `:root{${[
    `--color-background: ${colors.background}`,
    `--color-foreground: ${colors.foreground}`,
    `--color-card: ${colors.card}`,
    `--color-card-foreground: ${colors.cardForeground}`,
    `--color-primary: ${colors.primary}`,
    `--color-primary-foreground: ${colors.primaryForeground}`,
    `--color-secondary: ${colors.secondary}`,
    `--color-secondary-foreground: ${colors.secondaryForeground}`,
    `--color-muted: ${colors.muted}`,
    `--color-muted-foreground: ${colors.mutedForeground}`,
    `--color-accent: ${colors.accent}`,
    `--color-accent-foreground: ${colors.accentForeground}`,
    `--color-border: ${colors.border}`,
    `--color-input: ${colors.input}`,
    `--color-ring: ${colors.ring}`,
    `--color-link: ${colors.link}`,
    `--color-link-hover: ${colors.linkHover}`,
  ].join(';')}}`;

  return (
    <style
      // Avoid React hydration warning for inline styles differing between SSR and client
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
}
