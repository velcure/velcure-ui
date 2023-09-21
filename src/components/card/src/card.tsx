import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export type CardOptions = {};

export interface CardProps
  extends ComponentPropsWithoutRef<'div'>,
    CardOptions {}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex flex-col bg-clip-border sm:rounded-lg bg-card sm:shadow text-card-foreground border',
        className
      )}
      {...restProps}
    />
  );
});

Card.displayName = 'Card';
