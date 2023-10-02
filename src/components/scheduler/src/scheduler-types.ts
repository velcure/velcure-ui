export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type BusinessHour = {
  daysOfWeek: DayOfWeek[];
  startDate: string | Date;
  endDate: string | Date;
};

export interface SchedulerEvent {
  id: string;
  title: string;
}

export interface EventInput {
  id: string;
  name: string;
  resourceId?: string;
  startDate: string | Date;
  endDate: string | Date;
  color?: string;
}

export interface ResourceInput {
  /**
   * The unique ID of the resource.
   */
  id: string;
  /**
   * The title of the resource.
   */
  name: string;
  /**
   * A resource can have business hours that are different from the calendar's business hours.
   */
  businessHours?: BusinessHour;
}

export type ResourceInternal = ResourceInput;
export type CalendarEvent = EventInput & {
  resourceIndex?: number;
};
