import { cn } from '#/utilities';
import { forwardRef } from 'react';
import { HTMLVelcureProps, velcure } from './factory';

export interface SquareProps extends HTMLVelcureProps<'div'> {}

export const Square = forwardRef<HTMLDivElement, SquareProps>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <velcure.div
      ref={ref}
      {...restProps}
      className={cn(
        'flex items-center justify-center shrink-0 grow-0',
        className
      )}
    />
  );
});

Square.displayName = 'Square';
