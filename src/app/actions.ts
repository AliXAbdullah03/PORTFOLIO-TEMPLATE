'use server';

import {z} from 'zod';
import {createSession, deleteSession} from '@/lib/auth';
import {redirect} from 'next/navigation';
import {selectBackgroundAnimation} from '@/ai/flows/background-animation-selector';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: 'Invalid username or password.',
    };
  }

  const {username, password} = validatedFields.data;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    await createSession(username);
    redirect('/admin');
  }

  return {
    error: 'Invalid username or password.',
  };
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}

export async function getBackgroundAnimation(pageContent: string) {
  try {
    const result = await selectBackgroundAnimation({pageContent});
    return result.animationName;
  } catch (error) {
    console.error('Error selecting background animation:', error);
    // Fallback to a default animation
    return 'stars';
  }
}
