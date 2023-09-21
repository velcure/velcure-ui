import { cn } from '#/utilities';
import React, { forwardRef } from 'react';

export interface CardHeaderProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return <div ref={ref} className={cn('p-6', className)} {...restProps} />;
  }
);

CardHeader.displayName = 'CardHeader';
