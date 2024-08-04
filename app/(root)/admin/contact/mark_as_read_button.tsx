'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { markAsRead } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="secondary"
      className="w-40"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Marking...' : 'Mark As Read'}
    </Button>
  );
}

export default function MarkAsReadButton({ id }: { id: string }) {
  return (
    <form action={markAsRead}>
      <input type="text" name="id" required hidden value={id} readOnly />
      <SubmitButton />
    </form>
  );
}
