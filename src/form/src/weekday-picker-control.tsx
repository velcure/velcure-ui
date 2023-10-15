import { WeekdayPicker, WeekdayPickerProps } from '#/components';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { FormControl, FormControlBaseProps } from './form-control';

export type WeekdayPickerControlProps = FormControlBaseProps & {
  inputProps?: WeekdayPickerProps;
};

export const WeekdayPickerControl = forwardRef<
  HTMLInputElement,
  WeekdayPickerControlProps
>((props, ref) => {
  const { name, label, inputProps, ...rest } = props;

  const { field, formState } = useController({
    name,
  });

  return (
    <FormControl name={name} label={label} {...rest}>
      <div className="max-w-max">
        <WeekdayPicker
          {...field}
          id={name}
          isDisabled={formState.isSubmitting}
          {...inputProps}
          ref={ref}
        />
      </div>
    </FormControl>
  );
});

WeekdayPickerControl.displayName = 'WeekdayPickerControl';
