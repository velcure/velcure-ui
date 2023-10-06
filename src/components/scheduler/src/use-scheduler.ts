import { createContext, useControllableState } from '#/hooks';
import { startOfDay } from '#/utilities';
import { useEffect, useMemo, useState } from 'react';
import { EventInput, ResourceInput } from './scheduler-types';

export const [SchedulerProvider, useSchedulerContext] =
  createContext<UseSchedulerReturn>();

type I18nConfig = {
  today: string;
};

export interface SchedulerOptions {
  /**
   * Date to be displayed in the scheduler
   * @default new Date()
   */
  date?: Date;
  /**
   * Callback for when the date changes
   */
  onDateChange?: (date: Date) => void;
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
  /**
   * Format to render Time
   * @default 'HH:mm'
   */
  timeFormat?: string;

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

  onEventUpdate?: (event: EventInput) => void;
  /**
   * direction of the scheduler, only used for resource view
   * 'horizontal' or 'vertical'
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';

  i18nConfig?: I18nConfig;
}

export type UseSchedulerReturn = ReturnType<typeof useScheduler>;

export const useScheduler = (options: SchedulerOptions = {}) => {
  const {
    locale = 'de',
    events: eventsProp,
    resources = [],
    onClickEvent,
    startHour = 0,
    endHour = 23,
    timeFormat = 'HH:mm',
    nowIndicator = true,
    date: dateProp,
    onDateChange,
    onEventUpdate,
    direction = 'horizontal',
    i18nConfig,
  } = options;

  const [isDragging, setIsDragging] = useState(false);

  const [events, setEvents] = useState(eventsProp || []);

  useEffect(() => {
    setEvents(eventsProp || []);
  }, [eventsProp]);

  const [date, setDate] = useControllableState({
    value: dateProp ? startOfDay(dateProp) : undefined,
    defaultValue: startOfDay(),
    onChange: onDateChange,
  });

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
    locale,
    date,
    setDate,
    events: internalEvents,
    setEvents,
    resources,
    onClickEvent,
    startHour,
    endHour,
    timeFormat,
    nowIndicator,
    onEventUpdate,
    isDragging,
    setIsDragging,
    direction,
    i18nConfig,
  };
};
