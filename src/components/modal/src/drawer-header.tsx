import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef, useEffect } from 'react';
import { useModalContext } from './modal';

export type DrawerHeaderProps = ComponentPropsWithoutRef<'header'>;

/**
 * DrawerHeader
 *
 * React component that houses the title of the drawer.
 */
export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
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
          'grow-0 shrink min-w-0',
          'px-6 py-4 text-xl font-semibold text-default',
          className
        )}
        {...rest}
      />
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';
