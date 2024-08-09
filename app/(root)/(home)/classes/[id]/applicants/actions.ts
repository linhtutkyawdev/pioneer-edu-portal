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
  class_id: z
    .number({
      invalid_type_error: 'Invalid class_id',
    })
    .min(1),
});

export async function grantPrivileges(formData: FormData) {
  const parse = schema.safeParse({
    id: formData.get('id'),
    class_id: parseInt(formData.get('class_id') as string),
  });

  if (!parse.success) {
    return { message: 'Failed to read id' };
  }

  const data = parse.data;

  try {
    await sql`UPDATE student_applicants set status = 'accepted' WHERE student_id = ${data.id} and class_id = ${data.class_id};`;
    revalidatePath('/');
    // return { message: "Granted privileges" };
  } catch (e) {
    // return { message: "Failed to grant privileges" };
  }
}

export async function rejectApplication(formData: FormData) {
  const parse = schema.safeParse({
    id: formData.get('id'),
  });

  if (!parse.success) {
    return { message: 'Failed to read id' };
  }

  const data = parse.data;

  try {
    await sql`UPDATE student_applicants set status = 'rejected' WHERE student_id = ${data.id};`;
    revalidatePath('/');
    // return { message: "Granted privileges" };
  } catch (e) {
    // return { message: "Failed to grant privileges" };
  }
}
