import { ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Work',
  description: 'A selection of projects I've built and contributed to.'
};

const projects = [
  {
    title: 'Project Alpha',
    description:
      'A developer tool that simplifies API integration and reduces boilerplate code.',
    tech: ['React', 'TypeScript', 'Node.js'],
    link: 'https://github.com'
  },
  {
    title: 'Design System',
    description:
      'A comprehensive component library built with accessibility and performance in mind.',
    tech: ['React', 'Tailwind CSS', 'Storybook'],
    link: 'https://github.com'
  },
  {
    title: 'CLI Tool',
    description:
      'Command-line utility for automating common development workflows.',
    tech: ['Node.js', 'TypeScript'],
    link: 'https://github.com'
  }
];

export default function Work() {
  return (
    <div className="space-y-6">
      <section style={{ animation: 'fade-in 0.4s ease-out' }}>
        <h1 className="text-sm mb-4">Work</h1>
        <p className="text-xs mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
          A selection of projects I've built and contributed to.
        </p>
      </section>

      <section>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="space-y-1 group"
              style={{
                animation: 'fade-up 0.5s ease-out',
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xs transition-colors">
                  {project.title}
                </h2>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors flex-shrink-0 no-underline border-none pb-0"
                  style={{ color: 'var(--color-muted-foreground)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-foreground)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-muted-foreground)';
                  }}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
                {project.description}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-muted-foreground)', opacity: 0.7 }}>
                {project.tech.join(' · ')}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          You can find more of my work on{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}

