import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import React from 'react';
import { useAccordionItemContext } from './use-accordion';

export interface AccordionButtonProps extends HTMLVelcureProps<'button'> {}

/**
 * AccordionButton is used expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in a heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const AccordionButton = React.forwardRef<
  HTMLButtonElement,
  AccordionButtonProps
>((props, ref) => {
  const { className, children, ...restProps } = props;

  const { getButtonProps } = useAccordionItemContext();
  const buttonProps = getButtonProps(restProps, ref);

  return (
    <velcure.button
      className={cn(
        'flex w-full items-start justify-between text-start text-foreground',
        'font-medium px-4 py-2',
        className
      )}
      {...buttonProps}
    >
      {children}
    </velcure.button>
  );
});

AccordionButton.displayName = 'AccordionButton';
