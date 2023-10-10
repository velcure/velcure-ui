import { Circle, HTMLVelcureProps, velcure } from '#/components/factory';
import { cn, formatRangeDates } from '#/utilities';
import { cva } from 'class-variance-authority';
import dayjs from 'dayjs';
import { forwardRef, useMemo } from 'react';
import { Absence } from './types';
import { useAbsenceCalendarContext } from './use-absence-calendar';

export interface AbsenceItemProps extends HTMLVelcureProps<'div'> {
  timeRangeStart: Date;
  timeRangeEnd: Date;
  absence: Absence;
  onAbsenceClick?: (absence: Absence) => void;
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
        new: 'bg-yellow-100 text-slate-950 hover:bg-yellow-200 outline outline-yellow-300',
        approved:
          'bg-green-100 text-slate-950 hover:bg-green-200 outline outline-green-300',
        declined:
          'bg-red-100 text-slate-950 hover:bg-red-200 outline outline-red-300',
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
      onAbsenceClick,
      ...restProps
    } = props;

    const { absenceTypes } = useAbsenceCalendarContext();

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

    const absenceType = useMemo(() => {
      return absenceTypes.find((type) => type.id === absence.absenceTypeId);
    }, [absenceTypes, absence.absenceTypeId]);

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
        <velcure.button
          className="inline-flex items-start gap-1 flex-col p-2 h-full w-full truncate text-sm"
          onClick={() => {
            onAbsenceClick?.(absence);
          }}
        >
          <span className="truncate">
            {formatRangeDates(absence.startsAt, absence.endsAt)}
          </span>
          {absenceType && (
            <div className="flex items-center truncate">
              <Circle
                className="h-3 w-3 mr-1"
                style={{
                  backgroundColor: absenceType.color,
                }}
              />
              <span className="truncate text-xs">{absenceType.name}</span>
            </div>
          )}
        </velcure.button>
      </velcure.div>
    );
  }
);

AbsenceItem.displayName = 'AbsenceItem';
