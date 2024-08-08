'use server';
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
  student_id: z
    .string({
      invalid_type_error: 'Invalid user_id',
    })
    .min(1),
});

export async function createStudentApplication(formData: FormData) {
  const parse = schema.safeParse({
    class_id: parseInt(formData.get('class_id') as string),
    student_id: formData.get('user_id'),
  });

  if (!parse.success) {
    return { message: 'Failed to read data' };
  }

  const data = parse.data;

  try {
    await sql`INSERT INTO student_applicants (class_id, student_id, status) VALUES (${data.class_id}, ${data.student_id}, 'pending');`;
    revalidatePath('/');
    return { message: 'Granted privileges' };
  } catch (e) {
    return { message: 'Failed to grant privileges' };
  }
}
