import { cn } from '#/utilities/shared-utils';
import {
  ComponentPropsWithoutRef,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react';

export const ButtonIcon = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>((props, ref) => {
  const { className, children, ...restProps } = props;

  const _children = isValidElement(children)
    ? cloneElement<any>(children, {
        'aria-hidden': true,
        focusable: false,
      })
    : children;

  return (
    <span
      ref={ref}
      className={cn('inline-flex self-center shrink-0', className)}
      {...restProps}
    >
      {_children}
    </span>
  );
});

ButtonIcon.displayName = 'ButtonIcon';
