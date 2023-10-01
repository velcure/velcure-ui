import { callAll, cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { usePopoverContext } from './popover-context';
import {
  PopoverTransition,
  PopoverTransitionProps,
} from './popover-transition';

export interface PopoverContentProps extends PopoverTransitionProps {
  rootProps?: ComponentPropsWithoutRef<'div'>;
  motionProps?: ComponentPropsWithoutRef<'section'>;
  children?: React.ReactNode;
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(props, ref) {
    const { rootProps, motionProps, ...contentProps } = props;

    const { getPopoverProps, getPopoverPositionerProps, onAnimationComplete } =
      usePopoverContext();

    return (
      <div {...getPopoverPositionerProps(rootProps)} className="z-10">
        <PopoverTransition
          {...motionProps}
          {...getPopoverProps(contentProps, ref)}
          onAnimationComplete={callAll(
            onAnimationComplete,
            contentProps.onAnimationComplete
          )}
          className={cn(
            'relative flex flex-col',
            'rounded-md  bg-popover text-popover-foreground shadow-md',
            'outline-none',
            'z-inherit focus-visible:outline-none',
            props.className
          )}
        />
      </div>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';
