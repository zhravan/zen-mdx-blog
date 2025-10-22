import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { NavLink } from '@/components/navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { CommandPaletteWithButton } from '@/components/CommandPaletteWithButton';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeStyleTag from '@/components/ThemeStyleTag';
import { Analytics } from '@/components/Analytics';
import { getAllPosts } from '@/lib/blog';
import { getDefaultMetadata } from '@/lib/seo';
import { getCommandPaletteConfig } from '@/lib/plugins/command-palette';
import { getScrollProgressConfig } from '@/lib/plugins/scroll-progress';
import { getScrollToTopConfig } from '@/lib/plugins/scroll-to-top';
import { getAnalyticsConfig, getAnalyticsScriptSrc, getAnalyticsScriptAttrs } from '@/lib/plugins/analytics';

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
  
  // Load plugin configurations
  const commandPaletteConfig = getCommandPaletteConfig();
  const scrollProgressConfig = getScrollProgressConfig();
  const scrollToTopConfig = getScrollToTopConfig();
  
  // Analytics configuration
  const analyticsConfig = getAnalyticsConfig();
  const analyticsScriptSrc = analyticsConfig ? getAnalyticsScriptSrc(analyticsConfig.provider, analyticsConfig.domain) : '';
  const analyticsScriptAttrs = analyticsConfig ? getAnalyticsScriptAttrs(analyticsConfig) : {};

  return (
    <html lang="en" className={spaceGrotesk.className}>
      <head>
        <ThemeStyleTag />
      </head>
      <body className="antialiased">
        <Analytics 
          config={analyticsConfig}
          scriptSrc={analyticsScriptSrc}
          scriptAttrs={analyticsScriptAttrs}
        />
        <ThemeProvider>
          <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
            {scrollProgressConfig && (
              <ScrollProgress 
                position={scrollProgressConfig.position}
                height={scrollProgressConfig.height}
              />
            )}
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
            {scrollToTopConfig && (
              <ScrollToTop 
                showAfter={scrollToTopConfig.showAfter}
                position={scrollToTopConfig.position}
                smooth={scrollToTopConfig.smooth}
              />
            )}
            {commandPaletteConfig && (
              <CommandPaletteWithButton 
                posts={posts}
                fuzzyThreshold={commandPaletteConfig.fuzzyThreshold}
                showPages={commandPaletteConfig.showPages}
                showPosts={commandPaletteConfig.showPosts}
              />
            )}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
