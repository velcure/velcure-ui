import { HTMLVelcureProps, velcure } from '#/components/factory';
import { FormControlOptions } from '#/components/form-control/src';
import { cn, createSplitProps } from '#/utilities';
import { ReactNode, forwardRef, useRef, useState } from 'react';
import {
  UseComboboxOptions,
  UseComboboxReturn,
  useCombobox,
} from './use-combobox';

interface ComboboxOptions {
  renderValue?: (options: {
    selection: UseComboboxReturn['selection'];
    inputValue?: UseComboboxReturn['inputValue'];
  }) => ReactNode;
  /**
   * Defines text that appears in the element when no items are selected
   **/
  placeholder?: string;
}

export interface ComboboxProps
  extends HTMLVelcureProps<'div'>,
    FormControlOptions,
    UseComboboxOptions,
    ComboboxOptions {}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (props, ref) => {
    const [opts, { renderValue, placeholder, className, ...restProps }] =
      createSplitProps<UseComboboxOptions>()(props, ['options', 'isEditable']);

    const [isInputHidden, setIsInputHidden] = useState(true);
    const triggerRef = useRef<HTMLDivElement>(null);

    const {
      getInputProps,
      getMenuProps,
      getTriggerProps,
      isEditable,
      selection,
      inputValue,
    } = useCombobox(opts);

    const isDisabled = restProps.isDisabled;

    return (
      <velcure.div {...restProps} className={cn('w-full', className)} ref={ref}>
        <velcure.div
          // trigger
          {...getTriggerProps(
            {
              onFocus: () => {
                if (isEditable) {
                  setIsInputHidden(false);
                }
              },
              onBlur: (e) => {
                if (
                  e.relatedTarget === null ||
                  !triggerRef.current?.contains(e.relatedTarget)
                ) {
                  if (isEditable) {
                    setIsInputHidden(true);
                  }
                }
              },
              className: cn(
                'block w-full border-0 shadow-sm leading-4 text-base transition-colors',
                // input
                'ring-1 ring-input ring-inset',
                'focus-within:ring-ring focus-within:ring-2',
                'h-10 py-2 px-4 rounded-md'
              ),
            },
            triggerRef
          )}
        >
          <velcure.div className={cn('flex grow flex-wrap -mx-[2px] min-w-0')}>
            <velcure.div
              className={cn(
                // base
                'basis-0 grow overflow-hidden text-ellipsis whitespace-pre select-none',
                'min-w-[32px] h-5 mx-[2px]',
                !isDisabled
                  ? isEditable
                    ? 'cursor-text'
                    : 'cursor-pointer'
                  : 'cursor-not-allowed',
                !isInputHidden && 'hidden'
              )}
            >
              {renderValue
                ? renderValue({ selection, inputValue })
                : inputValue || placeholder}
            </velcure.div>
            <velcure.input
              {...getInputProps({
                className: cn(
                  'basis-0 grow overflow-hidden text-ellipsis whitespace-pre select-none',
                  'min-w-[32px] h-5 mx-[2px] outline-none',
                  isInputHidden && 'sr-only'
                ),
              })}
            />
          </velcure.div>
        </velcure.div>
        <div
          className="absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10"
          {...getMenuProps()}
        ></div>
      </velcure.div>
    );
  }
);

Combobox.displayName = 'Combobox';
