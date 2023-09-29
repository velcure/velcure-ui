import { DatePickerType, DatePickerValue } from '#/utilities';
import { useRef } from 'react';
import { useControllableState } from '../use-controllable-state';

interface UseControllableDatesProps<T extends DatePickerType = 'default'> {
  type: T;
  value: DatePickerValue<T> | undefined;
  defaultValue: DatePickerValue<T> | undefined;
  onChange: ((value: DatePickerValue<T>) => void) | undefined;
  shouldUpdate?: (prev: T, next: T) => boolean;
}

const getEmptyValue = <T extends DatePickerType = 'default'>(type: T) =>
  type === 'range' ? [null, null] : type === 'multiple' ? [] : null;

export function useControllableDates<T extends DatePickerType = 'default'>(
  props: UseControllableDatesProps<T>
) {
  const { type, value, defaultValue, onChange, shouldUpdate } = props;

  const storedType = useRef<T>(type);

  const [_value, _setValue] = useControllableState<any>({
    value,
    defaultValue,
    onChange,
    shouldUpdate,
  });

  let _finalValue = _value;

  if (storedType.current !== type) {
    // Type has changed. Do some checks or resets

    storedType.current = type;

    if (value === undefined) {
      // Reset uncontrolled value as types aren't compatible
      _finalValue =
        defaultValue !== undefined ? defaultValue : getEmptyValue(type);
      _setValue(_finalValue);
    } else if (process.env.NODE_ENV === 'development') {
      // Throw errors in dev mode in case type of value isn't correct
      switch (type) {
        case 'default':
          if (value !== null && typeof value !== 'string') {
            // eslint-disable-next-line no-console
            console.error(
              '[@velcure-ui/hooks/use-controllable-dates] Value must be type of `null` or `string`'
            );
          }
          break;
        case 'multiple':
          if (!(value instanceof Array)) {
            // eslint-disable-next-line no-console
            console.error(
              '[@velcure-ui/hooks/use-controllable-dates] Value must be type of `string[]`'
            );
          }
          break;
        case 'range':
          if (!(value instanceof Array) || value.length !== 2) {
            // eslint-disable-next-line no-console
            console.error(
              '[@velcure-ui/hooks/use-controllable-dates] Value must be type of `[string, string]`'
            );
          }
          break;
      }
    }
  }

  return [_finalValue, _setValue] as [
    DatePickerValue<T>,
    React.Dispatch<React.SetStateAction<DatePickerValue<T>>>
  ];
}
