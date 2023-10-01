import { AppShell, Page, PageBody, PageHeader } from '#/blocks';
import { Button } from '#/components/button/src';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '#/components/modal/src';
import { Meta } from '@storybook/react';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Scheduler } from '../src/scheduler';
import { EventInput, ResourceInput } from '../src/scheduler-types';

const meta = {
  title: 'Components / Disposition / Scheduler',
  component: Scheduler,
  parameters: {
    layout: 'full',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Scheduler>;

export default meta;

const resources: ResourceInput[] = [
  {
    id: '1',
    name: 'KTW #1',
  },
  {
    id: '2',
    name: 'KTW #2',
  },
  {
    id: '3',
    name: 'KTW #3',
  },
  {
    id: '4',
    name: 'KTW #4',
  },
  {
    id: '5',
    name: 'KTW #5',
  },
  {
    id: '6',
    name: 'KTW #6',
  },

  {
    id: '7',
    name: 'KTW #7',
  },
  {
    id: '8',
    name: 'KTW #8',
  },
];

// A function to Generate events with dayjs for each Resource
// the date we create resources around is "TODAY", we create at least 10 resources for "yesterday"
// and at least 10 resources for "tomorrow" and at least 10 resources for "today"
// at least 2 resources are overlapping between yesterday and today
function generateEvents() {
  const events: EventInput[] = [];
  const today = dayjs();
  const yesterday = today.subtract(1, 'day');
  const tomorrow = today.add(1, 'day');

  // create events for yesterday
  resources.forEach((resource, idx) => {
    const startTime = yesterday
      .hour(Math.floor(Math.random() * 24))
      .minute(Math.floor(Math.random() * 60))
      .second(0);
    const endTime = startTime.add(1, 'hour');

    events.push({
      id: `${resource.id}-${idx}-yesterday`,
      resourceId: resource.id,
      name: resource.name,
      startDate: startTime.toISOString(),
      endDate: endTime.toISOString(),
    });
  });

  // create events for today
  resources.forEach((resource, idx) => {
    const startTime = today
      .hour(Math.floor(Math.random() * 24))
      .minute(Math.floor(Math.random() * 60))
      .second(0);
    const endTime = startTime.add(1, 'hour');

    events.push({
      id: `${resource.id}-${idx}-today`,
      resourceId: resource.id,
      name: resource.name,
      startDate: startTime.toISOString(),
      endDate: endTime.toISOString(),
    });
  });

  // create events for tomorrow
  resources.forEach((resource, idx) => {
    const startTime = tomorrow
      .hour(Math.floor(Math.random() * 24))
      .minute(Math.floor(Math.random() * 60))
      .second(0);
    const endTime = startTime.add(1, 'hour');

    events.push({
      id: `${resource.id}-${idx}-tomorrow`,
      resourceId: resource.id,
      name: resource.name,
      startDate: startTime.toISOString(),
      endDate: endTime.toISOString(),
    });
  });

  events.push({
    id: '1-1-yesterday-today',
    resourceId: '1',
    name: 'Spans yesterday to today',
    startDate: yesterday.hour(23).minute(0).second(0).toISOString(),
    endDate: today.hour(1).second(0).toISOString(),
  });

  return events;
}

export const Default = () => {
  const events = useMemo(() => generateEvents(), []);

  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);

  return (
    <>
      <AppShell>
        <Page variant="full">
          <PageHeader title="Scheduler" />
          <PageBody>
            <Scheduler
              resources={resources}
              events={events}
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: '08:00',
                endTime: '18:00',
              }}
              onClickEvent={(event) => {
                setSelectedEvent(event);
              }}
            />
          </PageBody>
        </Page>
      </AppShell>
      <Drawer
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Tour</DrawerHeader>
          <DrawerBody>
            <pre>{JSON.stringify(selectedEvent, null, 2)}</pre>
            <hr className="my-4" />
            <div className="flex flex-col gap-4">
              <Button variant="outline">Bearbeiten</Button>
              <Button variant="outline">Rechnung erstellen</Button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
