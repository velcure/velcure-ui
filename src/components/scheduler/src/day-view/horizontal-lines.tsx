import { HTMLVelcureProps } from '#/components/factory';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import dayjs from 'dayjs';
import { forwardRef, useId } from 'react';
import { useSchedulerContext } from '../use-scheduler';

export interface HorizontalLinesProps
  extends Omit<HTMLVelcureProps<'div'>, 'children'> {
  hours: dayjs.Dayjs[];
  containerOffsetRef: React.RefObject<HTMLDivElement>;
}

const containerClass = cva('bg-background text-xs leading-5', {
  variants: {
    direction: {
      horizontal: cn(
        'grid col-start-1 col-end-2 row-start-1',
        'divide-y divide-gray-100'
      ),
      vertical: cn(
        'sticky top-0 z-30 flex-none shadow ring-1 ring-black ring-opacity-5 sm:pr-8',
        'grid divide-x divide-gray-100 border-gray-100 border-r border-gray-100'
      ),
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
});

const hourSlotClasses = cva('', {
  variants: {
    direction: {
      horizontal: cn(
        'sticky left-0 z-20',
        '-ml-14 -mt-2.5 w-14 pr-2 rtl:-mr-14',
        'text-end',
        'text-muted-foreground'
      ),
      vertical: cn('flex items-center justify-center py-3'),
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
});

export const HorizontalLines = forwardRef<HTMLDivElement, HorizontalLinesProps>(
  (props, ref) => {
    const { className, hours, containerOffsetRef, ...restProps } = props;

    const { timeFormat, direction } = useSchedulerContext();
    // We need to force the minute to zero, because otherwise in ex GMT+5.5, it would show :30 minute times (but at the positino of :00)
    const finalHour = hours[hours.length - 1]
      .add(1, 'hour')
      .minute(0)
      .format(timeFormat);

    const id = useId();

    const inner = (
      <>
        <div
          className={cn(
            direction === 'horizontal' ? 'row-end-1 h-7' : 'col-end-1 w-14'
          )}
          ref={containerOffsetRef}
        />
        {hours.map((hour, id) => (
          <div key={`${id}-${hour.get('hour')}`}>
            <div
              className={cn(
                hourSlotClasses({
                  direction,
                })
              )}
            >
              {/* We need to force the minute to zero, because otherwise in ex GMT+5.5, it would show :30 minute times (but at the positino of :00) */}
              {hour.minute(0).format(timeFormat)}
            </div>
          </div>
        ))}
        <div key={`${id}-${finalHour}`}>
          <div
            className={cn(
              hourSlotClasses({
                direction,
              })
            )}
          >
            {finalHour}
          </div>
        </div>
      </>
    );

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
        style={{
          ...(direction == 'horizontal'
            ? {
                gridTemplateRows: `repeat(${hours.length}, minmax(var(--gridDefaultSize),1fr))`,
              }
            : {
                gridTemplateColumns: `repeat(${
                  hours.length + 1
                }, minmax(0,1fr))`,
              }),
        }}
      >
        {inner}
      </div>
    );
  }
);

HorizontalLines.displayName = 'HorizontalLines';
