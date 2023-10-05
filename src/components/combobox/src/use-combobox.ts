import { useEnvironmentContext } from '#/components/environment/src';
import { mergeRefs } from '#/hooks';
import { PropGetter, callAllHandlers } from '#/utilities';
import { useCombobox as useDownShift } from 'downshift';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IOption, OptionValue } from './types';
import { toLabel } from './utils';

export interface UseComboboxOptions {
  /**
   * Provides an ordered list of option groups and options
   *
   * @param {OptionValue} option.value Unique option value
   * @param {string} option.label Optional human-readable text (defaults to `option.value`)
   * @param {boolean} option.selected Sets initial selection for the option
   * @param {boolean} option.disabled Indicates that the option is not interactive
   * @param {IOption[]} option.options Groups a list of options
   */
  options?: (IOption | { options: IOption[]; label?: string })[];
  /**
   * Determines whether the combobox is editable or select-only
   **/
  isEditable?: boolean;
}

export type UseComboboxReturn = ReturnType<typeof useCombobox>;

export const useCombobox = (opts: UseComboboxOptions) => {
  const { options = [], isEditable = true } = opts;

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const environment = useEnvironmentContext();
  const [triggerContainsInput, setTriggerContainsInput] = useState<boolean>();

  const labels: Record<string, string> = useMemo(() => ({}), []);
  const selectedValues: OptionValue[] = useMemo(() => [], []);
  const disabledValues: OptionValue[] = useMemo(() => [], []);

  useEffect(
    // Downshift does not expect a dropdown like Garden's combobox where the
    // wrapping div functions like an open/close button. Finesse state so that
    // default close-on-blur functionality is not undone by the toggle of the
    // trigger.
    () =>
      setTriggerContainsInput(triggerRef.current?.contains(inputRef.current)),
    [triggerRef, inputRef]
  );

  const values = useMemo(() => {
    const retVal: OptionValue[] = [];

    const setValues = (option: IOption) => {
      if (option.disabled) {
        if (!disabledValues.includes(option.value)) {
          disabledValues.push(option.value);
        }
      } else {
        retVal.push(option.value);

        const index = disabledValues.indexOf(option.value);

        if (index !== -1) {
          disabledValues.splice(index, 1);
        }
      }

      if (option.selected && !selectedValues.includes(option.value)) {
        selectedValues.push(option.value);
      }

      const key =
        typeof option.value === 'string'
          ? option.value
          : JSON.stringify(option.value);

      labels[key] = option.label || key;
    };

    options.forEach((option) => {
      if ('options' in option) {
        option.options.forEach(setValues);
      } else {
        setValues(option);
      }
    });

    return retVal;
  }, []);

  const {
    selectedItem: _selectionValue,
    getInputProps: getDownshiftInputProps,
    getMenuProps: getDownshiftMenuProps,
    getToggleButtonProps,
    inputValue: _inputValue,
  } = useDownShift({
    items: values,
    environment: environment?.() as any,
  });

  const getInputProps: PropGetter = useCallback(
    (props = {}, ref) => {
      const inputProps = {
        ...props,
        ref: mergeRefs(ref, inputRef),
      };

      return getDownshiftInputProps(inputProps);
    },
    [getDownshiftInputProps]
  );

  const getMenuProps: PropGetter = useCallback((props = {}, ref) => {
    return getDownshiftMenuProps({
      ...props,
      ref,
    });
  }, []);

  const getTriggerProps: PropGetter = useCallback(
    ({ onBlur, onClick, onKeyDown, ...restProps } = {}, ref) => {
      return getToggleButtonProps({
        onBlur: callAllHandlers(onBlur, (e) => {
          if (
            e.relatedTarget === null ||
            !e?.currentTarget?.contains(e.relatedTarget)
          ) {
            // @TODO close menu
          }
        }),
        onClick: callAllHandlers(onClick, () => {
          if (isEditable && triggerContainsInput) {
            // @TODO isDisabled check

            inputRef.current?.focus();
          } else if (!isEditable) {
            // @TODO toggle menu
          }
        }),
        onKeyDown,
        ref: mergeRefs(ref, triggerRef),
        // @TODO disabled,
        ...restProps,
      });
    },
    [
      getToggleButtonProps,
      isEditable,
      triggerContainsInput,
      inputRef,
      triggerRef,
    ]
  );

  const selection = useMemo(() => {
    if (Array.isArray(_selectionValue)) {
      return _selectionValue.map((value) => ({
        value,
        label: labels[value],
        disabled: disabledValues.includes(value),
      }));
    } else if (_selectionValue) {
      return {
        value: _selectionValue,
        label: toLabel(labels, _selectionValue),
        disabled: disabledValues.includes(_selectionValue),
      };
    }

    return null;
  }, [_selectionValue, disabledValues, labels]);

  return {
    getInputProps,
    getMenuProps,
    getTriggerProps,
    isEditable,
    /** state */
    selection,
    inputValue: _inputValue,
  };
};
