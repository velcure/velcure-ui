import { NumberInput, NumberInputProps } from '#/components/number-input/src';
import { useMergeRefs } from '#/hooks';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { FormControl, FormControlBaseProps } from './form-control';

export type NumberInputControlProps = FormControlBaseProps & {
  numberInputProps?: NumberInputProps;
};

export const NumberInputControl = forwardRef<
  HTMLDivElement,
  NumberInputControlProps
>((props, ref) => {
  const { name, label, numberInputProps, ...rest } = props;

  const { field, formState } = useController({
    name,
  });

  return (
    <FormControl name={name} label={label} {...rest}>
      <NumberInput
        {...field}
        ref={useMergeRefs(ref, field.ref)}
        isInvalid={formState.errors[name] !== undefined}
        isDisabled={formState.isSubmitting}
        allowMouseWheel
        {...numberInputProps}
      />
    </FormControl>
  );
});

NumberInputControl.displayName = 'NumberInputControl';
