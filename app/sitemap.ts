import { getAllPosts } from '@/lib/blog';
import { loadSeoConfig } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function sitemap() {
  const posts = getAllPosts();
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
