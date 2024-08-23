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

export async function revokePrivileges(formData: FormData) {
  const parse = schema.safeParse({
    id: formData.get('id'),
  });

  if (!parse.success) {
    return { message: 'Failed to read id' };
  }

  const data = parse.data;

  try {
    await sql`DELETE FROM teachers WHERE id=${data.id};`;
    await sql`DELETE FROM teacher_applicants WHERE id=${data.id};`;
    await sql`DELETE FROM schedules WHERE user_id=${data.id};`;
    await sql`DELETE FROM classes WHERE teacher_id=${data.id};`;
    revalidatePath('/');
    // return { message: "Granted privileges" };
  } catch (e) {
    // return { message: "Failed to grant privileges" };
  }
}

// export async function deleteTodo(
//     prevState: {
//         message: string;
//     },
//     formData: FormData,
// ) {
//     const schema = z.object({
//         id: z.string().min(1),
//         todo: z.string().min(1),
//     });
//     const data = schema.parse({
//         id: formData.get("id"),
//         todo: formData.get("todo"),
//     });

//     try {
//         await sql`
//       DELETE FROM todos
//       WHERE id = ${data.id};
//     `;

//         revalidatePath("/");
//         return { message: `Deleted todo ${data.todo}` };
//     } catch (e) {
//         return { message: "Failed to delete todo" };
//     }
// }
