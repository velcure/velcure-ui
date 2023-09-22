import { MaybeRenderProp, runIfFn } from '#/utilities';
import { useMemo } from 'react';
import {
  MenuDescendantsProvider,
  MenuProvider,
  UseMenuProps,
  useMenu,
} from './use-menu';

export interface MenuProps extends UseMenuProps {
  children: MaybeRenderProp<{
    isOpen: boolean;
    onClose: () => void;
    forceUpdate: (() => void) | undefined;
  }>;
}

/**
 * Menu provides context, state, and focus management
 * to its sub-components. It doesn't render any DOM node.
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const { children, ...restProps } = props;

  const { descendants, ...ctx } = useMenu({ ...restProps });
  const context = useMemo(() => ctx, [ctx]);

  const { isOpen, onClose, forceUpdate } = context;

  return (
    <MenuDescendantsProvider value={descendants}>
      <MenuProvider value={context}>
        {runIfFn(children, { isOpen, onClose, forceUpdate })}
      </MenuProvider>
    </MenuDescendantsProvider>
  );
};

Menu.displayName = 'Menu';
