import { UseCheckboxProps, useCheckbox } from '#/components/checkbox/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import dayjs from 'dayjs';
import React, { useId } from 'react';
import { ISOWeekday } from './types';

export interface WeekdayProps extends HTMLVelcureProps<'div'> {
  value: ISOWeekday;
  checkboxProps?: UseCheckboxProps;

  _first?: boolean;
  _last?: boolean;
}

const checkboxClasses = cva(
  [
    'inline-flex items-center justify-center select-none px-2 py-1 relative',
    'bg-muted text-muted-foreground text-sm uppercase',
    'ring-2 ring-transparent',
    // focus
    'data-focus:ring-ring data-focus:z-[1] focus:z-[1]',
    // checked
    'data-checked:bg-primary data-checked:text-primary-foreground',
  ],
  {
    variants: {
      first: {
        true: 'rounded-s-md',
      },
      last: {
        true: 'rounded-e-md',
      },
    },
  }
);

export const Weekday = React.forwardRef<HTMLDivElement, WeekdayProps>(
  (props, ref) => {
    const { className, value, checkboxProps, _first, _last, ...restProps } =
      props;

    const { getLabelProps, getInputProps, getCheckboxProps } =
      useCheckbox(checkboxProps);

    const id = useId();

    return (
      <velcure.div
        as="label"
        className={cn(
          'cursor-pointer first:rounded-s-md last:rounded-e-md',
          className
        )}
        {...getLabelProps(
          {
            ...restProps,
            id: id,
          },
          ref
        )}
      >
        <velcure.input {...getInputProps()} aria-labelledby={id} />
        <velcure.div
          className={checkboxClasses({
            first: _first,
            last: _last,
          })}
          {...getCheckboxProps()}
        >
          {dayjs().isoWeekday(value).format('dd')}
        </velcure.div>
      </velcure.div>
    );
  }
);

Weekday.displayName = 'Weekday';
