import { getPluginConfig } from './registry';

export interface CodeLanguageBadgeConfig {
  enabled: boolean;
  showIcon: boolean;
  style: 'default' | 'minimal' | 'pill';
}

/**
 * Language configuration with display names and icon names (Lucide React)
 */
const LANGUAGE_MAP: Record<string, { name: string; icon?: string }> = {
  // Web Technologies
  javascript: { name: 'JavaScript', icon: 'FileCode2' },
  js: { name: 'JavaScript', icon: 'FileCode2' },
  typescript: { name: 'TypeScript', icon: 'FileType' },
  ts: { name: 'TypeScript', icon: 'FileType' },
  jsx: { name: 'JSX', icon: 'Braces' },
  tsx: { name: 'TSX', icon: 'Braces' },
  html: { name: 'HTML', icon: 'Globe' },
  css: { name: 'CSS', icon: 'Palette' },
  scss: { name: 'SCSS', icon: 'Palette' },
  sass: { name: 'Sass', icon: 'Palette' },
  less: { name: 'Less', icon: 'Palette' },

  // Backend & Systems
  python: { name: 'Python', icon: 'FileCode2' },
  py: { name: 'Python', icon: 'FileCode2' },
  java: { name: 'Java', icon: 'Coffee' },
  kotlin: { name: 'Kotlin', icon: 'Code2' },
  go: { name: 'Go', icon: 'Package' },
  rust: { name: 'Rust', icon: 'Package' },
  rs: { name: 'Rust', icon: 'Package' },
  c: { name: 'C', icon: 'Wrench' },
  cpp: { name: 'C++', icon: 'Wrench' },
  'c++': { name: 'C++', icon: 'Wrench' },
  csharp: { name: 'C#', icon: 'Code2' },
  'c#': { name: 'C#', icon: 'Code2' },
  cs: { name: 'C#', icon: 'Code2' },
  php: { name: 'PHP', icon: 'FileCode2' },
  ruby: { name: 'Ruby', icon: 'Gem' },
  rb: { name: 'Ruby', icon: 'Gem' },
  swift: { name: 'Swift', icon: 'Zap' },

  // Functional & Others
  elixir: { name: 'Elixir', icon: 'Zap' },
  ex: { name: 'Elixir', icon: 'Zap' },
  erlang: { name: 'Erlang', icon: 'Code2' },
  haskell: { name: 'Haskell', icon: 'Code2' },
  hs: { name: 'Haskell', icon: 'Code2' },
  scala: { name: 'Scala', icon: 'Code2' },
  clojure: { name: 'Clojure', icon: 'Braces' },

  // Shell & Scripts
  bash: { name: 'Bash', icon: 'Shell' },
  sh: { name: 'Shell', icon: 'Shell' },
  zsh: { name: 'Zsh', icon: 'Shell' },
  fish: { name: 'Fish', icon: 'Shell' },
  powershell: { name: 'PowerShell', icon: 'Terminal' },
  ps1: { name: 'PowerShell', icon: 'Terminal' },

  // Data & Config
  json: { name: 'JSON', icon: 'FileJson' },
  yaml: { name: 'YAML', icon: 'FileText' },
  yml: { name: 'YAML', icon: 'FileText' },
  toml: { name: 'TOML', icon: 'FileText' },
  xml: { name: 'XML', icon: 'FileText' },
  sql: { name: 'SQL', icon: 'Database' },
  graphql: { name: 'GraphQL', icon: 'Network' },
  gql: { name: 'GraphQL', icon: 'Network' },

  // Markup & Documentation
  markdown: { name: 'Markdown', icon: 'FileEdit' },
  md: { name: 'Markdown', icon: 'FileEdit' },
  mdx: { name: 'MDX', icon: 'FileEdit' },
  latex: { name: 'LaTeX', icon: 'FileText' },
  tex: { name: 'LaTeX', icon: 'FileText' },

  // Others
  docker: { name: 'Dockerfile', icon: 'Container' },
  dockerfile: { name: 'Dockerfile', icon: 'Container' },
  nginx: { name: 'Nginx', icon: 'Server' },
  apache: { name: 'Apache', icon: 'Server' },
  vim: { name: 'Vim', icon: 'FileEdit' },
  lua: { name: 'Lua', icon: 'Code2' },
  r: { name: 'R', icon: 'BarChart' },
  dart: { name: 'Dart', icon: 'Target' },
  diff: { name: 'Diff', icon: 'GitBranch' },
  git: { name: 'Git', icon: 'GitBranch' },
};

/**
 * Get language display information
 */
export function getLanguageInfo(lang?: string): {
  name: string;
  icon?: string;
} {
  if (!lang) {
    return { name: 'Code', icon: 'Code2' };
  }

  const normalizedLang = lang.toLowerCase().trim();
  const info = LANGUAGE_MAP[normalizedLang];

  if (info) {
    return info;
  }

  // Fallback: capitalize first letter
  return {
    name: lang.charAt(0).toUpperCase() + lang.slice(1),
    icon: 'Code2',
  };
}

/**
 * Get language badge configuration
 */
export function getLanguageBadgeConfig(): CodeLanguageBadgeConfig | null {
  return getPluginConfig<CodeLanguageBadgeConfig>('code-language-badge');
}

/**
 * Check if language badge should be shown
 */
export function shouldShowLanguageBadge(): boolean {
  const config = getLanguageBadgeConfig();
  return config?.enabled ?? false;
}

/**
 * Get badge styles based on configuration
 */
export function getBadgeStyles(config: CodeLanguageBadgeConfig): {
  container: React.CSSProperties;
  badge: React.CSSProperties;
} {
  const baseContainer: React.CSSProperties = {
    position: 'absolute',
    bottom: '0.5rem',
    right: '0.5rem',
    zIndex: 2,
  };

  const baseBadge: React.CSSProperties = {
    fontSize: '0.65rem',
    fontWeight: '600',
    padding: '0.25rem 0.5rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  };

  // Style variants
  switch (config.style) {
    case 'minimal':
      return {
        container: baseContainer,
        badge: {
          ...baseBadge,
          backgroundColor: 'transparent',
          color: 'var(--color-text)',
          opacity: 0.5,
        },
      };

    case 'pill':
      return {
        container: baseContainer,
        badge: {
          ...baseBadge,
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-background)',
          borderRadius: '9999px',
          paddingLeft: '0.625rem',
          paddingRight: '0.625rem',
        },
      };

    case 'default':
    default:
      return {
        container: baseContainer,
        badge: {
          ...baseBadge,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          color: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '0.25rem',
          backdropFilter: 'blur(4px)',
        },
      };
  }
}
