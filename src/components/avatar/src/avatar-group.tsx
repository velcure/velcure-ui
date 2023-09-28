import { cn, compact, getValidChildren } from '#/utilities';
import { ComponentPropsWithoutRef, cloneElement, forwardRef } from 'react';
import { AvatarProps, avatarClasses } from './avatar';

interface AvatarGroupOptions {
  /**
   * The children of the avatar group.
   *
   * Ideally should be `Avatar` and `MoreIndicator` components
   */
  children: React.ReactNode;
  /**
   * The maximum number of visible avatars
   */
  max?: number;
}

export interface AvatarGroupProps
  extends AvatarGroupOptions,
    Omit<ComponentPropsWithoutRef<'div'>, 'children'>,
    Pick<AvatarProps, 'size' | 'rounded'> {}

/**
 * AvatarGroup displays a number of avatars grouped together in a stack.
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (props, ref) => {
    const { children, max, size, rounded, className, ...restProps } = props;

    const validChildren = getValidChildren(children);

    /**
     * get the avatars within the max
     */
    const childrenWithinMax =
      max != null ? validChildren.slice(0, max) : validChildren;

    /**
     * get the remaining avatar count
     */
    const excess = max != null ? validChildren.length - max : 0;

    /**
     * Reversing the children is a great way to avoid using zIndex
     * to overlap the avatars
     */
    const reversedChildren = childrenWithinMax.reverse();

    const clones = reversedChildren.map((child, index) => {
      const isFirstAvatar = index === 0;

      const childProps = {
        className: cn(isFirstAvatar ? 'me-0' : '-me-3'),
        size,
        rounded,
        showBorder: true,
      };

      return cloneElement(child, compact(childProps));
    });

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'flex items-center justify-end flex-row-reverse',
          className
        )}
        {...restProps}
      >
        {excess > 0 && (
          <span
            className={cn(
              avatarClasses({
                rounded,
                size,
              }),
              '-ms-3'
            )}
          >
            <div className=" flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground">{`+${excess}`}</div>
          </span>
        )}
        {clones}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
