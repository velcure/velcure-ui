import { createContext, useControllableState } from '#/hooks';
import { PropGetter, generateWeekDates } from '#/utilities';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { Schedule, ScheduleUser, Shift } from './types';

export interface SchedulerOptions {
  shifts?: Shift[];
  date?: Date;
  onDateChange?: (date: Date) => void;
  users?: ScheduleUser[];
  schedules?: Schedule[];
  onCreateSchedule?: (date: Date) => void;
  onCreateShift?: (departmentId: string, date: Date) => void;
  onUserAssign?: (userId: string, shiftId: string) => void;
}

export const [SchedulerProvider, useSchedulerContext] =
  createContext<UseSchedulerReturn>({
    strict: true,
    name: 'SchedulerContext',
  });

export type UseSchedulerReturn = ReturnType<typeof useScheduler>;

const noop = () => {};

export const useScheduler = (options: SchedulerOptions) => {
  const {
    shifts = [],
    date: dateProp,
    onDateChange,
    users = [],
    schedules = [],
    onCreateSchedule = noop,
    onCreateShift = noop,
    onUserAssign = noop,
  } = options;

  const [date, setDate] = useControllableState({
    value: dateProp,
    defaultValue: new Date(),
    onChange: onDateChange,
  });

  const currentWeek = useMemo(() => dayjs(date).isoWeek(), [date]);

  const currentSchedule = useMemo(() => {
    const currentDate = dayjs(date);

    return schedules.find((schedule) => {
      const startOfPeriod = dayjs(schedule.startOfPeriod);

      return (
        startOfPeriod.isoWeek() === currentWeek &&
        startOfPeriod.year() === currentDate.year()
      );
    });
  }, [currentWeek, date, schedules]);

  const range = React.useMemo(() => {
    return generateWeekDates(dayjs(date).startOf('isoWeek').toDate());
  }, [date]);

  const [sidebarMounted, setSidebarMounted] = React.useState(false);

  const getScheduleByWeek = useCallback(
    (week: number) => {
      return schedules.find((schedule) => {
        return dayjs(schedule.startOfPeriod).isoWeek() === week;
      });
    },
    [schedules]
  );

  const getHeaderItemProps: PropGetter = useCallback((props = {}, ref) => {
    return {
      ...props,
      ref,
    };
  }, []);

  return {
    shifts,
    users,
    date,
    setDate,
    range,
    sidebarMounted,
    currentWeek,
    currentSchedule,
    setSidebarMounted,
    getHeaderItemProps,
    getScheduleByWeek,
    onCreateSchedule,
    onCreateShift,
    onUserAssign,
  };
};
