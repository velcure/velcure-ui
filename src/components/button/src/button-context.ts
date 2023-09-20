import { createContext } from '#/hooks/react-context';

export interface ButtonGroupContext {
  /**
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const [ButtonGroupProvider, useButtonGroup] =
  createContext<ButtonGroupContext>({
    strict: false,
    name: 'ButtonGroupContext',
  });
