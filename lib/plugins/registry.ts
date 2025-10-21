import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

export interface PluginConfig {
  enabled: boolean;
  [key: string]: any;
}

export interface PluginsConfig {
  plugins: Record<string, PluginConfig>;
}

let cachedConfig: PluginsConfig | null = null;

/**
 * Load and parse the plugins configuration from YAML
 */
export function loadPluginConfig(): PluginsConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const configPath = path.join(process.cwd(), 'config', 'plugins.yaml');
  
  if (!fs.existsSync(configPath)) {
    console.warn('plugins.yaml not found, using default config');
    return { plugins: {} };
  }

  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    cachedConfig = yaml.parse(fileContents) as PluginsConfig;
    return cachedConfig;
  } catch (error) {
    console.error('Failed to parse plugins.yaml:', error);
    return { plugins: {} };
  }
}

/**
 * Check if a plugin is enabled
 */
export function isPluginEnabled(pluginName: string): boolean {
  const config = loadPluginConfig();
  return config.plugins[pluginName]?.enabled ?? false;
}

/**
 * Get configuration for a specific plugin
 */
export function getPluginConfig<T = any>(pluginName: string): T | null {
  const config = loadPluginConfig();
  const pluginConfig = config.plugins[pluginName];
  
  if (!pluginConfig || !pluginConfig.enabled) {
    return null;
  }
  
  return pluginConfig as T;
}

/**
 * Get all enabled plugins
 */
export function getEnabledPlugins(): string[] {
  const config = loadPluginConfig();
  return Object.entries(config.plugins)
    .filter(([_, pluginConfig]) => pluginConfig.enabled)
    .map(([pluginName]) => pluginName);
}

/**
 * Reset the cached configuration (useful for development)
 */
export function resetPluginCache(): void {
  cachedConfig = null;
}
