import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useFormControlContext } from './form-control';

export interface RequiredIndicatorProps
  extends ComponentPropsWithoutRef<'span'> {}

export const RequiredIndicator = forwardRef<
  HTMLSpanElement,
  RequiredIndicatorProps
>((props, ref) => {
  const { className, ...restProps } = props;
  const field = useFormControlContext();

  if (!field?.isRequired) return null;

  return (
    <span
      {...field?.getRequiredIndicatorProps(restProps, ref)}
      className={cn('ms-1 text-destructive', className)}
    />
  );
});

RequiredIndicator.displayName = 'RequiredIndicator';
