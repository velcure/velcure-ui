import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import type { FC } from 'react';
import { useCalendarContext } from './calendar-context';
import {
  addDays,
  getFirstDayOfTheMonth,
  getFormattedDate,
  getWeekDays,
  isDateEqual,
  isDateInRange,
} from './utils';

const buttonclass = cva(
  [
    'block flex-1 rounded-lg border-0 text-center text-sm font-semibold leading-9 text-foreground',
    'transition-colors',
  ],
  {
    variants: {
      isSelected: {
        true: 'bg-primary text-primary-foreground hover:bg-primary/80',
      },
      isDisabled: {
        true: 'text-muted-foreground cursor-default opacity-50',
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      {
        isSelected: true,
        isDisabled: false,
        className: 'hover:bg-primary/80',
      },
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

export const CalendarDays: FC = () => {
  const { weekStart, minValue, maxValue, viewDate, locale, onClick, value } =
    useCalendarContext();

  const weekDays = getWeekDays(locale, weekStart);
  const startDate = getFirstDayOfTheMonth(viewDate, weekStart);

  return (
    <>
      <div className="grid grid-cols-7 mb-1">
        {weekDays.map((day, index) => (
          <span
            key={index}
            className="dow h-6 text-center text-sm font-medium leading-6 text-foreground"
          >
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 mb-1">
        {[...Array(42)].map((_date, index) => {
          const currentDate = addDays(startDate, index);
          const day = getFormattedDate(locale, currentDate, {
            day: 'numeric',
          });

          const isSelected = value && isDateEqual(value, currentDate);
          const isDisabled = !isDateInRange(currentDate, minValue, maxValue);
          const isOtherMonth = currentDate.getMonth() !== viewDate.getMonth();

          return (
            <button
              disabled={isDisabled || isOtherMonth}
              key={index}
              type="button"
              className={cn(
                buttonclass({
                  isSelected,
                  isDisabled: isOtherMonth || isDisabled,
                })
              )}
              onClick={() => {
                if (isDisabled) return;

                onClick?.(currentDate);
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </>
  );
};
