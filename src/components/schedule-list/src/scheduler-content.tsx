import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import React from 'react';

export interface SchedulerContentProps extends HTMLVelcureProps<'div'> {}

export const SchedulerContent = React.forwardRef<
  HTMLDivElement,
  SchedulerContentProps
>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <velcure.div
      ref={ref}
      className={cn('grid grid-cols-12 gap-6 flex-1', className)}
      {...restProps}
    />
  );
});

SchedulerContent.displayName = 'SchedulerContent';
