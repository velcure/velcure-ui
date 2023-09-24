import { Spinner } from '#/components';
import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, Suspense, forwardRef } from 'react';

export interface AppShellProps extends ComponentPropsWithoutRef<'div'> {
  navbar?: React.ReactNode;
}

/**
 * The App Shell defines the main structure of your app.
 * It is the parent of all other components.
 *
 * It wraps the children in a Suspense component, so you can use React.lazy
 * to lazy load your components.
 */
export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  (props, ref) => {
    const { className, children, navbar, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col absolute inset-0 bg-background',
          className
        )}
        {...restProps}
      >
        {navbar}
        {children && (
          <main className="flex flex-1 min-h-0 min-w-0">
            <Suspense
              fallback={
                <div className="flex-1 flex items-center justify-center">
                  <Spinner className="h-8 w-8" />
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
        )}
      </div>
    );
  }
);

AppShell.displayName = 'AppShell';
