import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export type ModalFooterProps = ComponentPropsWithoutRef<'footer'>;

/**
 * ModalFooter houses the action buttons of the modal.
 */
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <footer
        ref={ref}
        {...rest}
        className={cn(
          'flex items-center justify-end px-6 py-4 bg-secondary',
          className
        )}
      />
    );
  }
);

ModalFooter.displayName = 'ModalFooter';
