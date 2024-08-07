import { sql } from '@vercel/postgres';
import Profile from './profile';

const Teachers = async ({ limit }: { limit: number }) => {
  const { rows } = limit
    ? await sql`SELECT * from teachers limit ${limit};`
    : await sql`SELECT * from teachers;`;

  return (
    <section className="py-6">
      <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
        <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl my-4">
          The talented teachers behind the scenes
        </h1>
        <div className="flex flex-row flex-wrap justify-center mt-8">
          {rows.map((row, index) => (
            <Profile key={row.id} id={row.id} title="title" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
