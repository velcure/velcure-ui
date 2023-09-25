import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface EmptyStateDescriptionProps
  extends ComponentPropsWithoutRef<'div'> {}

export const EmptyStateDescription = forwardRef<
  HTMLDivElement,
  EmptyStateDescriptionProps
>((props, ref) => {
  return (
    <div
      ref={ref}
      className="text-center text-muted-foreground text-md"
      {...props}
    />
  );
});

EmptyStateDescription.displayName = 'EmptyStateDescription';
