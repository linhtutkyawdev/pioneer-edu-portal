'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { deleteApplication } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="destructive"
      className="w-full"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Canceling...' : 'Cancel'}
    </Button>
  );
}

export default function CancelButton({ id }: { id: string }) {
  return (
    <form action={deleteApplication}>
      <input type="text" name="id" required hidden value={id} readOnly />
      <SubmitButton />
    </form>
  );
}
