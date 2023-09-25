import { cn } from '#/utilities';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface AppNavSwitcherItemProps
  extends ComponentPropsWithoutRef<'li'>,
    VariantProps<typeof classes> {}

const classes = cva(
  [
    'relative items-center justify-center inline-flex m-0 min-w-0 h-6',
    'px-2 transition-colors whitespace-nowrap text-xs rounded-lg',
    'bg-gray-800 group-hover:bg-gray-700',
    'first:min-w-6',
    '[&:not(:first-child)]:nav-switcher-clip [&:not(:first-child)]:z-[1] [&:not(:first-child)]:-left-2 [&:not(:first-child)]:pl-4',
  ],
  {
    variants: {
      isCircle: {
        true: 'rounded-full p-0 flex justify-center text-xs w-6 uppercase',
        false: '',
      },
    },
    defaultVariants: {
      isCircle: false,
    },
  }
);

export const AppNavSwitcherItem = forwardRef<
  HTMLLIElement,
  AppNavSwitcherItemProps
>((props, ref) => {
  const { className, isCircle, children, ...rest } = props;

  return (
    <li ref={ref} {...rest} className={cn(classes({ isCircle }), className)}>
      <div className="flex h-full items-center justify-center">{children}</div>
    </li>
  );
});

AppNavSwitcherItem.displayName = 'AppNavSwitcherItem';
