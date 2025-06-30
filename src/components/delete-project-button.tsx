'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useFormStatus } from 'react-dom';
import { deleteProject } from '@/app/admin/projects/actions';

function DeleteButton() {
    const { pending } = useFormStatus();
    return (
        <AlertDialogAction type="submit" disabled={pending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {pending ? 'Deleting...' : 'Delete'}
        </AlertDialogAction>
    )
}

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={e => e.preventDefault()} className="text-destructive">
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this project from your portfolio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={async () => {
              await deleteProject(projectId);
              setOpen(false);
          }}>
            <DeleteButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
