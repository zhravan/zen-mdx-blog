import { getAllPosts } from '@/lib/blog';
import { loadSeoConfig } from '@/lib/seo';

export const revalidate = 3600;

export async function GET() {
  const posts = getAllPosts();
  const { siteUrl, title: SITE_TITLE, description: SITE_DESCRIPTION } = loadSeoConfig();

  const items = posts.map((post) => {
  const url = `${siteUrl}/blog/${post.slug}`;
    return {
      id: url,
      url,
      title: post.title || post.slug,
      content_text: post.description || '',
      date_published: post.date ? new Date(post.date).toISOString() : undefined
    };
  });

  const json = {
    version: 'https://jsonfeed.org/version/1',
  title: SITE_TITLE,
  home_page_url: siteUrl,
  feed_url: `${siteUrl}/feed.json`,
  description: SITE_DESCRIPTION,
    items
  };

  return new Response(JSON.stringify(json, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}

