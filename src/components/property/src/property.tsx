import { cn } from '#/utilities';
import React, { forwardRef } from 'react';
import { PropertyLabel } from './property-label';
import { PropertyValue } from './property-value';

interface PropertyOptions {
  label?: React.ReactNode;
  value?: React.ReactNode;
}

export interface PropertyProps
  extends React.ComponentPropsWithoutRef<'dl'>,
    PropertyOptions {}

/**
 * Property is a component used to show key/value data in a consistent way.
 *
 * A **Property** can be used to format different kinds of data throughout your app.
 * It can be used in cards, lists, etc.
 */
export const Property = forwardRef<HTMLDListElement, PropertyProps>(
  (props, ref) => {
    const { children, className, label, value, ...restProps } = props;

    return (
      <dl
        ref={ref}
        className={cn(
          'min-w-0 grid sm:grid-cols-3 sm:gap-4 items-center',
          className
        )}
        {...restProps}
      >
        {label && <PropertyLabel>{label}</PropertyLabel>}
        {value && <PropertyValue>{value}</PropertyValue>}
        {children}
      </dl>
    );
  }
);

Property.displayName = 'Property';
