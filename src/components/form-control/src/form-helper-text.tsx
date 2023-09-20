import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useFormControlContext } from './form-control';

export interface FormHelperTextProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * FormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const FormHelperText = forwardRef<HTMLDivElement, FormHelperTextProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    const field = useFormControlContext();

    return (
      <div
        className={cn(
          'text-muted-foreground text-sm mt-2 leading-none',
          className
        )}
        {...field.getHelpTextProps(restProps, ref)}
      />
    );
  }
);

FormHelperText.displayName = 'FormHelperText';
