import { Portal, PortalProps } from '#/components/portal/src';
import { cn, omit, pick } from '#/utilities';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import {
  Children,
  ComponentPropsWithoutRef,
  cloneElement,
  forwardRef,
} from 'react';
import { scale } from './tooltip.transition';
import { UseTooltipProps, useTooltip } from './use-tooltip';

export interface TooltipProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'content'>,
    UseTooltipProps {
  /**
   * The React component to use as the
   * trigger for the tooltip
   */
  children: React.ReactNode;
  /**
   * The label of the tooltip
   */
  content?: React.ReactNode;
  /**
   * The accessible, human friendly label to use for
   * screen readers.
   *
   * If passed, tooltip will show the content `label`
   * but expose only `aria-label` to assistive technologies
   */
  'aria-label'?: string;
  /**
   * If `true`, the tooltip will wrap its children
   * in a `<span/>` with `tabIndex=0`
   * @default false
   */
  shouldWrapChildren?: boolean;
  /**
   * If `true`, the tooltip will show an arrow tip
   * @default false
   */
  hasArrow?: boolean;
  /**
   * Props to be forwarded to the portal component
   */
  portalProps?: Pick<PortalProps, 'appendToParentPortal' | 'containerRef'>;
  motionProps?: HTMLMotionProps<'div'>;
}

const MotionDiv = motion.div;

/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/docs/overlay/tooltip
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => {
    const {
      children,
      content,
      shouldWrapChildren,
      'aria-label': ariaLabel,
      hasArrow,
      portalProps,
      motionProps,
      ...rest
    } = props;

    const tooltip = useTooltip({ ...rest });

    const shouldWrap = typeof children === 'string' || shouldWrapChildren;

    let trigger: React.ReactElement;

    if (shouldWrap) {
      trigger = (
        <span
          className="inline-block"
          tabIndex={0}
          {...tooltip.getTriggerProps()}
        >
          {children}
        </span>
      );
    } else {
      /**
       * Ensure tooltip has only one child node
       */
      const child = Children.only(children) as React.ReactElement & {
        ref?: React.Ref<any>;
      };
      trigger = cloneElement(
        child,
        tooltip.getTriggerProps(child.props, child.ref)
      );
    }

    const hasAriaLabel = !!ariaLabel;

    const _tooltipProps = tooltip.getTooltipProps(
      {
        ['--popper-arrow-bg' as string]: 'tomato',
      },
      ref
    );

    const tooltipProps = hasAriaLabel
      ? omit(_tooltipProps, ['role', 'id'])
      : _tooltipProps;

    const srOnlyProps = pick(_tooltipProps, ['role', 'id']);

    /**
     * If the `label` is empty, there's no point showing the tooltip.
     * Let's simply return the children
     */
    if (!content) {
      return <>{children}</>;
    }

    return (
      <>
        {trigger}
        <AnimatePresence>
          {tooltip.isOpen && (
            <Portal {...portalProps}>
              <div
                {...tooltip.getTooltipPositionerProps()}
                className="z-tooltip pointer-events-none"
              >
                <MotionDiv
                  variants={scale}
                  initial="exit"
                  animate="enter"
                  exit="exit"
                  {...motionProps}
                  {...(tooltipProps as any)}
                  className={cn(
                    'py-1.5 px-3 rounded-lg break-words whitespace-normal',
                    'font-medium text-sm shadow-md max-w-xs z-tooltip',
                    'bg-tooltip text-tooltip-foreground'
                  )}
                >
                  {content}
                  {hasAriaLabel && (
                    <span className="sr-only" {...srOnlyProps}>
                      {ariaLabel}
                    </span>
                  )}
                  {hasArrow && (
                    <div data-popper-arrow>
                      <div data-popper-arrow-inner className="!bg-tooltip" />
                    </div>
                  )}
                </MotionDiv>
              </div>
            </Portal>
          )}
        </AnimatePresence>
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';
