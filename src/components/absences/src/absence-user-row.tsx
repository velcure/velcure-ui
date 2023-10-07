import { Avatar } from '#/components/avatar/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { PlusIcon } from '#/components/icons/src';
import { cn } from '#/utilities';
import { forwardRef } from 'react';
import { AbsenceDay } from './absence-day';
import { AbsenceItem } from './absence-item';
import { Absence, AbsenceUser } from './types';

export interface AbsenceUserRowProps extends HTMLVelcureProps<'div'> {
  user: AbsenceUser;
  days: Date[];
  absences?: Absence[];
}

export const AbsenceUserRow = forwardRef<HTMLDivElement, AbsenceUserRowProps>(
  (props, ref) => {
    const { className, user, days, absences = [], ...restProps } = props;

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
          {days.map((day) => (
            <AbsenceDay
              key={day.toISOString()}
              className="border-e border-gray-100 last:border-e-0"
            >
              <velcure.button
                className={cn(
                  'opacity-0 hover:opacity-100',
                  'w-full h-full cursor-pointer justify-center text-center items-center flex hover:bg-slate-100 transition-colors'
                )}
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
            .map((abs) => {
              return (
                <AbsenceItem
                  absence={abs}
                  key={abs.id}
                  timeRangeStart={days[0]}
                  timeRangeEnd={days[days.length - 1]}
                />
              );
            })}
        </div>
      </div>
    );
  }
);

AbsenceUserRow.displayName = 'AbsenceUserRow';
