import { callAll, cn } from '#/utilities';
import { HTMLMotionProps, Variants, motion } from 'framer-motion';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useMenuContext, useMenuList, useMenuPositioner } from './use-menu';

export interface MenuListProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Props for the root element that positions the menu.
   */
  rootProps?: ComponentPropsWithoutRef<'div'>;
  /**
   * The framer-motion props to animate the menu list
   */
  motionProps?: HTMLMotionProps<'div'>;
}

const motionVariants: Variants = {
  enter: {
    visibility: 'visible',
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    transitionEnd: {
      visibility: 'hidden',
    },
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: 'easeOut',
    },
  },
};

export const MenuList = forwardRef<HTMLDivElement, MenuListProps>(
  (props, ref) => {
    const { rootProps, motionProps, ...rest } = props;
    const {
      isOpen,
      onTransitionEnd,
      unstable__animationState: animated,
    } = useMenuContext();

    const listProps = useMenuList(rest, ref) as any;
    const positionerProps = useMenuPositioner(rootProps);

    return (
      <div {...positionerProps} className={cn('z-[1]')}>
        <motion.div
          variants={motionVariants}
          initial={false}
          animate={isOpen ? 'enter' : 'exit'}
          {...motionProps}
          {...listProps}
          className={cn(
            'bg-popover text-popover-foreground p-3',
            'outline-none focus:outline-none shadow-md rounded-md border z-inherit min-w-3xs',
            listProps.className
          )}
          onUpdate={onTransitionEnd}
          onAnimationComplete={callAll(
            animated.onComplete,
            listProps.onAnimationComplete
          )}
        />
      </div>
    );
  }
);

MenuList.displayName = 'MenuList';
