import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '#/utilities';
import { usePopoverContext } from './popover-context';

export interface PopoverHeaderProps
  extends ComponentPropsWithoutRef<'header'> {}
/**
 * PopoverHeader is the accessible header or label
 * for the popover's content, and it is first announced by screenreaders.
 */

export const PopoverHeader = forwardRef<HTMLDivElement, PopoverHeaderProps>(
  (props, ref) => {
    const { getHeaderProps } = usePopoverContext();

    return (
      <header
        {...getHeaderProps(props, ref)}
        className={cn('px-3 py-2 border-b border-border', props.className)}
      />
    );
  }
);

PopoverHeader.displayName = 'PopoverHeader';
