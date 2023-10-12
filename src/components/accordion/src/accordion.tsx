import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import React from 'react';
import {
  AccordionDescendantsProvider,
  AccordionProvider,
  UseAccordionProps,
  useAccordion,
} from './use-accordion';

export interface AccordionProps
  extends UseAccordionProps,
    Omit<HTMLVelcureProps<'div'>, keyof UseAccordionProps> {
  /**
   * If `true`, height animation and transitions will be disabled.
   *
   * @default false
   */
  reduceMotion?: boolean;
}

/**
 * The wrapper that provides context and focus management
 * for all accordion items.
 *
 * It wraps all accordion items in a `div` for better grouping.
 * @see Docs https://chakra-ui.com/accordion
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const { children, reduceMotion, className, ...rest } = props;

    const { htmlProps, descendants, ...context } = useAccordion(rest);

    const ctx = React.useMemo(
      () => ({ ...context, reduceMotion: !!reduceMotion }),
      [context, reduceMotion]
    );

    return (
      <AccordionDescendantsProvider value={descendants}>
        <AccordionProvider value={ctx}>
          <velcure.div ref={ref} {...htmlProps} className={cn(className)}>
            {children}
          </velcure.div>
        </AccordionProvider>
      </AccordionDescendantsProvider>
    );
  }
);

Accordion.displayName = 'Accordion';
