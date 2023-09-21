import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface AlertContentProps extends ComponentPropsWithoutRef<'div'> {}

export const AlertContent = forwardRef<HTMLDivElement, AlertContentProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return <div className={cn('ml-3 flex-1', className)} ref={ref} {...rest} />;
  }
);

AlertContent.displayName = 'AlertContent';
