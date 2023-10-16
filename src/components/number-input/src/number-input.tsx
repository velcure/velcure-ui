import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import React from 'react';
import { NumberInputControl } from './number-input-control';
import { NumberInputField } from './number-input-field';
import {
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
} from './number-input-trigger';
import {
  NumberInputProvider,
  UseNumberInputProps,
  useNumberInput,
} from './use-number-input';

export interface NumberInputProps
  extends Omit<HTMLVelcureProps<'div'>, keyof UseNumberInputProps>,
    UseNumberInputProps {}

export const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    const { htmlProps, ...context } = useNumberInput(restProps);
    const ctx = React.useMemo(() => context, [context]);

    return (
      <NumberInputProvider value={ctx}>
        <velcure.div
          {...htmlProps}
          ref={ref}
          className={cn('flex flex-col gap-1', className)}
        >
          {children ? (
            children
          ) : (
            <>
              <NumberInputControl>
                <NumberInputField />
                <div
                  className={cn(
                    'flex items-center justify-center py-1 pe-px',
                    (ctx.isReadOnly || ctx.isDisabled) && 'pointer-events-none'
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
