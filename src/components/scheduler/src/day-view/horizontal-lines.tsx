import { HTMLVelcureProps } from '#/components/factory';
import { cn } from '#/utilities';
import dayjs from 'dayjs';
import { forwardRef, useId } from 'react';
import { useSchedulerContext } from '../use-scheduler';

export interface HorizontalLinesProps
  extends Omit<HTMLVelcureProps<'div'>, 'children'> {
  hours: dayjs.Dayjs[];
  containerOffsetRef: React.RefObject<HTMLDivElement>;
}

export const HorizontalLines = forwardRef<HTMLDivElement, HorizontalLinesProps>(
  (props, ref) => {
    const { className, hours, containerOffsetRef, ...restProps } = props;

    const { timeFormat } = useSchedulerContext();
    // We need to force the minute to zero, because otherwise in ex GMT+5.5, it would show :30 minute times (but at the positino of :00)
    const finalHour = hours[hours.length - 1]
      .add(1, 'hour')
      .minute(0)
      .format(timeFormat);

    const id = useId();

    return (
      <div
        ref={ref}
        {...restProps}
        className={cn(
          'grid col-start-1 col-end-2 row-start-1',
          'divide-y divide-gray-100 bg-background',
          className
        )}
        style={{
          gridTemplateRows: `repeat(${hours.length}, minmax(var(--gridDefaultSize),1fr))`,
        }}
      >
        <div className="row-end-1 h-7" ref={containerOffsetRef} />
        {hours.map((hour, id) => (
          <div key={`${id}-${hour.get('hour')}`}>
            <div
              className={cn(
                'sticky left-0 z-20',
                '-ml-14 -mt-2.5 w-14 pr-2 rtl:-mr-14',
                'text-end text-xs leading-5',
                'text-muted-foreground'
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
              'sticky left-0 z-20',
              '-ml-14 -mt-2.5 w-14 pr-2 rtl:-mr-14',
              'text-end text-xs leading-5',
              'text-muted-foreground'
            )}
          >
            {finalHour}
          </div>
        </div>
      </div>
    );
  }
);

HorizontalLines.displayName = 'HorizontalLines';
