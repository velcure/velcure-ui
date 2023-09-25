import { Spinner } from '#/components';
import { ErrorBoundary } from '#/components/error-boundary/src';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { Suspense, forwardRef } from 'react';
import { usePageContext } from './use-page';

export interface PageBodyProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode;
}

const Loading = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-full w-full flex items-center justify-center"
  >
    <Spinner className="h-8 w-8" />
  </motion.div>
);

const classes = cva(['flex flex-1 flex-col w-full'], {
  variants: {
    variant: {
      default: 'p-4',
      full: 'flex h-full flex-1',
      text: 'mx-auto max-w-6xl p-4 flex-1',
    },
  },
});

/**
 * PageBody is the main content area of the page.
 * It has <Suspense> built in, so you can use React.lazy
 * to lazy load your components.
 *
 * It also has a loading state built in, so you can use
 * usePageContext().isLoading to show a loading indicator.
 */
export const PageBody = forwardRef<HTMLDivElement, PageBodyProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    const { isLoading, onErrorReset, onError, variant } = usePageContext();

    return (
      <ErrorBoundary onReset={onErrorReset} onError={onError}>
        <AnimatePresence initial={false}>
          {isLoading ? (
            <Loading />
          ) : (
            <Suspense fallback={<Loading />}>
              <motion.div
                ref={ref}
                className={cn(
                  'flex-1 min-h-0 min-w-0 overflow-y-auto flex flex-col',
                  className
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                {...rest}
              >
                <div className={classes({ variant })}>{children}</div>
              </motion.div>
            </Suspense>
          )}
        </AnimatePresence>
      </ErrorBoundary>
    );
  }
);

PageBody.displayName = 'PageBody';
