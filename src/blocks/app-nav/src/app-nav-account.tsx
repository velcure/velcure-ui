import {
  Avatar,
  AvatarProps,
  Menu,
  MenuItem,
  MenuList,
  MenuTrigger,
} from '#/components';
import React from 'react';
import { NavItemProvider } from './app-nav-item';
import { AppNavItemType } from './app-nav.types';

type PickedAvatar =
  | 'name'
  | 'icon'
  | 'loading'
  | 'iconLabel'
  | 'src'
  | 'srcSet';

export interface AppNavAccountProps extends Pick<AvatarProps, PickedAvatar> {
  items?: Omit<AppNavItemType, 'type'>[];
  children?: React.ReactNode;
}

export const AppNavAccount: React.FC<AppNavAccountProps> = (props) => {
  const { items, children, ...avatarProps } = props;
  return (
    <NavItemProvider value={{ isMenu: true }}>
      <Menu gutter={4}>
        <MenuTrigger>
          <Avatar {...avatarProps} role="button" size="sm"></Avatar>
        </MenuTrigger>
        <MenuList>
          {items?.map(({ title, ...rest }) => (
            <MenuItem key={title} {...rest}>
              {title}
            </MenuItem>
          ))}
          {children}
        </MenuList>
      </Menu>
    </NavItemProvider>
  );
};

AppNavAccount.displayName = 'AppNavAccount';
