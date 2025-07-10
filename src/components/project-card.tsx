import type { Project } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from './ui/badge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col cursor-pointer">
          <CardHeader>
            <CardTitle className="font-headline text-xl text-primary">{project.title}</CardTitle>
            <CardDescription className="text-muted-foreground pt-2 h-12 overflow-hidden text-ellipsis">
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">{project.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative aspect-video rounded-md overflow-hidden mt-4">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint={project.hint}
            />
          </div>
          <DialogDescription className="text-base text-foreground">
            {project.description}
          </DialogDescription>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
