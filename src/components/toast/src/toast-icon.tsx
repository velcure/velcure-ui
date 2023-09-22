import { Spinner } from '#/components/spinner/src';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { CheckIcon, InfoIcon, WarningIcon } from './icons';
import { ToastStatus } from './toast.types';

export interface ToastIconProps extends ComponentPropsWithoutRef<'span'> {
  status: ToastStatus;
}

const getStatusIcon = (status: ToastStatus) => {
  switch (status) {
    case 'default':
    case 'info':
      return InfoIcon;
    case 'warning':
      return WarningIcon;
    case 'success':
      return CheckIcon;
    case 'error':
      return WarningIcon;
    case 'loading':
      return Spinner;
  }
};

const classes = cva('h-5 w-5', {
  variants: {
    status: {
      default: 'text-primary',
      info: 'text-informative',
      warning: 'text-warning',
      success: 'text-success',
      error: 'text-destructive',
      loading: 'text-primary',
    },
  },
});

export const ToastIcon = forwardRef<HTMLSpanElement, ToastIconProps>(
  (props, ref) => {
    const { className, status, ...rest } = props;
    const BaseIcon = getStatusIcon(status);

    return (
      <span
        className={cn('shrink-0', className)}
        data-status={status}
        ref={ref}
        {...rest}
      >
        {props.children || <BaseIcon className={classes({ status })} />}
      </span>
    );
  }
);

ToastIcon.displayName = 'ToastIcon';
