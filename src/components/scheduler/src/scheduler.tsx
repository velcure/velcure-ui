import { IconButton } from '#/components/button/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { ChevronLeftIcon, ChevronRightIcon } from '#/components/icons/src';
import { cn, createSplitProps } from '#/utilities';
import { forwardRef, useRef, useState } from 'react';
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

    const [prevNavButtonVisible, setPrevNavButtonVisible] = useState(false);
    const [nextNavButtonVisible, setNextNavButtonVisible] = useState(false);

    const timeout = useRef<number>();

    const getScrollValue = (direction: 'prev' | 'next') => {
      // find count of "#resource-name" elements within the container
      const resources =
        containerRef.current?.querySelectorAll('#resource-name');

      // get the width of the first resource element
      const scrollWidth = resources?.[0]?.clientWidth || 0;

      const distanceToScroll = scrollWidth;
      const finalScrollVal = distanceToScroll * (direction === 'prev' ? -1 : 1);

      return finalScrollVal;
    };

    const onMouseDown = (direction: 'prev' | 'next') => {
      if (timeout.current) return;

      const finalScrollVal = getScrollValue(direction);

      timeout.current = window.setInterval(() => {
        containerRef.current?.scrollBy({
          left: finalScrollVal,
          behavior: 'smooth',
        });
      }, 100);
    };

    const onClick = (direction: 'prev' | 'next') => {
      const finalScrollVal = getScrollValue(direction);

      containerRef.current?.scrollBy({
        left: finalScrollVal,
        behavior: 'smooth',
      });
    };

    const clearCounter = () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = undefined;
      }
    };

    const handleScroll = () => {
      const {
        scrollLeft = 0,
        scrollWidth = 1000,
        clientWidth = 800,
      } = containerRef.current || {};

      setPrevNavButtonVisible(scrollLeft > 0);
      setNextNavButtonVisible(scrollLeft + clientWidth < scrollWidth);
    };

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
                'isolate',
                ctx.isDragging
                  ? 'overflow-y-hidden overflow-x-scroll'
                  : 'overflow-auto'
              )}
              ref={containerRef}
              onScroll={handleScroll}
            >
              <IconButton
                aria-label="previous"
                icon={<ChevronLeftIcon className="h-6 w-6" />}
                className={cn(
                  'absolute left-4 top-1/2 z-50',
                  'transition-transform transform',
                  prevNavButtonVisible ? 'scale-100' : 'scale-0'
                )}
                isRound
                onMouseDown={() => onMouseDown('prev')}
                onClick={() => onClick('prev')}
                size="lg"
                onMouseLeave={clearCounter}
                onMouseUp={clearCounter}
              />
              <div className="flex flex-1 flex-col w-full">
                <SchedulerDayView />
              </div>
              <IconButton
                aria-label="previous"
                icon={<ChevronRightIcon className="h-6 w-6" />}
                className={cn(
                  'absolute right-4 top-1/2 z-50',
                  'transition-transform transform',
                  nextNavButtonVisible ? 'scale-100' : 'scale-0'
                )}
                onMouseDown={() => onMouseDown('next')}
                onClick={() => onClick('next')}
                isRound
                size="lg"
                onMouseLeave={clearCounter}
                onMouseUp={clearCounter}
              />
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
