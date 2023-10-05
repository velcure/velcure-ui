import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';

export interface THeadProps extends HTMLVelcureProps<'thead'> {}

export const THead = forwardRef<HTMLTableSectionElement, THeadProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <velcure.thead
        {...restProps}
        className={cn('bg-accent text-accent-foreground', className)}
        ref={ref}
      />
    );
  }
);

THead.displayName = 'THead';
