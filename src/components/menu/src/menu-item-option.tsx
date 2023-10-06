import { velcure } from '#/components/factory';
import { CheckIcon } from '#/components/icons/src';
import { cn } from '#/utilities';
import { HTMLAttributes, ReactElement, forwardRef } from 'react';
import { MenuIcon } from './menu-icon';
import { MenuItemProps } from './menu-item';
import { menuItemRootClasses } from './styles';
import { UseMenuOptionOptions, useMenuOption } from './use-menu';

export interface MenuItemOptionProps
  extends UseMenuOptionOptions,
    Omit<MenuItemProps, keyof UseMenuOptionOptions | 'icon'> {
  /**
   * @type React.ReactElement
   */
  icon?: ReactElement | null;
}

export const MenuItemOption = forwardRef<
  HTMLButtonElement,
  MenuItemOptionProps
>((props, ref) => {
  const { icon, className, ...restProps } = props;
  const optionProps = useMenuOption(
    restProps,
    ref
  ) as HTMLAttributes<HTMLElement>;

  console.log(optionProps);

  return (
    <velcure.button
      {...optionProps}
      className={cn(menuItemRootClasses(), className)}
    >
      {icon !== null && (
        <MenuIcon
          className={cn('me-3', props.isChecked ? 'opacity-100' : 'opacity-0')}
        >
          {icon || <CheckIcon />}
        </MenuIcon>
      )}
      <span style={{ flex: 1 }}>{optionProps.children}</span>
    </velcure.button>
  );
});

MenuItemOption.displayName = 'MenuItemOption';
