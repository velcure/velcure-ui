import { HTMLVelcureProps, velcure } from '#/components/factory';
import { useMergeRefs } from '#/hooks';
import { cn } from '#/utilities';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { EmptyCell } from '../event/empty-cell';
import { EventList } from '../event/event-list';
import { useSchedulerContext } from '../use-scheduler';
import { getHoursToDisplay } from '../utils';
import { CurrentTime } from './current-time';
import { DayViewColumns } from './day-view-columns';
import { HorizontalLines } from './horizontal-lines';
import { VerticalLines } from './vertical-lines';

export interface SchedulerDayViewProps
  extends Omit<HTMLVelcureProps<'div'>, 'dir'> {}

export const SchedulerDayView = forwardRef<
  HTMLDivElement,
  SchedulerDayViewProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const { resources } = useSchedulerContext();

  const containerOffset = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const containerNav = useRef<HTMLDivElement>(null);

  const [offsetHeight, setOffsetHeight] = useState<number>();

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

  const numberOfGridStopsPerDay = hours.length * 12;
  const hourSize = 58;

  useEffect(() => {
    if (!containerOffset.current) return;

    setOffsetHeight(containerOffset.current.offsetHeight);
  }, [containerOffset.current]);

  return (
    <div
      ref={useMergeRefs(ref, container)}
      {...restProps}
      className={cn('isolate flex flex-auto flex-col')}
      style={
        {
          ...restProps.style,
          '--one-minute-height': `calc(${hourSize}px/60)`,
          '--gridDefaultSize': `${hourSize}px`,
          '--calendar-offset-top': '28px',
        } as React.CSSProperties // This can't live in the css file because it's a dynamic value and css variable gets super
      }
    >
      <div style={{ width: '165%' }} className="flex flex-none flex-col ">
        <DayViewNavigation ref={containerNav} resources={resources} />

        <div className="relative flex flex-1 w-auto">
          <CurrentTime />
          <div className="sticky left-0 z-10 flex-none w-14 bg-background ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            {/* Horizontal lines */}
            <HorizontalLines
              hours={hours}
              containerOffsetRef={containerOffset}
            />

            {/* Vertical lines */}
            <VerticalLines count={resourceCount} />

            {/** Event List */}
            <DayViewColumns
              offsetHeight={offsetHeight}
              gridStopsPerDay={numberOfGridStopsPerDay}
            >
              {[...Array(resourceCount)].map((_, i) => (
                <li
                  key={`event-resource-list-${i}`}
                  className="relative"
                  style={{ gridColumnStart: i + 1 }}
                >
                  <EventList resourceIndex={i} />
                </li>
              ))}
            </DayViewColumns>

            {/** empty cells */}
            <DayViewColumns
              offsetHeight={offsetHeight}
              gridStopsPerDay={numberOfGridStopsPerDay}
            >
              {resources.map((resource, i) => (
                <li
                  key={resource.id}
                  className="relative"
                  style={{
                    gridRow: `1 / span ${numberOfGridStopsPerDay}`,
                  }}
                >
                  {[...Array(numberOfGridStopsPerDay)].map((_, j) => {
                    const key = `${i}-${j}`;

                    return (
                      <EmptyCell
                        key={key}
                        resource={resource}
                        gridCellIdx={j}
                        totalGridCells={numberOfGridStopsPerDay}
                      />
                    );
                  })}
                </li>
              ))}
            </DayViewColumns>
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
