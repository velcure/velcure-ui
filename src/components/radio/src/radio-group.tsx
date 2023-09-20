import { createContext } from '#/hooks/react-context';
import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef, useMemo } from 'react';
import {
  UseRadioGroupProps,
  UseRadioGroupReturn,
  useRadioGroup,
} from './use-radio-group';

export interface RadioGroupContext
  extends Pick<
    UseRadioGroupReturn,
    'onChange' | 'value' | 'name' | 'isDisabled' | 'isFocusable'
  > {}

const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContext>({
    name: 'RadioGroupContext',
    strict: false,
  });

export { useRadioGroupContext };

type Omitted =
  | 'onChange'
  | 'value'
  | 'defaultValue'
  | 'defaultChecked'
  | 'children';
export interface RadioGroupProps
  extends UseRadioGroupProps,
    Omit<ComponentPropsWithoutRef<'div'>, Omitted> {
  children: React.ReactNode;
}

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => {
    const { children, className, isDisabled, isFocusable, ...rest } = props;

    const { value, onChange, getRootProps, name, htmlProps } =
      useRadioGroup(rest);

    const group = useMemo(
      () => ({
        name,
        onChange,
        value,
        isDisabled,
        isFocusable,
      }),
      [name, onChange, value, isDisabled, isFocusable]
    );

    return (
      <RadioGroupProvider value={group}>
        <div
          {...getRootProps(htmlProps as any, ref)}
          className={cn('', className)}
        >
          {children}
        </div>
      </RadioGroupProvider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
