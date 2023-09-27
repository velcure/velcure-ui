/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import { HTMLMotionProps } from 'framer-motion';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useModalContext } from './modal';
import { ModalFocusScope } from './modal-focus';
import { ModalTransition } from './modal-transition';

export interface ModalContentProps extends ComponentPropsWithoutRef<'section'> {
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
    'flex flex-col relative w-full outline-none outline-offset-2',
    'text-inherit rounded-md z-modal',
    'bg-background shadow-lg',
  ],
  {
    variants: {
      isCentered: {
        true: 'my-auto mx-auto',
        false: 'my-16',
      },
      scrollBehavior: {
        outside: '',
        inside: 'max-h-[calc(100%-7.5rem)]',
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
      isCentered: false,
      scrollBehavior: 'outside',
      size: 'md',
    },
  }
);

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  (props, ref) => {
    const {
      className,
      children,
      containerProps: rootProps,
      motionProps,
      ...rest
    } = props;

    const {
      getDialogProps,
      getDialogContainerProps,
      isCentered,
      scrollBehavior,
      size,
    } = useModalContext();

    const dialogProps = getDialogProps(rest, ref) as any;
    const containerProps = getDialogContainerProps(rootProps);

    const { motionPreset } = useModalContext();

    return (
      <ModalFocusScope>
        <div
          {...containerProps}
          className={cn(
            // base
            'flex w-screen h-screen fixed left-0 top-0 z-modal justify-center',
            // variants
            isCentered ? 'items-center' : 'items-start',
            scrollBehavior === 'inside' ? 'overflow-hidden' : 'overflow-auto',
            'overscroll-y-none'
          )}
          tabIndex={-1}
        >
          <ModalTransition
            preset={motionPreset}
            motionProps={motionProps}
            className={cn(
              dialogClasses({
                isCentered,
                scrollBehavior,
                size,
              }),
              className
            )}
            {...dialogProps}
          >
            {children}
          </ModalTransition>
        </div>
      </ModalFocusScope>
    );
  }
);

ModalContent.displayName = 'ModalContent';
