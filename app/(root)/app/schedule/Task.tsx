import { Button } from '@/components/ui/button';
import { clerkClient } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import { Plus } from 'lucide-react';

const Task = async ({ id }: { id: string }) => {
  const task = (await sql`Select * from classes where id = ${id};`).rows[0];
  if (!task) return null;
  const techerName = (await clerkClient.users.getUser(task.teacher_id))
    .fullName;
  return (
    <div className="bg-blue-50 rounded-md w-1/3 h-32 mx-2 overflow-hidden flex items-end">
      <div className="w-2 h-full bg-blue-1"></div>
      <div className="flex flex-col ml-4 mt-4 h-full w-full justify-center">
        <h4 className="font-sans h-16 flex items-center text-blue-700 text-lg font-semibold pb-1">
          {task.title}
        </h4>
        <div className="flex justify-between pr-4">
          <div className="flex w-max flex-row items-center bg-blue-100 p-2 rounded-full">
            <p className="font-sans mx-2 font-medium text-blue-900 text-opacity-80 text-xs">
              By {techerName}
            </p>
          </div>
          <Button className="transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110">
            Join Now <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Task;
