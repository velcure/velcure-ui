import { fadeConfig } from '#/components/transition/src';
import { cn } from '#/utilities';
import { HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { useModalContext } from './modal';

export interface ModalOverlayProps
  extends Omit<HTMLMotionProps<'div'>, 'color'> {
  children?: React.ReactNode;
  motionProps?: HTMLMotionProps<'div'>;
}

/**
 * ModalOverlay renders a backdrop behind the modal. It is
 * also used as a wrapper for the modal content for better positioning.
 */
export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
  (props, ref) => {
    const { className, motionProps: _motionProps, ...rest } = props;
    const _className = cn(
      'fixed inset-0 bg-modal-overlay bg-opacity-75 backdrop-blur-sm z-modal',
      className
    );

    const { motionPreset } = useModalContext();
    const defaultMotionProps: HTMLMotionProps<'div'> =
      motionPreset === 'none' ? {} : fadeConfig;

    const motionProps: any = _motionProps || defaultMotionProps;

    return (
      <motion.div {...motionProps} ref={ref} className={_className} {...rest} />
    );
  }
);

ModalOverlay.displayName = 'ModalOverlay';
