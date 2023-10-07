import { Button, IconButton } from '#/components/button/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { ChevronLeftIcon, ChevronRightIcon } from '#/components/icons/src';
import { cn, getWeekNumber } from '#/utilities';
import { forwardRef } from 'react';
import { AbsenceScale } from './types';

export interface AbsenceNavigationProps extends HTMLVelcureProps<'div'> {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  scale: AbsenceScale;
}

export const AbsenceNavigation = forwardRef<
  HTMLDivElement,
  AbsenceNavigationProps
>((props, ref) => {
  const { date, className, scale, setDate, children, ...restProps } = props;

  const handlePrevious = () => {
    switch (scale) {
      case 'week': {
        setDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
        break;
      }
      case 'month': {
        setDate((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
        break;
      }
      case 'year': {
        setDate((prev) => new Date(prev.setFullYear(prev.getFullYear() - 1)));
        break;
      }
    }
  };

  const handleNext = () => {
    switch (scale) {
      case 'week': {
        setDate((prev) => new Date(prev.setDate(prev.getDate() + 7)));
        break;
      }
      case 'month': {
        setDate((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
        break;
      }
      case 'year': {
        setDate((prev) => new Date(prev.setFullYear(prev.getFullYear() + 1)));
        break;
      }
    }
  };

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
            variant="ghost"
            aria-label="Previous"
            icon={<ChevronLeftIcon />}
            onClick={handlePrevious}
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
            aria-label="Previous"
            icon={<ChevronRightIcon />}
            onClick={handleNext}
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
