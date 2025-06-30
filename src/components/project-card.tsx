import type { Project } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col">
      <CardHeader>
        <CardDescription className="text-muted-foreground">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative aspect-video rounded-md overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            data-ai-hint={project.hint}
          />
        </div>
      </CardContent>
    </Card>
  );
}
