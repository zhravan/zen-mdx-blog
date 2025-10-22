import type { Plugin } from '@/types/plugin';
import { shareButtonsConfigSchema, defaultConfig, type ShareButtonsConfig } from './config';
import { ShareButtons as ShareButtonsComponent } from './components/ShareButtons';
import { ShareButtonsClient } from './client';

export { ShareButtonsClient };

// Re-export the ShareButtons component for direct usage
export const ShareButtons = ShareButtonsComponent;

export const shareButtonsPlugin: Plugin<ShareButtonsConfig> = {
  name: 'share-buttons',
  configSchema: shareButtonsConfigSchema,
  defaultConfig,
  clientComponents: {
    ShareButtons: ShareButtonsClient,
  },
  components: {
    ShareButtons,
  },
  hooks: {
    'app:init': ({ config }) => {
      // Initialize the share buttons plugin
      if (config.enabled && !config.previewOnly) {
        // Client-side initialization is handled by ShareButtonsClient
      }
      return {};
    },
  },
};

export default shareButtonsPlugin;
