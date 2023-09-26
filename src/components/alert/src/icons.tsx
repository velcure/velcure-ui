import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {}

export const CheckIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(
        'align-middle h-4 w-4 inline-block leading-4 shrink-0',
        className
      )}
      ref={ref}
      fill="none"
      stroke="currentColor"
      {...restProps}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
});

export const InfoIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(
        'align-middle h-4 w-4 inline-block leading-4 shrink-0',
        className
      )}
      ref={ref}
      {...restProps}
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
});

export const WarningIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn(
          'align-middle h-4 w-4 inline-block leading-4 shrink-0',
          className
        )}
        ref={ref}
        fill="none"
        stroke="currentColor"
        {...restProps}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    );
  }
);
