'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { deleteContact } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="destructive"
      className="w-28"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={(formData) => {
        confirm('Are you sure you want to delete the message?') &&
          deleteContact(formData);
      }}
    >
      <input type="text" name="id" required hidden value={id} readOnly />
      <SubmitButton />
    </form>
  );
}
