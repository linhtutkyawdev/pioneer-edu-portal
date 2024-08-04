'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  id: z
    .string({
      invalid_type_error: 'Invalid id',
    })
    .min(1),
});

export async function markAsRead(formData: FormData) {
  const parse = schema.safeParse({
    id: formData.get('id'),
  });

  if (!parse.success) {
    return { message: 'Failed to read id' };
  }

  const data = parse.data;

  try {
    await sql`UPDATE contact set is_read = true where id = ${data.id};`;
    revalidatePath('/');
    // return { message: "Granted privileges" };
  } catch (e) {
    // return { message: "Failed to grant privileges" };
  }
}

export async function deleteContact(formData: FormData) {
  const parse = schema.safeParse({
    id: formData.get('id'),
  });

  if (!parse.success) {
    return { message: 'Failed to read id' };
  }

  const data = parse.data;

  try {
    await sql`DELETE FROM contact where id = ${data.id};`;
    revalidatePath('/');
    // return { message: "Granted privileges" };
  } catch (e) {
    // return { message: "Failed to grant privileges" };
  }
}
