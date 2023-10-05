import { useButtonType } from '#/components/button/src/use-button-type';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { mergeRefs } from '#/hooks';
import { cn, forwardRef } from '#/utilities';
import { cva } from 'class-variance-authority';
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
}

/**
 * Use prop `isDisabled` instead
 */
type IsDisabledProps = 'disabled' | 'aria-disabled';
type HTMLAttributes = React.HTMLAttributes<HTMLElement>;

export interface MenuItemProps
  extends Omit<HTMLVelcureProps<'button'>, IsDisabledProps>,
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

export const MenuItem = forwardRef<MenuItemProps, 'button'>((props, ref) => {
  const { icon, command, className, children, ...rest } = props;

  const menuitemProps = useMenuItem(rest, ref) as HTMLAttributes;

  const shouldWrap = icon || command;

  const _children = shouldWrap ? (
    <span className="flex-1 pointer-events-none">{children}</span>
  ) : (
    children
  );

  const { ref: _ref, type: defaultType } = useButtonType(rest.as);

  return (
    <velcure.button
      {...menuitemProps}
      ref={mergeRefs(ref, _ref)}
      className={cn(classes(), className)}
      type={defaultType}
    >
      {icon && <MenuIcon className="text-sm me-3">{icon}</MenuIcon>}
      {_children}
      {command && <MenuCommand className="ms-3">{command}</MenuCommand>}
    </velcure.button>
  );
});

MenuItem.displayName = 'MenuItem';
