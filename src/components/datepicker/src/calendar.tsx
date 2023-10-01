import { Button, IconButton } from '#/components/button/src';
import { Typography } from '#/components/typography/src';
import { WeekStart, cn, startOfToday } from '#/utilities';
import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useState,
} from 'react';
import { CalendarContext } from './calendar-context';
import { CalendarDays } from './calendar-days';
import { CalendarDecades } from './calendar-decades';
import { CalendarMonths } from './calendar-months';
import { CalendarYears } from './calendar-years';
import {
  Views,
  getFormattedDate,
  getViewDatePage,
  startOfYearPeriod,
} from './utils';

export interface CalendarOptions {
  title?: string;

  /**
   * Function called when the user clicks an item (day on month view, month on year view and so on)
   * @param date
   */
  onClick?: (date: Date) => void;

  /**
   * Disables dates after this value on the calendar
   */
  maxValue?: Date;
  /**
   * Disables dates before this value on the calendar
   */
  minValue?: Date;
  /**
   * Determines which calendar view shall be opened initially. Does not disable navigation.
   * @default 'days'
   */
  defaultView?: Views;

  /**
   * @default 'monday'
   */
  weekStart?: WeekStart;
  /**
   * Applies locale-based formatting.
   * Accepts all **Intl** [locales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).
   * @default 'de'
   */
  locale?: string;

  /**
   * Calendar value.
   */
  value?: Date;
  /**
   * activeStartDate
   */
  activeStartDate?: Date;
}

export interface CalendarProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>,
    CalendarOptions {}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (props, ref) => {
    const {
      title,
      onClick,
      locale = 'de',
      maxValue,
      minValue,
      weekStart = WeekStart.Sunday,
      defaultView = Views.Days,
      activeStartDate = startOfToday(),
      value,
      className,
      ...restProps
    } = props;

    const [viewDate, setViewDate] = useState<Date>(activeStartDate);
    const [view, setView] = useState<Views>(defaultView);

    const getViewTitle = (): string => {
      switch (view) {
        case Views.Decades:
          return `${startOfYearPeriod(viewDate, 100)} - ${
            startOfYearPeriod(viewDate, 100) + 90
          }`;
        case Views.Years:
          return `${startOfYearPeriod(viewDate, 10)} - ${
            startOfYearPeriod(viewDate, 10) + 9
          }`;
        case Views.Months:
          return getFormattedDate(locale, viewDate, { year: 'numeric' });
        case Views.Days:
        default:
          return getFormattedDate(locale, viewDate, {
            month: 'long',
            year: 'numeric',
          });
      }
    };

    // Coordinate the next view based on current view (statemachine-like)
    const getNextView = (): Views => {
      switch (view) {
        case Views.Days:
          return Views.Months;
        case Views.Months:
          return Views.Years;
        case Views.Years:
          return Views.Decades;
      }
      return view;
    };

    // Render the DatepickerView* node
    const renderView = (type: Views): ReactNode => {
      switch (type) {
        case Views.Decades:
          return <CalendarDecades />;
        case Views.Years:
          return <CalendarYears />;
        case Views.Months:
          return <CalendarMonths />;
        case Views.Days:
        default:
          return <CalendarDays />;
      }
    };

    return (
      <CalendarContext
        value={{
          viewDate,
          setViewDate,
          weekStart,
          onClick,
          minValue,
          maxValue,
          locale,
          view,
          setView,
          value,
        }}
      >
        <div
          ref={ref}
          className={cn('min-w-[280px]', className)}
          {...restProps}
        >
          {title && (
            <div className="px-2 py-3 text-center">
              <Typography className="font-semibold">{title}</Typography>
            </div>
          )}
          <div className="flex justify-between mb-2">
            <IconButton
              variant="ghost"
              aria-label="Previous"
              onClick={() => setViewDate(getViewDatePage(view, viewDate, -1))}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </IconButton>
            <Button onClick={() => setView(getNextView())} variant="ghost">
              {getViewTitle()}
            </Button>
            <IconButton
              variant="ghost"
              aria-label="Next"
              onClick={() => setViewDate(getViewDatePage(view, viewDate, 1))}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </IconButton>
          </div>
          <div>{renderView(view)}</div>
        </div>
      </CalendarContext>
    );
  }
);

Calendar.displayName = 'Calendar';
