import { Input, InputProps } from '#/components/input/src';
import { useController } from '#/rhf';
import { forwardRef } from 'react';
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
