import { getPluginConfig } from './registry';

export interface CommandPaletteConfig {
  enabled: boolean;
  shortcut: string;
  fuzzyThreshold: number;
  showPages: boolean;
  showPosts: boolean;
}

export function getCommandPaletteConfig(): CommandPaletteConfig | null {
  return getPluginConfig<CommandPaletteConfig>('command-palette');
}
