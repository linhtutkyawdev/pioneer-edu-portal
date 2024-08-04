'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { revokePrivileges } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="destructive"
      className="w-40"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Revoking...' : 'Revoke Previleges'}
    </Button>
  );
}

export default function PrivilegeButton({ id }: { id: string }) {
  return (
    <form
      action={(formData) => {
        confirm('Are you sure you want to revoke privileges?') &&
          revokePrivileges(formData);
      }}
    >
      <input type="text" name="id" required hidden value={id} readOnly />
      <SubmitButton />
    </form>
  );
}
