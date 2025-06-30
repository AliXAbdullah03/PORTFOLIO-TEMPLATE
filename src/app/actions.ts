'use server';

import {z} from 'zod';
import {createSession, deleteSession} from '@/lib/auth';
import {redirect} from 'next/navigation';
import {selectBackgroundAnimation} from '@/ai/flows/background-animation-selector';
import { requestQuote } from '@/ai/flows/quote-request-flow';

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

const quoteRequestSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    description: z.string().min(10, 'Please provide a brief project description.'),
});

export async function handleQuoteRequest(prevState: any, formData: FormData) {
    const validatedFields = quoteRequestSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.name?.[0] ||
                   validatedFields.error.flatten().fieldErrors.email?.[0] ||
                   validatedFields.error.flatten().fieldErrors.description?.[0] ||
                   'Invalid input.',
        };
    }

    try {
        const result = await requestQuote(validatedFields.data);
        return { success: true, message: result.confirmationMessage };
    } catch (error) {
        console.error('Error handling quote request:', error);
        return {
            error: 'An unexpected error occurred. Please try again later.',
        };
    }
}
