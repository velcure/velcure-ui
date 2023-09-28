import { useFormControl } from '#/components/form-control/src';
import { cn } from '#/utilities';
import { mergeProps } from '@zag-js/react';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { velcure, type HTMLVelcureProps } from '../../factory';
import { useNumberInputContext } from './use-number-input';

export interface NumberInputFieldProps extends HTMLVelcureProps<'input'> {}

const classes = cva(['outline-none bg-transparent w-full row-span-2 h-full'], {
  variants: {
    size: {
      xs: 'p-2',
      sm: 'p-3',
      md: 'py-2 px-4',
      lg: 'p-4 ',
    },
  },
});

export const NumberInputField = forwardRef<
  HTMLInputElement,
  NumberInputFieldProps
>((props, ref) => {
  const { size, isInvalid, isReadOnly, isRequired, isDisabled, inputProps } =
    useNumberInputContext();
  const mergedProps = mergeProps(inputProps, props);
  const { className, ...restProps } = mergedProps;

  const form = useFormControl({
    ...restProps,
    isInvalid,
    isReadOnly,
    isRequired,
    isDisabled,
  });

  return (
    <velcure.input
      {...form}
      disabled={form.disabled || isDisabled}
      readOnly={form.readOnly || isReadOnly}
      ref={ref}
      className={cn(
        classes({
          size,
        }),
        className
      )}
    />
  );
});

NumberInputField.displayName = 'NumberInputField';
