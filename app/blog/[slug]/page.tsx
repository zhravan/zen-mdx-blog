import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { getPostMetadata } from '@/lib/seo';
import { BackLink } from '@/components/navigation';
import { getPluginConfig } from '@/lib/plugins/registry';
import { getReadingTimeForPost } from '@/lib/plugins/reading-time';
import { getTocForPost } from '@/lib/plugins/toc';
import { getPostNavigation } from '@/lib/plugins/post-navigation';
import { isDraft } from '@/lib/plugins/drafts';
import { ReadingTimeBadge } from '@/components/ReadingTimeBadge';
import { TableOfContents } from '@/components/TableOfContents';
import { MobileTOC } from '@/components/MobileTOC';
import { PostNavigation } from '@/components/PostNavigation';
import { TagsList } from '@/components/TagsList';
import { DraftBadge } from '@/components/DraftBadge';
import { DraftPreviewGate } from '@/components/DraftPreviewGate';
import { Suspense } from 'react';
// Share buttons
import { ShareButtons } from '@/lib/plugins/share';
import { loadSeoConfig } from '@/lib/seo';

export async function generateStaticParams() {
  const allPosts = getAllPosts(true); // Include drafts for static generation
  return allPosts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return getPostMetadata({
    title: post.title,
    description: post.description,
    slug
  });
}

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  let Content;
  try {
    Content = (await import(`@/content/blog/${slug}.mdx`)).default;
  } catch (error) {
    console.error(`Failed to load blog post: ${slug}`, error);
    notFound();
  }

  // Load plugin data
  const readingTime = await getReadingTimeForPost(slug);
  const tocHeadings = await getTocForPost(slug);
  const postNav = getPostNavigation(slug);
  const cfg = loadSeoConfig();
  const absoluteUrl = `${cfg.siteUrl}/blog/${slug}`;
  
  // Get plugin configs
  const tocConfig = getPluginConfig<{ position: 'left' | 'right' | 'inline'; sticky: boolean }>('toc');
  const readingTimeConfig = getPluginConfig<{ showIcon: boolean; showWordCount: boolean }>('reading-time');
  const draftsConfig = getPluginConfig<{ enabled: boolean; previewToken: string }>('drafts');

  const showTocSidebar = tocHeadings && tocConfig && tocConfig.position !== 'inline';
  const showTocInline = tocHeadings && tocConfig && tocConfig.position === 'inline';

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DraftPreviewGate 
        isDraft={isDraft(post)} 
        previewToken={draftsConfig?.previewToken || ''}
      >
        <div className="space-y-6 text-xxs">
          <div className="flex items-center gap-2 mb-8">
            <BackLink href="/blog">Back to Blog</BackLink>
            {isDraft(post) && <DraftBadge draft={true} />}
          </div>

      {/* Metadata section - above content on mobile only */}
      <div className="space-y-2 mb-6 lg:hidden">
        <p className="text-[10px] opacity-50" style={{ color: 'var(--color-muted-foreground)' }}>
          {post.date}
        </p>
        {readingTime && readingTimeConfig && (
          <ReadingTimeBadge
            minutes={readingTime.minutes}
            words={readingTime.words}
            showIcon={readingTimeConfig.showIcon}
            showWordCount={readingTimeConfig.showWordCount}
          />
        )}
        {post.tags && post.tags.length > 0 && (
          <TagsList tags={post.tags} />
        )}
      </div>

      {/* Mobile TOC */}
      {tocHeadings && tocHeadings.length > 0 && (
        <MobileTOC headings={tocHeadings} />
      )}

      <div className={showTocSidebar ? 'lg:grid lg:grid-cols-[1fr_250px] lg:gap-12' : ''}>
        <article className="animate-fade-in prose max-w-none">
          {showTocInline && (
            <TableOfContents
              headings={tocHeadings}
              position="inline"
              sticky={false}
            />
          )}

          <Content />

          {/* Share buttons */}
          <div className="mt-6">
            <ShareButtons 
              title={post.title} 
              url={absoluteUrl}
            />
          </div>

          <PostNavigation previous={postNav.previous} next={postNav.next} />
        </article>

        {showTocSidebar && (
          <aside className="hidden lg:block space-y-6">
            {/* Metadata section - in sidebar on desktop */}
            <div className="space-y-2 pb-6 border-b border-gray-200 dark:border-gray-800">
              <p className="text-[10px] opacity-50" style={{ color: 'var(--color-muted-foreground)' }}>
                {post.date}
              </p>
              {readingTime && readingTimeConfig && (
                <ReadingTimeBadge
                  minutes={readingTime.minutes}
                  words={readingTime.words}
                  showIcon={readingTimeConfig.showIcon}
                  showWordCount={readingTimeConfig.showWordCount}
                />
              )}
              {post.tags && post.tags.length > 0 && (
                <TagsList tags={post.tags} />
              )}
              {/* Share buttons in sidebar */}
              <ShareButtons 
                title={post.title} 
                url={absoluteUrl}
              />
            </div>

            <TableOfContents
              headings={tocHeadings}
              position={tocConfig.position}
              sticky={tocConfig.sticky}
            />
          </aside>
        )}
      </div>
        </div>
      </DraftPreviewGate>
    </Suspense>
  );
}
