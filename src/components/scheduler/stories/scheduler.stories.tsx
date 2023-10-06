import { AppShell, Page, PageBody, PageHeader } from '#/blocks';
import { Button, ButtonGroup, IconButton } from '#/components/button/src';
import { Image } from '#/components/image/src';
import { Menu, MenuItem, MenuList, MenuTrigger } from '#/components/menu/src';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '#/components/modal/src';
import {
  Property,
  PropertyList,
  PropertyValue,
} from '#/components/property/src';
import { ToastProvider, useToast } from '#/components/toast/src';
import { Typography } from '#/components/typography/src';
import { Meta } from '@storybook/react';
import dayjs from 'dayjs';
import { Fragment, useMemo, useState } from 'react';
import { PiDotsThreeVertical, PiPhoneCall } from 'react-icons/pi';
import { Scheduler } from '../src/scheduler';
import { EventInput, ResourceInput } from '../src/scheduler-types';

const meta: Meta = {
  title: 'Components / Disposition / Scheduler',
  component: Scheduler,
  parameters: {
    layout: 'full',
  },
  decorators: [
    (Story) => (
      <Fragment>
        <ToastProvider />
        <Story />
      </Fragment>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Scheduler>;

export default meta;

const genResources = (sum: number): ResourceInput[] => {
  const resources: ResourceInput[] = [];

  for (let i = 0; i < sum; i++) {
    resources.push({
      id: `${i}`,
      name: `Resource ${i}`,
    });
  }

  return resources;
};

const resources: ResourceInput[] = [
  {
    id: '12333',
    name: 'Pool',
  },
  ...genResources(12),
];

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

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
      color: randomColor(),
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
      color: randomColor(),
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
      color: randomColor(),
    });
  });

  events.push({
    id: '1-1-yesterday-today',
    resourceId: '1',
    name: 'Spans yesterday to today',
    startDate: yesterday.hour(23).minute(0).second(0).toISOString(),
    endDate: today.hour(1).second(0).toISOString(),
    color: randomColor(),
  });

  return events;
}

const TourSheet: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selection?: any;
}> = (props) => {
  const { isOpen, onClose, selection } = props;
  const tour = {
    pickupAddress: 'Musterstraße 1, 12345 Musterstadt',
    dropoffAddress: 'Musterstraße 2, 12345 Musterstadt',
  };
  return (
    <Drawer isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <span>Tour</span>
        </DrawerHeader>
        <DrawerBody>
          <div className="pb-1 sm:pb-6 -mx-6">
            <div className="relative h-40 sm:h-56">
              <Image
                className="absolute h-full w-full object-cover"
                src="https://raw.githubusercontent.com/maplibre/maplibre-gl-directions/main/doc/images/demo-screenshot-1.png"
              />
            </div>
            <div className="px-6 mt-6 sm:mt-8 sm:flex sm:items-end">
              <div className="flex-1">
                <div>
                  <div className="flex items-center">
                    <Typography variant="h3">Patienten Name</Typography>
                  </div>
                  <Typography as="small" variant="small">
                    @Krankenhaus Name
                  </Typography>
                </div>
                <ButtonGroup className="mt-5 w-full">
                  <Button className="w-full" leftIcon={<PiPhoneCall />}>
                    Anrufen
                  </Button>
                  <Menu>
                    <MenuTrigger>
                      <IconButton
                        aria-label="More options"
                        variant="outline"
                        icon={<PiDotsThreeVertical />}
                      />
                    </MenuTrigger>
                    <MenuList>
                      <MenuItem>Bearbeiten</MenuItem>
                      <MenuItem>Weiter in Abrechnung</MenuItem>
                      <MenuItem>Details zum Auftrag</MenuItem>
                    </MenuList>
                  </Menu>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <PropertyList>
            <Property label="Abholadresse" value={tour.pickupAddress} />
            <Property label="Abfahrt" value="09:30" />
            <Property label="Zieladresse" value={tour.dropoffAddress} />
            <Property label="Ankunft" value="10:30" />
            <Property label="Patient">
              <PropertyValue>
                <span className="text-muted-foreground">Max Mustermann</span>
              </PropertyValue>
            </Property>
          </PropertyList>
          {selection && <pre>{JSON.stringify(selection, null, 2)}</pre>}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export const Default = () => {
  const events = useMemo(() => generateEvents(), []);

  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);

  const toast = useToast();

  return (
    <>
      <AppShell>
        <Page variant="full">
          <PageHeader title="Scheduler" />
          <PageBody className="overflow-hidden">
            <Scheduler
              resources={resources}
              events={events}
              onClickEvent={(event) => {
                setSelectedEvent(event);
              }}
              onEventUpdate={(event) => {
                toast({
                  status: 'success',
                  title: 'Event updated',
                  description: JSON.stringify(event),
                  isClosable: true,
                });
              }}
              direction="horizontal"
              actions={<Button>Create Tour</Button>}
            />
          </PageBody>
        </Page>
      </AppShell>
      <TourSheet
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        selection={selectedEvent}
      />
    </>
  );
};

export const Vertical = () => {
  const events = useMemo(() => generateEvents(), []);

  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);

  const toast = useToast();

  return (
    <>
      <AppShell>
        <Page variant="full">
          <PageHeader title="Scheduler" />
          <PageBody>
            <Scheduler
              resources={resources}
              events={events}
              onClickEvent={(event) => {
                setSelectedEvent(event);
              }}
              onEventUpdate={(event) => {
                toast({
                  status: 'success',
                  title: 'Event updated',
                  description: JSON.stringify(event),
                });
              }}
              direction="vertical"
            />
          </PageBody>
        </Page>
      </AppShell>
      <TourSheet
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        selection={selectedEvent}
      />
    </>
  );
};

export const WithStartAndEndhour = () => {
  const events = useMemo(() => generateEvents(), []);

  return (
    <>
      <AppShell>
        <Page variant="full">
          <PageHeader title="Scheduler" />
          <PageBody>
            <Scheduler
              resources={resources}
              events={events}
              startHour={8}
              endHour={23}
            />
          </PageBody>
        </Page>
      </AppShell>
    </>
  );
};

export const Issue1 = () => {
  const events = useMemo(
    () => [
      {
        id: 'o6GJ3q6D5Y',
        name: 'o6GJ3q6D5Y',
        resourceId: 'pool',
        startDate: '2023-10-08T07:30:00.000Z',
        endDate: '2023-10-08T08:33:10.031Z',
      },
      {
        id: 'xAi_0woaAE',
        name: 'xAi_0woaAE',
        resourceId: 'pool',
        startDate: '2023-10-08T10:56:49.969Z',
        endDate: '2023-10-08T12:00:00.000Z',
      },
    ],
    []
  );

  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [date, setDate] = useState(new Date('2023-10-07T22:00:00.000Z'));
  const toast = useToast();

  return (
    <>
      <AppShell>
        <Page variant="full">
          <PageHeader title="Scheduler" />
          <PageBody className="overflow-hidden">
            <Scheduler
              date={date}
              onDateChange={setDate}
              resources={[
                {
                  id: 'pool',
                  name: 'Pool',
                },
                {
                  id: '01H8GRRPP0M257NNWNG53QSMHM',
                  name: 'KTW #2',
                },
                {
                  id: '01HAC12480RMQQDKSNNYJSPR7H',
                  name: 'Test',
                },
              ]}
              events={events}
              onClickEvent={(event) => {
                setSelectedEvent(event);
              }}
              onEventUpdate={(event) => {
                toast({
                  status: 'success',
                  title: 'Event updated',
                  description: JSON.stringify(event),
                  isClosable: true,
                });
              }}
              direction="horizontal"
              actions={<Button>Create Tour</Button>}
            />
          </PageBody>
        </Page>
      </AppShell>
      <TourSheet
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        selection={selectedEvent}
      />
    </>
  );
};

export const IssueEventsNotChanging = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [date, setDate] = useState(new Date('2023-10-06T22:00:00.000Z'));
  const toast = useToast();

  const events = useMemo(() => {
    if (date.toISOString() === '2023-10-07T22:00:00.000Z') {
      return [
        {
          id: 'o6GJ3q6D5Y',
          name: 'o6GJ3q6D5Y',
          resourceId: 'pool',
          startDate: '2023-10-08T07:30:00.000Z',
          endDate: '2023-10-08T08:33:10.031Z',
        },
        {
          id: 'xAi_0woaAE',
          name: 'xAi_0woaAE',
          resourceId: 'pool',
          startDate: '2023-10-08T10:56:49.969Z',
          endDate: '2023-10-08T12:00:00.000Z',
        },
      ];
    }

    return [];
  }, [date]);

  return (
    <>
      <AppShell>
        <Page variant="full">
          <PageHeader title="Scheduler" />
          <PageBody className="overflow-hidden">
            <Scheduler
              date={date}
              onDateChange={setDate}
              resources={[
                {
                  id: 'pool',
                  name: 'Pool',
                },
                {
                  id: '01H8GRRPP0M257NNWNG53QSMHM',
                  name: 'KTW #2',
                },
                {
                  id: '01HAC12480RMQQDKSNNYJSPR7H',
                  name: 'Test',
                },
              ]}
              events={events}
              onClickEvent={(event) => {
                setSelectedEvent(event);
              }}
              onEventUpdate={(event) => {
                toast({
                  status: 'success',
                  title: 'Event updated',
                  description: JSON.stringify(event),
                  isClosable: true,
                });
              }}
              direction="horizontal"
              actions={<Button>Create Tour</Button>}
            />
          </PageBody>
        </Page>
      </AppShell>
      <TourSheet
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        selection={selectedEvent}
      />
    </>
  );
};
