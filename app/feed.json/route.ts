import { getAllPosts } from '@/lib/blog';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';

export const revalidate = 3600;

export async function GET() {
  const posts = getAllPosts();

  const items = posts.map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}`;
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
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
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

