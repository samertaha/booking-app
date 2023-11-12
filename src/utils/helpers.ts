import { OPENING_HOURS_INTERVAL, categories, now } from "@/constants/config";
import {
  add,
  addMinutes,
  getHours,
  getMinutes,
  isBefore,
  isEqual,
  parse,
} from "date-fns";
import { Day } from "@prisma/client";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const selectOptions = categories.map((category) => ({
  value: category,
  label: capitalize(category),
}));

export const weekdayIndexToName = (index: number) =>
  [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ][index];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// function to round a given date up to the nearest half hour
export const roundToNearestMinutes = (date: Date, interval: number) => {
  const minutesLeftUntilNextInterval = interval - (getMinutes(date) % interval);
  return addMinutes(date, minutesLeftUntilNextInterval);
};

/**
 *
 * @param startDate Day we want the opening hours for at midnight
 * @param dbDays opening hours for the week
 * @returns Array of dates for every opening hour
 */

export const getOpeningTimes = (startDate: Date, dbDays: Day[]) => {
  const dayOfWeek = startDate.getDay();
  const isToday = isEqual(
    startDate,
    new Date("January 15, 2023, 12:00:00").setHours(0, 0, 0, 0)
  );

  const today = dbDays.find((d) => d.dayOfWeek === dayOfWeek);
  if (!today) throw new Error("This day does not exist in the database");

  const opening = parse(today.openTime, "kk:mm", startDate);
  const closing = parse(today.closeTime, "kk:mm", startDate);

  let hours: number;
  let minutes: number;

  if (isToday) {
    //Round the current time to the nearest interval. if there are no more bookings today, throw an error
    const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL);
    const tooLate = !isBefore(rounded, closing);
    if (tooLate) throw new Error("There are no more bookings today");
    console.log("rounded", rounded);

    const isBeforeOpening = isBefore(rounded, opening);

    hours = getHours(isBeforeOpening ? opening : rounded);
    minutes = getMinutes(rounded);
  } else {
    hours = getHours(opening);
    minutes = getMinutes(opening);
  }

  const beginning = add(startDate, {
    hours,
    minutes,
  });
  const end = add(startDate, { hours: getHours(closing), minutes: getMinutes(closing) });
  const interval = OPENING_HOURS_INTERVAL; // in minutes

  // from beginning to end, every interval, generate a date and put that into an array
  const times = [];
  for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
    times.push(i);
  }
  return times;
};
