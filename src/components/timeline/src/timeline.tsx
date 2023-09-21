import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface TimelineProps extends ComponentPropsWithoutRef<'ul'> {}

export const Timeline = forwardRef<HTMLUListElement, TimelineProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <ul
        ref={ref}
        className={cn('relative list-none', className)}
        {...restProps}
      />
    );
  }
);

Timeline.displayName = 'Timeline';
