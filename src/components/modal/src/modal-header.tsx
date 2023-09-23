import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef, useEffect } from 'react';
import { useModalContext } from './modal';

export type ModalHeaderProps = ComponentPropsWithoutRef<'header'>;

/**
 * ModalHeader
 *
 * React component that houses the title of the modal.
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    const { headerId, setHeaderMounted } = useModalContext();

    /**
     * Notify us if this component was rendered or used,
     * so we can append `aria-labelledby` automatically
     */
    useEffect(() => {
      setHeaderMounted(true);
      return () => setHeaderMounted(false);
    }, [setHeaderMounted]);

    return (
      <header
        ref={ref}
        id={headerId}
        className={cn(
          'flex-1 px-6 py-4 text-xl font-semibold text-default',
          className
        )}
        {...rest}
      />
    );
  }
);

ModalHeader.displayName = 'ModalHeader';
