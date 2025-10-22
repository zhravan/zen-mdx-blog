import { getAllPosts } from '@/lib/blog';
import { loadSeoConfig } from '@/lib/seo';
import { filterDrafts } from '@/lib/plugins/drafts';

export const dynamic = 'force-static';

export default async function sitemap() {
  const allPosts = getAllPosts(true);
  const posts = filterDrafts(allPosts); // Filter drafts from sitemap
  const { siteUrl } = loadSeoConfig();

  const blogPosts = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString()
  }));

  const routes = ['', '/blog', '/work', '/about'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  return [...routes, ...blogPosts];
}
