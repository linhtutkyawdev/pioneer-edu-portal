'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const createContact = async (formData: FormData) => {
  const schema = z.object({
    name: z
      .string({
        invalid_type_error: 'Invalid name',
      })
      .min(1),
    email: z
      .string({
        invalid_type_error: 'Invalid email',
      })
      .min(1)
      .email({ message: 'Invalid email address' }),
    message: z
      .string({
        invalid_type_error: 'Invalid message',
      })
      .min(1),
  });

  const parse = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parse.success) {
    return { message: 'Failed to read data' };
  }

  const data = parse.data;

  try {
    await sql`INSERT INTO contacts (name, email, message, is_read) VALUES ( ${data.name}, ${data.email}, ${data.message}, false);`;
    revalidatePath('/');
    return { message: 'Contact created' };
  } catch (error) {
    return { message: 'Failed to create contact' };
  }
};
