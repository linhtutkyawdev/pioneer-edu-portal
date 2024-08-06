import { sql } from '@vercel/postgres';
import TeacherProfile from '../../teachers/[id]/page';
import { Button } from '@/components/ui/button';
import { clerkClient } from '@clerk/nextjs/server';

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
  startHour: string;
  endHour: string;
  hour_per_day: number;
  student_limit: number;
  tags?: string;
};

export default async function Page({ params }: { params: { id: string } }) {
  const { rows } = await sql`SELECT * FROM classes WHERE id = ${params.id}`;
  const { rows: rows2 } =
    await sql`SELECT * FROM classes WHERE id = ${params.id + 1}`;
  const classData = rows[0] as classData;
  const classData2 = rows2[0] as classData;
  const teacher2 =
    classData2 && (await clerkClient.users.getUser(classData2.teacher_id));
  return (
    <>
      <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-700 rounded-t-lg">
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          <img
            src={classData.banner_url}
            alt=""
            className="w-full h-60 sm:h-96 dark:bg-gray-500"
          />
          <div className="p-6 pb-12 m-4 mx-auto mt-[-4.5rem] space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50">
            <div className="space-y-2">
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-block text-2xl font-semibold sm:text-3xl"
              >
                {classData.title}
              </a>
            </div>
            <div className="dark:text-gray-800">
              <p>{classData.description}</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="relative border-white border-4 rounded-md bg-gradient-to-br from-teal-300/50 to-teal-400/70 backdrop-blur-lg">
              <div className="bg-white p-2 text-center w-full font-semibold text-3xl text-black">
                TEACHER
              </div>
              <div className="pt-4">
                <TeacherProfile params={{ id: classData.teacher_id }} noBg />
              </div>
            </div>
            <div className="">
              From : {classData.start_date.toLocaleDateString()} <br />
              To : {classData.end_date.toLocaleDateString()}
              <br />
              Duration : {classData.day_count} Days
              <br />
              Lecture Days : {classData.lecture_days}
              <br />
              Total Lecture Days : {classData.total_lecture_day_count} Days
              <br />
              Hour per day : {classData.hour_per_day} h
              <br />
              Total Lecture Hours :{' '}
              {classData.total_lecture_day_count * classData.hour_per_day} h
              <br />
              Student Limit : {classData.student_limit}
              <br />
              Tags : {classData.tags}
              <br />
              <br />
              <br />
              <Button>Apply Now</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-teal-300/50 to-teal-400/70 backdrop-blur-lg rounded-b-lg">
        <div className="container grid grid-cols-12 mx-auto dark:bg-gray-50">
          <div
            className="bg-no-repeat bg-cover dark:bg-gray-300 col-span-full lg:col-span-4"
            style={{
              backgroundImage:
                "url('https://source.unsplash.com/random/640x480')",
              backgroundPosition: 'center center',
              backgroundBlendMode: 'multiply',
              backgroundSize: 'cover',
            }}
          ></div>
          {classData2 && (
            <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
              <div className="flex justify-start">
                <span className="px-2 py-1 text-xs rounded-full dark:bg-teal-600 dark:text-gray-50">
                  Next
                </span>
              </div>
              <h1 className="text-3xl font-semibold">{classData2.title}</h1>
              <p className="flex-1 pt-2">{classData2.description}</p>
              <a
                rel="noopener noreferrer"
                href={`/classes/${classData2.id}`}
                className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm dark:text-teal-600"
              >
                <Button variant="secondary">
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
              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 dark:text-gray-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="self-center text-sm">
                    by {teacher2.fullName}
                  </span>
                </div>
                <span className="text-xs">3 min read</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
