import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export enum Views {
  Days,
  Months,
  Years,
  Decades,
}

export enum WeekStart {
  Saturday = 0,
  Sunday,
  Monday,
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

export default function isValidDate(date: unknown): boolean {
  if (!isDate(date) && typeof date !== 'number') {
    return false;
  }
  const _date = toDate(date);
  return !isNaN(Number(_date));
}

export const isDateInRange = (
  date: Date,
  minDate?: Date,
  maxDate?: Date
): boolean => {
  const dateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();

  if (minDate && maxDate) {
    const minDateTime = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate()
    ).getTime();
    const maxDateTime = new Date(
      maxDate.getFullYear(),
      maxDate.getMonth(),
      maxDate.getDate()
    ).getTime();
    return dateTime >= minDateTime && dateTime <= maxDateTime;
  }

  if (minDate) {
    const minDateTime = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate()
    ).getTime();
    return dateTime >= minDateTime;
  }

  if (maxDate) {
    const maxDateTime = new Date(
      maxDate.getFullYear(),
      maxDate.getMonth(),
      maxDate.getDate()
    ).getTime();
    return dateTime <= maxDateTime;
  }

  return true;
};

export const isDateEqual = (date: Date, selectedDate: Date): boolean => {
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  selectedDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );

  return date.getTime() === selectedDate.getTime();
};

export const getFirstDateInRange = (
  date: Date,
  minDate?: Date,
  maxDate?: Date
): Date => {
  if (!isDateInRange(date, minDate, maxDate)) {
    if (minDate && date < minDate) {
      date = minDate;
    } else if (maxDate && date > maxDate) {
      date = maxDate;
    }
  }
  return date;
};

export const getFirstDayOfTheMonth = (
  date: Date,
  weekStart: WeekStart
): Date => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay();

  const diff = (dayOfWeek - weekStart + 7) % 7;
  return addDays(firstDayOfMonth, -diff);
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

export const addDays = (date: Date, amount: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
};

export const addMonths = (date: Date, amount: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + amount);
  return newDate;
};

export const addYears = (date: Date, amount: number): Date => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + amount);
  return newDate;
};

export const getFormattedDate = (
  language: string,
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  let defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  if (options) {
    defaultOptions = options;
  }

  return new Intl.DateTimeFormat(language, defaultOptions).format(date);
};

export const startOfYearPeriod = (date: Date, years: number): number => {
  const year = date.getFullYear();
  return Math.floor(year / years) * years;
};

export const isDateInDecade = (date: Date, startYear: number): boolean => {
  const year = date.getFullYear();
  const endYear = startYear + 9;
  return year >= startYear && year <= endYear;
};

export const isDateRangeInDecade = (
  startDate: Date,
  endDate: Date,
  decadeStart: number,
  decadeEnd: number
): boolean => {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (decadeStart && decadeEnd) {
    // Check if the start and end years of the date range are within the decade
    const isStartYearInRange = isDateInRange(
      new Date(startYear, 0, 1),
      new Date(decadeStart, 0, 1),
      new Date(decadeEnd, 11, 31)
    );
    const isEndYearInRange = isDateInRange(
      new Date(endYear, 11, 31),
      new Date(decadeStart, 0, 1),
      new Date(decadeEnd, 11, 31)
    );

    return isStartYearInRange && isEndYearInRange;
  }

  // If decadeStart or decadeEnd is not provided, treat it as an open-ended range
  return true;
};

/**
 * startOfToday returns the start of today
 * @returns {Date} The start of today
 */
export const startOfToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

// Navigate to prev/next for given view's date by value
export const getViewDatePage = (
  view: Views,
  date: Date,
  value: number
): Date => {
  switch (view) {
    case Views.Days:
      return new Date(addMonths(date, value));
    case Views.Months:
      return new Date(addYears(date, value));
    case Views.Years:
      return new Date(addYears(date, value * 10));
    case Views.Decades:
      return new Date(addYears(date, value * 100));
    default:
      return new Date(addYears(date, value * 10));
  }
};

export const formatInputValue = ({
  date,
  locale,
  formatDate,
  options,
}: {
  date?: Date;
  locale: string;
  formatDate?: (d: Date) => string;
  options?: Intl.DateTimeFormatOptions;
}) => {
  if (!date) {
    return '';
  }

  if (formatDate) {
    return formatDate(date);
  }

  let defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  if (options) {
    defaultOptions = options;
  }

  return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
};

export const formatInitialInputValue = ({
  value,
  formatDate,
  locale,
}: {
  locale: string;
  value?: Date;
  formatDate?: (date: Date) => string;
}) => {
  let inputValue = '';
  let previewDate = value;

  if (previewDate === undefined || !isValidDate(value)) {
    return inputValue;
  }

  if (value !== undefined) {
    inputValue = formatInputValue({
      locale,
      date: value,
      formatDate,
    });
  }

  return inputValue;
};

interface ParseInputValueProps {
  inputValue: string;
  locale: string;
  format?: string;
}

export const parseInputValue = ({
  inputValue,
  locale,
  format,
}: ParseInputValueProps) => {
  const MINIMUM_DATE = new Date(1001, 0, 0);

  const date = dayjs(inputValue, format, locale);

  if (date.isValid() && !date.isBefore(MINIMUM_DATE)) {
    return date.toDate();
  }

  return;
};