export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
}

const posts: BlogPost[] = [
  {
    slug: 'developer-experience',
    title: 'Developer Experience Matters',
    date: 'February 20, 2024',
    description:
      'Why great developer experience is crucial for product success.'
  },
  {
    slug: 'welcome',
    title: 'Welcome to My Blog',
    date: 'January 15, 2024',
    description:
      'An introduction to my writing and what you can expect to find here.'
  }
];

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

