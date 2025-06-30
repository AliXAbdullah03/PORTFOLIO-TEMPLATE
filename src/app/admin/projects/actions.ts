'use server';

import { z } from 'zod';
import { saveProject as save, deleteProjectById as del } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  hint: z.string().optional(),
  url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  tags: z.string(),
});

export async function saveProject(prevState: any, formData: FormData) {
  const validatedFields = projectSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation Error: Please check your input.',
    };
  }

  const { tags, ...projectData } = validatedFields.data;

  const projectToSave = {
    ...projectData,
    image: projectData.image || 'https://placehold.co/1280x720.png',
    url: projectData.url || '#',
    tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
  };
  
  try {
    await save(projectToSave);
  } catch (error) {
    return {
      message: 'Database Error: Failed to save project.',
    };
  }
  
  revalidatePath('/admin/projects');
  revalidatePath('/');
  redirect('/admin/projects');
}

export async function deleteProject(projectId: string) {
    try {
        await del(projectId);
        revalidatePath('/admin/projects');
        revalidatePath('/');
        return { message: 'Deleted Project.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Project.' };
    }
}
