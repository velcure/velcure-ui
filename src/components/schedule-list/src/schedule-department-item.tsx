import { Circle, HTMLVelcureProps, velcure } from '#/components/factory';
import { PlusIcon } from '#/components/icons/src';
import { cn } from '#/utilities';
import dayjs from 'dayjs';
import React from 'react';
import { ShiftItem } from './shift-item';
import { Department } from './types';
import { useSchedulerContext } from './use-scheduler';

export interface ScheduleDepartmentItem extends HTMLVelcureProps<'div'> {
  department: Department;
}

export const ScheduleDepartment = React.forwardRef<
  HTMLDivElement,
  ScheduleDepartmentItem
>((props, ref) => {
  const { className, department, ...restProps } = props;

  const { range, shifts: allShifts, onCreateShift } = useSchedulerContext();

  const shifts = allShifts.filter(
    (shift) => shift.departmentId === department.id
  );

  return (
    <velcure.div
      ref={ref}
      {...restProps}
      className={cn('flex divide-x divide-border', className)}
    >
      <div
        className="flex-none w-[15%] max-w-[250px] py-2 px-2"
        style={{
          width: `calc(100% / ${range.length + 1})`,
        }}
      >
        <div className="inline-flex gap-2 flex-row items-center">
          <Circle
            className="w-4 h-4"
            style={{
              backgroundColor: department.hexColor,
            }}
          />
          <span className="text-xs leading-5">{department.name}</span>
        </div>
      </div>
      <div></div>
      {range.map((day, index) => {
        const todaysShifts = shifts
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
              'relative flex flex-1 items-center px-2 py-2 first:ps-0 min-h-10',
              todaysShifts.length > 0 && 'pt-8'
            )}
            style={{
              width: `calc(100% / ${range.length + 1})`,
            }}
          >
            <button
              className="absolute inset-0 flex pt-2 justify-center z-[1] group"
              onClick={() => onCreateShift(department.id, day)}
            >
              <Circle className="bg-muted text-muted-foreground shadow">
                <PlusIcon className="hidden group-hover:block" />
              </Circle>
            </button>
            <div className="flex flex-col gap-2 w-full">
              {todaysShifts.map((shift) => {
                return <ShiftItem key={shift.id} shift={shift} />;
              })}
            </div>
          </div>
        );
      })}
    </velcure.div>
  );
});

ScheduleDepartment.displayName = 'ScheduleDepartment';
