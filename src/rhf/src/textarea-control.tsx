import { Textarea, TextareaProps } from '#/components/textarea/src';
import { useController } from '#/rhf';
import { forwardRef } from 'react';
import { FormControl, FormControlBaseProps } from './form-control';

export type TextareaControlProps = FormControlBaseProps & {
  textareaProps?: TextareaProps;
};

export const TextareaControl = forwardRef<
  HTMLTextAreaElement,
  TextareaControlProps
>((props, ref) => {
  const { name, label, textareaProps, ...rest } = props;

  const { field, formState } = useController({
    name,
  });

  return (
    <FormControl name={name} label={label} {...rest}>
      <Textarea
        {...field}
        id={name}
        isDisabled={formState.isSubmitting}
        {...textareaProps}
        ref={ref}
      />
    </FormControl>
  );
});

TextareaControl.displayName = 'TextareaControl';
