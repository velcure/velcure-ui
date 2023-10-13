import { TimeInput, TimeInputProps } from '#/components';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { FormControl, FormControlBaseProps } from './form-control';

export type TimeInputControlProps = FormControlBaseProps & {
  inputProps?: TimeInputProps;
};

export const TimeInputControl = forwardRef<
  HTMLInputElement,
  TimeInputControlProps
>((props, ref) => {
  const { name, label, inputProps, ...rest } = props;

  const { field, formState } = useController({
    name,
  });

  return (
    <FormControl name={name} label={label} {...rest}>
      <TimeInput
        {...field}
        onValueChange={field.onChange}
        id={name}
        isDisabled={formState.isSubmitting}
        {...inputProps}
        ref={ref}
      />
    </FormControl>
  );
});

TimeInputControl.displayName = 'TimeInputControl';
