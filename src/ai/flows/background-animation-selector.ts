// src/ai/flows/background-animation-selector.ts
'use server';

/**
 * @fileOverview Selects a background animation based on the content of the page.
 *
 * - selectBackgroundAnimation - A function that selects a background animation.
 * - SelectBackgroundAnimationInput - The input type for the selectBackgroundAnimation function.
 * - SelectBackgroundAnimationOutput - The return type for the selectBackgroundAnimation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelectBackgroundAnimationInputSchema = z.object({
  pageContent: z.string().describe('The content of the page to select a background animation for.'),
});
export type SelectBackgroundAnimationInput = z.infer<typeof SelectBackgroundAnimationInputSchema>;

const SelectBackgroundAnimationOutputSchema = z.object({
  animationName: z.string().describe('The name of the selected background animation.'),
  animationDescription: z.string().describe('A description of the selected background animation.'),
});
export type SelectBackgroundAnimationOutput = z.infer<typeof SelectBackgroundAnimationOutputSchema>;

export async function selectBackgroundAnimation(input: SelectBackgroundAnimationInput): Promise<SelectBackgroundAnimationOutput> {
  return selectBackgroundAnimationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selectBackgroundAnimationPrompt',
  input: {schema: SelectBackgroundAnimationInputSchema},
  output: {schema: SelectBackgroundAnimationOutputSchema},
  prompt: `You are an expert website background animation selector.

You will be provided with the content of a page and will select a background animation that is relevant to the content.

Page Content: {{{pageContent}}}

Consider the following animations:

- particles: A particle animation.
- gradient: A gradient animation.
- stars: A starfield animation.

Return the name of the animation and a short description of the animation.
`,
});

const selectBackgroundAnimationFlow = ai.defineFlow(
  {
    name: 'selectBackgroundAnimationFlow',
    inputSchema: SelectBackgroundAnimationInputSchema,
    outputSchema: SelectBackgroundAnimationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
