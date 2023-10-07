import { cn } from '#/utilities';
import { forwardRef } from 'react';
import { HTMLVelcureProps } from './factory';
import { Square } from './square';

export interface CircleProps extends HTMLVelcureProps<'div'> {}

export const Circle = forwardRef<HTMLDivElement, CircleProps>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <Square
      ref={ref}
      {...restProps}
      className={cn('rounded-full', className)}
    />
  );
});

Circle.displayName = 'Circle';
