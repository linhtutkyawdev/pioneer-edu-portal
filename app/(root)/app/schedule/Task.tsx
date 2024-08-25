import { Button } from '@/components/ui/button';
import { clerkClient } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import JoinButton from '../JoinButton';
import { getDateFromTime } from '../page';
import RecordingButtons from './RecordingButtons';

const Task = async ({
  id,
  userId,
  selectedDate,
  isEnded,
}: {
  id: number;
  userId: string;
  selectedDate: Date;
  isEnded?: boolean;
}) => {
  const classData = (await sql`Select * from classes where id = ${id};`)
    .rows[0];
  if (!classData) return null;
  const techerName = (await clerkClient.users.getUser(classData.teacher_id))
    .fullName;
  return (
    <div className="bg-blue-50 rounded-md w-1/3 h-32 mx-2 overflow-hidden flex items-end">
      <div className="w-2 h-full bg-blue-1"></div>
      <div className="flex flex-col ml-4 mt-4 h-full w-full justify-center">
        <h4 className="font-sans h-16 flex items-center text-blue-700 text-lg font-semibold pb-1">
          {classData.title}
        </h4>
        <div className="flex justify-between pr-4">
          <div className="flex w-max flex-row items-center bg-blue-100 p-2 rounded-full">
            <p className="font-sans mx-2 font-medium text-blue-900 text-opacity-80 text-xs">
              By {techerName}
            </p>
          </div>
          {!isEnded ? (
            <JoinButton
              dateTime={getDateFromTime(classData.start_hour, selectedDate)}
              meetingId={
                classData.teacher_id +
                '-lecture-' +
                classData.id +
                '-lectureDate-' +
                selectedDate.toLocaleDateString('en-US').replace(/\//g, '-')
              }
              description={'Lecture : ' + classData.title}
              isTeacher={userId === classData.teacher_id}
            />
          ) : (
            <RecordingButtons
              id={
                classData.teacher_id +
                '-lecture-' +
                classData.id +
                '-lectureDate-' +
                selectedDate.toLocaleDateString('en-US').replace(/\//g, '-')
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Task;
