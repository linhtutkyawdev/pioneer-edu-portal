'use server';

import { sql } from '@vercel/postgres';
import { writeFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

type TimeInterval = {
  start: string;
  end: string;
};

const schema = z.object({
  title: z
    .string({
      invalid_type_error: 'Invalid title',
      required_error: 'Title is required',
    })
    .min(1),
  teacher_id: z
    .string({
      invalid_type_error: 'Invalid teacher id',
      required_error: 'Teacher id is required',
    })
    .min(1),
  description: z
    .string({
      invalid_type_error: 'Invalid class description',
      required_error: 'Class description is required',
    })
    .min(1),
  startDate: z.date({
    invalid_type_error: 'Invalid start date',
    required_error: 'Start date is required',
  }),
  endDate: z.date({
    invalid_type_error: 'Invalid end date',
    required_error: 'End date is required',
  }),
  dayCount: z.number({
    invalid_type_error: 'Invalid day count',
    required_error: 'Day count is required',
  }),
  lectureDays: z
    .string({
      invalid_type_error: 'Invalid lecture days',
      required_error: 'Lecture days are required',
    })
    .min(1),
  totalLectureDayCount: z
    .number({
      invalid_type_error: 'Invalid total lecture day count',
      required_error: 'Total lecture day count is required',
    })
    .min(4)
    .max(200),
  startHour: z
    .string({
      invalid_type_error: 'Invalid start hour',
      required_error: 'Start hour is required',
    })
    .min(1),
  endHour: z
    .string({
      invalid_type_error: 'Invalid end hour',
      required_error: 'End hour is required',
    })
    .min(1),
  hourPerDay: z.number({
    invalid_type_error: 'Invalid lecture hour per day',
    required_error: 'Lecture hour per day is required',
  }),
  studentLimit: z.number({
    invalid_type_error: 'Invalid student limit',
    required_error: 'Student limit is required',
  }),
  tags: z
    .string({
      invalid_type_error: 'Invalid tags',
    })
    .nullable(),
});

// function hasTimeConflict(interval1: TimeInterval, interval2: TimeInterval) {
//   const s1 = Math.min(
//     new Date(interval1.start).getTime(),
//     new Date(interval2.start).getTime(),
//   );

//   if (s1 === new Date(interval1.start).getTime()) {
//     const e1 = new Date(interval1.end).getTime();
//     const s2 = new Date(interval2.start).getTime();
//     return s1 == s2 || s2 <= e1;
//   }

//   const e1 = new Date(interval2.end).getTime();
//   const s2 = new Date(interval1.start).getTime();
//   return s1 == s2 || s2 <= e1;
// }

export async function createClass(formData: FormData) {
  const parse = schema.safeParse({
    title: formData.get('title'),
    teacher_id: formData.get('teacher_id'),
    description: formData.get('description'),
    banner: formData.get('banner') as File,
    startDate: new Date(formData.get('start-date') as string),
    endDate: new Date(formData.get('end-date') as string),
    dayCount: parseInt(formData.get('day-count') as string),
    lectureDays: formData.get('lecture-days'),
    totalLectureDayCount: parseInt(
      formData.get('total-lecture-day-count') as string,
    ),
    startHour: formData.get('start-hour'),
    endHour: formData.get('end-hour'),
    hourPerDay: parseFloat(formData.get('hour-per-day') as string),
    studentLimit: parseInt(formData.get('student-limit') as string),
    tags: formData.get('tags'),
  });

  if (!parse.success) {
    return { message: parse.error.message };
  }

  const data = parse.data;

  try {
    // get existing schedules
    const { rows: r1 } = await sql`SELECT * FROM schedules
      WHERE USER_ID = ${data.teacher_id}
      AND LECTURE_DATE >= ${data.startDate.toISOString().split('T')[0]}
      AND LECTURE_DATE < ${data.endDate.toISOString().split('T')[0]}
      AND START_HOUR = ${data.startHour}
      ORDER BY LECTURE_DATE;`;

    const { rows: r2 } = await sql`SELECT * FROM schedules
      WHERE USER_ID = ${data.teacher_id}
      AND LECTURE_DATE >= ${data.startDate.toISOString().split('T')[0]}
      AND LECTURE_DATE < ${data.endDate.toISOString().split('T')[0]}
      AND START_HOUR > ${data.startHour}
      AND START_HOUR < ${data.endHour}
      ORDER BY LECTURE_DATE;`;

    const { rows: r3 } = await sql`SELECT * FROM schedules
      WHERE USER_ID = ${data.teacher_id}
      AND LECTURE_DATE >= ${data.startDate.toISOString().split('T')[0]}
      AND LECTURE_DATE < ${data.endDate.toISOString().split('T')[0]}
      AND START_HOUR < ${data.startHour}
      AND END_HOUR > ${data.startHour}
      ORDER BY LECTURE_DATE;`;

    const conflicts = [...r1, ...r2, ...r3];
    if (conflicts.length > 0) {
      // return conflicts;
      return { message: 'Time conflict' };
    }

    // save banner
    const file = formData.get('banner') as File;
    if (file.size > 5 * 1024 * 1024) {
      return { message: 'File size should be less than 5MB' };
    }
    if (
      !['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'].includes(
        file.name.split('.').pop() as string,
      )
    ) {
      return { message: 'Invalid file type' };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const bannerUrl = `/uploads/${new Date().toISOString().replace(/[-:.]/g, '')}${('' + Math.random()).substring(2, 8)}.${file.name.split('.').pop()}`;
    await writeFile(`./public${bannerUrl}`, buffer);

    // add class to db
    const id = (
      await sql`INSERT INTO classes
      (TEACHER_ID, TITLE, DESCRIPTION, BANNER_URL, 
      START_DATE, END_DATE, DAY_COUNT, 
      LECTURE_DAYS, TOTAL_LECTURE_DAY_COUNT, 
      START_HOUR, END_HOUR, HOUR_PER_DAY, STUDENT_LIMIT, TAGS) VALUES 
      (${data.teacher_id}, ${data.title}, ${data.description}, ${bannerUrl}, 
      ${data.startDate.toISOString().split('T')[0]}, ${data.endDate.toISOString().split('T')[0]}, ${data.dayCount}, 
      ${data.lectureDays}, ${data.totalLectureDayCount}, 
      ${data.startHour}, ${data.endHour}, ${data.hourPerDay}, ${data.studentLimit}, ${data.tags}) RETURNING id;`
    ).rows[0].id as number;

    // add schedule to db
    let start = new Date(data.startDate);
    let finish = new Date(data.endDate);
    let dayMilliseconds = 1000 * 60 * 60 * 24;

    while (start < finish) {
      if (
        data.lectureDays
          .split(',')
          .includes(start.toLocaleString('default', { weekday: 'short' }))
      ) {
        await sql`INSERT INTO schedules
        (USER_ID, CLASS_ID, LECTURE_DATE, START_HOUR, END_HOUR) VALUES
        (${data.teacher_id}, ${id}, ${start.toISOString().split('T')[0]}, ${data.startHour}, ${data.endHour});`;
      }
      start = new Date(+start + dayMilliseconds);
    }

    revalidatePath('/');
    return { message: 'Success' };
  } catch (e: any) {
    return { message: e.message };
  }
}
