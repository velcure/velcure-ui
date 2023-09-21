import { Spinner } from '#/components/spinner/src';
import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { AlertStatus, useAlertContext } from './alert-context';
import { CheckIcon, InfoIcon, WarningIcon } from './icons';

export interface AlertIconProps extends ComponentPropsWithoutRef<'span'> {}

const getStatusIcon = (status: AlertStatus) => {
  switch (status) {
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

export const AlertIcon = forwardRef<HTMLSpanElement, AlertIconProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    const { status } = useAlertContext();
    const BaseIcon = getStatusIcon(status);

    return (
      <span
        className={cn('shrink-0', className)}
        data-status={status}
        ref={ref}
        {...rest}
      >
        {props.children || <BaseIcon className="h-5 w-5" />}
      </span>
    );
  }
);

AlertIcon.displayName = 'AlertIcon';
