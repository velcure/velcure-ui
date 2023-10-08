export interface Department {
  id: string | number;
  name: string;
  hexColor: string;
}

export interface Shift {
  id: string | number;
  startsAt: string | Date;
  endsAt: string | Date;
  desiredCoverage: number;
  departmentId: string | number;
}

export interface ScheduleUser {
  id: string | number;
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
  id: string | number;
};

/**
 * A Schedule is a collection of shifts that are assigned to users.
 */
export interface Schedule {
  id: string | number;
}
