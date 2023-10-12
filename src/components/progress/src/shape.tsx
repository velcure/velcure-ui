import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import React from 'react';

interface ShapeProps extends HTMLVelcureProps<'svg'> {
  /**
   * @default false
   */
  isIndeterminate?: boolean;
}

export const Shape = React.forwardRef<SVGSVGElement, ShapeProps>(
  (props, ref) => {
    const { isIndeterminate, className, ...restProps } = props;

    return (
      <velcure.svg
        ref={ref}
        viewBox="0 0 100 100"
        className={cn('w-full h-full', className)}
        {...restProps}
      />
    );
  }
);

Shape.displayName = 'Shape';
