import { Switch, SwitchProps } from '#/components/switch/src';
import { Collapse } from '#/components/transition/src';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { FormControl, FormControlBaseProps } from './form-control';

export type SwitchControlProps = FormControlBaseProps & {
  switchProps?: SwitchProps;
};

export const SwitchControl = forwardRef<HTMLInputElement, SwitchControlProps>(
  (props, ref) => {
    const { name, label, switchProps, children, ...rest } = props;

    const { field, formState, fieldState } = useController({
      name,
    });

    return (
      <fieldset className="flex flex-col space-y-4">
        <FormControl name={name} {...rest}>
          <Switch
            {...field}
            id={name}
            isInvalid={!!fieldState.error}
            isChecked={field.value}
            isDisabled={formState.isSubmitting}
            {...switchProps}
            ref={ref}
          >
            {label}
          </Switch>
        </FormControl>
        <Collapse in={field.value} className="ms-8">
          {children}
        </Collapse>
      </fieldset>
    );
  }
);

SwitchControl.displayName = 'SwitchControl';
