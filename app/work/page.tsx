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
      <section className="animate-fade-in">
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
              className="space-y-1 animate-fade-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xs transition-colors group-hover:opacity-80">
                  {project.title}
                </h2>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 no-underline border-none pb-0 transition-colors"
                  style={{ color: 'var(--color-muted-foreground)' }}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {project.description}
              </p>
              <p
                className="text-xs opacity-70"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {project.tech.join(' · ')}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          You can find more of my work on{' '}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}
