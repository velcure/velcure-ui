import { HTMLVelcureProps } from '#/components/factory';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { useSchedulerContext } from '../use-scheduler';

export interface VerticalLinesProps
  extends Omit<HTMLVelcureProps<'div'>, 'children'> {
  count: number;
}

const containerClass = cva('col-start-1 col-end-2 row-start-1 grid', {
  variants: {
    direction: {
      horizontal: cn(
        'auto-cols-auto grid-rows-1',
        'divide-x divide-muted',
        'sm:pr-8'
      ),
      vertical: cn(
        //'row-start-1 row-end-2 col-start-1 col-end-2 grid',
        'auto-rows-auto grid-cols-1',
        'divide-y divide-muted'
      ),
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
});

/**
 * Vertical lines for the day view.
 * They represent the time slots.
 */
export const VerticalLines = forwardRef<HTMLDivElement, VerticalLinesProps>(
  (props, ref) => {
    const { count, className, ...restProps } = props;

    const { direction } = useSchedulerContext();

    return (
      <div
        ref={ref}
        {...restProps}
        className={cn(
          containerClass({
            direction,
          }),

          className
        )}
      >
        {[...Array(count)].map((_, id) => (
          <div
            key={`Key_vertical_${id}`}
            className={
              direction === 'horizontal' ? 'row-span-full' : 'col-span-full'
            }
            style={{
              ...(direction === 'horizontal'
                ? {
                    gridColumnStart: id + 1,
                  }
                : {
                    gridRowStart: id + 1,
                  }),
            }}
          />
        ))}
      </div>
    );
  }
);

VerticalLines.displayName = 'VerticalLines';
