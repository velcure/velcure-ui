import { cn } from '#/utilities';
import React, { cloneElement, forwardRef, isValidElement } from 'react';

export interface EmptyStateIconProps
  extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The icon to be used in the empty state icon.
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
}

export const EmptyStateIcon = forwardRef<HTMLDivElement, EmptyStateIconProps>(
  (props, ref) => {
    const { className, icon, children, ...rest } = props;

    /**
     * Passing the icon as prop or children should work
     */
    const element = icon || children;
    const _children = isValidElement(element)
      ? cloneElement(element as any, {
          'aria-hidden': true,
          focusable: false,
          className: cn(
            'w-full h-full text-current',
            (element as any).props?.className
          ),
        })
      : null;

    return (
      <div
        ref={ref}
        className={cn(
          'h-16 w-16 inline-block shrink- p-4 bg-muted text-muted-foreground rounded-full',
          className
        )}
        {...rest}
      >
        {_children}
      </div>
    );
  }
);

EmptyStateIcon.displayName = 'EmptyStateIcon';
