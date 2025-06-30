'use server';
/**
 * @fileOverview A flow to handle user project quote requests.
 *
 * - requestQuote - A function that processes a quote request.
 * - QuoteRequestInput - The input type for the requestQuote function.
 * - QuoteRequestOutput - The return type for the requestQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuoteRequestInputSchema = z.object({
  name: z.string().describe('The name of the person requesting the quote.'),
  email: z.string().email().describe('The email of the person requesting the quote.'),
  description: z.string().describe('The description of the project for the quote.'),
});
export type QuoteRequestInput = z.infer<typeof QuoteRequestInputSchema>;

const QuoteRequestOutputSchema = z.object({
  confirmationMessage: z.string().describe('A warm confirmation message to the user.'),
});
export type QuoteRequestOutput = z.infer<typeof QuoteRequestOutputSchema>;

export async function requestQuote(input: QuoteRequestInput): Promise<QuoteRequestOutput> {
  return quoteRequestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quoteRequestPrompt',
  input: {schema: QuoteRequestInputSchema},
  output: {schema: QuoteRequestOutputSchema},
  prompt: `A potential client named {{name}} has requested a quote for a project.

Project Description:
"{{{description}}}"

Please generate a short, friendly, and professional confirmation message. Assure them that you have received their request and will get back to them at their email address ({{email}}) within 2-3 business days after reviewing the details. Thank them for their interest.`,
});

const quoteRequestFlow = ai.defineFlow(
  {
    name: 'quoteRequestFlow',
    inputSchema: QuoteRequestInputSchema,
    outputSchema: QuoteRequestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // In a real application, you might save this to a database or send an email here.
    return output!;
  }
);
