import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import type { FC } from 'react';
import { useCalendarContext } from './calendar-context';
import {
  Views,
  addYears,
  isDateInDecade,
  isDateInRange,
  startOfYearPeriod,
} from './utils';

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
        true: 'text-muted-foreground cursor-not-allowed opacity-50',
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

export const CalendarDecades: FC = () => {
  const { viewDate, setViewDate, setView, value } = useCalendarContext();

  return (
    <div className="grid w-64 grid-cols-4">
      {[...Array(12)].map((_year, index) => {
        const first = startOfYearPeriod(viewDate, 100);
        const year = first - 10 + index * 10;
        const firstDate = new Date(year, 0, 1);
        const lastDate = addYears(firstDate, 9);

        const isSelected = isDateInDecade(viewDate, year);
        const isDisabled = !isDateInRange(viewDate, firstDate, lastDate);

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

              if (value) {
                setViewDate(addYears(viewDate, year - value.getFullYear()));
              }

              setView(Views.Years);
            }}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
};
