import { cn } from '#/utilities';
import React, { forwardRef } from 'react';

export interface TimelineContentProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const TimelineContent = forwardRef<HTMLDivElement, TimelineContentProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('flex-1 pt-px px-2 pb-2', className)}
        {...restProps}
      />
    );
  }
);

TimelineContent.displayName = 'TimelineContent';
