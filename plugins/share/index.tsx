import { ShareButtons as ShareButtonsComponent, ShareButtonsProps } from './components/ShareButtons';
import { getPluginConfig } from '@/lib/plugins/loader';

export { ShareButtonsComponent as ShareButtons };

export async function ShareButtonsWithConfig(props: Omit<ShareButtonsProps, 'config'>) {
  const config = getPluginConfig('share-buttons');
  
  return (
    <ShareButtonsComponent
      {...props}
      config={config || undefined}
    />
  );
}

export default ShareButtonsWithConfig;
