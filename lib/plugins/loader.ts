import fs from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';

export interface PluginConfig {
  enabled: boolean;
  previewOnly?: boolean;
  [key: string]: any;
}

export interface PluginsConfig {
  plugins: {
    [key: string]: PluginConfig;
  };
}

let cachedConfig: PluginsConfig | null = null;

export function loadPluginsConfig(): PluginsConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const configPath = path.join(process.cwd(), 'config', 'plugins.yaml');
    const fileContents = fs.readFileSync(configPath, 'utf8');
    cachedConfig = parseYaml(fileContents) as PluginsConfig;
    return cachedConfig;
  } catch (error) {
    console.error('Error loading plugins config:', error);
    return { plugins: {} };
  }
}

export function getPluginConfig(pluginName: string): PluginConfig | null {
  const config = loadPluginsConfig();
  return config.plugins[pluginName] || null;
}

export function isPluginEnabled(pluginName: string, isPreview: boolean = false): boolean {
  const config = getPluginConfig(pluginName);
  
  if (!config) {
    return false;
  }

  // If plugin is disabled, don't show it
  if (!config.enabled) {
    return false;
  }

  // If previewOnly is true, only show in preview mode
  if (config.previewOnly && !isPreview) {
    return false;
  }

  return true;
}
