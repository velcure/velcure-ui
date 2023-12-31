import { useDraggable } from '@dnd-kit/core';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarEvent } from '../scheduler-types';
import { useSchedulerContext } from '../use-scheduler';
import { Event } from './event';
export interface EventListProps {
  resourceIndex: number;
}

export const EventList: React.FC<EventListProps> = (props) => {
  const { resourceIndex } = props;
  const { events, date } = useSchedulerContext();

  const dd = dayjs(date);

  return (
    <AnimatePresence>
      {events
        .filter((event) => {
          if (event.resourceIndex !== resourceIndex) {
            return false;
          }

          const startDate = dayjs(event.startDate);
          const endDate = dayjs(event.endDate);

          if (!startDate.isValid() || !endDate.isValid()) {
            // ungültiges Datum, Event überspringen
            return false;
          }

          if (endDate.isBefore(startDate)) {
            // Enddatum ist vor Startdatum, Event überspringen
            return false;
          }

          // Prüfe ob dd außerhalb des Bereiches liegt
          if (dd.isBefore(startDate, 'day') || dd.isAfter(endDate, 'day')) {
            return false;
          }

          return true;
        })
        .map((event, idx, eventsArray) => {
          return (
            <EventContainer
              key={`${event.id}-${event.startDate}`}
              dd={dd}
              event={event}
              idx={idx}
              eventsArray={eventsArray}
            />
          );
        })}
    </AnimatePresence>
  );
};

interface EventContainerProps {
  event: CalendarEvent;
  idx: number;
  eventsArray: CalendarEvent[];
  dd: dayjs.Dayjs;
}

const EventContainer: React.FC<EventContainerProps> = (props) => {
  const { event, idx, eventsArray, dd } = props;

  const { startHour } = useSchedulerContext();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: event.id,
      data: event,
    });

  let width = 90;
  let marginLeft: string | number = 0;
  let right = 0;
  let zIndex = 3;

  let eventStart = dayjs(event.startDate);
  let eventEnd = dayjs(event.endDate);

  // Setze Zeit für Tage vor dd auf Mitternacht
  if (eventStart.isBefore(dd, 'day')) {
    eventStart = dd.set('hour', 0).set('minute', 0).set('second', 0);

    if (eventEnd.isAfter(dd, 'day')) {
      eventEnd = dayjs(dd).set('hour', 23).set('minute', 59).set('second', 59);
    }
  }

  // Setze Zeit für Tage nach dd auf 23:59:59
  if (eventEnd.isAfter(dd, 'day')) {
    eventEnd = dd.set('hour', 23).set('minute', 59).set('second', 59);
  }

  const eventDuration = eventEnd.diff(eventStart, 'minutes');

  const eventStartHour = eventStart.hour();
  const eventStartDiff =
    (eventStartHour - (startHour || 0)) * 60 + eventStart.minute();
  const nextEvent = eventsArray[idx + 1];
  const prevEvent = eventsArray[idx - 1];

  // Check for overlapping events since this is sorted it should just work.
  if (nextEvent) {
    const nextEventStart = dayjs(nextEvent.startDate);
    const nextEventEnd = dayjs(nextEvent.endDate);
    // check if next event starts before this event ends
    if (nextEventStart.isBefore(eventEnd)) {
      // figure out which event has the longest duration
      const nextEventDuration = nextEventEnd.diff(nextEventStart, 'minutes');
      if (nextEventDuration > eventDuration) {
        zIndex = 4;

        marginLeft = 'auto';
        // 8 looks like a really random number but we need to take into account the bordersize on the event.
        // Logically it should be 5% but this causes a bit of a overhang which we don't want.
        right = 8;
        width = width / 2;
      }
    }

    if (nextEventStart.isSame(eventStart)) {
      zIndex = 5;

      marginLeft = 'auto';
      right = 8;
      width = width / 2;
    }
  } else if (prevEvent) {
    const prevEventStart = dayjs(prevEvent.startDate);
    const prevEventEnd = dayjs(prevEvent.endDate);
    // check if next event starts before this event ends
    if (prevEventEnd.isAfter(eventStart)) {
      // figure out which event has the longest duration
      const prevEventDuration = prevEventEnd.diff(prevEventStart, 'minutes');
      if (prevEventDuration > eventDuration) {
        zIndex = 4;
        marginLeft = 'auto';
        right = 8;
        width = width / 2;
        if (eventDuration >= 30) {
          width = 80;
        }
      }
    }
  }

  return (
    <motion.div
      key={`${event.id}-${eventStart.toISOString()}`}
      className="absolute inset-x-1 "
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        marginLeft,
        zIndex: isDragging ? 11 : zIndex,
        right: `calc(${right}% - 1px)`,
        width: `${width}%`,
        top: `calc(${eventStartDiff}*var(--one-minute-height))`,
        height: `calc(${
          eventDuration > 15 ? eventDuration : 15
        }*var(--one-minute-height))`,
        ...(transform && {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }),
      }}
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <Event
        event={event}
        eventDuration={eventDuration}
        style={{
          zIndex,
        }}
      />
    </motion.div>
  );
};
