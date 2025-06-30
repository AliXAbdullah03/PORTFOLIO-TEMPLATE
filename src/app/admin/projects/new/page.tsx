import { ProjectForm } from '@/components/project-form';

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">New Project</h1>
      <ProjectForm />
    </div>
  );
}
