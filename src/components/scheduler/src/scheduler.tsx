import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn, createSplitProps } from '#/utilities';
import { forwardRef, useRef } from 'react';
import { SchedulerDayView } from './day-view';
import { SchedulerHeader } from './scheduler-header';
import {
  SchedulerOptions,
  SchedulerProvider,
  useScheduler,
} from './use-scheduler';

export interface SchedulerProps
  extends HTMLVelcureProps<'div'>,
    SchedulerOptions {}

export const Scheduler = forwardRef<HTMLDivElement, SchedulerProps>(
  (props, ref) => {
    const [schedulerProps, { className, ...restProps }] =
      createSplitProps<SchedulerOptions>()(props, [
        'startHour',
        'endHour',
        'timeFormat',
        'locale',
        'nowIndicator',
        'resources',
        'events',
        'onClickEvent',
        'date',
        'onDateChange',
        'onEventUpdate',
      ]);

    const ctx = useScheduler(schedulerProps);

    const containerRef = useRef<HTMLDivElement>(null);

    return (
      <MobileNotSupported>
        <SchedulerProvider value={ctx}>
          <velcure.div
            ref={ref}
            {...restProps}
            className={cn(
              'flex min-h-0 min-w-0 flex-col gap-4 flex-1',
              className
            )}
          >
            <SchedulerHeader />
            <div
              className={cn(
                'flex-1 min-h-0 min-w-0 overflow-y-auto flex flex-col',
                'isolate relative',
                ctx.isDragging
                  ? 'overflow-y-hidden overflow-x-scroll'
                  : 'overflow-auto'
              )}
            >
              <div className="flex flex-1 flex-col w-full">
                <SchedulerDayView ref={containerRef} />
              </div>
            </div>
          </velcure.div>
        </SchedulerProvider>
      </MobileNotSupported>
    );
  }
);

Scheduler.displayName = 'Scheduler';

/** @todo Will be removed once we have mobile support */
const MobileNotSupported = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center sm:hidden text-center">
        <h1 className="text-2xl font-bold">Mobile not supported yet </h1>
        <p className="text-accent-foreground">
          Please use a desktop browser to view this page
        </p>
      </div>
      <div className="hidden h-full sm:flex flex-1">{children}</div>
    </>
  );
};
