'use server';

import { sql } from '@vercel/postgres';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

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
    await sql`INSERT INTO classes
    (TEACHER_ID, TITLE, DESCRIPTION, BANNER_URL, 
    START_DATE, END_DATE, DAY_COUNT, 
    LECTURE_DAYS, TOTAL_LECTURE_DAY_COUNT, 
    START_HOUR, END_HOUR, HOUR_PER_DAY, STUDENT_LIMIT, TAGS) VALUES 
    (${data.teacher_id}, ${data.title}, ${data.description}, ${bannerUrl}, 
    ${data.startDate.toISOString().split('T')[0]}, ${data.endDate.toISOString().split('T')[0]}, ${data.dayCount}, 
    ${data.lectureDays}, ${data.totalLectureDayCount}, 
    ${data.startHour}, ${data.endHour}, ${data.hourPerDay}, ${data.studentLimit}, ${data.tags})`;

    revalidatePath('/');
    return { message: 'Success' };
  } catch (e: any) {
    return { message: e.message };
  }
}
