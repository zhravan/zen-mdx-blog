import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <section style={{ animation: 'fade-in 0.4s ease-out' }}>
        <h1 className="text-sm mb-4">Your Name</h1>
        <div className="text-xs leading-relaxed space-y-3">
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            I'm a developer and writer. I work on building tools that make
            technology more accessible and enjoyable to use. I've been coding
            for over a decade and teaching for half that time.
          </p>
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            My life's work is to make technology easy to understand and
            interesting to learn about. When I'm not writing code, I'm writing
            essays about it.
          </p>
        </div>
      </section>

      <section
        style={{
          animation: 'fade-up 0.5s ease-out',
          animationDelay: '100ms',
          animationFillMode: 'both'
        }}
      >
        <h2 className="text-xs mb-2">Featured Essays</h2>
        <ul className="space-y-1 list-none">
          <li>
            <Link href="/blog/developer-experience" className="text-xs">
              Developer Experience Matters
            </Link>
          </li>
          <li>
            <Link href="/blog/welcome" className="text-xs">
              Welcome to My Blog
            </Link>
          </li>
        </ul>
      </section>

      <section
        style={{
          animation: 'fade-up 0.5s ease-out',
          animationDelay: '200ms',
          animationFillMode: 'both'
        }}
      >
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          You can <Link href="/blog">read my writing</Link>, check out my{' '}
          <Link href="/work">projects</Link>, or{' '}
          <Link href="/about">learn more about me</Link>. I'm always interested
          in connecting with fellow developers and creators.
        </p>
      </section>
    </div>
  );
}

