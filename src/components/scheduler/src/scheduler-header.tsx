import { Button, ButtonGroup, IconButton } from '#/components/button/src';
import { HTMLVelcureProps } from '#/components/factory';
import { ChevronLeftIcon, ChevronRightIcon } from '#/components/icons/src';
import { Typography } from '#/components/typography/src';
import { cn } from '#/utilities';
import dayjs from 'dayjs';
import { forwardRef } from 'react';
import { useSchedulerContext } from './use-scheduler';

export interface SchedulerHeaderProps
  extends Omit<HTMLVelcureProps<'div'>, 'children'> {
  actions?: React.ReactNode;
}

export const SchedulerHeader = forwardRef<HTMLDivElement, SchedulerHeaderProps>(
  (props, ref) => {
    const { className, actions, ...restProps } = props;

    const { date, setDate, i18nConfig } = useSchedulerContext();

    const today = dayjs(date);

    return (
      <header
        ref={ref}
        {...restProps}
        className={cn(
          'flex flex-none flex-col justify-between sm:flex-row sm:items-center',
          'border-b border-muted py-4 px-6',
          className
        )}
      >
        <Typography as="h3" className="text-base font-semibold leading-6">
          <time dateTime={today.toISOString()}>
            {today.format(`dddd, D. MMMM'YY`)}
          </time>
        </Typography>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <ButtonGroup isAttached>
            <IconButton
              variant="outline"
              aria-label="Previous day"
              icon={<ChevronLeftIcon />}
              onClick={() => {
                setDate(today.subtract(1, 'day').toDate());
              }}
            />
            <Button
              variant="outline"
              className="font-semibold text-sm"
              onClick={() => {
                setDate(dayjs().toDate());
              }}
            >
              {i18nConfig?.today || 'Today'}
            </Button>
            <IconButton
              variant="outline"
              aria-label="Next day"
              icon={<ChevronRightIcon />}
              onClick={() => {
                setDate(today.add(1, 'day').toDate());
              }}
            />
          </ButtonGroup>
          {actions && (
            <div className="flex items-center gap-4">
              <div className="h-6 w-px bg-gray-300" />
              {actions}
            </div>
          )}
        </div>
      </header>
    );
  }
);
