import { Spinner } from '#/components';
import { cn } from '#/utilities';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { Suspense, forwardRef } from 'react';
import { usePageContext } from './use-page';

export interface PageBodyProps extends HTMLMotionProps<'div'> {}

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

    const { isLoading } = usePageContext();

    return (
      <AnimatePresence initial={false}>
        {isLoading ? (
          <Loading />
        ) : (
          <Suspense fallback={<Loading />}>
            <motion.div
              ref={ref}
              className={cn(
                'flex-1 min-h-0 min-w-0 overflow-y-auto',
                className
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              {...rest}
            >
              {children}
            </motion.div>
          </Suspense>
        )}
      </AnimatePresence>
    );
  }
);

PageBody.displayName = 'PageBody';
