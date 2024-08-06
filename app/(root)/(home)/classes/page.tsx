import { Button } from '@/components/ui/button';
import { sql } from '@vercel/postgres';
import Search from '../../app/teacher/classes/search';
import Teacher from './teacher';

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
            <a href="/app/teacher/classes/add">
              <Button variant="link" className="mr-3">
                Add Class
              </Button>
            </a>
            <Search />
          </div>
        </div>
      )}

      <div className="relative flex flex-col justify-center overflow-hidden mt-20">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
          <div className="max-w-xs mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none mb-8">
            {rows.map((row) => (
              <div
                key={row.id}
                data-name="Teacher: Unlocking the Secrets of Productivity"
                className="class-card flex flex-col h-full bg-slate-600 shadow-md rounded-xl overflow-hidden"
              >
                <img
                  className="object-cover h-48 w-full hover:scale-110 hover:-translate-y-2 transition duration-500"
                  src="https://cruip-tutorials.vercel.app/equal-height-cards/equal-height-02.jpg"
                  width="304"
                  height="192"
                  alt="Course 01"
                />
                <div className="flex-1 flex flex-col p-6">
                  <div className="flex-1">
                    <header className="mb-2">
                      <h2 className="text-xl font-extrabold leading-snug">
                        {row.title}
                      </h2>
                      <h3 className="font-semibold text-sm">
                        Teacher : <Teacher teacher_id={row.teacher_id} />
                      </h3>
                    </header>

                    <div className="text-sm mb-8">
                      <p>{row.description}</p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <a href={`/classes/${row.id}`}>
                      <Button variant="secondary">View</Button>
                    </a>
                    <Button>Apply Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
