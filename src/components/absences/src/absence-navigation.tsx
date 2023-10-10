import { Button, IconButton } from '#/components/button/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { ChevronLeftIcon, ChevronRightIcon } from '#/components/icons/src';
import { cn, getWeekNumber } from '#/utilities';
import { forwardRef } from 'react';
import { useAbsenceCalendarContext } from './use-absence-calendar';

export interface AbsenceNavigationProps extends HTMLVelcureProps<'div'> {}

export const AbsenceNavigation = forwardRef<
  HTMLDivElement,
  AbsenceNavigationProps
>((props, ref) => {
  const { className, children, ...restProps } = props;

  const {
    getNavigationPreviousButtonProps,
    getNavigationNextButtonProps,
    translateFn,
    date,
    setDate,
    scale,
  } = useAbsenceCalendarContext();

  return (
    <velcure.div
      className={cn(
        'flex-none w-full flex sticky z-[1] bg-background top-0 divide-x divide-gray-100 border-b border-gray-100',
        className
      )}
      {...restProps}
      ref={ref}
    >
      <div className="flex-none w-[15%] max-w-[250px] py-4 px-3">
        <velcure.nav className={cn('flex justify-center items-center gap-2')}>
          <IconButton
            aria-label={translateFn('previous')}
            icon={<ChevronLeftIcon />}
            {...getNavigationPreviousButtonProps()}
          />
          <strong className="text-center w-full text-sm">
            {date.toLocaleString('de-DE', {
              month: 'long',
              year: 'numeric',
            })}
            <br />
            {scale === 'week' && (
              <small className="text-sm font-normal">
                KW {getWeekNumber(date)}
              </small>
            )}
          </strong>
          <IconButton
            variant="ghost"
            aria-label={translateFn('next')}
            icon={<ChevronRightIcon />}
            {...getNavigationNextButtonProps()}
          />
        </velcure.nav>
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              setDate(new Date());
            }}
          >
            <span className="text-sm">Heute</span>
          </Button>
        </div>
      </div>
      {children}
    </velcure.div>
  );
});

AbsenceNavigation.displayName = 'AbsenceNavigation';
