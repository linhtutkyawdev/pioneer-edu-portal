'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  class_id: z
    .number({
      invalid_type_error: 'Invalid class_id',
    })
    .min(1),
});

export async function deleteClass(formData: FormData) {
  const parse = schema.safeParse({
    class_id: parseInt(formData.get('class_id') as string),
  });

  if (!parse.success) {
    return { message: 'Failed to read data' };
  }

  const data = parse.data;

  try {
    await sql`DELETE FROM schedules WHERE class_id = ${data.class_id}`;
    await sql`DELETE FROM classes WHERE id = ${data.class_id}`;
    revalidatePath('/');
    return { message: 'Deleted successfully.' };
  } catch (e) {
    console.error(e);
    return { message: 'Failed to delete class' };
  }
}

const schema2 = z.object({
  class_id: z
    .number({
      invalid_type_error: 'Invalid class_id',
    })
    .min(1),

  fieldName: z
    .string({
      invalid_type_error: 'Invalid field name',
    })
    .min(1),

  value: z
    .string({
      invalid_type_error: 'Invalid value',
    })
    .min(1),
});
export async function editClass(formData: FormData) {
  const parse = schema2.safeParse({
    class_id: parseInt(formData.get('class_id') as string),
    fieldName: formData.get('fieldName'),
    value: formData.get('value'),
  });

  if (!parse.success) {
    return { message: 'Failed to read data' };
  }

  const data = parse.data;

  try {
    if (data.fieldName === 'title') {
      await sql`update classes set title=${data.value} where id=${data.class_id};`;
    } else if (data.fieldName === 'description') {
      await sql`update classes set description=${data.value} where id=${data.class_id};`;
    }
    revalidatePath('/');
    return { message: 'Edited ' + data.fieldName + ' successfully.' };
  } catch (e) {
    console.error(e);
    return { message: 'Failed to edit class' };
  }
}
