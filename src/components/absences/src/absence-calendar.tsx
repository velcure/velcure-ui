import { HTMLVelcureProps, velcure } from '#/components/factory';
import { useControllableState } from '#/hooks';
import {
  cn,
  generateMonthDates,
  generateWeekDates,
  getAllMonthsOfYear,
} from '#/utilities';
import dayjs from 'dayjs';
import { forwardRef, useMemo } from 'react';
import { AbsenceAgenda } from './absence-agenda';
import { AbsenceDays } from './absence-days';
import { AbsenceNavigation } from './absence-navigation';
import { AbsenceUserRow } from './absence-user-row';
import {
  Absence,
  AbsenceScale,
  AbsenceTranslateFn,
  AbsenceUser,
} from './types';

interface AbsenceCalendarOptions {
  date?: Date | string;
  onDateChange?: (date: Date) => void;
  scale?: AbsenceScale;
  onScaleChange?: (scale: AbsenceScale) => void;
  users?: AbsenceUser[];
  onAbsenceAddClick?: (user: AbsenceUser, date: Date) => void;
  onAbsenceClick?: (absence: Absence) => void;
  translateFn?: AbsenceTranslateFn;
  absences?: Absence[];
  /**
   * Render the Agenda view of the calendar.
   * @default true
   */
  agenda?: boolean;
}

export interface AbsenceCalendarProps
  extends HTMLVelcureProps<'div'>,
    AbsenceCalendarOptions {}

/**
 * The Absence Calendar component is used to track and manage employee absences.
 * It provides a view of absences for a specific date range, such as a week, month, or year,
 * and allows users to interact with the calendar to view and add absences.
 *
 * @param date - The initial date for the calendar view (default: current date).
 * @param scale - The scale of the calendar view ('week', 'month', or 'year', default: 'week').
 * @param users - An array of AbsenceUser objects representing the employees displayed in the calendar.
 * @param onAbsenceAddClick - A callback function invoked when the user clicks to add an absence for a specific date.
 * @param absences - An array of Absence objects representing the existing absences to display on the calendar.
 *
 * @returns A calendar component for tracking and managing employee absences.
 */
export const AbsenceCalendar = forwardRef<HTMLDivElement, AbsenceCalendarProps>(
  (props, ref) => {
    const {
      className,
      date: dateProp,
      scale: scaleProp,
      onScaleChange,
      users,
      onAbsenceAddClick,
      absences: absencesProp,
      onDateChange,
      agenda = true,
      translateFn = (key) => key,
      onAbsenceClick,
      ...restProps
    } = props;

    const [date, setDate] = useControllableState({
      value: dateProp ? new Date(dateProp) : undefined,
      defaultValue: new Date(),
      onChange: onDateChange,
    });

    const [scale, setScale] = useControllableState<AbsenceScale>({
      value: scaleProp,
      defaultValue: 'week',
      onChange: onScaleChange,
    });

    const range = useMemo(() => {
      switch (scale) {
        case 'year':
          return getAllMonthsOfYear(dayjs(date).year());
        case 'month': {
          return generateMonthDates(date);
        }
        default:
        case 'week': {
          return generateWeekDates(date);
        }
      }
    }, [date, scale]);

    const absences = useMemo(() => {
      const firstDay = range[0].getTime();
      const lastDay = range[range.length - 1].getTime();

      return absencesProp?.filter((a) => {
        const start = dayjs(a.startsAt).startOf('day').toDate();
        const end = dayjs(a.endsAt).endOf('day').toDate();
        // wenn start früher ist als der erste tag, setze start auf den ersten tag
        if (start.getTime() < firstDay) {
          start.setTime(firstDay);
        }

        if (end.getTime() > lastDay) {
          end.setTime(lastDay);
        }

        const absenceStart = start.getTime();
        const absenceEnd = end.getTime();

        return absenceStart >= firstDay && absenceEnd <= lastDay;
      });
    }, [absencesProp, range[0].getTime(), range[range.length - 1].getTime()]);

    return (
      <velcure.div
        ref={ref}
        {...restProps}
        className={cn('grid gap-4', className)}
      >
        {agenda && (
          <AbsenceAgenda
            scale={scale}
            setScale={setScale}
            translateFn={translateFn}
          />
        )}
        <div className="flex flex-wrap w-full border border-gray-100 isolate">
          {/** navigation */}
          <AbsenceNavigation date={date} scale={scale} setDate={setDate}>
            <AbsenceDays days={range} scale={scale} />
          </AbsenceNavigation>

          <div className="flex flex-col w-full divide-y divide-gray-100">
            {users?.map((user) => (
              <AbsenceUserRow
                key={user.id}
                user={user}
                days={range}
                absences={absences?.filter((a) => a.userId === user.id)}
                onAbsenceAddClick={onAbsenceAddClick}
                onAbsenceClick={onAbsenceClick}
              />
            ))}
          </div>
        </div>
      </velcure.div>
    );
  }
);

AbsenceCalendar.displayName = 'AbsenceCalendar';
