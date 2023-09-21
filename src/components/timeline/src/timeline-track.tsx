import { cn } from '#/utilities';
import React, { forwardRef } from 'react';

export interface TimelineTrackProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const TimelineTrack = forwardRef<HTMLDivElement, TimelineTrackProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('flex-1 w-px min-h-3 bg-border', className)}
        {...restProps}
      />
    );
  }
);

TimelineTrack.displayName = 'TimelineTrack';
