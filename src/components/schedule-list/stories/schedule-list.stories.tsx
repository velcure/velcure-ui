import { Page, PageBody, PageHeader } from '#/blocks';
import { Meta } from '@storybook/react';
import { ScheduleList } from '../src';
import { ScheduleUser, Shift } from '../src/types';

const meta = {
  title: 'Components / Schedulers / Schedule List',
  component: ScheduleList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScheduleList>;

export default meta;

const departments = [
  {
    id: '1',
    name: 'Fahrer',
    hexColor: '#FF0000',
  },
  {
    id: '2',
    name: 'Krankenpfleger',
    hexColor: '#00FF00',
  },
  {
    id: '3',
    name: 'Disponent',
    hexColor: '#0000FF',
  },
];

const shifts: Shift[] = [
  {
    id: '1',
    startsAt: new Date('2021-09-06T08:00:00.000Z'),
    endsAt: new Date('2021-09-06T16:00:00.000Z'),
    desiredCoverage: 10,
    departmentId: '1',
  },
  {
    id: '2',
    startsAt: new Date('2021-09-06T12:00:00.000Z'),
    endsAt: new Date('2021-09-06T20:00:00.000Z'),
    desiredCoverage: 10,
    departmentId: '1',
  },
];

const availableUsers: ScheduleUser[] = [
  {
    id: '1',
    name: 'Tom Cook',
  },
  {
    id: '2',
    name: 'John Doe',
  },
  {
    id: '3',
    name: 'Jane Doe',
    maxDurationPerWeek: 40 * 60 * 60, // 144000
    maxDurationPerMonth: 160 * 60 * 60, // 576000
  },
];

export const PersonalWeekPlan = () => {
  return (
    <div className="absolute inset-0 flex flex-col">
      <Page>
        <PageHeader title="Personal Wochenplan" />
        <PageBody>
          <ScheduleList
            departments={departments}
            date={new Date('2021-09-06T00:00:00.000Z')}
            shifts={shifts}
            users={availableUsers}
          />
        </PageBody>
      </Page>
    </div>
  );
};
