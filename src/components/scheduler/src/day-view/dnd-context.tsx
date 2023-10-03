import { Portal } from '#/components/portal/src';
import {
  DndContext as DndKitContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { useState } from 'react';
import { Event } from '../event/event';
import { CalendarEvent } from '../scheduler-types';
import { useSchedulerContext } from '../use-scheduler';

export const DndContext: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const { setEvents, onEventUpdate, setIsDragging } = useSchedulerContext();

  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const onDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setActiveEvent(null);
    const { over, active } = event;

    const calendarEvent = active?.data?.current as CalendarEvent;
    const overResource = over?.data?.current?.resourceId;
    if (!overResource || !calendarEvent) {
      return;
    }

    if (calendarEvent.resourceId !== overResource) {
      setEvents((events) =>
        events.map((e) => {
          if (e.id === calendarEvent.id) {
            const updates = {
              ...e,
              resourceId: overResource,
            };

            onEventUpdate?.(updates);

            return updates;
          }

          return e;
        })
      );
    }
  };

  /**
   * @TODO prevent scrolling down/up when dragging
   * our calendar will only allow to move ressources horizontally
   * so they will always stay at the same time.
   */

  const handleOnDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    if (!event.active.data.current) return;

    setActiveEvent(event.active.data.current as CalendarEvent);
  };

  return (
    <DndKitContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={onDragEnd}
      onDragStart={handleOnDragStart}
    >
      {children}

      <Portal>
        <DragOverlay>
          {activeEvent && (
            <Event event={activeEvent} eventDuration={30} className="z-50" />
          )}
        </DragOverlay>
      </Portal>
    </DndKitContext>
  );
};
