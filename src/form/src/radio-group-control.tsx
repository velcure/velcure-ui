import { velcure } from '#/components';
import { RadioGroup, RadioGroupProps } from '#/components/radio/src';
import { cn } from '#/utilities';
import React from 'react';
import { useController } from 'react-hook-form';
import { FormControl, FormControlBaseProps } from './form-control';

export type RadioGroupControlProps = FormControlBaseProps & {
  radioGroupProps?: RadioGroupProps;
  direction?: 'horizontal' | 'vertical';
  children: React.ReactNode;
};

export const RadioGroupControl: React.FC<RadioGroupControlProps> = (props) => {
  const {
    name,
    label,
    radioGroupProps,
    children,
    direction = 'horizontal',
    ...restProps
  } = props;

  const { field, formState } = useController({
    name,
  });

  return (
    <FormControl name={name} label={label} {...restProps}>
      <RadioGroup
        {...field}
        isDisabled={formState.isSubmitting}
        {...radioGroupProps}
      >
        <velcure.div
          className={cn(
            'flex gap-4',
            direction === 'horizontal' ? 'flex-row' : 'flex-col'
          )}
        >
          {children}
        </velcure.div>
      </RadioGroup>
    </FormControl>
  );
};
