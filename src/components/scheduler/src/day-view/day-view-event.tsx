import { HTMLVelcureProps, velcure } from '#/components/factory';
import dayjs from 'dayjs';
import { CalendarEvent } from '../scheduler-types';

import { cn } from '#/utilities';
import { forwardRef } from 'react';
import { useSchedulerContext } from '../use-scheduler';

interface DayViewEventButtonProps extends HTMLVelcureProps<'button'> {
  event: CalendarEvent;
}

export const DayViewEventButton = forwardRef<
  HTMLButtonElement,
  DayViewEventButtonProps
>((props, ref) => {
  const { className, event, ...restProps } = props;

  const { onClickEvent, timeFormat } = useSchedulerContext();

  return (
    <velcure.button
      ref={ref}
      {...restProps}
      className={cn(
        'absolute inset-1 overflow-auto rounded-lg',
        'bg-blue-50 border border-blue-200 hover:bg-blue-100',
        // text styling
        'text-xs text-start px-2 text-blue-700',
        className
      )}
      data-start={event.startDate}
      data-end={event.endDate}
      onClick={(e) => {
        restProps?.onClick?.(e);
        onClickEvent?.(event);
      }}
    >
      <p className="text-blue-500 group-hover:text-blue-700 ">
        <time dateTime={new Date(event.startDate).toISOString()}>
          {dayjs(event.startDate).format(timeFormat)}
        </time>
        <span>-</span>
        <time dateTime={new Date(event.endDate).toISOString()}>
          {dayjs(event.endDate).format(timeFormat)}
        </time>
      </p>
      <p>
        Date: {dayjs(event.startDate).format('DD.MM.YYYY')} -
        {dayjs(event.endDate).format('DD.MM.YYYY')}
      </p>
    </velcure.button>
  );
});
