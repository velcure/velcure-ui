import { createContext } from '#/hooks';
import { useMemo, useState } from 'react';
import { EventInput, ResourceInput } from './scheduler-types';

export const [SchedulerProvider, useSchedulerContext] =
  createContext<UseSchedulerReturn>();

export interface SchedulerOptions {
  /**
   * Alternative starthour for the scheduler
   * @default 0
   */
  startHour?: number;
  /**
   * Alternative endhour for the scheduler
   * @default 23
   */
  endHour?: number;
  businessHours?: {
    daysOfWeek: number[];
    startTime: string;
    endTime: string;
  };
  /**
   * @default 'de'
   */
  locale?: string;
  /**
   * Whether or not to display a marker indicating the current time.
   * @default true
   */
  nowIndicator?: boolean;

  /**
   * Resources to be displayed in the scheduler
   * @default []
   */
  resources?: ResourceInput[];
  /**
   * Events to be displayed in the scheduler
   */
  events?: EventInput[];

  onClickEvent?: (event: EventInput) => void;
}

export type UseSchedulerReturn = ReturnType<typeof useScheduler>;

export const useScheduler = (options: SchedulerOptions = {}) => {
  const {
    events = [],
    resources = [],
    onClickEvent,
    startHour = 0,
    endHour = 23,
  } = options;

  const [date, setDate] = useState(new Date());

  const internalEvents = useMemo(() => {
    return events.map((event) => {
      const resourceIndex = resources.findIndex(
        (resource) => resource?.id === event.resourceId
      );

      return {
        ...event,
        resourceIndex,
      };
    });
  }, [events, resources]);

  return {
    date,
    setDate,
    events: internalEvents,
    resources,
    onClickEvent,
    startHour,
    endHour,
  };
};
