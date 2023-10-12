import { HTMLVelcureProps, velcure } from '#/components/factory';
import { PlusIcon } from '#/components/icons/src';
import {
  CircularProgress,
  CircularProgressLabel,
} from '#/components/progress/src';
import { cn } from '#/utilities';
import dayjs from 'dayjs';
import React from 'react';
import { useSchedulerContext } from './use-scheduler';

export interface SchedulerHeaderWeekItemProps
  extends HTMLVelcureProps<'button'> {
  week: number;
}

const getCalendarWeekStartEndRange = (week: number, currentDate: Date) => {
  const date = dayjs(currentDate).isoWeek(week);

  return `${date.startOf('isoWeek').format('DD.')} - ${date
    .endOf('isoWeek')
    .format('DD.')}`;
};

export const SchedulerHeaderWeekItem = React.forwardRef<
  HTMLButtonElement,
  SchedulerHeaderWeekItemProps
>((props, ref) => {
  const { className, week, ...restProps } = props;

  const { date, setDate, currentWeek, getScheduleByWeek } =
    useSchedulerContext();

  const schedule = getScheduleByWeek(week);

  return (
    <velcure.button
      ref={ref}
      className={cn(
        'items-center flex justify-center shrink-0 grow',
        'flex flex-col gap-2 bg-background hover:bg-muted/30 rounded-lg',
        'relative py-2 px-1',
        week === currentWeek && 'ring-1 ring-primary ring-inset',
        className
      )}
      {...restProps}
      onClick={() => {
        const newDate = dayjs()
          .year(dayjs(date).isoWeekYear())
          .isoWeek(week)
          .startOf('isoWeek')
          .toDate();
        setDate(newDate);
      }}
    >
      <CircularProgress
        className="h-8 w-8"
        value={schedule ? schedule.coveragePercentage : 0}
        trackColor={schedule ? 'stroke-orange-200' : undefined}
        color="stroke-orange-700"
      >
        <CircularProgressLabel>
          {schedule ? (
            <div>{schedule.coveragePercentage}</div>
          ) : (
            <PlusIcon className="h-4 w-4 text-muted-foreground" />
          )}
        </CircularProgressLabel>
      </CircularProgress>
      <div className="truncate text-xs divide-x">
        <span className="px-1 font-semibold">{week}</span>
        <span className="px-1">{getCalendarWeekStartEndRange(week, date)}</span>
      </div>
    </velcure.button>
  );
});

SchedulerHeaderWeekItem.displayName = 'SchedulerHeaderWeekItem';
