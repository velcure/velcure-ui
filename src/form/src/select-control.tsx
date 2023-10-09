import { Select, SelectProps } from '#/components/select/src';
import { useMergeRefs } from '#/hooks';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { FormControl, FormControlBaseProps } from './form-control';

export type SelectControlProps = FormControlBaseProps & {
  selectProps?: SelectProps;
};

export const SelectControl = forwardRef<HTMLInputElement, SelectControlProps>(
  (props, ref) => {
    const { name, label, selectProps, children, ...rest } = props;

    const { field, formState } = useController({
      name,
    });

    return (
      <FormControl name={name} label={label} {...rest}>
        <Select
          {...field}
          id={name}
          isDisabled={formState.isSubmitting}
          {...selectProps}
          ref={useMergeRefs(ref, field.ref)}
        >
          {children}
        </Select>
      </FormControl>
    );
  }
);

SelectControl.displayName = 'InputControl';
