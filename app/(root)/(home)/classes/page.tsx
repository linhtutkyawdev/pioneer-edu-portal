import { Button } from '@/components/ui/button';
import { sql } from '@vercel/postgres';
import Search from '../../app/teacher/classes/search';
import { Castle, Send } from 'lucide-react';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { createStudentApplication } from './action';
import { SignInButton } from '@clerk/nextjs';

export const ClassBody = async ({ row }: { row: any }) => {
  const { userId } = auth();

  if (!row.teacher_id) return null;

  const isClassTeacher = userId && userId == row.teacher_id;
  const isClassStudent =
    userId &&
    (
      await sql`SELECT * from student_applicants where class_id = ${row.id} and student_id = ${userId};`
    ).rows[0];

  const teacherName = (await clerkClient.users.getUser(row.teacher_id))
    .fullName;
  return (
    <div
      key={row.id}
      data-name={`${teacherName} | ${row.title} | ${row.tags
        .replace(' ', '')
        .split(',')
        .map((tag: string) => '#' + tag)
        .join(' | ')}`}
      className="class-card flex flex-col h-full bg-slate-600 shadow-md rounded-xl overflow-hidden"
    >
      <img
        className="object-cover h-48 w-full hover:scale-110 hover:-translate-y-2 transition duration-500"
        src={row.banner_url}
        alt="Course 01"
      />
      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1">
          <header className="mb-2">
            <h2 className="text-xl font-extrabold leading-snug h-14 overflow-hidden">
              {row.title}
            </h2>
            <h3 className="font-semibold text-sm">
              Teacher :{' '}
              <a href={`/teachers/${row.teacher_id}`}>
                <Button
                  variant="link"
                  className="text-blue-1 p-1 font-semibold rounded-sm"
                >
                  {teacherName}
                </Button>
              </a>
            </h3>
          </header>

          <div className="text-sm mb-8 line-clamp-3">
            <p>{row.description}</p>
          </div>
        </div>

        <div className="flex justify-between space-x-4">
          <a href={`/classes/${row.id}`}>
            <Button variant="secondary">View</Button>
          </a>
          {!userId ? (
            <SignInButton>
              <Button className="w-max mx-auto mb-4 transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110">
                Apply Now <Send className="ml-2" />
              </Button>
            </SignInButton>
          ) : isClassTeacher ? (
            <a
              className="w-max mx-auto mb-4"
              href={`/classes/${row.id}/applicants`}
            >
              <Button className="transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110">
                Applicants <Send className="ml-2" />
              </Button>
            </a>
          ) : isClassStudent ? (
            <div className="w-max mx-auto relative">
              <Button
                disabled
                className="mb-4 transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110"
              >
                Already Applied <Send className="ml-2" />
              </Button>
            </div>
          ) : (
            <form action={createStudentApplication}>
              <input type="number" name="class_id" hidden value={row.id} />
              <input type="text" name="user_id" hidden value={userId} />

              <Button className="w-max mx-auto mb-4 transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110">
                Apply Now <Send className="ml-2" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Classes = async ({ limit }: { limit?: number }) => {
  const { rows } = limit
    ? await sql`Select * from classes order by id desc limit ${limit};`
    : await sql`Select * from classes order by id desc;`;
  return (
    <div className="relative font-inter antialiased text-white">
      {/* Search Box */}
      {limit ? (
        ''
      ) : (
        <div className="fixed bg-dark-1/30 backdrop-blur-xl py-4 left-0 top-20 z-10 w-full">
          <div className="container px-16 flex flex-row items-center justify-between mx-auto">
            <h2 className="w-full text-4xl font-bold leading-none">Classes</h2>

            <a href="/classes/applications">
              <Button variant="link" className="text-white">
                <Castle className="mr-2 w-4 h-4" />
                Applied Classes
              </Button>
            </a>
            <Search />
          </div>
        </div>
      )}

      <div className="relative flex flex-col justify-center overflow-hidden mt-20">
        <div className={'w-full max-w-5xl mx-auto px-4 md:px-12'}>
          <div className="max-w-xs mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none mb-8">
            {rows.map((row) => (
              <ClassBody key={row.id} row={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
