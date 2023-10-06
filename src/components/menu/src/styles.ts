import { cva } from 'class-variance-authority';

export const menuItemRootClasses = cva(
  [
    'cursor-pointer disabled:pointer-events-none disabled:opacity-40',
    'text-popover-foreground text-sm select-none no-underline flex w-full items-center text-start shrink-0 grow-0',
    'py-2 px-3 rounded-md text-start transition-colors  disabled:cursor-not-allowed',
    'focus:bg-accent focus:text-accent-foreground',
    'active:bg-accent active:text-accent-foreground',
    'hover:bg-accent hover:text-accent-foreground',
    'disabled:hover:bg-popover',
  ],
  {
    variants: {},
  }
);
