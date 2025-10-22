import { getAllPosts } from '@/lib/blog';
import { loadSeoConfig } from '@/lib/seo';
import { filterDrafts } from '@/lib/plugins/drafts';

export const dynamic = 'force-static';

export async function GET() {
  const allPosts = getAllPosts(true);
  const posts = filterDrafts(allPosts); // Filter drafts from feed
  const { siteUrl, title: SITE_TITLE, description: SITE_DESCRIPTION } = loadSeoConfig();

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
      const title = post.title || post.slug;
      const description = post.description || '';
      return `\n      <item>\n        <title><![CDATA[${title}]]></title>\n        <link>${url}</link>\n        <guid>${url}</guid>\n        <description><![CDATA[${description}]]></description>\n        <pubDate>${pubDate}</pubDate>\n      </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title><![CDATA[${SITE_TITLE}]]></title>\n    <link>${siteUrl}</link>\n    <description><![CDATA[${SITE_DESCRIPTION}]]></description>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}\n  </channel>\n</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}

