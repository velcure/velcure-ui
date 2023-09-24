import { Drawer, DrawerBody, DrawerContent } from '#/components/modal/src';
import { mergeRefs, useDisclosure, useSize } from '#/hooks';
import { ComponentPropsWithoutRef, forwardRef, useRef } from 'react';
import { AppNavToggleButton } from './app-nav-toggle-button';

export interface AppNavProps extends ComponentPropsWithoutRef<'div'> {
  switcher?: React.ReactNode;
  account?: React.ReactNode;
  /**
   * Items that will be rendered on the bottom-right of the navbar.
   * Useful for separating other navigation items from main ones,
   * (e.g. separating "Settings" from all other navigation items).
   */
  secondary?: React.ReactNode;
}

export const AppNav = forwardRef<HTMLDivElement, AppNavProps>((props, ref) => {
  const { children, secondary, account, switcher, ...restProps } = props;

  const { isOpen, onToggle, onClose } = useDisclosure();

  const innerRef = useRef<HTMLDivElement>(null);

  const size = useSize(innerRef);

  return (
    <>
      <header ref={mergeRefs(innerRef, ref)} {...restProps}>
        <nav className="flex justify-center bg-navbar">
          <div className="flex justify-between w-full max-w-full p-2 sm:px-4 min-h-10">
            <div className="flex">{switcher}</div>
            <div className="flex gap-2 items-center">{account}</div>
          </div>
        </nav>
        <div className="flex md:justify-center bg-navbar min-h-10">
          <div className="hidden md:flex justify-between w-full max-w-full overflow-auto p-0 sm:px-1 py-1">
            <nav
              className="flex items-stretch space-x-1"
              aria-label="Main Navigation"
            >
              {children}
            </nav>
            {secondary && <div className="flex">{secondary}</div>}
          </div>
          <div className="flex md:hidden items-center justify-start p-2">
            <div className="text-white">
              <AppNavToggleButton
                isOpen={isOpen}
                onClick={() => onToggle()}
                aria-label="Toggle Menu"
              />
            </div>
          </div>
        </div>
      </header>
      <Drawer placement="left" isOpen={isOpen} onClose={() => onClose()}>
        <DrawerContent
          motionProps={{
            style: {
              marginTop: size?.height,
            },
          }}
        >
          <DrawerBody className="bg-navbar flex flex-col">
            <nav className="flex flex-col space-y-1">{children}</nav>
            {secondary && (
              <div className="flex flex-col space-y-1 mt-auto">{secondary}</div>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
});

AppNav.displayName = 'AppNav';
