import type { Project } from '@/lib/data';
import { ProjectCard } from './project-card';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
        My <span className="text-primary">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
