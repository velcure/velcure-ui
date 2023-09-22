import { useTimeout, useUpdateEffect } from '#/hooks';
import { runIfFn } from '#/utilities';
import { Variants, motion, useIsPresent } from 'framer-motion';
import { memo, useEffect, useMemo, useState } from 'react';
import { ToastProviderProps } from './toast.provider';
import type { ToastOptions } from './toast.types';
import { getToastStyle } from './toast.utils';

const toastMotionVariants: Variants = {
  initial: (props) => {
    const { position } = props;

    const dir = ['top', 'bottom'].includes(position) ? 'y' : 'x';

    let factor = ['top-right', 'bottom-right'].includes(position) ? 1 : -1;
    if (position === 'bottom') factor = 1;

    return {
      opacity: 0,
      [dir]: factor * 24,
    };
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export interface ToastComponentProps
  extends ToastOptions,
    Pick<ToastProviderProps, 'motionVariants'> {}

export const ToastComponent = memo((props: ToastComponentProps) => {
  const {
    id,
    message,
    onCloseComplete,
    onRequestRemove,
    requestClose = false,
    position = 'bottom',
    duration = 5000,
    motionVariants = toastMotionVariants,
  } = props;

  const [delay, setDelay] = useState(duration);
  const isPresent = useIsPresent();

  useUpdateEffect(() => {
    if (!isPresent) {
      onCloseComplete?.();
    }
  }, [isPresent]);

  useUpdateEffect(() => {
    setDelay(duration);
  }, [duration]);

  const onMouseEnter = () => setDelay(null);
  const onMouseLeave = () => setDelay(duration);

  const close = () => {
    if (isPresent) onRequestRemove();
  };

  useEffect(() => {
    if (isPresent && requestClose) {
      onRequestRemove();
    }
  }, [isPresent, requestClose, onRequestRemove]);

  useTimeout(close, delay);

  const toastStyle = useMemo(() => getToastStyle(position), [position]);

  return (
    <motion.div
      layout
      variants={motionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onHoverStart={onMouseEnter}
      onHoverEnd={onMouseLeave}
      custom={{ position }}
      style={toastStyle}
    >
      <div
        role="status"
        aria-atomic="true"
        className="pointer-events-none max-w-sm w-full m-2"
      >
        {runIfFn(message, { id, onClose: close })}
      </div>
    </motion.div>
  );
});

ToastComponent.displayName = 'ToastComponent';
