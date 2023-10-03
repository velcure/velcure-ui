import { HTMLVelcureProps, velcure } from '#/components/factory';
import { useMergeRefs } from '#/hooks';
import { cn } from '#/utilities';
import { useDroppable } from '@dnd-kit/core';
import dayjs, { Dayjs } from 'dayjs';
import { forwardRef, useId } from 'react';
import { ResourceInternal } from '../scheduler-types';
import { useSchedulerContext } from '../use-scheduler';

export interface EmptyCellProps
  extends Omit<HTMLVelcureProps<'div'>, 'resource'> {
  resource: ResourceInternal;
  gridCellIdx: number;
  totalGridCells: number;
  selectionLength: number;
  startHour: number;
}

interface GridCellToDateProps {
  date: Date;
  gridCellIdx: number;
  totalGridCells: number;
  selectionLength: number;
  startHour: number;
}

const gridCellToDateTime = (options: GridCellToDateProps) => {
  const {
    date,
    gridCellIdx,
    totalGridCells,
    selectionLength = 23,
    startHour = 0,
  } = options;

  const minutesInSelection = (selectionLength + 1) * 60;
  const minutesPerCell = minutesInSelection / totalGridCells;
  const minutesIntoSelection = minutesPerCell * gridCellIdx;

  // Add startHour since we use StartOfDay for day props. This could be improved by changing the getDaysBetweenDates function
  // To handle the startHour+endHour
  const cellDateTime = dayjs(date)
    // .tz(timezone)
    .startOf('day')
    .add(minutesIntoSelection, 'minutes')
    .add(startHour, 'hours');
  return cellDateTime;
};

export const EmptyCell = forwardRef<HTMLDivElement, EmptyCellProps>(
  (props, ref) => {
    const {
      className,
      resource,
      gridCellIdx,
      totalGridCells,
      startHour,
      selectionLength,
      ...restProps
    } = props;

    const { date } = useSchedulerContext();

    const cellToDate = gridCellToDateTime({
      date,
      gridCellIdx,
      totalGridCells,
      selectionLength,
      startHour,
    });

    const minutes = cellToDate
      .subtract(startHour, 'hour')
      .diff(dayjs(date).startOf('day'), 'minutes');

    return (
      <Cell
        ref={ref}
        topOffsetMinutes={minutes}
        timeSlot={dayjs(cellToDate)}
        resource={resource}
        {...restProps}
      />
    );
  }
);

EmptyCell.displayName = 'EmptyCell';

interface CellProps extends Omit<HTMLVelcureProps<'div'>, 'resource'> {
  isDisabled?: boolean;
  topOffsetMinutes?: number;
  timeSlot: Dayjs;
  resource: ResourceInternal;
}

const Cell = forwardRef<HTMLDivElement, CellProps>((props, ref) => {
  const { isDisabled, topOffsetMinutes, timeSlot, resource, ...restProps } =
    props;
  const hoverEventDuration = 15;

  const onEmptyClick = () => {
    alert(timeSlot.toISOString());
  };

  const id = useId();

  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data: {
      resourceId: resource.id,
    },
  });

  const activeDuration = active
    ? dayjs(active.data.current?.endDate).diff(
        active.data.current?.startDate,
        'minutes'
      )
    : null;

  return (
    <velcure.div
      ref={useMergeRefs(ref, setNodeRef)}
      className={cn(
        'group flex w-[calc(100%-1px)] items-center justify-center',
        !isDisabled && 'bg-background',
        topOffsetMinutes && 'absolute'
      )}
      onClick={onEmptyClick}
      data-disabled={isDisabled}
      data-slot={timeSlot.toISOString()}
      style={{
        height: `calc(${
          isOver ? activeDuration : hoverEventDuration
        }*var(--one-minute-height))`,
        overflow: 'visible',
        top: topOffsetMinutes
          ? `calc(${topOffsetMinutes}*var(--one-minute-height))`
          : undefined,
      }}
      {...restProps}
    >
      <div
        className={cn(
          'opacity-4 absolute hidden rounded-lg p-2',
          'text-xs font-semibold leading-5 group-hover:flex group-hover:cursor-pointer',
          'group-hover:cursor-pointer group-hover:bg-accent group-hover:text-accent-foreground',
          isOver && 'bg-accent flex',
          hoverEventDuration && hoverEventDuration > 15 && 'items-start pt-3',
          hoverEventDuration && hoverEventDuration < 15 && 'items-center'
        )}
        style={{
          height: `calc(${
            isOver ? activeDuration : hoverEventDuration
          }*var(--one-minute-height) - 2px)`,
          zIndex: 10,
          width: 'calc(100% - 2px)',
        }}
      >
        <div className="overflow-ellipsis leading-[0]">
          <div className="overflow-ellipsis leading-[0]">
            {timeSlot.format('HH:mm')}
          </div>
        </div>
      </div>
    </velcure.div>
  );
});
