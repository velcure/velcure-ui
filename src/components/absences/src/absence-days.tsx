import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn, getWeekNumber, isFirstDayOfWeek } from '#/utilities';
import { forwardRef } from 'react';
import { AbsenceDay } from './absence-day';
import { useAbsenceCalendarContext } from './use-absence-calendar';

export interface AbsenceDaysProps extends HTMLVelcureProps<'div'> {}

export const AbsenceDays = forwardRef<HTMLDivElement, AbsenceDaysProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const { range, scale } = useAbsenceCalendarContext();

    return (
      <velcure.div
        ref={ref}
        className={cn(
          'flex-1 flex relative divide-x divide-gray-100',
          className
        )}
        {...restProps}
      >
        {range.map((day) => (
          <AbsenceDay key={day.toISOString()}>
            <span className="text-sm">
              {scale === 'week' &&
                Intl.DateTimeFormat('de-DE', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                }).format(day)}
              {scale === 'month' && (
                <>
                  <span className="font-semibold">
                    {Intl.DateTimeFormat('de-DE', {
                      day: 'numeric',
                    }).format(day)}
                  </span>
                  <br />
                  <span className="text-xs">
                    {Intl.DateTimeFormat('de-DE', {
                      weekday: 'short',
                    }).format(day)}
                  </span>
                </>
              )}
              {scale === 'year' &&
                Intl.DateTimeFormat('de-DE', {
                  month: 'short',
                }).format(day)}

              {['month'].includes(scale) && isFirstDayOfWeek(day) && (
                <span className="absolute left-1 top-1 font-semibold text-xs">
                  {getWeekNumber(day)}
                </span>
              )}
            </span>
          </AbsenceDay>
        ))}
      </velcure.div>
    );
  }
);

AbsenceDays.displayName = 'AbsenceDays';
