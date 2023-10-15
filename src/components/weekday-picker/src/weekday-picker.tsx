import { useCheckboxGroup } from '#/components/checkbox/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import React from 'react';
import { ISOWeekday } from './types';
import { Weekday } from './weekday';

type Omitted = 'defaultValue' | 'onChange' | 'value';

export interface WeekdayPickerProps
  extends Omit<HTMLVelcureProps<'div'>, Omitted> {
  /**
   * Days of the week to be displayed, ISO 8601 weekday numbers.
   * Monday is 1 and Sunday is 7.
   * @default [1, 2, 3, 4, 5, 6, 7]
   */
  days?: ISOWeekday[];

  /**
   * The initial value of the checkbox group
   */
  defaultValue?: ISOWeekday[];
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?(value: ISOWeekday[]): void;
  /**
   * The value of the checkbox group
   */
  value?: ISOWeekday[];
}

const defaultDays: ISOWeekday[] = [1, 2, 3, 4, 5, 6, 7];

export const WeekdayPicker = React.forwardRef<
  HTMLDivElement,
  WeekdayPickerProps
>((props, ref) => {
  const {
    className,
    children,
    value,
    defaultValue,
    onChange,
    days = defaultDays,
    ...restProps
  } = props;

  const { getCheckboxProps } = useCheckboxGroup({
    value,
    defaultValue,
    onChange: (value) => {
      // ensure that the value  is a number and is sorted
      onChange?.(value.map((v) => Number(v) as ISOWeekday).sort());
    },
  });

  return (
    <velcure.div
      className={cn(
        'flex flex-row',
        'border border-input divide-x divide-border rounded-md isolate',
        className
      )}
      ref={ref}
      {...restProps}
    >
      {days.map((day) => (
        <Weekday
          key={day}
          value={day}
          checkboxProps={getCheckboxProps({
            value: day,
          })}
          _first={day === days[0]}
          _last={day === days[days.length - 1]}
        />
      ))}
    </velcure.div>
  );
});

WeekdayPicker.displayName = 'WeekdayPicker';
