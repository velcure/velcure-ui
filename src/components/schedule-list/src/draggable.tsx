import { HTMLVelcureProps, velcure } from '#/components/factory';
import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import { DragData } from './types';

export interface DraggableProps extends HTMLVelcureProps<'div'> {
  id: string;
  data?: DragData;
}

export const Draggable: React.FC<DraggableProps> = (props) => {
  const { id, data, ...restProps } = props;

  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data,
  });

  return (
    <velcure.div
      ref={setNodeRef}
      {...restProps}
      {...listeners}
      {...attributes}
    />
  );
};
