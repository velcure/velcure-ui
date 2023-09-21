import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface TimelineItemProps extends ComponentPropsWithoutRef<'li'> {}

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <li ref={ref} className={cn('flex min-h-8', className)} {...restProps} />
    );
  }
);

TimelineItem.displayName = 'TimelineItem';
