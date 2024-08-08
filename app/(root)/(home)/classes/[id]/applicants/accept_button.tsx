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
          ? grantPrivileges(formData)
          : confirm(warnMsg || 'Are you sure you want to continue?') &&
            grantPrivileges(formData);
      }}
    >
      <input type="text" name="id" required hidden value={id} readOnly />
      <SubmitButton />
    </form>
  );
}
