import { useImage } from '#/components/image/src';
import { cn } from '#/utilities';
import { cloneElement, forwardRef } from 'react';
import { AvatarName } from './avatar-name';

export interface AvatarImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  getInitials?: (name: string) => string;
  icon: React.ReactElement;
  iconLabel?: string;
  name?: string;
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   *
   * @default false
   */
  ignoreFallback?: boolean;
}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  (props, ref) => {
    const {
      src,
      srcSet,
      onError,
      onLoad,
      getInitials,
      name,
      loading,
      icon,
      iconLabel,
      className,
      crossOrigin,
      ignoreFallback,
      referrerPolicy,
      ...restProps
    } = props;

    /**
     * use the image hook to only show the image when it has loaded
     */
    const status = useImage({ src, onError, crossOrigin, ignoreFallback });

    const hasLoaded = status === 'loaded';

    /**
     * Fallback avatar applies under 2 conditions:
     * - If `src` was passed and the image has not loaded or failed to load
     * - If `src` wasn't passed
     *
     * In this case, we'll show either the name avatar or default avatar
     */
    const showFallback = !src || !hasLoaded;

    if (showFallback) {
      return name ? (
        <AvatarName getInitials={getInitials} name={name} />
      ) : (
        <span className="flex h-full w-full items-center justify-center">
          {cloneElement(icon, {
            role: 'img',
            'aria-label': iconLabel,
          })}
        </span>
      );
    }

    return (
      <img
        ref={ref}
        className={cn('w-full h-full object-cover', className)}
        src={src}
        srcSet={srcSet}
        alt={name}
        onLoad={onLoad}
        referrerPolicy={referrerPolicy}
        crossOrigin={crossOrigin ?? undefined}
        loading={loading}
        {...restProps}
      />
    );
  }
);

AvatarImage.displayName = 'AvatarImage';
