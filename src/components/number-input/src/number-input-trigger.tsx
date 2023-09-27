import { MinusIcon, PlusIcon } from '#/components/icons/src';
import { cn } from '#/utilities';
import { mergeProps } from '@zag-js/react';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { velcure, type HTMLVelcureProps } from '../../factory';
import { useNumberInputContext } from './use-number-input';

const triggerClass = cva(
  [
    'cursor-pointer flex mx-auto group px-2.5',
    'h-full items-center justify-center',
    'ring-inset ring-input border-s',
    'transition-colors',
    // hover
    'hover:bg-accent hover:text-accent-foreground',
  ],
  {
    variants: {
      size: {
        xs: 'last:rounded-r-sm',
        sm: 'last:rounded-r-sm',
        md: 'last:rounded-r-md',
        lg: 'last:rounded-r-md',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface NumberInputIncrementTriggerProps
  extends Omit<HTMLVelcureProps<'button'>, 'children'> {}

export const NumberInputIncrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputIncrementTriggerProps
>((props, ref) => {
  const { size, incrementTriggerProps } = useNumberInputContext();

  const mergedProps = mergeProps(incrementTriggerProps, props);

  const { className, ...restProps } = mergedProps;

  return (
    <velcure.button
      {...restProps}
      className={cn(triggerClass({ size }), className)}
      ref={ref}
    >
      <PlusIcon className="h-4 w-4" />
    </velcure.button>
  );
});

NumberInputIncrementTrigger.displayName = 'NumberInputIncrementTrigger';

export interface NumberInputDecrementTriggerProps
  extends Omit<HTMLVelcureProps<'button'>, 'children'> {}

export const NumberInputDecrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>((props, ref) => {
  const { size, decrementTriggerProps } = useNumberInputContext();
  const mergedProps = mergeProps(decrementTriggerProps, props);

  const { className, ...restProps } = mergedProps;

  return (
    <velcure.button
      {...restProps}
      className={cn(triggerClass({ size }), className)}
      ref={ref}
    >
      <MinusIcon className="h-4 w-4" />
    </velcure.button>
  );
});

NumberInputDecrementTrigger.displayName = 'NumberInputDecrementTrigger';
