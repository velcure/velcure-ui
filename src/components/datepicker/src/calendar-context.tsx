import { createContext } from '#/hooks';
import { Views, type WeekStart } from './utils';

type CalendarContextValue = {
  viewDate: Date;
  setViewDate: (date: Date) => void;
  minValue?: Date;
  maxValue?: Date;
  weekStart: WeekStart;

  locale: string;
  view: Views;
  setView: (value: Views) => void;

  onClick?: (date: Date) => void;
  value?: Date;
};

export const [CalendarContext, useCalendarContext] =
  createContext<CalendarContextValue>({
    name: 'CalendarContext',
    errorMessage:
      'useCalendarContext must be used within a CalendarContextProvider',
  });
