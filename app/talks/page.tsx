import { getContentTypeById } from '@/lib/content-types';
import { getContentForType } from '@/lib/content';
import { filterDrafts } from '@/lib/plugins/drafts';
import { ContentListing } from '@/components/ContentListing';

export async function generateMetadata() {
  const contentType = getContentTypeById('talks');
  return {
    title: contentType?.label || 'Tech Talks',
    description: contentType?.description || 'Presentations and speaking engagements'
  };
}

export default function TalksPage() {
  const contentType = getContentTypeById('talks');
  
  if (!contentType) {
    return <div>Content type not found</div>;
  }

  const allItems = getContentForType(contentType);
  const items = filterDrafts(allItems);

  return <ContentListing items={items} contentType={contentType} />;
}
