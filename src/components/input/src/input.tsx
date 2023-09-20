import {
  FormControlOptions,
  useFormControl,
} from '#/components/form-control/src';
import { cn } from '#/utilities';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

const inputClass = cva(
  [
    'block w-full border-0 shadow-sm  leading-4 outline-none',
    'transition-colors',
    // placeholder
    'placeholder:text-muted-foreground',
    // focus
    'focus-visible:outline-none ring-1 focus:ring-2 ring-input ring-inset focus:ring-ring',
    // read-only
    'read-only:cursor-not-allowed read-only:opacity-70 read-only:bg-muted read-only:focus:ring-input',
    //disabled
    'disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-muted',
    // invalid
    'aria-invalid:ring-destructive aria-invalid:focus:ring-destructive',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 rounded-sm p-2 text-xs',
        sm: 'h-8 rounded-sm p-3 text-sm',
        md: 'h-10 py-2 px-4 rounded-md text-base',
        lg: 'h-12 p-4 rounded-md text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface InputOptions {
  /**
   * The native HTML `size` attribute to be passed to the `input`
   */
  htmlSize?: number;
}

type Omitted = 'disabled' | 'required' | 'readOnly' | 'size';

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, Omitted>,
    InputOptions,
    VariantProps<typeof inputClass>,
    FormControlOptions {}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { htmlSize, className, size, ...restProps } = props;

  const input = useFormControl<HTMLInputElement>(restProps);

  return (
    <input
      size={htmlSize}
      {...input}
      ref={ref}
      className={cn(
        inputClass({
          size,
        }),
        className
      )}
    />
  );
});

Input.displayName = 'Input';
