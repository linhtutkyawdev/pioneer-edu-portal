import { Button } from '@/components/ui/button';
import { sql } from '@vercel/postgres';
import { auth } from '@clerk/nextjs/server';
import Search from './search';
import { ClassBody } from '@/app/(root)/(home)/classes/page';

const Classes = async () => {
  const { userId } = auth();
  const { rows } =
    await sql`Select * from classes where teacher_id = ${userId} order by id desc;`;
  return (
    <div className="relative font-inter antialiased text-white">
      <div className="fixed bg-dark-1/30 backdrop-blur-xl py-4 left-0 top-20 z-10 w-full">
        <div className="container px-16 flex flex-row items-center justify-between mx-auto">
          <h2 className="w-full text-4xl font-bold leading-none">Classes</h2>
          <a href="/app/teacher/classes/add">
            <Button variant="link" className="mr-3 text-white">
              Add Class
            </Button>
          </a>
          <Search />
        </div>
      </div>

      <div className="relative flex flex-col justify-center overflow-hidden mt-20">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
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
