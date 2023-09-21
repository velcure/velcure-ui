import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface PropertyLabelProps extends ComponentPropsWithoutRef<'dt'> {}

export const PropertyLabel = forwardRef<HTMLDListElement, PropertyLabelProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <dt
        ref={ref}
        className={cn(
          'text-sm font-medium leading-6',
          'flex flex-row text-accent-foreground',
          className
        )}
        {...restProps}
      />
    );
  }
);

PropertyLabel.displayName = 'PropertyLabel';
