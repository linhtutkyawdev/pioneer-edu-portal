'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { deleteApplication } from './actions';

function SubmitButton({ isPending }: { isPending?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="destructive"
      className="w-full"
      type="submit"
      aria-disabled={pending}
    >
      {pending
        ? isPending
          ? 'Canceling...'
          : 'Deleting...'
        : isPending
          ? 'Cancel'
          : 'Delete'}
    </Button>
  );
}

export default function CancelButton({
  id,
  class_id,
  isPending,
}: {
  id: string;
  class_id: number;
  isPending?: boolean;
}) {
  return (
    <form action={deleteApplication}>
      <input type="text" name="id" required hidden value={id} readOnly />
      <input
        type="number"
        name="class_id"
        required
        hidden
        value={class_id}
        readOnly
      />
      <SubmitButton isPending={isPending} />
    </form>
  );
}
