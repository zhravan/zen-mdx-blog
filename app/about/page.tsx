export const metadata = {
  title: 'About',
  description: 'Learn more about me and what I do.'
};

export default function About() {
  return (
    <div className="space-y-6">
      <section style={{ animation: 'fade-in 0.4s ease-out' }}>
        <h1 className="text-sm mb-4 font-normal">About</h1>
      </section>

      <section
        className="prose"
        style={{
          animation: 'fade-up 0.5s ease-out',
          animationDelay: '100ms',
          animationFillMode: 'both'
        }}
      >
        <h2 className="text-xs font-normal">Background</h2>
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          I'm a developer focused on creating tools and experiences that make
          technology more accessible. My background spans full-stack
          development, developer relations, and technical writing.
        </p>

        <h2 className="text-xs font-normal">What I Do</h2>
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          Currently, I spend my time building developer tools, writing about
          software development, and helping companies improve their developer
          experience. I believe that great documentation and intuitive APIs are
          just as important as the code itself.
        </p>

        <h3 className="text-xs font-normal">Focus Areas</h3>
        <ul
          className="text-xs space-y-1 list-disc ml-6"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          <li>Developer experience and tooling</li>
          <li>Technical writing and documentation</li>
          <li>Web performance and accessibility</li>
          <li>Open source contribution</li>
        </ul>

        <h2 className="text-xs font-normal">Beyond Code</h2>
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          When I'm not at my keyboard, you'll find me exploring new music,
          reading about design and human-computer interaction, or spending time
          outdoors. I'm a firm believer that diverse interests make for better
          developers.
        </p>

        <h2 className="text-xs font-normal">Get in Touch</h2>
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
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a href="mailto:hello@example.com">Email</a>
        </div>
      </section>
    </div>
  );
}
