import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

  return {
    title: post.title,
    description: post.description
  };
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
    Content = (await import(`@/app/blog/${slug}/page.mdx`)).default;
  } catch (error) {
    console.error(`Failed to load blog post: ${slug}`, error);
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-8">
        <Link
          href="/blog"
          className="flex items-center gap-1 text-xs no-underline border-none pb-0 transition-colors"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Blog
        </Link>
      </div>

      <article className="animate-fade-in">
        <h1
          style={{
            fontSize: '0.9375rem',
            lineHeight: '1.6',
            fontWeight: 400,
            marginBottom: '0.5rem',
            color: 'var(--color-foreground)'
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            fontSize: '0.6875rem',
            lineHeight: '1.4',
            marginBottom: '1.5rem',
            color: 'var(--color-muted-foreground)',
            opacity: 0.7
          }}
        >
          {post.date}
        </p>
        <div>
          <Content />
        </div>
      </article>
    </div>
  );
}
