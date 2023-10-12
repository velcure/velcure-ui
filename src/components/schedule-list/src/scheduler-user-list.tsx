import { HTMLVelcureProps, velcure } from '#/components/factory';
import { useMergeRefs } from '#/hooks';
import { MaybeRenderProp, cn, runIfFn } from '#/utilities';
import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import { SchedulerUserItem } from './scheduler-user';
import type { ScheduleUser } from './types';
import { useSchedulerContext } from './use-scheduler';

export interface SchedulerUserListProps
  extends Omit<HTMLVelcureProps<'ul'>, 'children'> {
  children?: MaybeRenderProp<ScheduleUser[]>;
}

export const SchedulerUserList = React.forwardRef<
  HTMLUListElement,
  SchedulerUserListProps
>((props, ref) => {
  const { children, className, ...restProps } = props;

  const { users } = useSchedulerContext();

  const { setNodeRef, active } = useDroppable({
    id: 'schedule-users-sidebar',
  });

  return (
    <velcure.ul
      className={cn(
        'divide-y divide-border min-h-[10rem] rounded-lg',
        className,
        active && 'bg-blue-50 border-2 border-dashed border-blue-200'
      )}
      {...restProps}
      role="list"
      ref={useMergeRefs(ref, setNodeRef)}
    >
      {children
        ? runIfFn(children, users)
        : users?.map((user) => <SchedulerUserItem key={user.id} user={user} />)}
    </velcure.ul>
  );
});

SchedulerUserList.displayName = 'SchedulerUserList';
