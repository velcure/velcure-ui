import { cn, dataAttr } from '#/utilities';
import React, { forwardRef } from 'react';
import { TimelineDot } from './timeline-dot';

export interface TimelineIconProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const TimelineIcon = forwardRef<HTMLDivElement, TimelineIconProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center z-[1] py-2 min-h-2 min-w-2 text-muted-foreground',
          className
        )}
        {...restProps}
        data-dot={dataAttr(!children)}
      >
        {children || <TimelineDot />}
      </div>
    );
  }
);

TimelineIcon.displayName = 'TimelineIcon';
