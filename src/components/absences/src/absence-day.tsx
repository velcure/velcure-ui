import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';

export interface AbsenceDay extends HTMLVelcureProps<'div'> {}

export const AbsenceDay = forwardRef<HTMLDivElement, AbsenceDay>(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <velcure.div
        {...restProps}
        ref={ref}
        className={cn(
          'flex items-center flex-1 min-h-4 text-center relative overflow-hidden justify-center',
          className
        )}
      />
    );
  }
);

AbsenceDay.displayName = 'AbsenceDay';
