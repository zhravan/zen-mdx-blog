import { PageHeader } from '@/components/PageHeader';

const pageMetadata = {
  title: 'About',
  // TODO: Update this description to reflect your about page
  description: '[Brief description about you for SEO]'
};

export const metadata = pageMetadata;

export default function About() {
  return (
    <div className="space-y-6 text-xxs">
      <PageHeader metadata={pageMetadata} />

      <section
        className="prose animate-fade-up"
        style={{ animationDelay: '100ms' }}
      >
        <h2 className="text-sm">Background</h2>
        {/* TODO: Replace with your background story */}
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          [Write about your background. Where did you start? What's your
          journey been like? What experiences shaped who you are today?]
        </p>

        <h2 className="text-sm">What I Do</h2>
        {/* TODO: Replace with what you currently do */}
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          [Describe what you currently do. What's your role? What kind of
          projects do you work on? What's your professional focus?]
        </p>

        <h3 className="text-sm">Focus Areas</h3>
        {/* TODO: Replace with your actual focus areas/skills */}
        <ul className="space-y-1" style={{ color: 'var(--color-muted-foreground)' }}>
          <li>[Focus area 1 - e.g., Frontend Development]</li>
          <li>[Focus area 2 - e.g., System Design]</li>
          <li>[Focus area 3 - e.g., Cloud Architecture]</li>
          <li>[Focus area 4 - e.g., Open Source]</li>
        </ul>

        <h2 className="text-sm">Beyond Code</h2>
        {/* TODO: Replace with your hobbies and interests */}
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          [Share your interests outside of work. What do you enjoy doing in
          your free time? What are your hobbies? This helps visitors connect
          with you on a personal level.]
        </p>

        <h2 className="text-sm">Get in Touch</h2>
        {/* TODO: Customize your contact message */}
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          [Write a brief message encouraging visitors to connect with you.
          What kind of conversations are you open to?]
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          {/* TODO: Replace with your actual GitHub URL */}
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150"
          >
            GitHub
          </a>
          {/* TODO: Replace with your actual Twitter/X URL */}
          <a
            href="https://twitter.com/your-handle"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150"
          >
            Twitter
          </a>
          {/* TODO: Replace with your actual email address */}
          <a href="mailto:your-email@example.com" className="transition-colors duration-150">
            Email
          </a>
          <span style={{ color: 'var(--color-muted-foreground)' }}>·</span>
          <a href="/feed.xml" className="transition-colors duration-150">
            RSS
          </a>
          <a href="/atom.xml" className="transition-colors duration-150">
            Atom
          </a>
          <a href="/feed.json" className="transition-colors duration-150">
            JSON
          </a>
        </div>
      </section>
    </div>
  );
}
