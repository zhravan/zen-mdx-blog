import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6 text-xxs">
      <section className="animate-fade-in">
        {/* TODO: Replace with your name (e.g., "John Doe") */}
        <h1 className="text-sm mb-4">[Your Name]</h1>
        <div className="prose space-y-3">
          {/* TODO: Replace with your introduction paragraph */}
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            [Write a brief introduction about yourself. What do you do? What are
            you passionate about? What drives your work?]
          </p>
          {/* TODO: Replace with your second paragraph about your mission/focus */}
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            [Add another paragraph about your mission, what you're currently
            working on, or what you hope to achieve through your work.]
          </p>
        </div>
      </section>

      <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h2 className="text-sm mb-2">Featured Essays</h2>
        {/* TODO: Update these links to point to your actual featured posts */}
        <ul className="space-y-1">
          <li>
            <Link
              href="/blog/developer-experience"
              className=""
              style={{ color: 'var(--color-link)' }}
            >
              [Featured Post Title 1]
            </Link>
          </li>
          <li>
            <Link
              href="/blog/welcome"
              className=""
              style={{ color: 'var(--color-link)' }}
            >
              [Featured Post Title 2]
            </Link>
          </li>
        </ul>
      </section>

      <section className="animate-fade-up" style={{ animationDelay: '200ms' }}>
        {/* TODO: Customize this call-to-action text */}
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          You can <Link href="/blog">read my writing</Link>, check out my{' '}
          <Link href="/work">projects</Link>, or{' '}
          <Link href="/about">learn more about me</Link>. [Add a personal touch
          about connecting with visitors.]
        </p>
      </section>
    </div>
  );
}
