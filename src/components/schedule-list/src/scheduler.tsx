import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn, createSplitProps } from '#/utilities';
import React from 'react';
import { SchedulerDnd } from './scheduler-dnd';
import {
  SchedulerOptions,
  SchedulerProvider,
  useScheduler,
} from './use-scheduler';

export interface SchedulerProps
  extends HTMLVelcureProps<'div'>,
    SchedulerOptions {}

export const Scheduler = React.forwardRef<HTMLDivElement, SchedulerProps>(
  (props, ref) => {
    const [schedulerOptions, { className, children, ...restProps }] =
      createSplitProps<SchedulerOptions>()(props, [
        'date',
        'shifts',
        'onDateChange',
        'users',
        'schedules',
        'onCreateSchedule',
        'onCreateShift',
        'onUserAssign',
      ]);

    const ctx = useScheduler(schedulerOptions);

    return (
      <SchedulerProvider value={ctx}>
        <SchedulerDnd>
          <velcure.div
            ref={ref}
            {...restProps}
            className={cn('flex flex-col flex-1')}
          >
            {children}
          </velcure.div>
        </SchedulerDnd>
      </SchedulerProvider>
    );
  }
);

Scheduler.displayName = 'Scheduler';
