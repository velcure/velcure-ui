import { Icon } from '#/components/icons/src';
import { PropsOf, cn } from '#/utilities';
import { useAccordionContext, useAccordionItemContext } from './use-accordion';

export type AccordionIconProps = PropsOf<typeof Icon>;

/**
 * AccordionIcon that gives a visual cue of the open/close state of the accordion item.
 * It rotates `180deg` based on the open/close state.
 */

export function AccordionIcon(props: AccordionIconProps) {
  const { className, ...restProps } = props;
  const { isOpen, isDisabled } = useAccordionItemContext();
  const { reduceMotion } = useAccordionContext();

  return (
    <Icon
      viewBox="0 0 24 24"
      aria-hidden
      className={cn(
        'origin-center text-sm',
        isOpen && '-rotate-180',
        !reduceMotion && 'transition-transform',
        isDisabled ? 'opacity-40' : 'opacity-100',
        className
      )}
      {...restProps}
      style={{
        transition: reduceMotion ? 'none' : 'transform 250ms ease',
        transform: isOpen ? 'rotate(180deg)' : undefined,
      }}
    >
      <path
        fill="currentColor"
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      />
    </Icon>
  );
}
