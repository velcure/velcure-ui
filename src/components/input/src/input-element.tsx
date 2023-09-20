import { cn } from '#/utilities';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

const inputElementClasses = cva(
  ['flex items-center justify-center absolute top-0 z-[2]'],
  {
    variants: {
      placement: {
        left: 'left-0',
        right: 'right-0',
      },
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'w-10 h-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      placement: 'left',
      size: 'md',
    },
  }
);

export interface InputElementProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'placement' | 'size'>,
    VariantProps<typeof inputElementClasses> {}

const InputElement = forwardRef<HTMLDivElement, InputElementProps>(
  (props, ref) => {
    const { className, placement, size, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(
          inputElementClasses({
            className,
            placement,
            size,
          })
        )}
        {...restProps}
      />
    );
  }
);

export type InputLeftElementProps = Omit<InputElementProps, 'placement'>;

export const InputLeftElement = forwardRef<
  HTMLDivElement,
  InputLeftElementProps
>((props, ref) => <InputElement ref={ref} placement="left" {...props} />);

InputLeftElement.displayName = 'InputLeftElement';

export type InputRightElementProps = Omit<InputElementProps, 'placement'>;

export const InputRightElement = forwardRef<
  HTMLDivElement,
  InputRightElementProps
>((props, ref) => <InputElement ref={ref} placement="right" {...props} />);
InputRightElement.displayName = 'InputRightElement';
