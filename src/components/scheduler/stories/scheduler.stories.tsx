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
import { Typography } from '#/components/typography/src';
import { Meta } from '@storybook/react';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { PiDotsThreeVertical, PiPhoneCall } from 'react-icons/pi';
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
      <TourSheet
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        selection={selectedEvent}
      />
    </>
  );
};
