import { HTMLVelcureProps, velcure } from '#/components/factory';
import { MaybeRenderProp, cn, runIfFn } from '#/utilities';
import React from 'react';
import {
  AccordionItemProvider,
  UseAccordionItemProps,
  useAccordionItem,
} from './use-accordion';

export interface AccordionItemProps
  extends Omit<
      HTMLVelcureProps<'div'>,
      keyof UseAccordionItemProps | 'children'
    >,
    UseAccordionItemProps {
  children?: MaybeRenderProp<{
    isExpanded: boolean;
    isDisabled: boolean;
  }>;
}

/**
 * AccordionItem is a single accordion that provides the open-close
 * behavior when the accordion button is clicked.
 *
 * It also provides context for the accordion button and panel.
 */
export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>((props, ref) => {
  const { children, className } = props;
  const { htmlProps, ...context } = useAccordionItem(props);

  const ctx = React.useMemo(() => context, [context]);

  return (
    <AccordionItemProvider value={ctx}>
      <velcure.div
        ref={ref}
        {...htmlProps}
        className={cn('block relative w-full', className)}
      >
        {runIfFn(children, {
          isExpanded: !!context.isOpen,
          isDisabled: !!context.isDisabled,
        })}
      </velcure.div>
    </AccordionItemProvider>
  );
});

AccordionItem.displayName = 'AccordionItem';
