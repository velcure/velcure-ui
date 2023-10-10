import { Meta } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import { AbsenceCalendar } from '../src/absence-calendar';
import { Absence, AbsenceState, AbsenceType } from '../src/types';

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
  <AbsenceCalendar users={users} absences={absences} />
);

export const CalendarMonth = () => (
  <AbsenceCalendar users={users} absences={absences} scale="month" />
);

export const CalendarYear = () => (
  <AbsenceCalendar users={users} absences={absences} scale="year" />
);

const absenceTypes: AbsenceType[] = [
  {
    id: '1',
    name: 'Urlaub',
    color: '#F87171',
  },
  {
    id: '2',
    name: 'Krankheit',
    color: '#FBBF24',
  },
  {
    id: '3',
    name: 'Fortbildung',
    color: '#60A5FA',
  },
];

const affectedAbsences = [
  {
    id: '01HCAHFTM85YE591NAPG1C0XWA',
    created: '2023-10-09 15:39:30.824Z',
    updated: '2023-10-09 15:39:30.824Z',
    allDay: true,
    adjustedDuration: 4320,
    startsAt: '2023-10-12T00:00:00+02:00',
    endsAt: '2023-10-15T23:59:59.999+02:00',
    state: 'declined',
    reason: '',
    employeeId: '01HC9X945DXTY3VMV6FZGBYJ2X',
    absenceTypeId: '1',
    organizationId: '01H6DR92W9AMTYJP2786R819TP',
    userId: '01HC9X945DXTY3VMV6FZGBYJ2X',
  },
  {
    id: '01HCAHGYHNNP30VX9H68PB3XAQ',
    created: '2023-10-09 15:40:07.605Z',
    updated: '2023-10-09 15:40:07.605Z',
    allDay: true,
    adjustedDuration: 4320,
    startsAt: '2023-10-12T00:00:00+02:00',
    endsAt: '2023-10-15T23:59:59.999+02:00',
    state: 'approved',
    reason: '',
    employeeId: '01HC9X8V03HBE0S6R4A8Z9PQ1B',
    absenceTypeId: '2',
    organizationId: '01H6DR92W9AMTYJP2786R819TP',
    userId: '01HC9X8V03HBE0S6R4A8Z9PQ1B',
  },
];

const affectedUsers = [
  {
    id: '01HC9X8V03HBE0S6R4A8Z9PQ1B',
    name: 'Albert Rolsen',
    email: '',
  },
  {
    id: '01HC9X945DXTY3VMV6FZGBYJ2X',
    name: 'Gerárd Wong',
    email: '',
  },
  {
    id: '01HC9X88E2BPCVQH2KWW6T4QXA',
    name: 'Gerry Wagenhof',
    email: '',
  },
  {
    id: '01HC9X7W1XZT70VRP76GXPTSQK',
    name: 'Glanz Gloria',
    email: '',
  },
  {
    id: '01HC9X83032PRKXXNRAYCJG9V0',
    name: 'Heinrich Lippe',
    email: '',
  },
  {
    id: '01HC9X7NZN0GJF74BE4XM5YV9B',
    name: 'Herbert Schrödinger',
    email: '',
  },
  {
    id: '01HC9X8MJ2WTAVY8DS8MHPZZVM',
    name: 'Massimo Dutti',
    email: '',
  },
  {
    id: '01H9QNXYFBWAHJY95ZXH36BYRH',
    name: 'Max Kreisel',
    email: '',
  },
  {
    id: '01HC9X8ECZZFECSE4SC6K7JYC3',
    name: 'Peter Zwinker',
    email: '',
  },
];

export const BugNotShowingAbsences = () => (
  <AbsenceCalendar
    date={new Date('2023-10-09T22:00:00.000Z')}
    users={affectedUsers}
    // @ts-ignore
    absences={affectedAbsences}
    absenceTypes={absenceTypes}
    scale="week"
  />
);
