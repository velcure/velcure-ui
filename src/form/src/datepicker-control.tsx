import { Datepicker, DatepickerProps } from '#/components/datepicker/src';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { FormControl, FormControlBaseProps } from './form-control';

export type DatepickerControlProps = FormControlBaseProps & {
  inputProps?: DatepickerProps;
};

export const DatepickerControl = forwardRef<
  HTMLInputElement,
  DatepickerControlProps
>((props, ref) => {
  const { name, label, inputProps, ...rest } = props;

  const { field, formState } = useController({
    name,
  });

  return (
    <FormControl name={name} label={label} {...rest}>
      <Datepicker
        {...field}
        isDisabled={formState.isSubmitting}
        {...inputProps}
        ref={ref}
      />
    </FormControl>
  );
});

DatepickerControl.displayName = 'DatepickerControl';
