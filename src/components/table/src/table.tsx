import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';

export interface TableProps extends HTMLVelcureProps<'table'> {}

export const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const { className, children, ...restProps } = props;
  return (
    <velcure.table
      {...restProps}
      className={cn(
        'table border-none w-full table-auto border-collapse border-spacing-0',
        className
      )}
      ref={ref}
    >
      {children}
    </velcure.table>
  );
});

Table.displayName = 'Table';
