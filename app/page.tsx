import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="animate-fade-in">
        <h1 className="text-sm mb-4">Your Name</h1>
        <div className="prose text-xs leading-relaxed space-y-3">
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            I am a developer and writer. I work on building tools that make
            technology more accessible and enjoyable to use. I have been coding
            for over a decade and teaching for half that time.
          </p>
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            My life's work is to make technology easy to understand and
            interesting to learn about. When I am not writing code, I am writing
            essays about it.
          </p>
        </div>
      </section>

      <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h2 className="text-xs mb-2">Featured Essays</h2>
        <ul className="space-y-1">
          <li>
            <Link
              href="/blog/developer-experience"
              className="text-xs"
              style={{ color: 'var(--color-link)' }}
            >
              Developer Experience Matters
            </Link>
          </li>
          <li>
            <Link
              href="/blog/welcome"
              className="text-xs"
              style={{ color: 'var(--color-link)' }}
            >
              Welcome to My Blog
            </Link>
          </li>
        </ul>
      </section>

      <section className="animate-fade-up" style={{ animationDelay: '200ms' }}>
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          You can <Link href="/blog">read my writing</Link>, check out my{' '}
          <Link href="/work">projects</Link>, or{' '}
          <Link href="/about">learn more about me</Link>. I am always interested
          in connecting with fellow developers and creators.
        </p>
      </section>
    </div>
  );
}
