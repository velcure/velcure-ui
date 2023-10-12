import { Avatar } from '#/components/avatar/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { useMergeRefs } from '#/hooks';
import { cn } from '#/utilities';
import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import { ScheduleUser } from './types';

export interface SchedulerUserItemProps extends HTMLVelcureProps<'div'> {
  user: ScheduleUser;
  /**
   * Whether the item is being dragged over the list.
   */
  isOverlay?: boolean;
}

export const SchedulerUserItem = React.forwardRef<
  HTMLDivElement,
  SchedulerUserItemProps
>((props, ref) => {
  const { className, user, isOverlay, children, ...restProps } = props;

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `sidebar-user-${user.id}`,
    data: {
      origin: 'sidebar',
      id: user.id,
    },
    disabled: isOverlay,
  });

  return (
    <velcure.div
      ref={useMergeRefs(ref, setNodeRef)}
      className={cn(
        'flex gap-x-3 ',
        isOverlay ? 'bg-background rounded-lg shadow py-2 px-1' : 'py-5 px-4',
        className
      )}
      {...restProps}
      {...attributes}
      {...listeners}
    >
      <Avatar
        size={isOverlay ? 'xs' : 'sm'}
        name={user.name}
        src={user.avatar}
      />
      <div className="min-w-0 overflow-hidden">
        <p className="text-xs font-semibold leading-2 truncate">{user.name}</p>
        <div
          className={cn('text-muted-foreground text-xs', isOverlay && 'hidden')}
        >
          <span>
            0/
            {user.maxDurationPerWeek ? user.maxDurationPerWeek / 3600 : '-'}
          </span>
          <span className="ml-2">
            0/
            {user.maxDurationPerMonth ? user.maxDurationPerMonth / 3600 : '-'}
          </span>
        </div>
      </div>
    </velcure.div>
  );
});

SchedulerUserItem.displayName = 'SchedulerUserItem';
