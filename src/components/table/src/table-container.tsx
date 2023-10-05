import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';

export interface TableContainerProps extends HTMLVelcureProps<'div'> {
  /**
   * Whether to allow horizontal scrolling.
   */
  overflow?: boolean;
}

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  (props, ref) => {
    const { className, overflow, ...restProps } = props;

    return (
      <velcure.div
        {...restProps}
        ref={ref}
        className={cn(
          'block whitespace-nowrap scrolling-touch overflow-x-auto overflow-y-hidden max-w-full',
          className
        )}
      />
    );
  }
);

TableContainer.displayName = 'TableContainer';
