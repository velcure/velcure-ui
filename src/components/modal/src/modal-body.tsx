import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef, useEffect } from 'react';
import { useModalContext } from './modal';

export type ModalBodyProps = ComponentPropsWithoutRef<'div'>;

/**
 * ModalBody
 *
 * React component that houses the main content of the modal.
 */
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    const { bodyId, setBodyMounted, scrollBehavior } = useModalContext();

    /**
     * Notify us if this component was rendered or used,
     * so we can append `aria-describedby` automatically
     */
    useEffect(() => {
      setBodyMounted(true);
      return () => setBodyMounted(false);
    }, [setBodyMounted]);

    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-2 flex-1',
          scrollBehavior === 'inside' ? 'overflow-auto' : '',
          className
        )}
        id={bodyId}
        {...rest}
      />
    );
  }
);

ModalBody.displayName = 'ModalBody';
