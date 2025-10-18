import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { getPostMetadata } from '@/lib/seo';
import { BackLink } from '@/components/navigation';

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

  return (
    <div className="space-y-6 text-xxs">
      <div className="flex items-center gap-2 mb-8">
        <BackLink href="/blog">Back to Blog</BackLink>
      </div>

      <article className="animate-fade-in prose max-w-none">
        <p className="opacity-70 mb-4" style={{ color: 'var(--color-muted-foreground)' }}>
          {post.date}
        </p>
        <Content />
      </article>
    </div>
  );
}
