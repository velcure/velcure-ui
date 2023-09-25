import { As } from '#/utilities';

export type AppNavBaseItem = {
  type: 'item' | 'group';
  title: string;
};

export interface AppNavItemType extends AppNavBaseItem {
  type: 'item';
  as?: As;
  icon?: React.ReactElement;
  isActive?: boolean;
  items?: AppNavItemType[];
  href?: string;
  to?: string;
  onClick?: () => void;
  count?: number;
}

export interface AppNavGroupType extends AppNavBaseItem {
  type: 'group';
}
