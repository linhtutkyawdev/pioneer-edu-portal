'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const DateTimePicker = () => {
  const min = new Date();
  min.setDate(min.getDate() + 7);

  const addMonth = (date: Date, x: number) => {
    const tempDate = new Date(date);
    tempDate.setMonth(tempDate.getMonth() + x);
    return tempDate;
  };

  const [startDate, setStartDate] = useState<Date>(min);
  const [endDate, setEndDate] = useState<Date>(addMonth(startDate, 1));

  const addTime = (t: string, minutes: number) => {
    const [hh, mm] = t.split(':');
    let h = parseInt(hh);
    let m = parseInt(mm) + minutes;

    if (m > 59) {
      h += Math.floor(m / 60);
      m %= 60;
    }

    if (h > 23) return '23:59';
    return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`;
  };
  const subTime = (big: string, small: string) => {
    if (big === small) return '00:00';
    const [h1, m1] = big.split(':');
    const [h2, m2] = small.split(':');
    if (parseInt(h1) < parseInt(h2)) return '00:00';
    let h = parseInt(h1) - parseInt(h2);
    let m = parseInt(m1) - parseInt(m2);
    if (m < 0) {
      h--;
      m += 60;
    }
    if (h < 0) {
      h += 24;
    }
    return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`;
  };

  const getHour = (t: string) => {
    const [hh, mm] = t.split(':');
    const h = parseInt(hh);
    const m = parseInt(mm);
    return h + m / 60;
  };

  const [lectureDays, setLectureDays] = useState([
    { name: 'Sun', value: false },
    { name: 'Mon', value: true },
    { name: 'Tue', value: true },
    { name: 'Wed', value: true },
    { name: 'Thu', value: true },
    { name: 'Fri', value: true },
    { name: 'Sat', value: false },
  ]);
  const [startHour, setStartHour] = useState('09:00');
  const [endHour, setEndHour] = useState(addTime(startHour, 60));
  const [totalLectureDays, setTotalLectureDays] = useState(0);

  useEffect(() => {
    const min = addMonth(startDate, 1);
    if (min > endDate) setEndDate(min);
    else {
      const max = addMonth(startDate, 5);
      if (max < endDate) setEndDate(max);
    }
  }, [startDate]);

  useEffect(() => {
    const minTime = addTime(startHour, 60);
    if (endHour < minTime) setEndHour(minTime);
  }, [startHour]);

  useEffect(() => {
    let start = new Date(startDate);
    let finish = new Date(endDate);
    let dayMilliseconds = 1000 * 60 * 60 * 24;
    let lectureDaysNumbers = lectureDays
      .map((d, index) => (d.value ? index : null))
      .filter((d) => d !== null);

    let total = 0;
    while (start < finish) {
      if (lectureDaysNumbers.includes(start.getDay())) {
        total++;
      }
      start = new Date(+start + dayMilliseconds);
    }
    setTotalLectureDays(total);
  }, [lectureDays, startDate, endDate]);

  return [
    <div key="date-picker">
      <label className="text-white" htmlFor="start-date">
        Start Date <span className="-mb-2">*</span>
      </label>
      <input
        id="start-date"
        name="start-date"
        type="date"
        min={min.toISOString().split('T')[0]}
        max={addMonth(min, 6).toISOString().split('T')[0]}
        value={startDate.toISOString().split('T')[0]}
        onChange={(e) => {
          setStartDate(new Date(e.target.value));
        }}
        className="block w-full px-4 py-2 mb-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
      />
      <label className="text-white" htmlFor="end-date">
        End Date <span className="-mb-2">*</span> (duration :{' '}
        {Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 24 * 60 * 60),
        )}{' '}
        Days)
        <input
          type="hidden"
          name="day-count"
          value={Math.round(
            (endDate.getTime() - startDate.getTime()) / (1000 * 24 * 60 * 60),
          )}
        />
      </label>
      <input
        id="end-date"
        name="end-date"
        type="date"
        min={addMonth(startDate, 1).toISOString().split('T')[0]}
        max={addMonth(startDate, 6).toISOString().split('T')[0]}
        value={endDate.toISOString().split('T')[0]}
        onChange={(e) => {
          setEndDate(new Date(e.target.value));
        }}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
      />
    </div>,
    <div key="time-picker">
      <label className="text-white" htmlFor="lecture-days">
        Choose Lecture Days <span className="-mb-2">*</span> (Total :{' '}
        {totalLectureDays} days - {lectureDays.filter((d) => d.value).length} /
        week)
        <input
          type="hidden"
          name="total-lecture-day-count"
          value={totalLectureDays}
        />
      </label>
      <div className="flex flex-wrap justify-center gap-2 py-4">
        <input
          type="hidden"
          id="lecture-days"
          name="lecture-days"
          value={lectureDays
            .filter((d) => d.value)
            .map((d) => d.name)
            .join(',')}
        />
        {lectureDays.map((day) => (
          <label htmlFor="lecture-days" key={day.name}>
            <input
              hidden
              type="checkbox"
              defaultChecked={day.value}
              value={day.value ? '1' : '0'}
            />{' '}
            <Button
              size="sm"
              variant={day.value ? 'secondary' : 'link'}
              className={day.value ? '' : 'text-white'}
              type="button"
              onClick={(e) => {
                e.preventDefault();

                setLectureDays(
                  lectureDays.map((d) => {
                    if (d.name === day.name) {
                      if (
                        lectureDays.filter((da) => da.value).length === 1 &&
                        d.value
                      )
                        return d;
                      return { ...d, value: !d.value };
                    } else return d;
                  }),
                );
              }}
            >
              {day.name}
            </Button>
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2">
        {(() => {
          const timeDiff = subTime(endHour, startHour);
          return [
            <label
              key="start-hour-label"
              className="text-white"
              htmlFor="start-hour"
            >
              Start Hour <span className="-mb-2">*</span> (Total:{' '}
              {Math.round(getHour(timeDiff) * totalLectureDays)} h)
            </label>,
            <label
              key="end-hour-label"
              className="text-white ml-4"
              htmlFor="end-hour"
            >
              End Hour <span className="-mb-2">*</span> ({timeDiff} / day)
              <input
                hidden
                type="number"
                name="hour-per-day"
                value={getHour(timeDiff)}
              />
            </label>,
          ];
        })()}
      </div>
      <div className="flex gap-4">
        <input
          id="start-hour"
          name="start-hour"
          type="time"
          value={startHour}
          onChange={(e) => setStartHour(e.target.value)}
          step={1800}
          className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
        />
        <input
          id="end-hour"
          name="end-hour"
          type="time"
          min={addTime(startHour, 60)}
          max={addTime(startHour, 6 * 60)}
          value={endHour}
          onChange={(e) => setEndHour(e.target.value)}
          step={1800}
          className="block w-[calc(50%-1rem)] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
        />
      </div>
    </div>,
  ];
};

export default DateTimePicker;
