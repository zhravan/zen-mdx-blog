import { getAllPosts } from '@/lib/blog';

const SITE_URL = 'https://next-mdx-blog.vercel.app';

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
