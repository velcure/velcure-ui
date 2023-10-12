export interface Department {
  id: string;
  name: string;
  hexColor: string;
}

export interface Shift {
  id: string;
  startsAt: string | Date;
  endsAt: string | Date;
  desiredCoverage: number;
  departmentId: string | number;
  userIds: string[];
}

export interface ScheduleUser {
  id: string;
  name: string;
  avatar?: string;
  /**
   * The maximum number of seconds that the user can work per month.
   */
  maxDurationPerMonth?: number | null;
  /**
   * The maximum number of seconds that the user can work per week.
   */
  maxDurationPerWeek?: number | null;
}

export type DragData = {
  origin: 'sidebar';
  id: string;
};

/**
 * A Schedule is a collection of shifts that are assigned to users.
 */
export interface Schedule {
  id: string;
  /**
   * Sum of total assigned users to Shifts in the schedule.
   */
  coveragePercentage: number;
  endOfPeriod: string | Date;
  startOfPeriod: string | Date;

  /**
   * Seconds elapsed since the start of the period.
   * @example 28800 // 8:00 AM
   */
  shiftDefaultStartsAtDuration: number;
  /**
   * Pause within a shift.
   * @example 3600 // 1 hour
   */
  shiftDefaultPauseDuration: number;
  /**
   * Seconds elapsed since the start of the period.
   * @example 59400 // 4:30 PM
   */
  shiftDefaultEndsAtDuration: number;
}
