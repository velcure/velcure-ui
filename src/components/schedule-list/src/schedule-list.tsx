import { Circle, HTMLVelcureProps, velcure } from '#/components/factory';
import { cn, generateWeekDates } from '#/utilities';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import dayjs from 'dayjs';
import { forwardRef, useMemo, useState } from 'react';
import { ScheduleListHeader } from './schedule-list-header';
import {
  ScheduleUsersSidebar,
  SidebarUserColumn,
} from './schedule-users-sidebar';
import { ShiftItem } from './shift-item';
import { Department, DragData, ScheduleUser, Shift } from './types';

interface ScheduleListOptions {
  departments?: Department[];
  shifts?: Shift[];
  date: Date;
  users?: ScheduleUser[];
}

export interface ScheduleListProps
  extends HTMLVelcureProps<'div'>,
    ScheduleListOptions {}

export const ScheduleList = forwardRef<HTMLDivElement, ScheduleListProps>(
  (props, ref) => {
    const {
      className,
      departments,
      date,
      shifts = [],
      users,
      ...restProps
    } = props;

    const range = useMemo(() => {
      return generateWeekDates(dayjs(date).startOf('isoWeek').toDate());
    }, [date]);

    const [dragData, setDragData] = useState<DragData | null>(null);

    const onDragStart = (event: DragStartEvent) => {
      const data = event.active.data.current as DragData;

      setDragData(data);
    };
    const onDragEnd = (_event: DragEndEvent) => {
      setDragData(null);
    };

    return (
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <velcure.div
          ref={ref}
          {...restProps}
          className={cn(
            'flex flex-1 overflow-y-auto bg-background isolate relative ',
            className
          )}
        >
          <div className="'flex flex-col mb-2 w-[13%] min-w-[250px] transition-all'">
            {/** sidebar header slot */}
            <div className="flex-1 overflow-y-auto text-sm ps-2">
              {users && users.length > 0 ? (
                <ScheduleUsersSidebar users={users} />
              ) : null}
            </div>
          </div>

          {/** actual list component */}
          <div className="flex-1 ms-4 flex flex-col overflow-hidden border border-border">
            <div
              id="schedule-list-body"
              className="overflow-y-scroll overflow-x-hidden relative flex-col flex flex-1"
            >
              <ScheduleListHeader days={range} />
              <div
                id="sortable-departments"
                className="divide-y divide-border border-b border-border"
              >
                {departments?.map((department) => {
                  const myShifts = shifts.filter(
                    (shift) => shift.departmentId === department.id
                  );

                  return (
                    <div
                      key={department.id}
                      className="flex divide-x divide-border"
                    >
                      <div className="flex-none w-[15%] max-w-[250px] py-2 px-2">
                        <div className="inline-flex gap-2 flex-row items-center">
                          <Circle
                            className="w-4 h-4"
                            style={{
                              backgroundColor: department.hexColor,
                            }}
                          />
                          <span className="text-sm leading-5">
                            {department.name}
                          </span>
                        </div>
                      </div>
                      {range.map((day, index) => {
                        const todaysShifts = myShifts
                          .filter(
                            (shift) =>
                              dayjs(shift.startsAt).isSame(day, 'day') ||
                              dayjs(shift.endsAt).isSame(day, 'day')
                          )
                          .sort((a, b) => {
                            const aStartsAt = dayjs(a.startsAt);
                            const bStartsAt = dayjs(b.startsAt);

                            if (aStartsAt.isBefore(bStartsAt)) {
                              return -1;
                            }

                            if (aStartsAt.isAfter(bStartsAt)) {
                              return 1;
                            }

                            return 0;
                          });

                        return (
                          <div
                            key={index}
                            className={cn(
                              'flex flex-1 items-center px-2 py-2 first:ps-0 min-h-10'
                            )}
                          >
                            <div className="flex flex-col gap-2 w-full">
                              {todaysShifts.map((shift) => {
                                return (
                                  <ShiftItem key={shift.id} shift={shift} />
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </velcure.div>
        <DragOverlay>
          {dragData && dragData.origin === 'sidebar' && (
            <SidebarUserColumn
              user={users?.find((user) => user.id === dragData.id)!}
            />
          )}
        </DragOverlay>
      </DndContext>
    );
  }
);

ScheduleList.displayName = 'ScheduleList';
