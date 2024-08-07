import { Button } from '@/components/ui/button';
import { sql } from '@vercel/postgres';
import Search from '../../app/teacher/classes/search';
import { Send } from 'lucide-react';
import { clerkClient } from '@clerk/nextjs/server';

export const ClassBody = async ({ row }: { row: any }) => {
  if (!row.teacher_id) return null;
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
            <h2 className="text-xl font-extrabold leading-snug">{row.title}</h2>
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

          <div className="text-sm mb-8">
            <p>{row.description}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <a href={`/classes/${row.id}`}>
            <Button variant="secondary">View</Button>
          </a>
          <Button className="w-max mx-auto mb-4 transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110">
            Apply Now <Send className="ml-2" />
          </Button>
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
