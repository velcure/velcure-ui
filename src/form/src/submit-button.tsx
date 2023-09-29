import { Button, ButtonProps } from '#/components';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

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
