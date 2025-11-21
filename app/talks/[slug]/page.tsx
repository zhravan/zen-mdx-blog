import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getContentTypeById } from '@/lib/content-types';
import { getContentForType, getContentBySlug } from '@/lib/content';
import { filterDrafts } from '@/lib/plugins/drafts';
import { DraftPreviewGate } from '@/components/DraftPreviewGate';
import { getPluginConfig } from '@/lib/plugins/registry';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const contentType = getContentTypeById('talks');
  if (!contentType) return [];
  
  const allItems = getContentForType(contentType);
  const items = filterDrafts(allItems);
  
  return items.map((item) => ({
    slug: item.slug
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const contentType = getContentTypeById('talks');
  
  if (!contentType) return {};
  
  const item = getContentBySlug(contentType, slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.description
  };
}

export default async function TalksPost({ params }: PageProps) {
  const { slug } = await params;
  const contentType = getContentTypeById('talks');
  
  if (!contentType) {
    notFound();
  }
  
  const item = getContentBySlug(contentType, slug);
  if (!item) {
    notFound();
  }

  // Import the MDX content dynamically
  let MdxContent;
  try {
    MdxContent = (await import(`@/content/talks/${slug}.mdx`)).default;
  } catch (e) {
    notFound();
  }

  const draftsConfig = getPluginConfig<{ enabled: boolean; previewToken: string }>('drafts');

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <DraftPreviewGate 
        isDraft={item.draft || false}
        previewToken={draftsConfig?.previewToken || ''}
      >
        <article>
          <header className="mb-8 space-y-2">
            <h1 className="text-2xl font-bold">{item.title}</h1>
            {item.description && (
              <p className="text-sm opacity-70">{item.description}</p>
            )}
            <div className="flex items-center gap-4 text-xs opacity-50">
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {item.tags && item.tags.length > 0 && (
                <div className="flex gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded border"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>
          <div className="prose prose-sm max-w-none">
            <MdxContent />
          </div>
        </article>
      </DraftPreviewGate>
    </Suspense>
  );
}
