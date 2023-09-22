import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import {
  Children,
  ComponentPropsWithoutRef,
  cloneElement,
  forwardRef,
} from 'react';
import { MenuCommand } from './menu-command';
import { MenuIcon } from './menu-icon';
import { UseMenuItemProps, useMenuItem } from './use-menu';

interface MenuItemOptions
  extends Pick<
    UseMenuItemProps,
    'isDisabled' | 'isFocusable' | 'closeOnSelect'
  > {
  /**
   * The icon to render before the menu item's label.
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
  /**
   * Right-aligned label text content, useful for displaying hotkeys.
   */
  command?: string;
  /**
   * asChild will copy the props of the MenuItem to the child element.
   * This is useful for when you want to render a Link or other component
   */
  asChild?: boolean;
}

/**
 * Use prop `isDisabled` instead
 */
type IsDisabledProps = 'disabled' | 'aria-disabled';
type HTMLAttributes = React.HTMLAttributes<HTMLElement>;

export interface MenuItemProps
  extends Omit<ComponentPropsWithoutRef<'button'>, IsDisabledProps>,
    MenuItemOptions {}

const classes = cva(
  [
    'cursor-pointer disabled:pointer-events-none disabled:opacity-40',
    'text-popover-foreground text-sm select-none no-underline flex w-full items-center text-start shrink-0 grow-0',
    'py-2 px-3 rounded-md text-start transition-colors  disabled:cursor-not-allowed',
    'focus:bg-accent focus:text-accent-foreground',
    'active:bg-accent active:text-accent-foreground',
    'hover:bg-accent hover:text-accent-foreground',
    'disabled:hover:bg-popover',
  ],
  {
    variants: {},
  }
);

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  (props, ref) => {
    const {
      icon,
      //iconSpacing = '0.75rem',
      command,
      className,
      children,
      asChild,
      ...rest
    } = props;

    const menuitemProps = useMenuItem(rest, ref) as HTMLAttributes;

    const shouldWrap = icon || command;

    const _children = shouldWrap ? (
      <span className="flex-1 pointer-events-none">{children}</span>
    ) : (
      children
    );

    if (asChild) {
      const child: any = Children.only(children);
      return cloneElement(
        child,
        {
          ...menuitemProps,
          className: cn(classes(), child.props.className),
        },
        <>
          {icon && <MenuIcon className="text-sm me-3">{icon}</MenuIcon>}
          {_children}
          {command && <MenuCommand className="ms-3">{command}</MenuCommand>}
        </>
      );
    }

    return (
      <button
        {...menuitemProps}
        className={cn(classes(), className)}
        type="button"
      >
        {icon && <MenuIcon className="text-sm me-3">{icon}</MenuIcon>}
        {_children}
        {command && <MenuCommand className="ms-3">{command}</MenuCommand>}
      </button>
    );
  }
);

MenuItem.displayName = 'MenuItem';
