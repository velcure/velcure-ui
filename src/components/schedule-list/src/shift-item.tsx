import { Avatar } from '#/components/avatar/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { mergeRefs } from '#/hooks';
import { cn } from '#/utilities';
import { useDroppable } from '@dnd-kit/core';
import dayjs from 'dayjs';
import { forwardRef } from 'react';
import { Shift } from './types';
import { useSchedulerContext } from './use-scheduler';

export interface ShiftItemProps extends HTMLVelcureProps<'div'> {
  shift: Shift;
}

export const ShiftItem = forwardRef<HTMLDivElement, ShiftItemProps>(
  (props, ref) => {
    const { className, shift, ...restProps } = props;

    const { users } = useSchedulerContext();

    const { setNodeRef, active } = useDroppable({
      id: `shift-${shift.id}`,
      data: {
        type: 'shift',
        id: shift.id,
      },
    });

    return (
      <velcure.div
        ref={mergeRefs(ref, setNodeRef)}
        {...restProps}
        className={cn(
          'relative block py-1 px-2 m-0 rounded-sm w-full',
          'bg-yellow-100 border border-yellow-200',
          active && 'bg-yellow-200 border-yellow-300',
          className
        )}
      >
        <div className="flex items-center text-xs">
          <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap ">
            {dayjs(shift.startsAt).format('HH:mm')} -{' '}
            {dayjs(shift.endsAt).format('HH:mm')}
          </div>
          <small>0/{shift.desiredCoverage}</small>
        </div>
        {shift.userIds && shift.userIds.length > 0 && (
          <ul>
            {shift.userIds.map((userId) => {
              const user = users?.find((user) => user.id === userId);

              if (!user) {
                return null;
              }

              return (
                <li key={userId} className="flex gap-1 items-center text-xs">
                  <Avatar size="xs" name={user.name} />
                  <span className="truncate">{user.name}</span>
                </li>
              );
            })}
          </ul>
        )}
      </velcure.div>
    );
  }
);

ShiftItem.displayName = 'ShiftItem';
