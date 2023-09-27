import { useEnvironmentContext } from '#/components/environment/src';
import { FormControlOptions } from '#/components/form-control/src';
import { createContext, useEvent } from '#/hooks';
import { Optional } from '#/utilities';
import * as numberInput from '@zag-js/number-input';
import { normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';

export interface UseNumberInputOptions extends FormControlOptions {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export interface UseNumberInputProps
  extends Optional<numberInput.Context, 'id'> {
  /**
   * The initial value of the number input.
   */
  defaultValue?: numberInput.Context['value'];
}

export interface NumberInputContext
  extends UseNumberInputReturn,
    Omit<UseNumberInputOptions, 'isInvalid'> {}

export const [NumberInputProvider, useNumberInputContext] =
  createContext<NumberInputContext>({
    name: 'NumberInputContext',
    hookName: 'useNumberInputContext',
    providerName: '<NumberInputProvider />',
  });

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>;

export const useNumberInput = (props: UseNumberInputProps = {}) => {
  const initialContext: numberInput.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  };

  const context: numberInput.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onValueInvalid: useEvent(props.onValueInvalid),
    onFocusChange: useEvent(props.onFocusChange),
  };

  const [state, send] = useMachine(numberInput.machine(initialContext), {
    context,
  });

  return numberInput.connect(state, send, normalizeProps);
};
