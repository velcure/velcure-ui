import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export interface THeadCellProps extends HTMLVelcureProps<'th'> {
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
  ['table-cell transition-colors py-2 px-3 text-start text-sm'],
  {
    variants: {
      overflow: {
        true: 'box-content w-[2em] h-inherit',
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

export const THeadCell = forwardRef<HTMLTableCellElement, THeadCellProps>(
  (props, ref) => {
    const { className, minimum, overflow, truncated, ...restProps } = props;

    return (
      <velcure.th
        scope="col"
        className={cn(
          cellClasses({
            minimum,
            overflow,
            truncated,
          }),
          className
        )}
        {...restProps}
        ref={ref}
      />
    );
  }
);

THeadCell.displayName = 'THeadCell';
