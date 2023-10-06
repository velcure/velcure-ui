import { forwardRef } from 'react';
import { MenuGroup, MenuGroupProps } from './menu-group';
import { UseMenuOptionGroupProps, useMenuOptionGroup } from './use-menu';

export interface MenuOptionGroupProps
  extends UseMenuOptionGroupProps,
    Omit<MenuGroupProps, 'value' | 'defaultValue' | 'onChange'> {}

export const MenuOptionGroup = forwardRef<HTMLDivElement, MenuOptionGroupProps>(
  (props, ref) => {
    const ownProps = useMenuOptionGroup(props);

    return <MenuGroup ref={ref} {...ownProps} />;
  }
);

MenuOptionGroup.displayName = 'MenuOptionGroup';
