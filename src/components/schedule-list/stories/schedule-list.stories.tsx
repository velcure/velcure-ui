import { Page, PageBody, PageHeader } from '#/blocks';
import { generateRandomString } from '#/utilities';
import { Meta } from '@storybook/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ShiftScheduleList, ShiftScheduler } from '../src';
import { Scheduler } from '../src/scheduler';
import { SchedulerContent } from '../src/scheduler-content';
import { SchedulerHeader } from '../src/scheduler-header';
import { SchedulerSidebar } from '../src/scheduler-sidebar';
import { SchedulerUserList } from '../src/scheduler-user-list';
import { Schedule, ScheduleUser, Shift } from '../src/types';

const meta = {
  title: 'Components / Schedulers / Schedule List',
  component: ShiftScheduler,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ShiftScheduler>;

export default meta;

const departments = [
  {
    id: '1',
    name: 'Fahrer',
    color: '#FF0000',
  },
  {
    id: '2',
    name: 'Krankenpfleger',
    color: '#00FF00',
  },
  {
    id: '3',
    name: 'Disponent',
    color: '#0000FF',
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
  const [date, setDate] = useState<Date>(new Date('2023-10-11T08:00:00.000Z'));

  const [schedule, setSchedule] = useState<Schedule[]>([
    {
      id: '8JvK747lVG',
      startOfPeriod: '2023-09-30T22:00:00.000Z',
      endOfPeriod: '2023-10-07T21:59:59.999Z',
      coveragePercentage: 0,
    },
    {
      id: 'PJSEc7ePik',
      startOfPeriod: '2023-10-08T22:00:00.000Z',
      endOfPeriod: '2023-10-15T21:59:59.999Z',
      coveragePercentage: 50,
    },
  ]);

  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: 'WB2II2xhTw',
      departmentId: '1',
      startsAt: '2023-10-09T06:00:00.000Z',
      endsAt: '2023-10-09T14:00:00.000Z',
      desiredCoverage: 10,
      userIds: [],
    },
    {
      id: '5LpBSUYDAQ',
      departmentId: '2',
      startsAt: '2023-10-10T06:00:00.000Z',
      endsAt: '2023-10-10T14:00:00.000Z',
      desiredCoverage: 10,
      userIds: [],
    },
    {
      id: 'zxa0cgDh2s',
      departmentId: '3',
      startsAt: '2023-10-11T06:00:00.000Z',
      endsAt: '2023-10-11T14:00:00.000Z',
      desiredCoverage: 2,
      userIds: [],
    },
  ]);

  return (
    <div className="absolute inset-0 flex flex-col">
      <Page>
        <PageHeader title="Personal Wochenplan" />
        <PageBody>
          <Scheduler
            date={date}
            onDateChange={setDate}
            shifts={shifts}
            users={availableUsers}
            schedules={schedule}
            departments={departments}
            onUserAssign={(userId, shiftId) => {
              // this is where we would normally use a mutation to update the
              // shift with the new user
              console.log('Assigning user', userId, 'to shift', shiftId);
              setShifts((previous) =>
                previous.map((shift) => {
                  if (shift.id === shiftId) {
                    return {
                      ...shift,
                      userIds: [...shift.userIds, userId],
                    };
                  }

                  return shift;
                })
              );
            }}
            onCreateSchedule={(date) => {
              // this is where we would normally use a dialog and a mutation
              // to create a new schedule
              setSchedule((previous) => [
                ...previous,
                {
                  id: generateRandomString(),
                  startOfPeriod: dayjs(date).startOf('isoWeek').toISOString(),
                  endOfPeriod: dayjs(date).endOf('isoWeek').toISOString(),
                  coveragePercentage: 0,
                  shiftDefaultStartsAtDuration: 28800,
                  shiftDefaultPauseDuration: 3600,
                  shiftDefaultEndsAtDuration: 59400,
                },
              ]);
            }}
            onCreateShift={(departmentId, date) => {
              // this is where we would normally use a dialog and a mutation
              // to create a new shift
              setShifts((previous) => [
                ...previous,
                {
                  id: generateRandomString(),
                  departmentId,
                  startsAt: dayjs(date).startOf('day').add(8, 'hours').toDate(),
                  endsAt: dayjs(date).startOf('day').add(16, 'hours').toDate(),
                  desiredCoverage: 10,
                  userIds: [],
                },
              ]);
            }}
          >
            <SchedulerHeader />
            <SchedulerContent>
              <SchedulerSidebar>
                <SchedulerUserList />
              </SchedulerSidebar>
              <ShiftScheduleList />
            </SchedulerContent>
          </Scheduler>
        </PageBody>
      </Page>
    </div>
  );
};
