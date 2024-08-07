import MeetingTypeList from '@/components/MeetingTypeList';
import { Button } from '@/components/ui/button';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import { Plus } from 'lucide-react';

export const getDateFromTime = (time: string, date?: Date) => {
  const d = date || new Date();
  const [hours, minutes, seconds] = time.split(':');

  d.setHours(+hours);
  d.setMinutes(+minutes);
  d.setSeconds(+seconds);

  return d;
};

const Home = async () => {
  const PRE_JOIN_AVAILABLE_TIME = 15 * 60 * 1000; // 15 minutes
  const { userId } = auth();
  if (!userId) return null;

  const now = new Date();
  // now.setDate(13);
  // now.setHours(now.getHours() + 6);

  const schedule = (
    await sql`select lecture_date, start_hour, class_id from schedules 
  where user_id = ${userId} and end_hour > ${now.toLocaleTimeString()} order by (lecture_date, start_hour) limit ${1};`
  ).rows[0];

  const classData =
    schedule &&
    (await sql`select * from classes where id = ${schedule.class_id}`).rows[0];

  const techerName =
    classData &&
    (await clerkClient.users.getUser(classData.teacher_id)).fullName;

  const lectureDate = schedule && new Date(schedule.lecture_date);

  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(
    now,
  );
  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const scheduleDate = schedule
    ? now.toLocaleDateString() == lectureDate.toLocaleDateString()
      ? ', Today'
      : ' on ' +
        lectureDate.toLocaleDateString('default', {
          month: 'short',
          day: 'numeric',
          weekday: 'long',
        })
    : '';

  const scheduleTime =
    schedule &&
    getDateFromTime(schedule.start_hour, lectureDate).toLocaleTimeString(
      'en-US',
      {
        hour: 'numeric',
        minute: '2-digit',
      },
    );

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      {schedule &&
      PRE_JOIN_AVAILABLE_TIME + now.getTime() >=
        getDateFromTime(classData.start_hour, now).getTime() ? (
        <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
          <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
            <div className="pb-2">
              <div className="text-lg flex items-start">
                Class On Live
                <div className="h-2 w-2 rounded-full bg-green-500 mr-8"></div>
              </div>
              <div className="text-sm font-light mb-2">
                {getDateFromTime(classData.start_hour, now).toLocaleTimeString(
                  'en-US',
                  {
                    hour: 'numeric',
                    minute: '2-digit',
                  },
                )}{' '}
                to{' '}
                {getDateFromTime(classData.end_hour, now).toLocaleTimeString(
                  'en-US',
                  {
                    hour: 'numeric',
                    minute: '2-digit',
                  },
                )}
              </div>

              <a
                rel="noopener noreferrer"
                className="text-2xl font-semibold sm:text-3xl"
                href={'/classes/' + classData.id}
              >
                {classData.title}{' '}
                <span className="text-lg">by {techerName}</span>
              </a>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
                <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                  {date}
                </p>
              </div>
              <Button className="transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110">
                Join Now <Plus />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
          <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
            {schedule ? (
              <h2 className="glassmorphism rounded w-max px-4 py-2 text-center text-base font-normal">
                Upcoming Class at : {scheduleTime}
                {scheduleDate}
              </h2>
            ) : (
              <h2 className="glassmorphism rounded w-max px-4 py-2 text-center text-base font-normal">
                You have no classes yet!
              </h2>
            )}
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
              <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                {date}
              </p>
            </div>
          </div>
        </div>
      )}

      <MeetingTypeList />
    </section>
  );
};

export default Home;
