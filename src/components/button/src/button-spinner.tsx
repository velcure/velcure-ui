import { Spinner } from '#/components/spinner/src';
import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface ButtonSpinnerProps extends ComponentPropsWithoutRef<'div'> {
  label?: React.ReactNode;
  placement?: 'start' | 'end';
}

export const ButtonSpinner = forwardRef<HTMLDivElement, ButtonSpinnerProps>(
  (props, ref) => {
    const {
      children = <Spinner className="h-4 w-4 text-current" />,
      className,
      label,
      placement,
      ...restProps
    } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center text-base leading-normal',
          label ? 'relative' : 'absolute',
          label ? (placement === 'start' ? 'me-2' : 'ms-2') : '',
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

ButtonSpinner.displayName = 'ButtonSpinner';
