import { Meta } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import { AbsenceCalendar } from '../src/absence-calendar';
import { Absence, AbsenceState } from '../src/types';

const meta = {
  title: 'Components / Schedulers / Absences',
  component: AbsenceCalendar,
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type User = {
  id: string;
  name: string;
  email: string;
};

const users: User[] = [
  ...Array(10)
    .fill(0)
    .map((_, i) => ({
      id: `${i}`,
      name: `User ${i}`,
      email: `user-${i}@airbnb.io`,
    })),
];

const getRandomState = () => {
  const states: AbsenceState[] = ['new', 'approved', 'declined'];
  const randomIndex = Math.floor(Math.random() * states.length);
  return states[randomIndex];
};

/**
 * Generates a random date range within the current week.
 * @returns An object with `startsAt` and `endsAt` properties representing the date range.
 */
const generateRandomDateRangeWithinWeek = (): {
  startsAt: Date;
  endsAt: Date;
} => {
  const currentWeekStart: Dayjs = dayjs().startOf('week').add(1, 'day'); // Monday as the start of the week
  const currentWeekEnd: Dayjs = currentWeekStart.clone().endOf('week'); // Sunday as the end of the week

  const randomStart: Dayjs = dayjs(currentWeekStart).add(
    Math.floor(
      Math.random() * (currentWeekEnd.diff(currentWeekStart, 'day') + 1)
    ),
    'day'
  );

  const minRandomEnd: Dayjs = randomStart.clone().add(1, 'day');
  const randomEnd: Dayjs = minRandomEnd.add(
    Math.floor(Math.random() * (currentWeekEnd.diff(minRandomEnd, 'day') + 1)),
    'day'
  );

  return {
    startsAt: randomStart.toDate(),
    endsAt: randomEnd.toDate(),
  };
};

const absences: Absence[] = [
  ...Array(10)
    .fill(0)
    .map((_, i) => ({
      id: `${i}`,
      state: getRandomState(),
      userId: `${i}`,
      // startsAt: new Date('2023-10-01T22:00:00.000Z'),
      // endsAt: new Date('2023-10-02T22:00:00.000Z'),
      ...generateRandomDateRangeWithinWeek(),
    })),
];

export const CalendarWeek = () => (
  <AbsenceCalendar users={users} absences={absences} scale="week" />
);

export const CalendarMonth = () => (
  <AbsenceCalendar users={users} absences={absences} scale="month" />
);

export const CalendarYear = () => (
  <AbsenceCalendar users={users} absences={absences} scale="year" />
);
