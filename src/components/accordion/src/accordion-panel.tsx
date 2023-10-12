import { HTMLVelcureProps, velcure } from '#/components/factory';
import { Collapse, CollapseProps } from '#/components/transition/src';
import { cn } from '#/utilities';
import React from 'react';
import { useAccordionContext, useAccordionItemContext } from './use-accordion';

export interface AccordionPanelProps extends HTMLVelcureProps<'div'> {
  /**
   * The properties passed to the underlying `Collapse` component.
   */
  motionProps?: CollapseProps;
}

/**
 * Accordion panel that holds the content for each accordion.
 * It shows and hides based on the state login from the `AccordionItem`.
 *
 * It uses the `Collapse` component to animate its height.
 */
export const AccordionPanel = React.forwardRef<
  HTMLDivElement,
  AccordionPanelProps
>((props, ref) => {
  const { className, motionProps, ...rest } = props;

  const { reduceMotion } = useAccordionContext();
  const { getPanelProps, isOpen } = useAccordionItemContext();

  // remove `hidden` prop, 'coz we're using height animation
  const panelProps = getPanelProps(rest, ref);

  if (!reduceMotion) {
    delete panelProps.hidden;
  }

  const child = (
    <velcure.div {...panelProps} className={cn('px-4 py-2', className)} />
  );

  if (!reduceMotion) {
    return (
      <Collapse in={isOpen} {...motionProps}>
        {child}
      </Collapse>
    );
  }

  return child;
});

AccordionPanel.displayName = 'AccordionPanel';
