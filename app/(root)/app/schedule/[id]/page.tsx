import { sql } from '@vercel/postgres';
import { auth } from '@clerk/nextjs/server';
import Days from '../Days';
import Task from '../Task';
import { getHourString } from '../page';
import { getDateFromTime } from '../../page';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const { userId } = auth();

  if (!userId) return null;

  const today = new Date();

  const selectedDate = id
    ? new Date(+today + parseInt(id) * 1000 * 60 * 60 * 24)
    : today;

  // selectedDate.setHours(5, 0); // hour, min?

  const { rows } =
    await sql`Select * from schedules where user_id = ${userId} and lecture_date = ${selectedDate.toLocaleDateString()} order by start_hour;`;

  return (
    <div className="container">
      <header className="pt-4 h-1/3 rounded-t-3xl bg bg-gradient-to-r from-blue-1/30 to to-indigo-400/40 text-white">
        <section className="header">
          <div>
            <div className="mt-12 pl-4 pb-1">
              {parseInt(id) === 0 && (
                <p className="font-thin text-white">Today</p>
              )}
              <h4 className="font-medium text-2xl">
                {selectedDate.toLocaleDateString('default', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h4>
            </div>
          </div>
        </section>
        <Days day={selectedDate} />
      </header>
      <section className="timeline rounded-b-3xl overflow-y-scroll no-scrollbar h-2/3 overflow-hidden bg-slate-700 text-white pr-4">
        <div className="grid grid-flow-row auto-rows-max ml-4 mt-4">
          <div>
            {rows.length === 0 && (
              <div className="flex flex-row justify-start items-center pt-20 pb-20">
                <div className="flex flex-grow flex-col font-mono text-xl font-semibold	text-gray-200 antialiased">
                  <div className="bg-gray-100 h-0.5 ml-2"></div>
                  <div className="px-2 py-8">No upcoming classes</div>
                  <div className="bg-gray-100 h-0.5 ml-2"></div>
                </div>
              </div>
            )}
            {rows.map((row) => (
              <div
                key={row.start_hour}
                className="flex flex-row justify-start items-center pt-20 pb-20"
              >
                <div className="flex flex-grow flex-col font-mono text-xl font-semibold	text-gray-200 antialiased">
                  <div className="bg-gray-100 h-0.5 ml-2"></div>
                  <div className="px-2 py-8">
                    {getHourString(row.start_hour)} to{' '}
                    {getHourString(row.end_hour)}
                  </div>
                  <div className="bg-gray-100 h-0.5 ml-2"></div>
                </div>

                <Task
                  id={row.class_id}
                  selectedDate={selectedDate}
                  userId={userId}
                  isEnded={
                    getDateFromTime(row.end_hour, selectedDate) < selectedDate
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
