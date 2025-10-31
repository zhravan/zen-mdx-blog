import type { ThemeName } from "./themes";
import { loadYaml } from './yaml-loader';
export interface SiteConfig {  
  name: string;  
  url: string;  
  description: string;  
  email: string;  
  favicon: string;  
}  

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const SITE_TITLE = "Your Name";
export const SITE_DESCRIPTION = "Engineer, writer, and creator.";

/**
 * Theme Configuration
 * 
 * Change ACTIVE_THEME to any of these options:
 * - 'vitesse-dark'
 * - 'github-dark'
 * - 'dracula'
 * - 'monokai'
 * - 'nord'
 * - 'one-dark-pro'
 * - 'tokyo-night'
 * - 'catppuccin-mocha'
 */
export const siteConfig = loadYaml<SiteConfig>('site.yaml');
export const ACTIVE_THEME: ThemeName = "vitesse-dark";
