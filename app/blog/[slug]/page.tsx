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

      <article className="prose animate-fade-in">
        <h1 className="text-base mb-2">{post.title}</h1>
        <p
          className="text-xs mb-6 opacity-70"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          {post.date}
        </p>
        <Content />
      </article>
    </div>
  );
}
