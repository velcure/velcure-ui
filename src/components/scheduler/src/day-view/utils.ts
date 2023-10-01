import dayjs from 'dayjs';
import { EventInternal } from '../scheduler-types';

type Sorted = {
  gridRow: number;
  gridSpan: number;
} & EventInternal;

export function sortedEvents(events: EventInternal[], date: Date) {
  const dd = dayjs(date);

  return events.reduce((sorted, event) => {
    let startDate = dayjs(event.startDate);
    let endDate = dayjs(event.endDate);

    if (!startDate.isValid() || !endDate.isValid()) {
      // ungültiges Datum, Event überspringen
      return sorted;
    }

    if (endDate.isBefore(startDate)) {
      // Enddatum ist vor Startdatum, Event überspringen
      return sorted;
    }

    // Prüfe ob dd außerhalb des Bereiches liegt
    if (dd.isBefore(startDate, 'day') || dd.isAfter(endDate, 'day')) {
      return sorted;
    }

    // Setze Zeit für Tage vor dd auf Mitternacht
    if (startDate.isBefore(dd, 'day')) {
      startDate = dd.set('hour', 0).set('minute', 0).set('second', 0);

      if (endDate.isAfter(dd, 'day')) {
        endDate = dayjs(dd).set('hour', 23).set('minute', 59).set('second', 59);
      }
    }

    // Setze Zeit für Tage nach dd auf 23:59:59
    if (endDate.isAfter(dd, 'day')) {
      endDate = endDate.set('hour', 23).set('minute', 59).set('second', 59);
    }

    const hour = startDate.hour();
    const minute = startDate.minute();

    /** 60 / 5 means we have 12 blocks in an hour */
    const hourSpan = (hour / 5) * 60;

    // get minute span, 5 minutes equals 1 grid row
    const minuteSpan = minute / 5;

    // round to nearest 5 minutes
    const startRow = Math.round(hourSpan + minuteSpan);

    const diffMinutes = endDate.diff(startDate, 'minutes');

    // minutes / 5 rounded is the span
    // 1 span = 5 minutes
    const span = Math.ceil(diffMinutes / 5);

    sorted.push({
      ...event,
      gridRow: startRow,
      gridSpan: span,
    });

    return sorted;
  }, [] as Sorted[]); // initialer Wert ist leeres Array
}
