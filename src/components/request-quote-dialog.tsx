'use client';

import { useState, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { handleQuoteRequest } from '@/app/actions';
import { Rocket } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit Request'}
    </Button>
  );
}

export function RequestQuoteDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(handleQuoteRequest, null);

  useEffect(() => {
    if (state?.success) {
      // The success message will be shown, no need to close the dialog automatically.
    } else if (state?.error) {
      // If there's an error, keep the dialog open to show it.
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
            <Rocket className="mr-2 h-4 w-4" />
            Request a Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Have a project in mind? Fill out the form below and I'll get back to you with a proposal.
          </DialogDescription>
        </DialogHeader>
        {state?.success ? (
            <div className="py-8 text-center">
                <h3 className="text-lg font-medium text-primary">Thank You!</h3>
                <p className="text-muted-foreground mt-2">{state.message}</p>
                <DialogFooter className="sm:justify-center mt-4">
                    <DialogClose asChild>
                        <Button type="button" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </div>
        ) : (
            <form action={formAction}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" name="name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email" name="email" type="email" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Project
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            className="col-span-3"
                            placeholder="Describe your project requirements..."
                            required
                        />
                    </div>
                    {state?.error && (
                        <p className="text-sm text-destructive col-span-4 text-center">{state.error}</p>
                    )}
                </div>
                <DialogFooter>
                    <SubmitButton />
                </DialogFooter>
            </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
