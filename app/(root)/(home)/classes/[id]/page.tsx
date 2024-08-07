import { sql } from '@vercel/postgres';
import TeacherProfile from '../../teachers/[id]/page';
import { Button } from '@/components/ui/button';
import { clerkClient } from '@clerk/nextjs/server';
import { ArrowBigRight, Send } from 'lucide-react';
import { getHourString } from '@/app/(root)/app/schedule/page';

type classData = {
  id: string;
  title: string;
  teacher_id: string;
  description: string;
  banner_url: string;
  start_date: Date;
  end_date: Date;
  day_count: number;
  lecture_days: string;
  total_lecture_day_count: number;
  start_hour: string;
  end_hour: string;
  hour_per_day: number;
  student_limit: number;
  tags?: string;
};

export function ShowDate({ date }: { date: Date }) {
  return (
    <div className="w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center text-black">
      <div className="block rounded shadow-lg overflow-hidden  text-center ">
        <div className="bg-blue-1 text-white py-1">
          {date.toLocaleString('default', {
            month: 'long',
          })}
        </div>
        <div className="pt-1 border-l border-r border-white bg-white">
          <span className="text-5xl font-bold leading-tight">
            {date.getDate()}
          </span>
        </div>
        <div className="border-l border-r border-b text-center border-white bg-white -pt-2 -mb-1 pb-2">
          <span className="text-sm">
            {date.toLocaleString('default', {
              weekday: 'short',
              month: '2-digit',
              year: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ShowDays({ days }: { days: string }) {
  return (
    <div className="flex text-white gap-2 w-full justify-between my-4">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => {
        if (days.split(',').includes(day))
          return (
            <div
              className="bg-white text-black p-1 rounded w-10 text-center"
              key={day}
            >
              {day}
            </div>
          );

        return (
          <div
            className="bg-gray-400 opacity-30 p-1 rounded w-10 text-center"
            key={day}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const { rows } = await sql`SELECT * FROM classes WHERE id = ${params.id}`;
  if (rows.length == 0) return <div>Class not found</div>;
  const { rows: rows2 } =
    await sql`SELECT * FROM classes WHERE id = ${parseInt(params.id) - 1}`;
  const classData = rows[0] as classData;
  const classData2 = rows2[0] as classData;
  const teacher2 =
    classData2 && (await clerkClient.users.getUser(classData2.teacher_id));
  return (
    <>
      <div
        className={
          'p-5 mx-auto sm:p-10 md:p-16 bg-gray-700 rounded-lg ' +
          (classData2 && 'rounded-b-none')
        }
      >
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          <img
            src={classData.banner_url}
            alt=""
            className="w-full h-60 sm:h-96"
          />
          <div className="p-6 pb-12 m-4 mx-auto mt-[-4.5rem] space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md">
            <div className="space-y-2">
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-block text-2xl font-semibold sm:text-3xl"
              >
                {classData.title}
              </a>
            </div>
            <p>{classData.description}</p>
          </div>
          <div className="flex justify-evenly">
            <div className="relative border-white border-4 rounded-md bg-gradient-to-br from-teal-300/50 to-teal-400/70 backdrop-blur-lg">
              <div className="bg-white p-2 text-center w-full font-semibold text-3xl text-black">
                TEACHER
              </div>

              <div className="pt-8">
                <TeacherProfile params={{ id: classData.teacher_id }} noBg />
              </div>
            </div>
            <div className="">
              <b>Duration</b>
              <div className="flex items-center my-4 w-full justify-between">
                <ShowDate date={classData.start_date} />
                <ArrowBigRight />
                <ShowDate date={classData.end_date} />
              </div>
              Total : {classData.day_count} days
              <hr className="my-4" />
              <b>
                {classData.lecture_days.split(',').length} lecture days per week
              </b>
              <ShowDays days={classData.lecture_days} />
              Total : {classData.total_lecture_day_count} lecture days
              <hr className="mt-4" />
            </div>
          </div>
          <div className="py-8 text-center w-4/5 mx-auto">
            In this class, you can attend the lecture from{' '}
            {getHourString(classData.start_hour)} to{' '}
            {getHourString(classData.end_hour)} every lecture day. So, the class
            will take you{' '}
            {classData.total_lecture_day_count * classData.hour_per_day} lecture
            hours in total ({classData.hour_per_day} hours per lecture day).
            Hurry up! XX/{classData.student_limit} students have applied.
            <div className="text-end text-sm">
              {classData.tags
                ?.split(',')
                .map((tag: string) => `#${tag.replace(' ', '')}`)
                .join(', ')}
            </div>
          </div>
          <Button className="w-max mx-auto mb-4 transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110">
            Apply Now <Send className="ml-2" />
          </Button>
        </div>
      </div>
      {classData2 && teacher2 && (
        <div className="bg-gradient-to-br from-teal-300/50 to-teal-400/70 backdrop-blur-lg rounded-b-lg">
          <div className="container max-w-3xl mx-auto grid grid-cols-12">
            <div className="flex flex-col col-span-full row-span-full py-6 lg:py-10">
              <div className="flex justify-start">
                <span className="py-1 text-xs font-bold">Next</span>
              </div>
              <h1 className="text-3xl font-semibold">{classData2.title}</h1>
              <p className="flex-1 pt-2">{classData2.description}</p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="self-center text-sm">
                    by{' '}
                    <a href={`/teachers/${teacher2.id}`}>
                      <b>{teacher2.fullName}</b>
                    </a>
                  </span>
                </div>

                <a rel="noopener noreferrer" href={`/classes/${classData2.id}`}>
                  <Button variant="secondary" className="my-4">
                    <span>Read more</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
