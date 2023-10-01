import { WeekStart } from '#/utilities';
import isValidDate from '#/utilities/date-utils';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';

export enum Views {
  Days,
  Months,
  Years,
  Decades,
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
    month: 'numeric',
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
    month: 'numeric',
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

const FORMATS = ['DD/MM/YYYY', 'DD-MM-YYYY', 'DD.MM.YYYY', 'D.M.YYYY'];

export const parseInputValue = ({
  inputValue,
  locale,
  format,
}: ParseInputValueProps) => {
  const MINIMUM_DATE = new Date(1001, 0, 0);

  const formats = format ? [format, ...FORMATS] : FORMATS;

  for (const f of formats) {
    const date = dayjs(inputValue, f, locale);

    if (date.isValid() && !date.isBefore(MINIMUM_DATE)) {
      return date.toDate();
    }
  }

  return;
};

export function dateStringParser(dateString: string | null) {
  if (!dateString) return null;

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime()) || !dateString) {
    return null;
  }

  return date;
}
