import { Typography } from '#/components/typography/src';
import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface MenuGroupProps extends ComponentPropsWithoutRef<'div'> {
  title?: string;
}

export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  (props, ref) => {
    const { title, className, children, ...restProps } = props;

    return (
      <div ref={ref} role="group" {...restProps}>
        {title && (
          <div className="w-full mb-2">
            <Typography
              variant="small"
              className={cn('text-sm text-accent-foreground', className)}
            >
              {title}
            </Typography>
          </div>
        )}
        {children}
      </div>
    );
  }
);

MenuGroup.displayName = 'MenuGroup';
