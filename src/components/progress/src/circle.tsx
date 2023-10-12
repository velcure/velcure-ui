import { HTMLVelcureProps, velcure } from '#/components/factory';
import React from 'react';

interface CircleProps extends HTMLVelcureProps<'circle'> {
  /**
   * @default false
   */
  isIndeterminate?: boolean;
}

export const Circle = React.forwardRef<SVGCircleElement, CircleProps>(
  (props, ref) => {
    return (
      <velcure.circle
        ref={ref}
        cx={50}
        cy={50}
        r={42}
        fill="transparent"
        viewBox="0 0 100 100"
        {...props}
      />
    );
  }
);

Circle.displayName = 'Circle';
