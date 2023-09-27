import { velcure } from '#/components/factory';
import { FormControlOptions } from '#/components/form-control/src';
import { Assign, cn, createSplitProps } from '#/utilities';
import { mergeProps } from '@zag-js/react';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { NumberInputControl } from './number-input-control';
import { NumberInputField } from './number-input-field';
import { NumberInputScrubber } from './number-input-scrubber';
import {
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
} from './number-input-trigger';
import {
  NumberInputProvider,
  UseNumberInputOptions,
  UseNumberInputProps,
  useNumberInput,
} from './use-number-input';

export interface NumberInputProps
  extends Assign<ComponentPropsWithoutRef<'div'>, UseNumberInputProps>,
    UseNumberInputOptions,
    FormControlOptions {}

export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
  (props, ref) => {
    const {
      size = 'md',
      isInvalid,
      isRequired,
      isReadOnly,
      isDisabled,
      placeholder,
      ...restProps
    } = props;

    const [useNumberInputProps, divProps] =
      createSplitProps<UseNumberInputProps>()(restProps, [
        'allowMouseWheel',
        'allowOverflow',
        'clampValueOnBlur',
        'defaultValue',
        'dir',
        'disabled',
        'focusInputOnChange',
        'form',
        'formatOptions',
        'getRootNode',
        'id',
        'ids',
        'inputMode',
        'invalid',
        'locale',
        'max',
        'min',
        'name',
        'onFocusChange',
        'onValueChange',
        'onValueInvalid',
        'pattern',
        'readOnly',
        'spinOnPress',
        'step',
        'translations',
        'value',
      ]);

    const { children, className, ...rest } = divProps;

    const api = useNumberInput({
      ...useNumberInputProps,
    });
    const mergedProps = mergeProps(api.rootProps, rest);

    return (
      <NumberInputProvider
        value={{
          size,
          isDisabled: isDisabled,
          isRequired: isRequired,
          isReadOnly: isReadOnly,
          ...api,
          isInvalid: isInvalid || api.isInvalid,
        }}
      >
        <velcure.div
          {...mergedProps}
          ref={ref}
          className={cn('flex flex-col gap-1', className)}
        >
          {children ? (
            children
          ) : (
            <>
              <NumberInputScrubber />
              <NumberInputControl>
                <NumberInputField placeholder={placeholder} />
                <div
                  className={cn(
                    'flex items-center justify-center py-1 pe-px',
                    (isReadOnly || isDisabled) && 'pointer-events-none'
                  )}
                >
                  <NumberInputIncrementTrigger />
                  <NumberInputDecrementTrigger />
                </div>
              </NumberInputControl>
            </>
          )}
        </velcure.div>
      </NumberInputProvider>
    );
  }
);
