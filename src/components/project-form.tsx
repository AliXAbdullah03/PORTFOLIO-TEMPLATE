'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { saveProject } from '@/app/admin/projects/actions';
import type { Project } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isEditing ? 'Saving...' : 'Creating...') : (isEditing ? 'Save Changes' : 'Create Project')}
    </Button>
  );
}

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(saveProject, initialState);
  const isEditing = !!project;

  return (
    <form action={dispatch}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</CardTitle>
          <CardDescription>Fill in the details below to showcase your work.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <input type="hidden" name="id" defaultValue={project?.id} />

          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" name="title" placeholder="e.g., AI-Powered Content Generator" defaultValue={project?.title} />
            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title.join(', ')}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="A short, compelling description of your project." defaultValue={project?.description} rows={4} />
            {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description.join(', ')}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="url">Project URL</Label>
              <Input id="url" name="url" placeholder="https://example.com" defaultValue={project?.url} />
              {state.errors?.url && <p className="text-sm text-destructive">{state.errors.url.join(', ')}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" placeholder="https://placehold.co/1280x720.png" defaultValue={project?.image} />
               {state.errors?.image && <p className="text-sm text-destructive">{state.errors.image.join(', ')}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" name="tags" placeholder="e.g., Generative AI, Next.js, Firebase" defaultValue={project?.tags.join(', ')} />
              {state.errors?.tags && <p className="text-sm text-destructive">{state.errors.tags.join(', ')}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hint">Image AI Hint</Label>
              <Input id="hint" name="hint" placeholder="e.g., robot writing" defaultValue={project?.hint} />
              <p className="text-xs text-muted-foreground">One or two keywords for AI image search.</p>
              {state.errors?.hint && <p className="text-sm text-destructive">{state.errors.hint.join(', ')}</p>}
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" asChild>
                <Link href="/admin/projects">Cancel</Link>
            </Button>
            <SubmitButton isEditing={isEditing} />
        </CardFooter>
      </Card>
    </form>
  );
}
