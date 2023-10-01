import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import dayjs, { Dayjs } from 'dayjs';
import { forwardRef } from 'react';
import { ResourceInternal } from '../scheduler-types';
import { useSchedulerContext } from '../use-scheduler';

export interface EmptyCellProps
  extends Omit<HTMLVelcureProps<'div'>, 'resource'> {
  resource: ResourceInternal;
  gridCellIdx: number;
  totalGridCells: number;
}

interface GridCellToDateProps {
  date: Date;
  gridCellIdx: number;
  totalGridCells: number;
  selectionLength: number;
}

const gridCellToDateTime = (options: GridCellToDateProps) => {
  const { date, gridCellIdx, totalGridCells, selectionLength } = options;

  const minutesInSelection = (selectionLength + 1) * 60;
  const minutesPerCell = minutesInSelection / totalGridCells;
  const minutesIntoSelection = minutesPerCell * gridCellIdx;

  // Add startHour since we use StartOfDay for day props. This could be improved by changing the getDaysBetweenDates function
  // To handle the startHour+endHour
  const cellDateTime = dayjs(date)
    // .tz(timezone)
    .startOf('day')
    .add(minutesIntoSelection, 'minutes');
  // .add(startHour, 'hours');
  return cellDateTime;
};

export const EmptyCell = forwardRef<HTMLDivElement, EmptyCellProps>(
  (props, ref) => {
    const { className, resource, gridCellIdx, totalGridCells, ...restProps } =
      props;

    const { date } = useSchedulerContext();

    const cellToDate = gridCellToDateTime({
      date,
      gridCellIdx,
      totalGridCells,
      selectionLength: 23,
    });

    const minutes = cellToDate.diff(dayjs(date).startOf('day'), 'minutes');

    return (
      <Cell
        ref={ref}
        topOffsetMinutes={minutes}
        timeSlot={dayjs(cellToDate)}
        {...restProps}
      />
    );
  }
);

EmptyCell.displayName = 'EmptyCell';

interface CellProps extends HTMLVelcureProps<'div'> {
  isDisabled?: boolean;
  topOffsetMinutes?: number;
  timeSlot: Dayjs;
}

const Cell = forwardRef<HTMLDivElement, CellProps>((props, ref) => {
  const { isDisabled, topOffsetMinutes, timeSlot, ...restProps } = props;
  const hoverEventDuration = 15;

  const onEmptyClick = () => {
    console.log('empty cell clicked');
    alert(timeSlot.toISOString());
  };

  return (
    <velcure.div
      ref={ref}
      className={cn(
        'group flex w-[calc(100%-1px)] items-center justify-center',
        !isDisabled && 'bg-background',
        topOffsetMinutes && 'absolute'
      )}
      onClick={onEmptyClick}
      data-disabled={isDisabled}
      data-slot={timeSlot.toISOString()}
      style={{
        height: `calc(${hoverEventDuration}*var(--one-minute-height))`,
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

          hoverEventDuration && hoverEventDuration > 15 && 'items-start pt-3',
          hoverEventDuration && hoverEventDuration < 15 && 'items-center'
        )}
        style={{
          height: `calc(${hoverEventDuration}*var(--one-minute-height) - 2px)`,
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
