import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface PopoverFooterProps
  extends ComponentPropsWithoutRef<'footer'> {}

export const PopoverFooter = forwardRef<HTMLDivElement, PopoverFooterProps>(
  (props, ref) => {
    return (
      <footer
        {...props}
        ref={ref}
        className={cn('px-3 py-2 border-t border-border', props.className)}
      />
    );
  }
);

PopoverFooter.displayName = 'PopoverFooter';
