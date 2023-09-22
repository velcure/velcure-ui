import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import type { FC } from 'react';
import { useCalendarContext } from './calendar-context';
import { Views, isDateEqual, isDateInRange, startOfYearPeriod } from './utils';

const classes = cva(
  [
    'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9',
    'transition-colors text-foreground',
  ],
  {
    variants: {
      isSelected: {
        true: 'bg-primary text-primary-foreground hover:bg-primary/80',
      },
      isDisabled: {
        true: 'text-muted-foreground cursor-default opacity-50',
      },
    },
    compoundVariants: [
      {
        isSelected: false,
        isDisabled: false,
        className: 'hover:bg-accent hover:text-accent-foreground',
      },
    ],
    defaultVariants: {
      isSelected: false,
      isDisabled: false,
    },
  }
);

export const CalendarYears: FC = () => {
  const { minValue, maxValue, viewDate, setViewDate, setView, value } =
    useCalendarContext();

  return (
    <div className="grid w-64 grid-cols-4">
      {[...Array(12)].map((_year, index) => {
        const first = startOfYearPeriod(viewDate, 10);
        const year = first - 1 + index * 1;
        const newDate = new Date(viewDate.getTime());
        newDate.setFullYear(year);

        const isSelected = value && isDateEqual(value, newDate);
        const isDisabled = !isDateInRange(newDate, minValue, maxValue);

        return (
          <button
            disabled={isDisabled}
            key={index}
            type="button"
            className={cn(
              classes({
                isSelected,
                isDisabled,
              })
            )}
            onClick={() => {
              if (isDisabled) return;

              setViewDate(newDate);
              setView(Views.Months);
            }}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
};
