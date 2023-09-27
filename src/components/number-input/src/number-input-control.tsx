import { useFormControlContext } from '#/components/form-control/src';
import { cn } from '#/utilities';
import { mergeProps } from '@zag-js/react';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { velcure, type HTMLVelcureProps } from '../../factory';
import { useNumberInputContext } from './use-number-input';

export interface NumberInputControlProps extends HTMLVelcureProps<'div'> {}

const inputControlClass = cva(
  [
    'flex overflow-hidden',
    'w-full border-0 shadow-sm  leading-4 outline-none',
    'transition-colors',
    'ring-1 ring-input ring-inset',
    'focus-visible:outline-none focus:ring-2 focus:ring-ring',
    'focus-within:ring-2 focus-within:ring-ring p-0',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 rounded-sm text-xs',
        sm: 'h-8 rounded-sm text-sm',
        md: 'h-10 rounded-md text-base',
        lg: 'h-12 rounded-md text-lg',
      },
      isReadOnly: {
        true: 'opacity-70 bg-muted',
        false: '',
      },
      isDisabled: {
        true: 'cursor-not-allowed opacity-70 bg-muted',
        false: '',
      },
      isInvalid: {
        true: 'ring-destructive focus-within:ring-destructive',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const NumberInputControl = forwardRef<
  HTMLDivElement,
  NumberInputControlProps
>((props, ref) => {
  const { className, ...restProps } = props;
  const field = useFormControlContext();
  const {
    size,
    controlProps,
    isReadOnly = field?.isReadOnly,
    isDisabled = field?.isDisabled,
    isInvalid = field?.isInvalid,
  } = useNumberInputContext();

  const mergedProps = mergeProps(controlProps, restProps, field ?? {});

  return (
    <velcure.div
      {...mergedProps}
      className={cn(
        inputControlClass({
          size,
          isReadOnly,
          isDisabled,
          isInvalid,
        })
      )}
      ref={ref}
    />
  );
});

NumberInputControl.displayName = 'NumberInputControl';
