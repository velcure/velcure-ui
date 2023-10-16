import { MinusIcon, PlusIcon } from '#/components/icons/src';
import { cn } from '#/utilities';
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
  const { className, ...restProps } = props;

  const { getIncrementButtonProps, size } = useNumberInputContext();
  const increment = getIncrementButtonProps(restProps, ref);

  return (
    <velcure.button
      {...increment}
      className={cn(triggerClass({ size }), className)}
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
  const { className, ...restProps } = props;

  const { getDecrementButtonProps, size } = useNumberInputContext();
  const decrement = getDecrementButtonProps(restProps, ref);

  return (
    <velcure.button
      {...decrement}
      className={cn(triggerClass({ size }), className)}
    >
      <MinusIcon className="h-4 w-4" />
    </velcure.button>
  );
});

NumberInputDecrementTrigger.displayName = 'NumberInputDecrementTrigger';
