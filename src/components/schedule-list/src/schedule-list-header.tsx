import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';
import { ScheduleColumn } from './schedule-column';
import { SchedulerHeaderItem } from './scheduler-header-item';
import { useSchedulerContext } from './use-scheduler';

export interface ScheduleListHeaderProps extends HTMLVelcureProps<'div'> {}

export const ScheduleListHeader = forwardRef<
  HTMLDivElement,
  ScheduleListHeaderProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const { range } = useSchedulerContext();

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
          <span className="font-semibold">Arbeitsbereiche</span>
        </ScheduleColumn>
      </div>
      <div className="flex-1 flex relative divide-x divide-border ps-2">
        {range.map((day, index) => (
          <SchedulerHeaderItem key={index} date={day} />
        ))}
      </div>
    </velcure.div>
  );
});

ScheduleListHeader.displayName = 'ScheduleListHeader';
