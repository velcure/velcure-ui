import { HTMLVelcureProps } from '#/components/factory';
import { cn } from '#/utilities';
import React from 'react';

export interface CircularProgressLabelProps extends HTMLVelcureProps<'div'> {}

export const CircularProgressLabel = React.forwardRef<
  HTMLDivElement,
  CircularProgressLabelProps
>((props, ref) => {
  const { className, children, ...restProps } = props;
  return (
    <div
      ref={ref}
      className={cn(
        'absolute text-center -translate-x-1/2 -translate-y-1/2 w-full left-1/2 top-1/2 text-xs',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
});

CircularProgressLabel.displayName = 'CircularProgressLabel';
