import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import dayjs from 'dayjs';
import React from 'react';
import { useSchedulerContext } from './use-scheduler';

export interface SchedulerHeaderItemProps extends HTMLVelcureProps<'div'> {
  date: Date;
}

export const SchedulerHeaderItem = React.forwardRef<
  HTMLDivElement,
  SchedulerHeaderItemProps
>((props, ref) => {
  const { className, date, ...restProps } = props;

  const day = dayjs(date);
  const { getHeaderItemProps } = useSchedulerContext();

  return (
    <velcure.div
      {...getHeaderItemProps(restProps, ref)}
      className={cn(
        'flex flex-1 items-center px-2 first:ps-0 min-h-10 text-sm',
        className
      )}
    >
      <strong>{day.format('dd')}</strong>
      <span>
        , {day.format('DD')}. {day.format('MMM')}
      </span>
    </velcure.div>
  );
});

SchedulerHeaderItem.displayName = 'SchedulerHeaderItem';
