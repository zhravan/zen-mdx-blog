import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://next-mdx-blog.vercel.app'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Your Name',
    template: '%s | Your Name'
  },
  description: 'Developer, writer, and creator.'
};

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
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="min-h-screen">
          <nav className="max-w-2xl mx-auto px-8 py-8">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-xs no-underline border-none pb-0 hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-muted-foreground)' }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
          <main className="max-w-2xl mx-auto px-8 py-16">{children}</main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="mt-24">
      <div className="max-w-2xl mx-auto px-8 py-8">
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
