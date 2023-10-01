import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';
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
    const {
      className,
      businessHours,
      locale = 'de',
      nowIndicator = true,
      resources = [],
      events = [],
      onClickEvent,
      ...restProps
    } = props;

    const ctx = useScheduler({
      businessHours,
      locale,
      nowIndicator,
      resources,
      events,
      onClickEvent,
    });

    return (
      <MobileNotSupported>
        <SchedulerProvider value={ctx}>
          <velcure.div
            ref={ref}
            {...restProps}
            className={cn(
              'flex h-full w-full flex-col gap-4 flex-1',
              className
            )}
          >
            <SchedulerHeader />
            <velcure.div className="bg-background relative isolate flex flex-1 flex-col overflow-scroll">
              <velcure.div className="relative flex  max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
                <SchedulerDayView />
              </velcure.div>
            </velcure.div>
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
      <div className="hidden h-full sm:block">{children}</div>
    </>
  );
};
