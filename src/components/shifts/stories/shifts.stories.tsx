import { Meta } from '@storybook/react';
import dayjs from 'dayjs';
import { PropsWithChildren, useMemo } from 'react';

const meta = {
  title: 'Components / Schedulers / Shifts',

  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

const SchedulerGrid: React.FC<PropsWithChildren> = (props) => (
  <div className="relative" {...props} />
);

const SchedulerGroupHeaderRow: React.FC<{
  title?: string;
}> = ({ title }) => (
  <div className="flex bg-gray-100">
    <div className="flex-auto h-10 text-xs">
      <div className="h-full box-border">
        <div className="flex w-[98vw] py-4 px-4 font-semibold">
          <div>{title}</div>
        </div>
      </div>
    </div>
  </div>
);

interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface SchedulerRowProps {
  person: string;
  events: Event[];
  slots: Date[];
  onSlotClick: (slotTime: Date) => void;
  onEventResize?: (event: Event) => void;
}

const SchedulerRowV2: React.FC<SchedulerRowProps> = ({
  person,
  events,
  slots,
  onSlotClick,
  onEventResize,
}) => {
  const handleEventMouseDown = (event: Event, offsetX: number) => {
    // Implementiere hier die Logik zum Starten des Drag-Vorgangs
    const initialX = offsetX;
    const initialStartDate = new Date(event.startDate);
    const initialEndDate = new Date(event.endDate);

    const handleMouseMove = (e: MouseEvent) => {
      // Implementiere hier die Logik zum Verfolgen des Drag-Vorgangs
      const deltaX = e.clientX - initialX;
      const minutesPerPixel = 15; // Anpassung in 15-Minuten-Schritten
      const minutesToAdjust = Math.round(deltaX / minutesPerPixel) * 15;

      const newStartDate = new Date(initialStartDate);
      newStartDate.setMinutes(newStartDate.getMinutes() + minutesToAdjust);

      const newEndDate = new Date(initialEndDate);
      newEndDate.setMinutes(newEndDate.getMinutes() + minutesToAdjust);

      // Aktualisiere das Event visuell
      const updatedEvent = {
        ...event,
        startDate: newStartDate.toISOString(),
        endDate: newEndDate.toISOString(),
      };

      // Rufe die Callback-Funktion zum Aktualisieren des Events auf
      onEventResize?.(updatedEvent);

      // Aktualisiere die Breite des Events visuell
      const eventElement = document.getElementById(`event-${event.id}`);
      if (eventElement) {
        const newWidth = `${(minutesToAdjust / 15) * 65}px`; // 65px pro 15 Minuten
        eventElement.style.width = newWidth;
      }
    };

    const handleMouseUp = () => {
      // Implementiere hier die Logik zum Beenden des Drag-Vorgangs
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const renderSlotsAndEvents = () => {
    const renderedItems = [];

    let currentEventIndex = 0;

    for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
      const slot = slots[slotIndex];
      const event = events[currentEventIndex];

      if (event) {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);

        if (
          startDate.getTime() <= slot.getTime() &&
          endDate.getTime() > slot.getTime()
        ) {
          const duration =
            (endDate.getTime() - startDate.getTime()) / 1000 / 60;

          // Der Slot wird von einem Ereignis belegt
          renderedItems.push(
            <div
              key={event.id}
              id={`event-${event.id}`}
              data-date={slot.toISOString()}
              className="relative hover:bg-green-100 border-b border-gray-300"
              style={{
                flexGrow: duration / 30, // Verwende flex-grow für Event-Slots
                flexBasis: 0,
                height: '65px',
                backgroundColor: event.color,
                opacity: 0.5,
              }}
              onMouseDown={(e) => handleEventMouseDown(event, e.clientY)}
            >
              <div className="text-white">{event.name}</div>
            </div>
          );

          // Überspringe die Schleife für die Dauer des Ereignisses
          const eventDurationMinutes =
            (endDate.getTime() - startDate.getTime()) / (1000 * 60);
          const slotsToSkip = eventDurationMinutes / 30 - 1; // -1, da wir bereits den aktuellen Slot gerendert haben
          slotIndex += slotsToSkip;

          currentEventIndex++;
          continue;
        }
      }

      // Wenn kein Ereignis den Slot belegt, wird ein leerer Slot gerendert
      renderedItems.push(
        <div
          key={slot.getTime()}
          id="slot"
          data-date={slot.toISOString()}
          className="relative hover:bg-green-100 border-b border-l border-gray-300"
          style={{
            flexGrow: 1,
            flexBasis: 0,
            height: '65px',
          }}
          onClick={() => onSlotClick(slot)}
        />
      );
    }

    return renderedItems;
  };

  return (
    <div
      id="schedulerRow"
      className="flex bg-inherit border-none break-inside-avoid-page"
    >
      <div
        id="peopleColumnCell"
        className="shrink grow-0 w-[160px] text-sm font-medium bg-gray-100"
      >
        <div className="flex h-full items-center justify-center">
          <div className="flex-auto text-center">{person}</div>
        </div>
      </div>
      {renderSlotsAndEvents()}
    </div>
  );
};

export const Basic = () => {
  const slots = useMemo((): Date[] => {
    const minutesPerDay = 24 * 60;

    // empty slots, where 1 unit is 30 minutes
    const slots: Date[] = [];

    for (let i = 0; i < minutesPerDay; i += 30) {
      const date = new Date();
      date.setHours(0, i, 0, 0);
      slots.push(date);
    }

    return slots;
  }, []);

  const events: Event[] = useMemo(() => {
    // create 1 shift to "today" that starts at 06:00 and ends at 14:00
    const date = new Date();
    date.setHours(6, 0, 0, 0);
    const start = date.toISOString();
    date.setHours(14, 0, 0, 0);
    const end = date.toISOString();

    return [
      {
        id: '1',
        name: 'Shift',
        startDate: start,
        endDate: end,
        color: '#FF0000',
      },
    ];
  }, []);

  return (
    <SchedulerGrid>
      <div
        id="timeindicator"
        className="flex bg-inherit border-none break-inside-avoid-page"
      >
        <div
          id="spacer"
          className="shrink grow-0 w-[160px] text-sm font-medium bg-gray-100"
        />
        {slots.map((slot) => {
          // render only full hours
          if (slot.getMinutes() !== 0) {
            return null;
          }

          return (
            <div
              key={slot.getTime()}
              id="slot"
              data-date={slot.toISOString()}
              className="relative py-4 px-2 border-b border-r border-gray-300 flex items-center justify-center text-sm"
              style={{
                flexGrow: 2,
                flexBasis: 0,
              }}
            >
              <div className="text-primary">{dayjs(slot).format('HH:mm')}</div>
            </div>
          );
        })}
      </div>
      <SchedulerGroupHeaderRow title="medics" />
      <div>
        <SchedulerRowV2
          person="Gerald"
          slots={slots}
          events={events}
          onSlotClick={(slotTime) => {
            console.log(slotTime);
          }}
        />
      </div>
      <div>
        <SchedulerRowV2
          person="Johan"
          slots={slots}
          events={events}
          onSlotClick={(slotTime) => {
            console.log(slotTime);
          }}
        />
      </div>
    </SchedulerGrid>
  );
};
