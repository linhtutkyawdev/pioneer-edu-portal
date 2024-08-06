import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Days = ({ day }: { day: Date }) => {
  const temp = new Date(day);
  const days = [];
  while (temp.getDay() !== 0) {
    temp.setTime(temp.getTime() - 1000 * 60 * 60 * 24);
  }
  for (let i = 0; i < 7; i++) {
    days.push(new Date(temp));
    temp.setTime(temp.getTime() + 1000 * 60 * 60 * 24);
  }
  return (
    <section id="calendar-horizontal">
      <div className="flex flex-col m-auto p-aut justify-start px-4">
        <div className="flex overflow-x-scroll pb-3 no-scrollbar">
          <div className="flex flex-nowrap mt-4">
            {days.map((d, index) => (
              <a
                href={`/app/schedule/${d.getDate() == new Date().getDate() ? '' : Math.round((d.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}`}
                key={index}
                className="inline-block pr-2 cursor-pointer"
              >
                <div
                  className={
                    (d.getTime() == day.getTime()
                      ? 'bg-teal-100 ring-2 ring-teal-400'
                      : 'bg-white') +
                    ' w-16 h-20 max-w-xs overflow-hidden border-2 rounded-md border-gray-100 text-black'
                  }
                >
                  <div className="flex-col py-2">
                    <p className="text-center font-medium text-gray-500">
                      {d.toLocaleString('default', { weekday: 'short' })}
                    </p>
                    <p className="text-center font-medium text-2xl">
                      {d.getDate()}
                    </p>
                  </div>
                </div>
                {/* <div className="flex flex-nowrap justify-center">
                    <div className="inline-block py-2 ">
                      <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
                    </div>
                    <div className="inline-block py-2 px-1 ">
                      <div className="w-1 h-1 rounded-full bg-green-500"></div>
                    </div>
                    <div className="inline-block py-2 ">
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                    </div>
                  </div> */}
              </a>
            ))}
          </div>{' '}
          <div className="w-full flex items-end justify-end">
            <a
              href={`/app/schedule/${Math.round((days[0].getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) - 1}`}
              className="inline-block pr-2 cursor-pointer"
            >
              <Button variant="link" className="text-white">
                <ArrowLeft />
                Previous Week
              </Button>
            </a>
            <a
              href={`/app/schedule/${Math.round((days[6].getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) + 1}`}
              className="inline-block pr-2 cursor-pointer"
            >
              <Button variant="link" className="text-white">
                Next Week
                <ArrowRight />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Days;
