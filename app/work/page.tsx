import { ExternalLink } from 'lucide-react';
import { getProjects } from '@/lib/projects';
import { PageHeader } from '@/components/PageHeader';

const pageMetadata = {
  title: 'Work',
  // TODO: Update this description to reflect your work
  description: '[Brief description of your work/projects for SEO]'
};

export const metadata = pageMetadata;

export default function Work() {
  const projects = getProjects();
  return (
    <div className="space-y-6 text-xxs">
      <PageHeader metadata={pageMetadata} />

      <section>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="space-y-1 animate-fade-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2
                  className="transition-opacity group-hover:opacity-80"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {project.title}
                </h2>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 no-underline border-none pb-0 transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-muted-foreground)' }}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
                {project.description}
              </p>
              {project.tech.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-[3px] border px-1.5 py-[1px]"
                      style={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-muted-foreground)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          {/* TODO: Update with your actual GitHub profile URL */}
          You can find more of my work on{' '}
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}
