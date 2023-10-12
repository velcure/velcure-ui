import { IconButton } from '#/components/button/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { ChevronLeftIcon, ChevronRightIcon } from '#/components/icons/src';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import dayjs from 'dayjs';
import React from 'react';
import { SchedulerHeaderWeekItem } from './scheduler-header-week-item';
import { useSchedulerContext } from './use-scheduler';

export interface SchedulerHeaderProps extends HTMLVelcureProps<'div'> {}

const navItem = cva(['items-center flex justify-center shrink-0 grow']);

export const SchedulerHeader = React.forwardRef<
  HTMLDivElement,
  SchedulerHeaderProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const { date, setDate } = useSchedulerContext();

  const weeks = React.useMemo(() => {
    const startOfMonth = dayjs(date).startOf('month');

    const weeks = [];

    // Aktuelle ISO-Woche bestimmen
    let week = startOfMonth.isoWeek();

    // Solange die Woche im aktuellen Monat ist, zur Liste hinzufügen
    while (
      week >= startOfMonth.isoWeek() &&
      week <= startOfMonth.endOf('month').isoWeek()
    ) {
      weeks.push(week);
      week++;
    }

    return weeks;
  }, [date]);

  return (
    <velcure.div
      ref={ref}
      className={cn('flex items-center justify-between mb-4', className)}
      {...restProps}
    >
      <div className="flex items-center justify-start gap-3">
        {/** months  */}
        <div
          className={cn(navItem(), 'min-w-[7rem] w-28 max-w-[7rem] flex-col')}
        >
          <div className="text-center text-sm font-semibold text-foreground">
            {dayjs(date).format('MMM. YYYY')}
          </div>
          <p className="text-xs text-muted-foreground">
            {dayjs(date).startOf('month').format('DD.')} -{' '}
            {dayjs(date).endOf('month').format('DD.')}
          </p>
        </div>
        <div className={navItem()}>
          <IconButton
            aria-label="previous month"
            variant="ghost"
            size="sm"
            icon={<ChevronLeftIcon />}
            onClick={() => {
              setDate(
                dayjs(date).subtract(1, 'month').startOf('month').toDate()
              );
            }}
          />
        </div>
        <div className="grid grid-flow-col auto-cols-auto grid-rows-1 gap-2">
          {weeks.map((week, idx) => (
            <SchedulerHeaderWeekItem key={`week-${week}-${idx}`} week={week} />
          ))}
        </div>

        <div className={navItem()}>
          <IconButton
            aria-label="previous month"
            variant="ghost"
            size="sm"
            icon={<ChevronRightIcon />}
            onClick={() => {
              setDate(dayjs(date).add(1, 'month').startOf('month').toDate());
            }}
          />
        </div>
      </div>
    </velcure.div>
  );
});

SchedulerHeader.displayName = 'SchedulerHeader';
