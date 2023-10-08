import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import dayjs from 'dayjs';
import { forwardRef } from 'react';
import { ScheduleColumn } from './schedule-column';

export interface ScheduleListHeaderProps extends HTMLVelcureProps<'div'> {
  days: Date[];
}

export const ScheduleListHeader = forwardRef<
  HTMLDivElement,
  ScheduleListHeaderProps
>((props, ref) => {
  const { className, days, ...restProps } = props;
  return (
    <velcure.div
      ref={ref}
      {...restProps}
      className={cn(
        'top-0 z-[1] sticky flex flex-none shadow divide-x divide-border',
        className
      )}
    >
      <div className="flex-none w-[15%] max-w-[250px] px-2">
        <ScheduleColumn className="min-h-10">
          <span>Arbeitsbereiche</span>
        </ScheduleColumn>
      </div>
      <div className="flex-1 flex relative divide-x divide-border ps-2">
        {days.map((day, index) => {
          const d = dayjs(day);
          return (
            <div
              key={index}
              className={cn(
                'flex flex-1 items-center px-2 first:ps-0 min-h-10 text-sm'
              )}
            >
              {/** Mo, 06. Okt. */}
              <strong>{d.format('dd')}</strong>
              <span>
                , {d.format('DD')}. {d.format('MMM')}
              </span>
            </div>
          );
        })}
      </div>
    </velcure.div>
  );
});

ScheduleListHeader.displayName = 'ScheduleListHeader';
