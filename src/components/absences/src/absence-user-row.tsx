import { Avatar } from '#/components/avatar/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { PlusIcon } from '#/components/icons/src';
import { cn } from '#/utilities';
import { forwardRef } from 'react';
import { AbsenceDay } from './absence-day';
import { AbsenceItem } from './absence-item';
import { AbsenceUser } from './types';
import { useAbsenceCalendarContext } from './use-absence-calendar';

export interface AbsenceUserRowProps extends HTMLVelcureProps<'div'> {
  user: AbsenceUser;
}

export const AbsenceUserRow = forwardRef<HTMLDivElement, AbsenceUserRowProps>(
  (props, ref) => {
    const { className, user, ...restProps } = props;

    const { range, onAbsenceAddClick, onAbsenceClick, getUserAbsences } =
      useAbsenceCalendarContext();

    const absences = getUserAbsences(user);

    return (
      <div
        ref={ref}
        {...restProps}
        className={cn(
          'flex-none w-full flex divide-x divide-gray-100 odd:bg-slate-50',
          className
        )}
      >
        <div className="w-[15%] max-w-[250px] py-4 px-3">
          <div className="flex items-center gap-2">
            <Avatar size="sm" name={user.name} />
            <div className="text-sm flex flex-col overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">{user.name}</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {user.email}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex relative">
          {range.map((day) => (
            <AbsenceDay
              key={day.toISOString()}
              className="border-e border-gray-100 last:border-e-0"
            >
              <velcure.button
                className={cn(
                  'opacity-0 hover:opacity-100',
                  'w-full h-full cursor-pointer justify-center text-center items-center flex hover:bg-slate-100 transition-colors'
                )}
                onClick={() => {
                  onAbsenceAddClick?.(user, day);
                }}
              >
                <PlusIcon />
              </velcure.button>
            </AbsenceDay>
          ))}
          {absences
            .sort(
              // sort by start date
              (a, b) =>
                new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
            )
            .map((current) => {
              return (
                <AbsenceItem
                  absence={current}
                  key={current.id}
                  timeRangeStart={range[0]}
                  timeRangeEnd={range[range.length - 1]}
                  onAbsenceClick={onAbsenceClick}
                />
              );
            })}
        </div>
      </div>
    );
  }
);

AbsenceUserRow.displayName = 'AbsenceUserRow';
