import { HTMLVelcureProps, velcure } from '#/components/factory';
import { Typography } from '#/components/typography/src';
import { cn } from '#/utilities';
import { forwardRef } from 'react';

export interface MenuGroupProps extends HTMLVelcureProps<'div'> {
  title?: string;
}

export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  (props, ref) => {
    const { title, className, children, ...restProps } = props;

    return (
      <velcure.div ref={ref} role="group" {...restProps}>
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
      </velcure.div>
    );
  }
);

MenuGroup.displayName = 'MenuGroup';
