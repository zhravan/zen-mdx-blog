import { getAllPosts } from '@/lib/blog';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';

export const revalidate = 3600;

export async function GET() {
  const posts = getAllPosts();
  const updated = posts[0]?.date ? new Date(posts[0].date).toISOString() : new Date().toISOString();

  const entries = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const title = post.title || post.slug;
      const summary = post.description || '';
      const published = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
      return `\n    <entry>\n      <title><![CDATA[${title}]]></title>\n      <link href="${url}" />\n      <id>${url}</id>\n      <updated>${published}</updated>\n      <summary><![CDATA[${summary}]]></summary>\n    </entry>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom">\n  <title><![CDATA[${SITE_TITLE}]]></title>\n  <subtitle><![CDATA[${SITE_DESCRIPTION}]]></subtitle>\n  <link href="${SITE_URL}/atom.xml" rel="self" />\n  <link href="${SITE_URL}" />\n  <updated>${updated}</updated>\n  <id>${SITE_URL}</id>${entries}\n</feed>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}

