import { callAllHandlers, cn, dataAttr, initials } from '#/utilities';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, forwardRef, useState } from 'react';
import { AvatarImage } from './avatar-image';
import { AvatarOptions } from './avatar-types';
import { GenericAvatarIcon } from './generic-avatar-icon';

export interface AvatarProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'onError'>,
    AvatarOptions,
    VariantProps<typeof avatarClasses> {
  crossOrigin?: ComponentPropsWithoutRef<'img'>['crossOrigin'];
  iconLabel?: string;
  /**
   * If `true`, opt out of the avatar's `fallback` logic and
   * renders the `img` at all times.
   *
   * @default false
   */
  ignoreFallback?: boolean;
}

export const avatarClasses = cva(
  'relative flex shrink-0 overflow-hidden bg-muted text-muted-foreground select-none',
  {
    variants: {
      rounded: {
        true: 'rounded-full',
        false: 'rounded',
      },
      size: {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-14 h-14 text-xl',
      },
      showBorder: {
        true: 'border-2 border-ring',
      },
    },
    defaultVariants: {
      rounded: true,
      size: 'md',
    },
  }
);

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const {
    src,
    srcSet,
    name,
    onError,
    onLoad: onLoadProp,
    getInitials = initials,
    icon = <GenericAvatarIcon />,
    iconLabel = ' avatar',
    loading,
    className,
    children,
    ignoreFallback,
    crossOrigin,
    referrerPolicy,
    rounded,
    size,
    showBorder,
    ...restProps
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <span
      ref={ref}
      className={cn(avatarClasses({ rounded, size, showBorder }), className)}
      data-loaded={dataAttr(isLoaded)}
      {...restProps}
    >
      <AvatarImage
        src={src}
        srcSet={srcSet}
        loading={loading}
        onLoad={callAllHandlers(onLoadProp, () => {
          setIsLoaded(true);
        })}
        onError={onError}
        getInitials={getInitials}
        name={name}
        icon={icon}
        iconLabel={iconLabel}
        ignoreFallback={ignoreFallback}
        crossOrigin={crossOrigin}
        referrerPolicy={referrerPolicy}
      />
      {children}
    </span>
  );
});

Avatar.displayName = 'Avatar';
