import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { getPostMetadata } from '@/lib/seo';
import { BackLink } from '@/components/navigation';
import { getPluginConfig } from '@/lib/plugins/registry';
import { getReadingTimeForPost } from '@/lib/plugins/reading-time';
import { getTocForPost } from '@/lib/plugins/toc';
import { findRelatedPosts } from '@/lib/plugins/related-posts';
import { ReadingTimeBadge } from '@/components/ReadingTimeBadge';
import { TableOfContents } from '@/components/TableOfContents';
import { MobileTOC } from '@/components/MobileTOC';
import { RelatedPosts } from '@/components/RelatedPosts';
import { TagsList } from '@/components/TagsList';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
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
  const relatedPosts = findRelatedPosts(slug);
  
  // Get plugin configs
  const tocConfig = getPluginConfig<{ position: 'left' | 'right' | 'inline'; sticky: boolean }>('toc');
  const relatedConfig = getPluginConfig<{ showDate: boolean; showDescription: boolean }>('related-posts');
  const readingTimeConfig = getPluginConfig<{ showIcon: boolean; showWordCount: boolean }>('reading-time');

  const showTocSidebar = tocHeadings && tocConfig && tocConfig.position !== 'inline';
  const showTocInline = tocHeadings && tocConfig && tocConfig.position === 'inline';

  return (
    <div className="space-y-6 text-xxs">
      <div className="flex items-center gap-2 mb-8">
        <BackLink href="/blog">Back to Blog</BackLink>
      </div>

      <div className={showTocSidebar ? 'lg:grid lg:grid-cols-[1fr_250px] lg:gap-12' : ''}>
        <article className="animate-fade-in prose max-w-none">
          <div className="space-y-3 mb-6">
            <p className="opacity-70" style={{ color: 'var(--color-muted-foreground)' }}>
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

          {tocHeadings && tocHeadings.length > 0 && (
            <MobileTOC headings={tocHeadings} />
          )}

          {showTocInline && (
            <TableOfContents
              headings={tocHeadings}
              position="inline"
              sticky={false}
            />
          )}

          <Content />

          {relatedPosts && relatedConfig && (
            <RelatedPosts
              posts={relatedPosts}
              showDate={relatedConfig.showDate}
              showDescription={relatedConfig.showDescription}
            />
          )}
        </article>

        {showTocSidebar && (
          <aside className="hidden lg:block">
            <TableOfContents
              headings={tocHeadings}
              position={tocConfig.position}
              sticky={tocConfig.sticky}
            />
          </aside>
        )}
      </div>
    </div>
  );
}
