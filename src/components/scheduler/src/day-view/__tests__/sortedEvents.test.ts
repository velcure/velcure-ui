import { EventInternal } from '../../scheduler-types';
import { sortedEvents } from '../utils';

describe('sortedEvents', () => {
  it('should sort and process events correctly', () => {
    const events: EventInternal[] = [
      /* array of test events */
      {
        id: '1',
        name: 'Event 1',
        startDate: '2023-09-29T09:00:00',
        endDate: '2023-09-29T12:00:00',
      },
      {
        id: '2',
        name: 'Event 2',
        startDate: '2023-09-28T14:00:00',
        endDate: '2023-09-28T18:00:00',
      },
    ];

    const date = new Date('2023-09-29');

    const result = sortedEvents(events, date);

    // Assertion auf erwartetes Ergebnis
    expect(result).toEqual([
      {
        id: '1',
        name: 'Event 1',
        startDate: '2023-09-29T09:00:00', // start changed
        endDate: '2023-09-29T12:00:00',
        gridRow: 108, // 9 hours
        gridSpan: 36, // 3 hours
      },
    ]);
  });
});
