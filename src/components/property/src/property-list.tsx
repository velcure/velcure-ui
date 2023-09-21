import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface PropertyListProps extends ComponentPropsWithoutRef<'div'> {}

export const PropertyList = forwardRef<HTMLDivElement, PropertyListProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    return (
      <div
        ref={ref}
        role="list"
        className={cn('divide-y divide-muted', className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

PropertyList.displayName = 'PropertyList';
