import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn, formatRangeDates } from '#/utilities';
import { cva } from 'class-variance-authority';
import dayjs from 'dayjs';
import { forwardRef, useMemo } from 'react';
import { Absence } from './types';

export interface AbsenceItemProps extends HTMLVelcureProps<'div'> {
  timeRangeStart: Date;
  timeRangeEnd: Date;
  absence: Absence;
}

const containerClasses = cva(
  [
    'absolute top-1 bottom-1 rounded-lg transition-colors whitespace-nowrap',
    'min-w-[.5rem]',
    'overflow-hidden',
  ],
  {
    variants: {
      state: {
        new: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100',
        approved: 'bg-green-50 text-green-500 hover:bg-green-100',
        declined: 'bg-red-50 text-red-500 hover:bg-red-100',
      },
    },
  }
);

export const AbsenceItem = forwardRef<HTMLDivElement, AbsenceItemProps>(
  (props, ref) => {
    const {
      className,
      timeRangeStart,
      timeRangeEnd,
      absence,
      style,
      ...restProps
    } = props;

    // Convert dates to milliseconds for calculations
    const rangeStart = timeRangeStart.getTime();
    const rangeEnd = dayjs(timeRangeEnd).endOf('day').valueOf();
    const absenceStart = new Date(absence.startsAt).getTime();
    const absenceEnd = new Date(absence.endsAt).getTime();

    // Function to calculate a percentage
    const calculatePercentage = (value: number, total: number) => {
      return (value / total) * 100;
    };

    // Ensure that a value is within the 0-100 range
    const percentify = (value: number) => {
      return value > 100 ? 100 : value;
    };

    const timestampPercentages = useMemo(() => {
      // Initial values
      let start = absenceStart;
      let end = absenceEnd;

      // Ensure absence time range is within the range
      if (start < rangeStart) {
        start = rangeStart;
      }

      if (absenceEnd > rangeEnd) {
        end = rangeEnd;
      }

      const total = rangeEnd - rangeStart,
        i = start - rangeStart,
        l = end - rangeStart - i;

      return {
        innerWidthPercentage: percentify(calculatePercentage(l, total)),
        offsetPercentage: percentify(calculatePercentage(i, total)),
      };
    }, [rangeStart, rangeEnd, absenceStart, absenceEnd]);

    return (
      <velcure.div
        ref={ref}
        {...restProps}
        className={cn(containerClasses({ state: absence.state }), className)}
        data-starts-at={new Date(absence.startsAt).toISOString()}
        data-ends-at={new Date(absence.endsAt).toISOString()}
        style={{
          ...style,
          left: `calc(${timestampPercentages.offsetPercentage}% + .25rem)`,
          width: `calc(${timestampPercentages.innerWidthPercentage}% - .5rem)`,
        }}
      >
        <velcure.button className="overflow-hidden block p-2 h-full w-full text-ellipsis whitespace-normal text-sm">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {formatRangeDates(absence.startsAt, absence.endsAt)}
          </span>
        </velcure.button>
      </velcure.div>
    );
  }
);

AbsenceItem.displayName = 'AbsenceItem';
