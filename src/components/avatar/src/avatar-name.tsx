import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { AvatarOptions } from './avatar-types';

interface AvatarNameProps
  extends ComponentPropsWithoutRef<'div'>,
    Pick<AvatarOptions, 'name' | 'getInitials'> {}

export const AvatarName = forwardRef<HTMLDivElement, AvatarNameProps>(
  (props, ref) => {
    const { name, getInitials, className, ...restProps } = props;

    return (
      <div
        role="img"
        aria-label={name}
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center',
          className
        )}
        {...restProps}
      >
        {name ? getInitials?.(name) : null}
      </div>
    );
  }
);

AvatarName.displayName = 'AvatarName';
