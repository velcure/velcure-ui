import { createContext, useCallbackRef, useControllableState } from '#/hooks';
import { isObject } from '#/utilities';
import { useCallback } from 'react';
import { EventOrValue } from './checkbox-types';

export interface CheckboxGroupContext
  extends Pick<UseCheckboxGroupReturn, 'onChange' | 'value' | 'isDisabled'> {}

export const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createContext<CheckboxGroupContext>({
    name: 'CheckboxGroupContext',
    strict: false,
  });

function isInputEvent(value: any): value is { target: HTMLInputElement } {
  return value && isObject(value) && isObject(value.target);
}

export interface UseCheckboxGroupProps {
  /**
   * The value of the checkbox group
   */
  value?: Array<string | number>;
  /**
   * The initial value of the checkbox group
   */
  defaultValue?: Array<string | number>;
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?(value: Array<string | number>): void;
  /**
   * If `true`, all wrapped checkbox inputs will be disabled
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * If `true`, input elements will receive
   * `checked` attribute instead of `isChecked`.
   *
   * This assumes, you're using native radio inputs
   *
   * @default false
   */
  isNative?: boolean;
}

/**
 * React hook that provides all the state management logic
 * for a group of checkboxes.
 *
 * It is consumed by the `CheckboxGroup` component
 *
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
 */
export function useCheckboxGroup(props: UseCheckboxGroupProps = {}) {
  const {
    defaultValue,
    value: valueProp,
    onChange,
    isDisabled,
    isNative,
  } = props;

  const onChangeProp = useCallbackRef(onChange);

  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue || [],
    onChange: onChangeProp,
  });

  const handleChange = useCallback(
    (eventOrValue: EventOrValue) => {
      if (!value) return;

      const isChecked = isInputEvent(eventOrValue)
        ? eventOrValue.target.checked
        : !value.includes(eventOrValue);

      const selectedValue = isInputEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue;

      const nextValue = isChecked
        ? [...value, selectedValue]
        : value.filter((v) => String(v) !== String(selectedValue));

      setValue(nextValue);
    },
    [setValue, value]
  );

  const getCheckboxProps = useCallback(
    (props: Record<string, any> = {}) => {
      const checkedKey = isNative ? 'checked' : 'isChecked';
      return {
        ...props,
        [checkedKey]: value.some((val) => String(props.value) === String(val)),
        onChange: handleChange,
      };
    },
    [handleChange, isNative, value]
  );

  return {
    value,
    isDisabled,
    onChange: handleChange,
    setValue,
    getCheckboxProps,
  };
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>;
