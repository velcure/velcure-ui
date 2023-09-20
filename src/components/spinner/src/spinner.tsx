import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

interface SpinnerOptions {}

export interface SpinnerProps
  extends Omit<ComponentPropsWithoutRef<'svg'>, keyof SpinnerOptions>,
    SpinnerOptions {}

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <svg
      ref={ref}
      className={cn('animate-spin h-5 w-5', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...restProps}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
});

Spinner.displayName = 'Spinner';
