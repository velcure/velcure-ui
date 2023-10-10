import { IconButton } from '#/components/button/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { XMarkIcon } from '#/components/icons/src';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import React from 'react';

export type ChipVariant = 'filled' | 'gradient' | 'outlined' | 'ghost';
export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipColor = 'primary' | 'green' | 'red';

interface ChipOptions {
  /**
   * @default 'primary'
   */
  variant?: ChipVariant;
  /**
   * @default 'md'
   */
  size?: ChipSize;
  /**
   * Icon placed before the text
   */
  icon?: React.ReactElement;
  color?: ChipColor;
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ChipProps
  extends Omit<HTMLVelcureProps<'div'>, keyof ChipOptions>,
    ChipOptions {}

const containerClass = cva(
  [
    'relative flex items-center gap-1 font-sans font-bold uppercase truncate select-none',
  ],
  {
    variants: {
      size: {
        sm: 'py-1 px-2 text-xs rounded-md',
        md: 'py-1.5 px-3 text-xs rounded-lg',
        lg: 'py-2 px-4 text-xs rounded-lg',
      },
      variant: {
        filled: '',
        gradient: '',
        outlined: '',
        ghost: '',
      },
      color: {
        primary: '',
        green: '',
        red: '',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
      variant: 'filled',
    },
    compoundVariants: [
      // primary
      {
        variant: 'filled',
        color: 'primary',
        className: 'bg-primary text-primary-foreground',
      },
      {
        variant: 'gradient',
        color: 'primary',
        className:
          'bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground',
      },
      {
        variant: 'outlined',
        color: 'primary',
        className: 'border border-primary text-primary',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-primary bg-primary/10',
      },
      // green
      {
        variant: 'filled',
        color: 'green',
        className: 'bg-green-500 text-white',
      },
      {
        variant: 'gradient',
        color: 'green',
        className:
          'bg-gradient-to-tr from-green-500 to-green-500/80 text-green-foreground',
      },
      {
        variant: 'outlined',
        color: 'green',
        className: 'border border-green-500 text-primary',
      },
      {
        variant: 'ghost',
        color: 'green',
        className: 'text-green-900 bg-green-500/20',
      },
      // red
      {
        variant: 'filled',
        color: 'red',
        className: 'bg-red-500 text-white',
      },
      {
        variant: 'gradient',
        color: 'red',
        className:
          'bg-gradient-to-tr from-red-500 to-red-500/80 text-red-foreground',
      },
      {
        variant: 'outlined',
        color: 'red',
        className: 'border border-red-500 text-red-500',
      },
      {
        variant: 'ghost',
        color: 'red',
        className: 'text-red-900 bg-red-500/20',
      },
    ],
  }
);

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (props, ref) => {
    const {
      className,
      variant,
      size,
      children,
      icon,
      color,
      onClose,
      ...restProps
    } = props;

    return (
      <velcure.div
        className={cn(containerClass({ variant, size, color }), className)}
        ref={ref}
        {...restProps}
      >
        {icon && (
          <div className="flex items-center justify-center w-5 h-5">{icon}</div>
        )}
        <span>{children}</span>
        {onClose && (
          <IconButton
            size="xs"
            variant="ghost"
            icon={<XMarkIcon />}
            aria-label=""
            isRound
            onClick={onClose}
          />
        )}
      </velcure.div>
    );
  }
);

Chip.displayName = 'Chip';
