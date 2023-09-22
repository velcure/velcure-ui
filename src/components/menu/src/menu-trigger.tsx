import { Children, cloneElement } from 'react';
import { useMenuButton } from './use-menu';

export interface MenuTriggerProps {
  children: React.ReactNode;
}

export const MenuTrigger: React.FC<MenuTriggerProps> = (props) => {
  const { children, ...restProps } = props;
  // enforce a single child
  const child: any = Children.only(props.children);

  const buttonProps = useMenuButton(restProps);

  return cloneElement(child, buttonProps);
};
