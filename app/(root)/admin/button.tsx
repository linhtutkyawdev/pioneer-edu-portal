'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { revokePrivileges } from './actions';

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="destructive"
      className="w-40"
      type="submit"
      aria-disabled={pending}
      disabled={disabled}
    >
      {pending ? 'Revoking...' : 'Revoke Previleges'}
    </Button>
  );
}

export default function PrivilegeButton({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  return (
    <form
      action={(formData) => {
        confirm('Are you sure you want to revoke privileges?') &&
          revokePrivileges(formData);
      }}
    >
      <input type="text" name="id" required hidden value={id} readOnly />
      <SubmitButton disabled={disabled} />
    </form>
  );
}
