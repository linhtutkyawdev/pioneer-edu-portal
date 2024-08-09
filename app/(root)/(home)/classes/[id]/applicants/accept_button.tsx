'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { grantPrivileges } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="secondary"
      className="w-28"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Accepting...' : 'Accept'}
    </Button>
  );
}

export default function AcceptButton({
  id,
  class_id,
  warn,
  warnMsg,
}: {
  id: string;
  class_id: number;
  warn?: boolean;
  warnMsg?: string;
}) {
  return (
    <form
      action={(formData) => {
        !warn
          ? grantPrivileges(formData)
          : confirm(warnMsg || 'Are you sure you want to continue?') &&
            grantPrivileges(formData);
      }}
    >
      <input type="text" name="id" required hidden value={id} readOnly />
      <input
        type="number"
        name="class_id"
        required
        hidden
        value={class_id}
        readOnly
      />
      <SubmitButton />
    </form>
  );
}
