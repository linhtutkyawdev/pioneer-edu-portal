'use server';
'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { classData } from './[id]/page';

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
    const classData = (
      await sql`SELECT * FROM classes WHERE id = ${data.class_id}`
    ).rows[0] as classData;

    // get existing schedules
    const { rows: r1 } = await sql`SELECT * FROM schedules
      WHERE USER_ID = ${data.student_id}
      AND LECTURE_DATE >= ${classData.start_date.toISOString().split('T')[0]}
      AND LECTURE_DATE < ${classData.end_date.toISOString().split('T')[0]}
      AND START_HOUR = ${classData.start_hour}
      ORDER BY LECTURE_DATE;`;

    const { rows: r2 } = await sql`SELECT * FROM schedules
      WHERE USER_ID = ${data.student_id}
      AND LECTURE_DATE >= ${classData.start_date.toISOString().split('T')[0]}
      AND LECTURE_DATE < ${classData.end_date.toISOString().split('T')[0]}
      AND START_HOUR > ${classData.start_hour}
      AND START_HOUR < ${classData.end_hour}
      ORDER BY LECTURE_DATE;`;

    const { rows: r3 } = await sql`SELECT * FROM schedules
      WHERE USER_ID = ${data.student_id}
      AND LECTURE_DATE >= ${classData.start_date.toISOString().split('T')[0]}
      AND LECTURE_DATE < ${classData.end_date.toISOString().split('T')[0]}
      AND START_HOUR < ${classData.start_hour}
      AND END_HOUR > ${classData.start_hour}
      ORDER BY LECTURE_DATE;`;

    const conflicts = [...r1, ...r2, ...r3];
    if (conflicts.length > 0) {
      // return conflicts;
      return { message: 'Time conflict' };
    }

    // add schedule to db
    let start = new Date(classData.start_date);
    let finish = new Date(classData.end_date);
    let dayMilliseconds = 1000 * 60 * 60 * 24;

    while (start < finish) {
      if (
        classData.lecture_days
          .split(',')
          .includes(start.toLocaleString('default', { weekday: 'short' }))
      ) {
        await sql`INSERT INTO schedules
        (USER_ID, CLASS_ID, LECTURE_DATE, START_HOUR, END_HOUR) VALUES
        (${data.student_id}, ${data.class_id}, ${start.toISOString().split('T')[0]}, ${classData.start_hour}, ${classData.end_hour});`;
      }
      start = new Date(+start + dayMilliseconds);
    }

    await sql`INSERT INTO student_applicants (class_id, student_id, status) VALUES (${data.class_id}, ${data.student_id}, 'pending');`;
    revalidatePath('/');
    return { message: 'Granted privileges' };
  } catch (e) {
    return { message: 'Failed to grant privileges' };
  }
}
