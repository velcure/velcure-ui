import { Button, ButtonProps } from '#/components/button/src';
import { useFormContext } from '#/rhf';
import { forwardRef } from 'react';

export type SubmitButtonProps = ButtonProps;

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (props, ref) => {
    const methods = useFormContext();

    const isLoading =
      methods.formState.isLoading || methods.formState.isSubmitting;

    return <Button type="submit" isLoading={isLoading} {...props} ref={ref} />;
  }
);

SubmitButton.displayName = 'SubmitButton';
