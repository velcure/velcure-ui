import { cn, forwardRef } from '#/utilities';
import { cva } from 'class-variance-authority';
import React from 'react';

type Props<T extends keyof JSX.IntrinsicElements> = React.ComponentProps<T>;

type BaseTypographyProps = Props<'p'> &
  Props<'h1'> &
  Props<'h2'> &
  Props<'h3'> &
  Props<'h4'> &
  Props<'h5'> &
  Props<'h6'> &
  Props<'a'>;

const classes = cva('scroll-m-20 ', {
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold tracking-light lg:text-5xl',
      h2: 'text-3xl font-semibold tracking-tight',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'text-xl font-semibold tracking-tight',
      h5: 'text-lg font-semibold tracking-tight',
      h6: 'text-base font-semibold tracking-tight',
      lead: 'text-xl text-muted-foreground',
      p: 'leading-7',
      small: 'text-sm font-medium leading-none',
    },
  },
});

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'lead' | 'p' | 'small';

export type TypographyOptions = {
  variant?: Variant;
};

export interface TypographyProps
  extends BaseTypographyProps,
    TypographyOptions {}

export const Typography = forwardRef<TypographyProps, 'div'>((props, ref) => {
  const { variant = 'p', className, ...restProps } = props;

  const baseProps = {
    className: cn(
      classes({
        variant,
      }),
      className
    ),
    ref,
    ...restProps,
  };

  return React.createElement(variant === 'lead' ? 'p' : variant, baseProps);
});

Typography.displayName = 'Typography';
