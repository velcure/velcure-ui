import { ButtonGroup, IconButton } from '#/components/button/src';
import { HTMLVelcureProps } from '#/components/factory';
import { ChevronLeftIcon, ChevronRightIcon } from '#/components/icons/src';
import { Typography } from '#/components/typography/src';
import { cn } from '#/utilities';
import dayjs from 'dayjs';
import { forwardRef } from 'react';
import { useSchedulerContext } from './use-scheduler';

export interface SchedulerHeaderProps
  extends Omit<HTMLVelcureProps<'div'>, 'children'> {}

export const SchedulerHeader = forwardRef<HTMLDivElement, SchedulerHeaderProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const { date, setDate } = useSchedulerContext();

    const today = dayjs(date);

    return (
      <header
        ref={ref}
        {...restProps}
        className={cn(
          'pt-4 flex flex-none flex-col justify-between px-4 sm:flex-row sm:items-center',
          className
        )}
      >
        <Typography variant="h3">
          {today.format('dddd, MMMM D')}
          <Typography as="span" variant="h3" className="text-muted-foreground">
            , {today.format('YYYY')}
          </Typography>
        </Typography>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <ButtonGroup isAttached>
            <IconButton
              variant="outline"
              aria-label="Previous day"
              icon={<ChevronLeftIcon />}
              onClick={() => {
                setDate?.(today.subtract(1, 'day').toDate());
              }}
            />
            <IconButton
              variant="outline"
              aria-label="Next day"
              icon={<ChevronRightIcon />}
              onClick={() => {
                setDate?.(today.add(1, 'day').toDate());
              }}
            />
          </ButtonGroup>
        </div>
      </header>
    );
  }
);
