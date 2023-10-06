import { useButtonType } from '#/components/button/src/use-button-type';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { mergeRefs } from '#/hooks';
import { cn, forwardRef } from '#/utilities';
import { MenuCommand } from './menu-command';
import { MenuIcon } from './menu-icon';
import { menuItemRootClasses } from './styles';
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
      className={cn(menuItemRootClasses(), className)}
      type={defaultType}
    >
      {icon && <MenuIcon className="text-sm me-3">{icon}</MenuIcon>}
      {_children}
      {command && <MenuCommand className="ms-3">{command}</MenuCommand>}
    </velcure.button>
  );
});

MenuItem.displayName = 'MenuItem';
