import { cn } from '#/utilities';
import React, { forwardRef } from 'react';

export interface TimelineDotProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const TimelineDot = forwardRef<HTMLDivElement, TimelineDotProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <div
        ref={ref}
        className={cn('w-3 h-3 bg-current rounded-full', className)}
        {...restProps}
      />
    );
  }
);

TimelineDot.displayName = 'TimelineDot';
