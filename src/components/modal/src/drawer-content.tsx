import { Slide } from '#/components/transition/src';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import { HTMLMotionProps } from 'framer-motion';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useDrawerContext } from './drawer';
import { useModalContext } from './modal';
import { ModalFocusScope } from './modal-focus';

export interface DrawerContentProps
  extends ComponentPropsWithoutRef<'section'> {
  /**
   * The props to forward to the modal's content wrapper
   */
  containerProps?: ComponentPropsWithoutRef<'div'>;
  /**
   * The custom framer-motion transition to use for the modal
   */
  motionProps?: HTMLMotionProps<'section'>;
}

const dialogClasses = cva(
  [
    'flex flex-col relative w-full outline-none',
    'z-modal max-h-screen',
    'bg-background shadow-lg',
  ],
  {
    variants: {
      scrollBehavior: {
        outside: '',
        inside: '',
      },
      size: {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        full: 'max-w-screen min-h-screen my-0 rounded-none',
      },
    },
    defaultVariants: {
      scrollBehavior: 'outside',
      size: 'md',
    },
  }
);

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  (props, ref) => {
    const {
      className,
      children,
      motionProps,
      containerProps: rootProps,
      ...rest
    } = props;

    const {
      getDialogProps,
      getDialogContainerProps,
      isOpen,
      size,
      scrollBehavior,
    } = useModalContext();

    const dialogProps = getDialogProps(rest, ref) as any;
    const containerProps = getDialogContainerProps(rootProps);

    const { placement } = useDrawerContext();

    return (
      <ModalFocusScope>
        <div
          {...containerProps}
          className="flex z-modal justify-center w-screen h-screen fixed inset-0"
        >
          <Slide
            motionProps={motionProps}
            direction={placement}
            in={isOpen}
            className={cn(
              dialogClasses({
                size,
                scrollBehavior,
              }),
              className
            )}
            {...dialogProps}
          >
            {children}
          </Slide>
        </div>
      </ModalFocusScope>
    );
  }
);

DrawerContent.displayName = 'DrawerContent';
