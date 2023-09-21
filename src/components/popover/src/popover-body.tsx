import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { usePopoverContext } from './popover-context';

export interface PopoverBodyProps extends ComponentPropsWithoutRef<'div'> {}
/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */

export const PopoverBody = forwardRef<HTMLDivElement, PopoverBodyProps>(
  function PopoverBody(props, ref) {
    const { getBodyProps } = usePopoverContext();

    return (
      <div
        {...getBodyProps(props, ref)}
        className={cn('px-3 py-2', props.className)}
      />
    );
  }
);

PopoverBody.displayName = 'PopoverBody';
