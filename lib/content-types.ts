import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

export interface ContentType {
  id: string;
  label: string;
  path: string;
  contentDir: string | null;
  icon?: string | null;
  enabled: boolean;
  description?: string;
  showInNav?: boolean;
}

interface ContentTypesConfig {
  contentTypes: ContentType[];
}

const configPath = path.join(process.cwd(), 'config', 'content-types.yaml');

let cachedConfig: ContentTypesConfig | null = null;

function loadContentTypesConfig(): ContentTypesConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    cachedConfig = yaml.parse(fileContents) as ContentTypesConfig;
    return cachedConfig;
  } catch (error) {
    console.warn('Failed to load content-types.yaml, using defaults:', error);
    // Return default configuration if file doesn't exist
    return {
      contentTypes: [
        {
          id: 'blog',
          label: 'Blog',
          path: '/blog',
          contentDir: 'content/blog',
          enabled: true,
          showInNav: true,
        },
        {
          id: 'work',
          label: 'Work',
          path: '/work',
          contentDir: null,
          enabled: true,
          showInNav: true,
        },
      ],
    };
  }
}

/**
 * Get all content types from configuration
 */
export function getAllContentTypes(): ContentType[] {
  const config = loadContentTypesConfig();
  return config.contentTypes.filter((ct) => ct.enabled);
}

/**
 * Get content types that should appear in navigation
 */
export function getNavigationContentTypes(): ContentType[] {
  return getAllContentTypes().filter((ct) => ct.showInNav !== false);
}

/**
 * Get a specific content type by ID
 */
export function getContentTypeById(id: string): ContentType | undefined {
  return getAllContentTypes().find((ct) => ct.id === id);
}

/**
 * Get a content type by its path
 */
export function getContentTypeByPath(urlPath: string): ContentType | undefined {
  return getAllContentTypes().find((ct) => ct.path === urlPath);
}

/**
 * Check if a content type has MDX content
 */
export function hasContentDirectory(contentType: ContentType): boolean {
  return contentType.contentDir !== null && contentType.contentDir !== undefined;
}
