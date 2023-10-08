import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';

export interface ScheduleColumnProps extends HTMLVelcureProps<'div'> {}

export const ScheduleColumn = forwardRef<HTMLDivElement, ScheduleColumnProps>(
  (props: ScheduleColumnProps) => {
    const { className, ...restProps } = props;
    return (
      <velcure.div
        {...restProps}
        className={cn(
          'max-w-0 grow shrink p-2 border-b border-border relative text-sm',
          className
        )}
      />
    );
  }
);

ScheduleColumn.displayName = 'ScheduleColumn';
