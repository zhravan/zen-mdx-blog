import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

export default async function sitemap() {
  const posts = getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date().toISOString()
  }));

  const routes = ['', '/blog', '/work', '/about'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  return [...routes, ...blogPosts];
}
