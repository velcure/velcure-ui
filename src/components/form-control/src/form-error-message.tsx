import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useFormControlContext } from './form-control';

export interface FormErrorMessageProps
  extends ComponentPropsWithoutRef<'div'> {}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FormErrorMessage = forwardRef<
  HTMLDivElement,
  FormErrorMessageProps
>((props, ref) => {
  const { className, ...ownProps } = props;
  const field = useFormControlContext();

  if (!field?.isInvalid) return null;

  return (
    <div
      {...field?.getErrorMessageProps(ownProps, ref)}
      className={cn(
        'flex items-center text-sm text-destructive mt-2 leading-none',
        className
      )}
    />
  );
});

FormErrorMessage.displayName = 'FormErrorMessage';
