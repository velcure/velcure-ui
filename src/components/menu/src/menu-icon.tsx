import { cn } from '#/utilities';
import {
  Children,
  ComponentPropsWithoutRef,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react';

export interface MenuIconProps extends ComponentPropsWithoutRef<'span'> {}

export const MenuIcon = forwardRef<HTMLSpanElement, MenuIconProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    const child = Children.only(children);

    const clone = isValidElement(child)
      ? cloneElement<any>(child, {
          focusable: 'false',
          'aria-hidden': true,
          className: cn('chakra-menu__icon', child.props.className),
        })
      : null;

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex justify-center items-center shrink-0',
          className
        )}
        {...rest}
      >
        {clone}
      </span>
    );
  }
);

MenuIcon.displayName = 'MenuIcon';
