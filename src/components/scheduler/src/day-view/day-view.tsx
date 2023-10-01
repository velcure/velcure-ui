import { HTMLVelcureProps, velcure } from '#/components/factory';
import { HoverCard } from '#/components/hover-card/src';
import { useMergeRefs } from '#/hooks';
import { cn } from '#/utilities';
import { Fragment, forwardRef, useEffect, useMemo, useRef } from 'react';
import { useSchedulerContext } from '../use-scheduler';
import { getHoursToDisplay } from '../utils';
import { DayViewEventButton } from './day-view-event';
import { sortedEvents } from './utils';

export interface SchedulerDayViewProps
  extends Omit<HTMLVelcureProps<'div'>, 'dir'> {}

export const SchedulerDayView = forwardRef<
  HTMLDivElement,
  SchedulerDayViewProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const { date, events, resources } = useSchedulerContext();

  const containerOffset = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const containerNav = useRef<HTMLDivElement>(null);

  const resourceCount = resources.length;

  useEffect(() => {
    if (!container.current) return;
    if (!containerNav.current) return;
    if (!containerOffset.current) return;

    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  const hours = useMemo(() => getHoursToDisplay(0, 23), []);

  const sorted = useMemo(
    () => sortedEvents(events ?? [], date),
    [events, date]
  );

  return (
    <div
      ref={useMergeRefs(ref, container)}
      {...restProps}
      className={cn('isolate flex flex-auto flex-col overflow-auto')}
    >
      <div style={{ width: '165%' }} className="flex flex-none flex-col ">
        <DayViewNavigation ref={containerNav} resources={resources} />

        <div className="flex flex-1 w-auto">
          <div className="sticky left-0 z-10 flex-none w-14 bg-background ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            {/* Horizontal lines */}
            <div
              className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
              style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
            >
              <div ref={containerOffset} className="row-end-1 h-7"></div>
              {hours.map((hour, idx) => (
                <Fragment key={idx}>
                  <div key={idx}>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      {hour.minute(0).format('HH:mm')}
                    </div>
                  </div>
                  <div />
                </Fragment>
              ))}
            </div>

            {/* Vertical lines */}
            <div
              className={cn(
                'col-start-1 col-end-2 row-start-1 hidden sm:grid divide-x divide-gray-100',
                'grid-rows-1'
              )}
              style={{
                gridTemplateColumns: `repeat(${resourceCount}, minmax(0, 1fr))`,
              }}
            >
              {resources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="row-span-full"
                  style={{
                    gridColumnStart: index + 1,
                  }}
                />
              ))}
              <div
                className="row-span-full w-8"
                style={{
                  gridColumnStart: resourceCount + 1,
                }}
              />
            </div>

            {/** Event List */}
            <ol
              className="col-start-1 col-end-2 row-start-1 grid sm:pr-8"
              style={{
                gridTemplateColumns: `repeat(${resourceCount}, minmax(0, 1fr))`,
                // Bei 5 Minuten pro GridRow braucht man 1440 / 5 = 288 GridRows für einen ganzen Tag
                // 1 Grid Row = 5 minutes; 1 span = 5 minutes
                gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
              }}
            >
              {sorted.map((event) => (
                <li
                  key={event.id}
                  className="relative mt-px flex"
                  style={{
                    // idx of resource + 1 because grid columns start at 1
                    gridColumnStart: (event?.resourceIndex || 0) + 1,
                    gridRow: `${event?.gridRow + 2} / span ${event?.gridSpan}`, // offset
                    //  gridRowEnd: `span ${event?.gridSpan}`,
                    // gridRow: event.gridRow,
                    // gridRowEnd: `span ${event.gridSpan}`,
                  }}
                >
                  <HoverCard
                    content={
                      <div className="flex flex-col text-xs leading-5">
                        <div className="order-1 text-blue-700">
                          <pre>{JSON.stringify(event, null, 2)}</pre>
                        </div>
                      </div>
                    }
                  >
                    <DayViewEventButton event={event} />
                  </HoverCard>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
});

SchedulerDayView.displayName = 'SchedulerDayView';

interface DayViewNavigationProps {
  resources?: any[];
}

const DayViewNavigation = forwardRef<HTMLDivElement, DayViewNavigationProps>(
  (props, ref) => {
    const { resources = [] } = props;
    const total = resources.length;

    return (
      <velcure.div
        ref={ref}
        className="sticky top-0 z-30 flex-none bg-background shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
      >
        {/** create a separate mobile topbar here */}
        <div
          className="-mr-px hidden divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid"
          style={{
            gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))`,
          }}
        >
          <div className="col-end-1 w-14" />
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center justify-center py-3"
            >
              <span>{resource.name}</span>
              <span>ID: {resource.id}</span>
            </div>
          ))}
        </div>
      </velcure.div>
    );
  }
);
