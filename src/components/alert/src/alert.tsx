import { IconButton } from '#/components/button/src';
import { fadeConfig } from '#/components/transition/src';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import {
  AnimatePresence,
  HTMLMotionProps,
  LazyMotion,
  domAnimation,
  m,
} from 'framer-motion';
import { forwardRef } from 'react';
import { AlertContent } from './alert-content';
import { AlertProvider, AlertStatus } from './alert-context';
import { AlertIcon } from './alert-icon';

const classes = cva('relative w-full text-base px-4 py-4 rounded-lg flex', {
  variants: {
    status: {
      info: 'bg-informative text-informative-foreground',
      warning: 'bg-warning text-warning-foreground',
      success: 'bg-success text-success-foreground',
      error: 'bg-destructive text-destructive-foreground',
      loading: 'bg-secondary text-secondary-foreground',
    },
  },
});

interface AlertOptions {
  /**
   * The status of the alert
   * @default "info"
   */
  status?: AlertStatus;
  /**
   * If `true`, the alert will be visible
   * @default true
   */
  isOpen?: boolean;
  /**
   * Callback fired when the alert is closed
   */
  onClose?: () => void;
}

export interface AlertProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>,
    AlertOptions {
  /**
   * @default true
   */
  addRole?: boolean;
  children?: React.ReactNode;
}

/**
 * Alert is used to communicate the state or status of a
 * page, feature or action
 *
 * @see Docs https://chakra-ui.com/docs/components/alert
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    status = 'info',
    addRole = true,
    className,
    isOpen = true,
    children,
    onClose,
    ...restProps
  } = props;

  return (
    <AlertProvider value={{ status }}>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              data-status={status}
              role={addRole ? 'alert' : undefined}
              ref={ref}
              className={cn(classes({ status }), className)}
              {...restProps}
              {...fadeConfig}
              initial="unmount"
              exit="unmount"
              animate={isOpen ? 'enter' : 'exit'}
            >
              <AlertIcon />
              <AlertContent>{children}</AlertContent>
              {onClose && (
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label="Dismiss"
                  onClick={onClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </AlertProvider>
  );
});

Alert.displayName = 'Alert';
