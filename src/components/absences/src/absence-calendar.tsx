import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn, createSplitProps } from '#/utilities';
import { forwardRef } from 'react';
import { AbsenceAgenda } from './absence-agenda';
import { AbsenceDays } from './absence-days';
import { AbsenceNavigation } from './absence-navigation';
import { AbsenceUserRow } from './absence-user-row';
import {
  Absence,
  AbsenceScale,
  AbsenceTranslateFn,
  AbsenceType,
  AbsenceUser,
} from './types';
import {
  AbsenceCalendarProvider,
  useAbsenceCalendar,
} from './use-absence-calendar';

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
  /**
   * Absence types to display in the calendar.
   */
  absenceTypes?: AbsenceType[];
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
    const [calendarProps, { className, ...restProps }] =
      createSplitProps<AbsenceCalendarOptions>()(props, [
        'date',
        'scale',
        'onScaleChange',
        'users',
        'onAbsenceAddClick',
        'absences',
        'onDateChange',
        'agenda',
        'translateFn',
        'onAbsenceClick',
        'absenceTypes',
      ]);

    const ctx = useAbsenceCalendar(calendarProps);
    const { users } = ctx;

    return (
      <AbsenceCalendarProvider value={ctx}>
        <velcure.div
          ref={ref}
          {...restProps}
          className={cn('grid gap-4', className)}
        >
          <AbsenceAgenda />
          <div className="flex flex-wrap w-full border border-gray-100 isolate">
            {/** navigation */}
            <AbsenceNavigation>
              <AbsenceDays />
            </AbsenceNavigation>

            <div className="flex flex-col w-full divide-y divide-gray-100">
              {users?.map((user) => (
                <AbsenceUserRow key={user.id} user={user} />
              ))}
            </div>
          </div>
        </velcure.div>
      </AbsenceCalendarProvider>
    );
  }
);

AbsenceCalendar.displayName = 'AbsenceCalendar';
