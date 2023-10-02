import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { parseColor } from '@zag-js/color-utils';
import { darken, readableColor } from 'color2k';
import dayjs from 'dayjs';
import { forwardRef } from 'react';
import { CalendarEvent } from '../scheduler-types';
import { useSchedulerContext } from '../use-scheduler';

export interface EventProps extends HTMLVelcureProps<'button'> {
  event: CalendarEvent;
  eventDuration: number;
}

const getColor = (str?: string) => {
  try {
    return parseColor(str || '');
  } catch (error) {
    return parseColor('#EFF6FF');
  }
};

export const Event = forwardRef<HTMLButtonElement, EventProps>((props, ref) => {
  const { className, event, eventDuration, onClick, ...restProps } = props;

  const { onClickEvent } = useSchedulerContext();

  const color = getColor(event?.color);

  return (
    <velcure.button
      ref={ref}
      {...restProps}
      className={cn(
        'group flex h-full w-full flex-col overflow-y-auto',
        'rounded-lg px-2 py-1 text-xs text-start leading-5',
        // colors
        'transition-colors',
        'bg-[var(--bg-color)] border-[var(--border-color)]',
        'text-[var(--color)]',
        'border hover:bg-[var(--bg-color-hover)]',
        className
      )}
      style={
        {
          ...restProps.style,
          '--color': readableColor(color.toString('hex')),
          '--bg-color': color.toString('css'),
          '--border-color': darken(color.toString('hex'), 0.1),
          '--bg-color-hover': darken(color.toString('hex'), 0.05),
        } as React.CSSProperties
      }
      data-color={event.color}
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
