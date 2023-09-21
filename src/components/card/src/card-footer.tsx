import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface CardFooterProps extends ComponentPropsWithoutRef<'div'> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return <div ref={ref} className={cn('p-6', className)} {...restProps} />;
  }
);

CardFooter.displayName = 'CardFooter';
