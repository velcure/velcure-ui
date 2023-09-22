import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface MenuCommandProps extends ComponentPropsWithoutRef<'span'> {}

export const MenuCommand = forwardRef<HTMLSpanElement, MenuCommandProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <span {...restProps} ref={ref} className={cn('opacity-60', className)} />
    );
  }
);

MenuCommand.displayName = 'MenuCommand';
