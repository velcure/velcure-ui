//dayjs plugins will be imported here.
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

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
