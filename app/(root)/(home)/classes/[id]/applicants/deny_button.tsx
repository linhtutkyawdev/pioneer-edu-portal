'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { rejectApplication } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="destructive"
      className="w-28"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Rejecting...' : 'Reject'}
    </Button>
  );
}

export default function DenyButton({
  id,
  warn,
  warnMsg,
}: {
  id: string;
  warn?: boolean;
  warnMsg?: string;
}) {
  return (
    <form
      action={(formData) => {
        !warn
          ? rejectApplication(formData)
          : confirm(warnMsg || 'Are you sure you want to continue?') &&
            rejectApplication(formData);
      }}
    >
      <input type="text" name="id" required hidden value={id} readOnly />
      <SubmitButton />
    </form>
  );
}
