import { FC, useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";
import {
  INTERVAL,
  STORE_CLOSING_TIME,
  STORE_OPENING_TIME,
} from "~/constants/config";

interface indexProps {}

interface DateType {
  jusDate: Date | null;
  dateTime: Date | null;
}

const index: FC<indexProps> = ({}) => {
  const [date, setDate] = useState<DateType>({
    jusDate: null,
    dateTime: null,
  });

  console.log(date.dateTime);

  const getTimes = () => {
    if (!date.jusDate) return;

    const { jusDate } = date;

    const beginning = add(jusDate, { hours: STORE_OPENING_TIME });
    const end = add(jusDate, { hours: STORE_CLOSING_TIME });
    const interval = INTERVAL; // in minutes

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {date.jusDate ? (
        <div className="flex gap-4">
          {times?.map((time, i) => (
            <div key={`time-${i}`} className="rounded-sm bg-gray-100 p-2">
              <button
                type="button"
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className="REACT_CALENDAR p-s"
          view="month"
          onClickDay={(date) => setDate((prev) => ({ ...prev, jusDate: date }))}
        />
      )}
    </div>
  );
};

export default index;
