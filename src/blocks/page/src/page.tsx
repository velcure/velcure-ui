import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { PageProvider, UsePageOptions, usePage } from './use-page';

export interface PageProps
  extends ComponentPropsWithoutRef<'main'>,
    UsePageOptions {}

export const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const { className, onBack, isLoading, ...rest } = props;

  const ctx = usePage({
    onBack,
    isLoading,
  });

  return (
    <PageProvider value={ctx}>
      <main
        ref={ref}
        className={cn('flex flex-col flex-1 min-h-0', className)}
        {...rest}
      />
    </PageProvider>
  );
});

Page.displayName = 'Page';
