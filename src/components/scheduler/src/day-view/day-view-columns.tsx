import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';

export interface DayViewColumnsProps extends HTMLVelcureProps<'ol'> {
  offsetHeight?: number | string;
  gridStopsPerDay: number;
  children: React.ReactNode;
  zIndex?: number;
}

export const DayViewColumns = forwardRef<HTMLOListElement, DayViewColumnsProps>(
  (props, ref) => {
    const {
      offsetHeight = 'var(--gridDefaultSize)',
      gridStopsPerDay,
      children,
      zIndex,
      className,
      ...restProps
    } = props;

    return (
      <velcure.ol
        ref={ref}
        className={cn(
          'col-start-1 col-end-2 row-start-1 grid sm:pr-8',
          'auto-cols-auto text-[0px]',
          className
        )}
        {...restProps}
        style={{
          ...restProps.style,
          marginTop: offsetHeight,
          zIndex,
        }}
        data-gridstopsperday={gridStopsPerDay}
      >
        {children}
      </velcure.ol>
    );
  }
);

DayViewColumns.displayName = 'DayViewColumns';
