import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { NavLink } from '@/components/navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { CommandPalette } from '@/components/CommandPalette';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeStyleTag from '@/components/ThemeStyleTag';
import { getAllPosts } from '@/lib/blog';
import { getDefaultMetadata } from '@/lib/seo';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = getDefaultMetadata();

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();

  return (
    <html lang="en" className={spaceGrotesk.className}>
      <head>
        <ThemeStyleTag />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
            <ScrollProgress />
            <nav>
              <div className="max-w-2xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  {navItems.map((item) => (
                    <NavLink key={item.path} href={item.path}>
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>
            <main className="max-w-2xl mx-auto px-4 sm:px-8 py-12 sm:py-16">{children}</main>
            <footer className="mt-24">
              <div className="max-w-2xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
                <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                  © {new Date().getFullYear()}
                </p>
              </div>
            </footer>
            <ScrollToTop />
            <CommandPalette posts={posts} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
