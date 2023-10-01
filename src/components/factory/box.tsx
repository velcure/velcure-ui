import { forwardRef } from 'react';
import { HTMLVelcureProps, velcure } from './factory';

export interface BoxProps extends HTMLVelcureProps<'div'> {}

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <velcure.div ref={ref} {...props} />;
});
