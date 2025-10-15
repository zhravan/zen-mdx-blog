export const metadata = {
  title: 'About',
  description: 'Learn more about me and what I do.'
};

export default function About() {
  return (
    <div className="space-y-6">
      <section className="animate-fade-in">
        <h1 className="text-sm mb-4">About</h1>
      </section>

      <section
        className="prose animate-fade-up"
        style={{ animationDelay: '100ms' }}
      >
        <h2 className="text-xs">Background</h2>
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          I'm a developer focused on creating tools and experiences that make
          technology more accessible. My background spans full-stack
          development, developer relations, and technical writing.
        </p>

        <h2 className="text-xs">What I Do</h2>
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          Currently, I spend my time building developer tools, writing about
          software development, and helping companies improve their developer
          experience. I believe that great documentation and intuitive APIs are
          just as important as the code itself.
        </p>

        <h3 className="text-xs">Focus Areas</h3>
        <ul className="text-xs space-y-1" style={{ color: 'var(--color-muted-foreground)' }}>
          <li>Developer experience and tooling</li>
          <li>Technical writing and documentation</li>
          <li>Web performance and accessibility</li>
          <li>Open source contribution</li>
        </ul>

        <h2 className="text-xs">Beyond Code</h2>
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          When I'm not at my keyboard, you'll find me exploring new music,
          reading about design and human-computer interaction, or spending time
          outdoors. I'm a firm believer that diverse interests make for better
          developers.
        </p>

        <h2 className="text-xs">Get in Touch</h2>
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          I'm always interested in connecting with other developers, designers,
          and creators. Whether you want to discuss a project, collaborate on
          something new, or just chat about technology, feel free to reach out.
        </p>

        <div className="flex gap-4 mt-4 text-xs">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150"
          >
            Twitter
          </a>
          <a href="mailto:hello@example.com" className="transition-colors duration-150">
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
