import { Menu, MenuItem, MenuList, MenuTrigger } from '#/components';
import { createContext, useDisclosure } from '#/hooks';
import { cn, forwardRef } from '#/utilities';
import { cva } from 'class-variance-authority';
import { Variants, motion } from 'framer-motion';
import { useMemo } from 'react';
import { AppNavItemType } from './app-nav.types';

export interface AppNavItemProps extends Omit<AppNavItemType, 'type'> {
  children?: React.ReactNode;
}

interface NavItemContextValue {
  // Determin if the item is within a menu
  isMenu: boolean;
}

const [NavItemProvider, useNavItemContext] = createContext<NavItemContextValue>(
  {
    strict: false,
    defaultValue: {
      isMenu: false,
    },
    name: 'NavItemContext',
    errorMessage:
      'useNavItemContext: `context` is undefined. Seems you forgot to wrap the component in `<AppNav />`',
  }
);

export { NavItemProvider };

const variants: Variants = {
  open: {
    rotate: 180,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  closed: {
    rotate: 0,
    transition: {
      duration: 0.1,
      easings: 'easeOut',
    },
  },
};

const classes = cva(
  [
    // base
    'flex md:justify-center items-center px-3 py-2 transition-colors',
    // sm
    'w-full',
    // md+
    'md:w-auto text-xs rounded-md',
    // colors
    'text-navbar-foreground hover:text-navbar-foreground-hover hover:bg-gray-700',
    // react-router current
    "[&[aria-current='page']]:bg-gray-800 [&[aria-current='page']]:text-white",
  ],
  {
    variants: {
      isActive: {
        true: ['bg-gray-800 text-white'],
      },
    },
  }
);

export const AppNavItem = forwardRef<AppNavItemProps, 'button'>(
  (props, ref) => {
    const {
      title,
      className,
      as: As = 'button',
      icon,
      isActive,
      items,
      children,
      ...restProps
    } = props;

    const isNavbarItemMenu = useMemo(() => {
      // has either items with a minimum length of 1 or children,

      return (items && items?.length > 0) || children;
    }, [items, children]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isMenu } = useNavItemContext();

    const content = isMenu ? (
      <MenuItem icon={icon} as={As} {...restProps}>
        {title}
      </MenuItem>
    ) : (
      <As
        ref={ref}
        className={cn(classes({ isActive }), className)}
        {...restProps}
      >
        {icon && <div className="h-4 w-4 me-1 flex items-center">{icon}</div>}
        <span>{title}</span>
        {isNavbarItemMenu && (
          <motion.div
            className="ms-1 h-4 w-4"
            variants={variants}
            animate={isOpen ? 'open' : 'closed'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        )}
      </As>
    );

    if (isNavbarItemMenu) {
      return (
        <NavItemProvider
          value={{
            isMenu: true,
          }}
        >
          <Menu onOpen={onOpen} onClose={onClose} isOpen={isOpen} gutter={4}>
            <MenuTrigger>{content}</MenuTrigger>
            <MenuList>{children}</MenuList>
          </Menu>
        </NavItemProvider>
      );
    }

    return (
      <NavItemProvider
        value={{
          isMenu: false,
        }}
      >
        {content}
      </NavItemProvider>
    );
  }
);

AppNavItem.displayName = 'AppNavItem';
