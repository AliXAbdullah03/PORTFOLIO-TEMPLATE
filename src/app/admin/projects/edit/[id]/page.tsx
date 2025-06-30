import { ProjectForm } from '@/components/project-form';
import { getProjectById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
