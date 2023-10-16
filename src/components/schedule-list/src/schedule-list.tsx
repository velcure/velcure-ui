import { Button } from '#/components/button/src';
import { EmptyState } from '#/components/empty-state/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import dayjs from 'dayjs';
import { HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';
import { ScheduleDepartment } from './schedule-department-item';
import { ScheduleListHeader } from './schedule-list-header';
import { useSchedulerContext } from './use-scheduler';

export interface ScheduleListProps
  extends Omit<HTMLVelcureProps<'div'>, keyof HTMLMotionProps<'div'>> {
  className?: string;
}

export const ScheduleList = forwardRef<HTMLDivElement, ScheduleListProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const {
      sidebarMounted,
      currentSchedule,
      onCreateSchedule,
      date,
      departments,
    } = useSchedulerContext();

    return (
      <velcure.div
        ref={ref}
        {...restProps}
        className={cn(
          'flex flex-1 overflow-y-auto bg-background isolate relative ',
          sidebarMounted ? 'col-span-10' : 'col-span-12',
          !currentSchedule && 'items-center justify-center',
          className
        )}
      >
        {!currentSchedule && (
          <EmptyState
            title="Kein Wochenplan im Monat Juni vorhanden"
            actions={
              <Button
                onClick={() =>
                  onCreateSchedule(dayjs(date).startOf('isoWeek').toDate())
                }
              >
                Erstelle einen neuen Wochenplan
              </Button>
            }
          />
        )}
        {currentSchedule && (
          <div className="flex-1 flex flex-col overflow-hidden border border-border">
            <div
              id="schedule-list-body"
              className="overflow-y-scroll overflow-x-hidden relative flex-col flex flex-1"
            >
              <ScheduleListHeader />
              <div
                id="sortable-departments"
                className="divide-y divide-border border-b border-border"
              >
                {departments?.map((department) => (
                  <ScheduleDepartment
                    key={department.id}
                    department={department}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </velcure.div>
    );
  }
);

ScheduleList.displayName = 'ScheduleList';
