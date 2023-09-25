import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { AvatarOptions } from './avatar-types';

export function initials(name: string) {
  const names = name.split(' ');
  const firstName = names[0] ?? '';
  const lastName = names.length > 1 ? names[names.length - 1] : '';

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }

  if (firstName) {
    return firstName.slice(0, 2);
  }

  return '';
}

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
