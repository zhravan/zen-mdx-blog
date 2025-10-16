import { getAllPosts } from '@/lib/blog';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';

export const revalidate = 3600; // Rebuild feed every hour

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
      const title = post.title || post.slug;
      const description = post.description || '';
      return `\n      <item>\n        <title><![CDATA[${title}]]></title>\n        <link>${url}</link>\n        <guid>${url}</guid>\n        <description><![CDATA[${description}]]></description>\n        <pubDate>${pubDate}</pubDate>\n      </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title><![CDATA[${SITE_TITLE}]]></title>\n    <link>${SITE_URL}</link>\n    <description><![CDATA[${SITE_DESCRIPTION}]]></description>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}\n  </channel>\n</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}

