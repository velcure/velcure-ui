import { cn } from '#/utilities';
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
  const { className, ...restProps } = props;
  const { getInputProps, size } = useNumberInputContext();

  const input = getInputProps(restProps, ref);

  return (
    <velcure.input
      {...input}
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
