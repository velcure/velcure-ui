import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface PropertyValueProps extends ComponentPropsWithoutRef<'dd'> {}

export const PropertyValue = forwardRef<HTMLDListElement, PropertyValueProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <dd
        ref={ref}
        className={cn(
          'text-sm leading-6 text-accent-foreground',
          'flex flex-row items-center flex-1',
          'sm:col-span-2 mt-1 sm:mt-0',
          className
        )}
        {...restProps}
      />
    );
  }
);

PropertyValue.displayName = 'PropertyValue';
