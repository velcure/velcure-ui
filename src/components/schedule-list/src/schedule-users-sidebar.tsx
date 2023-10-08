import { Avatar } from '#/components/avatar/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { useDroppable } from '@dnd-kit/core';
import { forwardRef } from 'react';
import { Draggable } from './draggable';
import { ScheduleUser } from './types';

export interface ScheduleUsersSidebarProps extends HTMLVelcureProps<'div'> {
  users: ScheduleUser[];
}

export const ScheduleUsersSidebar = forwardRef<
  HTMLDivElement,
  ScheduleUsersSidebarProps
>((props, ref) => {
  const { className, users, ...restProps } = props;

  const { setNodeRef, active } = useDroppable({
    id: 'schedule-users-sidebar',
  });

  return (
    <velcure.div ref={ref} {...restProps} className={cn(className)}>
      <div className="flex-1 overflow-y-auto text-sm ps-2">
        <div className="min-h-full -ms-2">
          <ul
            ref={setNodeRef}
            role="list"
            className={cn(
              'divide-y divide-border min-h-[10rem] px-4 rounded-lg',
              active && 'bg-blue-50 border-2 border-dashed border-blue-200'
            )}
          >
            {users.map((user) => (
              <Draggable
                as="li"
                id={`sidebar-user-${user.id}`}
                data={{
                  origin: 'sidebar',
                  id: user.id,
                }}
              >
                <SidebarUserColumn key={user.id} user={user} />
              </Draggable>
            ))}
          </ul>
        </div>
      </div>
    </velcure.div>
  );
});

ScheduleUsersSidebar.displayName = 'ScheduleUsersSidebar';

interface SidebarUserColumn extends HTMLVelcureProps<'div'> {
  user: ScheduleUser;
}

export const SidebarUserColumn: React.FC<SidebarUserColumn> = (props) => {
  const { user, ...restProps } = props;

  return (
    <velcure.div key={user.id} className="flex gap-x-4 py-5" {...restProps}>
      <Avatar name={user.name} src={user.avatar} />
      <div className="min-w-0 overflow-hidden">
        <p className="text-sm font-semibold leading-6 truncate">{user.name}</p>
        <div className="text-muted-foreground text-xs">
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
};
