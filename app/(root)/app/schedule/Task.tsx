import { Button } from '@/components/ui/button';
import { clerkClient } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';

const Task = async ({ id }: { id: string }) => {
  const task = (await sql`Select * from classes where id = ${id};`).rows[0];
  if (!task) return null;
  const techerName = (await clerkClient.users.getUser(task.teacher_id))
    .fullName;
  return (
    <div className="bg-green-50 rounded-md w-1/3 h-32 mx-2 overflow-hidden flex items-end">
      <div className="w-2 h-full bg-green-400"></div>
      <div className="flex flex-col ml-4 mt-4 h-full w-full justify-center">
        <h4 className="font-sans text-green-700 text-lg font-semibold pb-1">
          {task.title}
        </h4>
        <div className="flex w-max flex-row items-center bg-green-100 p-2 rounded-full">
          <p className="font-sans mx-2 font-medium text-green-900 text-opacity-80 text-xs">
            By {techerName}
          </p>
        </div>
      </div>
      <Button size="sm" className="w-1/2 m-4">
        Join
      </Button>
    </div>
  );
};
export default Task;
