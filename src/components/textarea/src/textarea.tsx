import {
  FormControlOptions,
  useFormControl,
} from '#/components/form-control/src';
import { cn } from '#/utilities';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

const textareaClass = cva(
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
    'py-2 px-4 rounded-md text-base',
  ],
  {
    variants: {
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
      },
    },
  }
);

type Omitted = 'disabled' | 'required' | 'readOnly';
export interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<'textarea'>, Omitted>,
    FormControlOptions,
    VariantProps<typeof textareaClass> {}

/**
 * Textarea is used to enter an amount of text that's longer than a single line
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      className,
      rows,
      resize,
      id,
      onFocus,
      onBlur,
      isDisabled,
      isReadOnly,
      isRequired,
      isInvalid,
      ...restProps
    } = props;

    const textareaProps = useFormControl<HTMLTextAreaElement>({
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
      onBlur,
      onFocus,
      id,
    });

    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(textareaClass({ resize }), className)}
        {...textareaProps}
        {...restProps}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
