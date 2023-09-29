import {
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  FormControl as VelcureFormControl,
} from '#/components/form-control/src';
import { FormErrorMessageProps } from '#/components/form-control/src/form-error-message';
import { useController } from 'react-hook-form';
import { useFormContext } from './form';

export interface FormControlBaseProps extends Omit<FormControlProps, 'label'> {
  name: string;
  label?: React.ReactNode;
  labelProps?: FormLabelProps;
  helperText?: React.ReactNode;
  helperTextProps?: FormHelperTextProps;
  errorMessageProps?: FormErrorMessageProps;
}

export const FormControl: React.FC<FormControlBaseProps> = (props) => {
  const {
    children,
    name,
    label,
    labelProps,
    helperText,
    helperTextProps,
    errorMessageProps,
    ...restProps
  } = props;

  const { fieldState } = useController({
    name,
  });

  return (
    <VelcureFormControl
      isInvalid={fieldState.invalid || !!fieldState.error}
      {...restProps}
    >
      {label && typeof label === 'string' ? (
        <FormLabel htmlFor={name} {...labelProps}>
          {label}
        </FormLabel>
      ) : (
        label
      )}
      {children}
      <ErrorMessage name={name} />
      {helperText && typeof helperText === 'string' ? (
        <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>
      ) : (
        helperText
      )}
    </VelcureFormControl>
  );
};

interface ErrorMessage extends FormErrorMessageProps {
  name: string;
}

const ErrorMessage: React.FC<ErrorMessage> = ({ name, ...restProps }) => {
  const ctx = useFormContext();

  const {
    fieldState: { error },
  } = useController({
    name,
  });

  if (!error) return null;

  return (
    <FormErrorMessage {...restProps}>
      {error ? <div>{ctx.errorResolver(error)}</div> : null}
    </FormErrorMessage>
  );
};
