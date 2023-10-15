//dayjs plugins will be imported here.
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);

export type DateValue = Date | null | undefined;
export type DatesRangeValue = [DateValue, DateValue];
export type DatePickerType = 'default' | 'multiple' | 'range';

export enum WeekStart {
  Saturday = 0,
  Sunday,
  Monday,
}

export type DatePickerValue<Type extends DatePickerType = 'default'> =
  Type extends 'range'
    ? DatesRangeValue
    : Type extends 'multiple'
    ? Date[]
    : DateValue;

/**
 * startOfToday returns the start of today
 * @returns {Date} The start of today
 */
export const startOfToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const getWeekDays = (lang: string, weekStart: WeekStart): string[] => {
  const weekdays: string[] = [];
  const date = new Date();

  const formatter = new Intl.DateTimeFormat(lang, { weekday: 'short' });

  for (let i = 0; i < 7; i++) {
    const dayIndex = (i + weekStart) % 7; // Calculate the correct day index based on weekStart
    date.setDate(dayIndex + 1);
    const formattedWeekday = formatter.format(date);
    weekdays.push(
      formattedWeekday.slice(0, 2).charAt(0).toUpperCase() +
        formattedWeekday.slice(1, 3)
    );
  }

  return weekdays;
};

export default function isValidDate(date: unknown): boolean {
  if (!isDate(date) && typeof date !== 'number') {
    return false;
  }
  const _date = toDate(date);
  return !isNaN(Number(_date));
}

export function isDate(value: unknown): value is Date {
  return (
    value instanceof Date ||
    (typeof value === 'object' &&
      Object.prototype.toString.call(value) === '[object Date]')
  );
}

export function toDate<DateType extends Date = Date>(
  argument: DateType | number
): DateType {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === 'object' && argStr === '[object Date]')
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: TODO find a way to make TypeScript happy about this code
    return new argument.constructor(argument.getTime());
    // return new Date(argument.getTime())
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    // TODO: Can we get rid of as?
    return new Date(argument) as DateType;
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN) as DateType;
  }
}

export const startOfDay = (date?: Date): Date => {
  if (!date) {
    date = new Date();
  }

  const newDate = new Date(date.getTime());
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * Calculates the week number for a given date.
 * @param {Date} date - The date for which to calculate the week number.
 * @returns {number} - The week number.
 */
export const getWeekNumber = (date: Date): number => {
  // Create a copy of the date to avoid modifying the original date
  const d: Date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  // Set the date to the nearest Thursday (accounting for 0-indexed days)
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

  // Calculate the start of the year
  const yearStart: Date = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  // Calculate the week number by dividing the difference in milliseconds by the number of milliseconds in a week
  const weekNumber: number = Math.ceil(
    (+d - +yearStart) / (7 * 24 * 60 * 60 * 1000)
  );

  return weekNumber;
};

/**
 * Generates an array of dates for a whole week (from Monday to Sunday)
 * based on an input date.
 * @param inputDate - The input date for which the week dates should be generated.
 * @returns An array of dates representing the week (Monday to Sunday).
 */
export const generateWeekDates = (inputDate: Date | string): Date[] => {
  const startDate: Dayjs = dayjs(inputDate).startOf('week').add(1, 'day'); // Monday as the start of the week
  const weekDates: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate: Date = startDate.add(i, 'day').toDate();
    weekDates.push(currentDate);
  }

  return weekDates;
};

/**
 * Generates an array of dates for a whole month based on an input date.
 * @param inputDate - The input date for which the month dates should be generated.
 * @returns An array of dates representing the whole month.
 */
export const generateMonthDates = (inputDate: Date | string): Date[] => {
  const startDate = dayjs(inputDate).startOf('month');
  const endDate = dayjs(inputDate).endOf('month');
  const monthDates: Date[] = [];

  let currentDate = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    monthDates.push(currentDate.toDate());
    currentDate = currentDate.add(1, 'day');
  }

  return monthDates;
};

/**
 * Formats a date range as a string in the following format:
 * - If both dates are in the same year: "DD.MM.-DD.MM.YYYY"
 * - If dates are in different years: "DD.MM.YYYY-DD.MM.YYYY"
 *
 * @param startsAt The start date of the range.
 * @param endsAt The end date of the range.
 * @returns A formatted date range string.
 */
export const formatRangeDates = (
  startsAt: Date | string | number,
  endsAt: Date | string | number
): string => {
  const startDate = dayjs(startsAt);
  const endDate = dayjs(endsAt);

  const isSameYear = startDate.year() === endDate.year();

  const dateFormat = isSameYear ? 'DD.MM.' : 'DD.MM.YYYY';

  const formattedStart = startDate.format(dateFormat);
  const formattedEnd = endDate.format('DD.MM.YYYY');

  return `${formattedStart}-${formattedEnd}`;
};

/**
 * Checks if a given date is the first day of the week (Monday).
 * @param inputDate - The input date to check.
 * @returns `true` if the input date is the first day of the week (Monday), otherwise `false`.
 */
export const isFirstDayOfWeek = (
  inputDate: Date | string,
  weekStart = 1
): boolean => {
  const date = dayjs(inputDate);
  return date.day() === weekStart; // 1 represents Monday in dayjs (0 is Sunday)
};

/**
 * Returns an array of all months in a given year.
 * @param year - The year for which to get all months.
 * @returns An array of strings representing all months in the year (e.g., ["January 2023", "February 2023", ...]).
 */
export const getAllMonthsOfYear = (year: number): Date[] => {
  const months: Date[] = [];
  const startDate = dayjs().year(year).startOf('year');

  for (let month = 0; month < 12; month++) {
    const currentMonth = startDate.month(month);
    months.push(currentMonth.toDate());
  }

  return months;
};
