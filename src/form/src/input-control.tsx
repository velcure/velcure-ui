import { Input, InputProps } from '#/components/input/src';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { FormControl, FormControlBaseProps } from './form-control';

export type InputControlProps = FormControlBaseProps & {
  inputProps?: InputProps;
};

export const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  (props, ref) => {
    const { name, label, inputProps, ...rest } = props;

    const { field, formState } = useController({
      name,
    });

    return (
      <FormControl name={name} label={label} {...rest}>
        <Input
          {...field}
          id={name}
          isDisabled={formState.isSubmitting}
          {...inputProps}
          ref={ref}
        />
      </FormControl>
    );
  }
);

InputControl.displayName = 'InputControl';
