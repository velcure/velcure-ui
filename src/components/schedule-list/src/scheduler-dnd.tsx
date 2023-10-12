import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import React from 'react';
import { SchedulerUserItem } from './scheduler-user';
import { DragData } from './types';
import { useSchedulerContext } from './use-scheduler';

export const SchedulerDnd: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { users, onUserAssign, shifts } = useSchedulerContext();

  const [dragData, setDragData] = React.useState<DragData | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current as DragData;

    setDragData(data);
  };
  const onDragEnd = (_event: DragEndEvent) => {
    setDragData(null);

    const { over } = _event;
    if (!over) return;

    const overData = over.data.current as { id: string; type: string };
    const dragData = _event.active.data.current as DragData;

    if (overData.type === 'shift') {
      const shift = shifts?.find((shift) => shift.id === overData.id)!;
      if (!shift) return;

      if (shift.userIds?.includes(dragData.id)) return;
      onUserAssign(dragData.id, overData.id);
    }
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}

      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {dragData && dragData.origin === 'sidebar' && (
          <SchedulerUserItem
            user={users?.find((user) => user.id === dragData.id)!}
            isOverlay
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};
