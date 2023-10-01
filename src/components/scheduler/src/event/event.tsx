import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import dayjs from 'dayjs';
import { forwardRef } from 'react';
import { CalendarEvent } from '../scheduler-types';
import { useSchedulerContext } from '../use-scheduler';

export interface EventProps extends HTMLVelcureProps<'button'> {
  event: CalendarEvent;
  eventDuration: number;
}

export const Event = forwardRef<HTMLButtonElement, EventProps>((props, ref) => {
  const { className, event, eventDuration, onClick, ...restProps } = props;

  const { onClickEvent } = useSchedulerContext();

  return (
    <velcure.button
      ref={ref}
      {...restProps}
      className={cn(
        'group flex h-full w-full flex-col overflow-y-auto',
        'rounded-lg px-2 py-1 text-xs text-start leading-5',
        // colors
        'bg-blue-50 border border-blue-200 hover:bg-blue-100',
        className
      )}
      onClick={(e) => {
        onClick?.(e);
        onClickEvent?.(event);
      }}
    >
      <div>{event.name}</div>
      {eventDuration >= 30 && (
        <p className="text-subtle text-left text-[10px] leading-none">
          {dayjs(event.startDate).format('HH:mm')} -{' '}
          {dayjs(event.endDate).format('HH:mm')}
        </p>
      )}
    </velcure.button>
  );
});

Event.displayName = 'Event';
