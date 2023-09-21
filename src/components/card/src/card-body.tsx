import { cn } from '#/utilities';
import React, { forwardRef } from 'react';

export interface CardBodyProps extends React.ComponentPropsWithoutRef<'div'> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div ref={ref} className={cn('p-6 flex-1', className)} {...restProps} />
    );
  }
);

CardBody.displayName = 'CardBody';
