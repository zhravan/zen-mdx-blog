import type { ComponentType } from 'react';

export interface PluginConfig<T = any> {
  name: string;
  configSchema?: any;
  defaultConfig?: T;
  components?: Record<string, ComponentType<any>>;
  clientComponents?: Record<string, ComponentType<any>>;
  hooks?: {
    [key: string]: (params: any) => any;
  };
}

export interface PluginOptions {
  config?: Record<string, any>;
}

export type Plugin<T = any> = PluginConfig<T>;

export function definePlugin<T = any>(plugin: PluginConfig<T>): PluginConfig<T> {
  return plugin;
}
