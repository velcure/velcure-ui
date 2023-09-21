import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';

export interface TimelineSeparatorProps
  extends React.ComponentPropsWithoutRef<'div'> {}

const timelineSeparatorClass = cva(['flex flex-col items-center shrink-0'], {
  variants: {
    size: {
      md: 'w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const TimelineSeparator = forwardRef<
  HTMLDivElement,
  TimelineSeparatorProps
>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <div
      ref={ref}
      className={cn(timelineSeparatorClass(), className)}
      {...restProps}
    />
  );
});

TimelineSeparator.displayName = 'TimelineSeparator';
