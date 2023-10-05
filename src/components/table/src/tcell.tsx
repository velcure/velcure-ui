import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export interface TCellProps extends HTMLVelcureProps<'td'> {
  /**
   * Applies styling for a cell that contains an overflow menu
   */
  overflow?: boolean;
  /**
   * Applies minimum fixed width styling (e.g. for cells that contain checkboxes or icons)
   */
  minimum?: boolean;
  /**
   * Truncates long text with an ellipsis
   */
  truncated?: boolean;
}

const cellClasses = cva(
  [
    'table-cell transition-colors',
    'first:border-l-2 border-transparent',
    'first:group-focus-within:border-primary',
    'py-2 px-3',
  ],
  {
    variants: {
      overflow: {
        true: 'box-content w-[2em] h-inherit p-0 pe-1',
        false: 'box-border',
      },
      minimum: {
        true: 'box-content w-[1em]',
        false: '',
      },
      truncated: {
        true: 'overflow-hidden overflow-ellipsis whitespace-nowrap',
        false: '',
      },
    },
    defaultVariants: {
      overflow: false,
      minimum: false,
    },
  }
);

export const TCell = forwardRef<HTMLTableCellElement, TCellProps>(
  (props, ref) => {
    const { className, overflow, minimum, truncated, ...restProps } = props;

    return (
      <velcure.td
        {...restProps}
        className={cn(
          cellClasses({
            overflow,
            minimum,
            truncated,
          }),
          className
        )}
        ref={ref}
      />
    );
  }
);

TCell.displayName = 'TCell';
