import { Logomark } from '#/components';
import { useRipple } from '#/hooks';
import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface AppNavSwitcherProps
  extends ComponentPropsWithoutRef<'button'> {
  /**
   * Will be displayed instead of the default Velcure logo.
   */
  logo?: React.ReactNode;
}

export const AppNavSwitcher = forwardRef<
  HTMLButtonElement,
  AppNavSwitcherProps
>((props, ref) => {
  const { className, logo, children, ...restProps } = props;

  const { getButtonProps, ripples } = useRipple();

  return (
    <button
      className={cn(
        'pe-1 flex items-center justify-center gap-2 text-navbar-foreground relative overflow-hidden rounded-md',
        className
      )}
      {...getButtonProps(restProps, ref)}
    >
      {ripples}
      {logo || <Logomark invert className="h-4 w-auto" />}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden md:block text-current h-5 w-5"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
      <ul className="group flex items-center relative m-0 p-0 list-none text-white">
        {children}
      </ul>
    </button>
  );
});

AppNavSwitcher.displayName = 'AppNavSwitcher';
