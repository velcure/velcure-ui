import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';

export interface TBodyProps extends HTMLVelcureProps<'tbody'> {}

export const TBody = forwardRef<HTMLTableSectionElement, TBodyProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <velcure.tbody
        {...restProps}
        className={cn('divide-y divide-muted text-sm', className)}
        ref={ref}
      />
    );
  }
);

TBody.displayName = 'TBody';
