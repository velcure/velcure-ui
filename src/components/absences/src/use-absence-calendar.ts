import { IconButtonProps } from '#/components/button/src';
import { createContext, useControllableState } from '#/hooks';
import {
  PropGetter,
  callAllHandlers,
  generateMonthDates,
  generateWeekDates,
  getAllMonthsOfYear,
} from '#/utilities';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import {
  Absence,
  AbsenceScale,
  AbsenceTranslateFn,
  AbsenceType,
  AbsenceUser,
} from './types';

export interface AbsenceCalendarOptions {
  date?: Date | string;
  onDateChange?: (date: Date) => void;
  scale?: AbsenceScale;
  onScaleChange?: (scale: AbsenceScale) => void;
  users?: AbsenceUser[];
  onAbsenceAddClick?: (user: AbsenceUser, date: Date) => void;
  onAbsenceClick?: (absence: Absence) => void;
  translateFn?: AbsenceTranslateFn;
  absences?: Absence[];
  /**
   * Render the Agenda view of the calendar.
   * @default true
   */
  agenda?: boolean;
  /**
   * Absence types to display in the calendar.
   */
  absenceTypes?: AbsenceType[];
}

export const [AbsenceCalendarProvider, useAbsenceCalendarContext] =
  createContext<UseAbsenceCalendarReturn>({
    strict: true,
    name: 'AbsenceCalendarContext',
  });

export type UseAbsenceCalendarReturn = ReturnType<typeof useAbsenceCalendar>;

export const useAbsenceCalendar = (options: AbsenceCalendarOptions = {}) => {
  const {
    date: dateProp,
    onDateChange,
    scale: scaleProp,
    onScaleChange,
    translateFn = (key) => key,
    onAbsenceAddClick,
    onAbsenceClick,
    absences: absencesProp,
    agenda = true,
    users,
    absenceTypes = [],
  } = options;

  const [date, setDate] = useControllableState({
    value: dateProp ? new Date(dateProp) : undefined,
    defaultValue: new Date(),
    onChange: onDateChange,
  });

  const [scale, setScale] = useControllableState<AbsenceScale>({
    value: scaleProp,
    defaultValue: 'week',
    onChange: onScaleChange,
  });

  const range = React.useMemo(() => {
    switch (scale) {
      case 'year':
        return getAllMonthsOfYear(dayjs(date).year());
      case 'month': {
        return generateMonthDates(date);
      }
      default:
      case 'week': {
        return generateWeekDates(date);
      }
    }
  }, [date, scale]);

  const absences = useMemo(() => {
    const firstDay = range[0].getTime();
    const lastDay = range[range.length - 1].getTime();

    return absencesProp?.filter((a) => {
      const start = dayjs(a.startsAt).startOf('day').toDate();
      const end = dayjs(a.endsAt).endOf('day').toDate();
      // wenn start früher ist als der erste tag, setze start auf den ersten tag
      if (start.getTime() < firstDay) {
        start.setTime(firstDay);
      }

      if (end.getTime() > lastDay) {
        end.setTime(lastDay);
      }

      const absenceStart = start.getTime();
      const absenceEnd = end.getTime();

      return absenceStart >= firstDay && absenceEnd <= lastDay;
    });
  }, [absencesProp, range[0].getTime(), range[range.length - 1].getTime()]);

  const handlePrevious = () => {
    switch (scale) {
      case 'week': {
        setDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
        break;
      }
      case 'month': {
        setDate((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
        break;
      }
      case 'year': {
        setDate((prev) => new Date(prev.setFullYear(prev.getFullYear() - 1)));
        break;
      }
    }
  };

  const handleNext = () => {
    switch (scale) {
      case 'week': {
        setDate((prev) => new Date(prev.setDate(prev.getDate() + 7)));
        break;
      }
      case 'month': {
        setDate((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
        break;
      }
      case 'year': {
        setDate((prev) => new Date(prev.setFullYear(prev.getFullYear() + 1)));
        break;
      }
    }
  };

  const getNavigationPreviousButtonProps: PropGetter<IconButtonProps> =
    useCallback(
      (props = {} as IconButtonProps, ref) => {
        return {
          ...props,
          ref,
          variant: props.variant || 'ghost',
          'aria-label': translateFn('previous'),
          onClick: callAllHandlers(handlePrevious, props.onClick),
        };
      },
      [handlePrevious]
    );

  const getNavigationNextButtonProps: PropGetter<IconButtonProps> = useCallback(
    (props = {} as IconButtonProps, ref) => {
      return {
        ...props,
        ref,
        variant: props.variant || 'ghost',
        'aria-label': translateFn('next'),
        onClick: callAllHandlers(handleNext, props.onClick),
      };
    },
    [handleNext]
  );

  const getUserAbsences = useCallback(
    (user: AbsenceUser) => {
      return absences?.filter((a) => a.userId === user.id) || [];
    },
    [absences]
  );

  return {
    absences,
    date,
    scale,
    setDate,
    setScale,
    range,
    translateFn,
    onAbsenceAddClick,
    onAbsenceClick,
    agenda,
    users,
    getNavigationPreviousButtonProps,
    getNavigationNextButtonProps,
    getUserAbsences,
    absenceTypes,
  };
};
