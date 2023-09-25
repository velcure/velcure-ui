import { Button, ButtonGroup } from '#/components/button/src';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from '#/components/empty-state/src';
import { createContext } from '#/hooks';
import { MaybeRenderProp, runIfFn } from '#/utilities';
import React, { PropsWithChildren } from 'react';

export type ErrorBoundaryOptions = {
  /**
   * Use this to log error messages to an error reporting service.
   * Like Sentry, Bugsnag, TrackJS, Datadog, etc.
   * @param error
   * @param errorInfo
   * @returns
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
};

const [Provider, _, Context] = createContext<ErrorBoundaryOptions>({
  strict: false,
});

export const ErrorBoundaryProvider: React.FC<
  PropsWithChildren<ErrorBoundaryOptions>
> = ({ onError, onReset, ...restProps }) => (
  <Provider
    value={{
      onError,
      onReset,
    }}
    {...restProps}
  />
);

export type ErrorBoundaryProps = {
  fallback?: MaybeRenderProp<{
    error?: null | any;
    resetErrorBoundary: () => void;
  }>;

  children?: React.ReactNode;
} & ErrorBoundaryOptions;

type ErrorBoundaryState = {
  didCatch: boolean;
  error?: null | any;
};

const initialState: ErrorBoundaryState = {
  didCatch: false,
  error: null,
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = initialState;
  }

  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  static getDerivedStateFromError(error: Error) {
    return { didCatch: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const { onError } = this.props;

    if (onError) {
      onError(error, errorInfo);
    }

    this.context?.onError?.(error, errorInfo);
  }

  resetErrorBoundary = () => {
    const { didCatch } = this.state;

    if (didCatch) {
      this.props.onReset?.();
      this.context?.onReset?.();

      this.setState(initialState);
    }
  };

  render() {
    const { children, fallback, onReset } = this.props;
    const { didCatch } = this.state;

    const hasReset = !!onReset || !!this.context?.onReset;

    let childToRender = children;

    if (didCatch) {
      if (fallback) {
        childToRender = runIfFn(fallback, {
          error: this.state.error,
          resetErrorBoundary: this.resetErrorBoundary,
        });
      } else {
        childToRender = (
          <EmptyState>
            <EmptyStateIcon className="bg-destructive text-destructive-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </EmptyStateIcon>
            <div className="max-w-[420px] flex flex-col items-center justify-center">
              <EmptyStateTitle>Something went wrong.</EmptyStateTitle>
              <EmptyStateDescription>
                We have been notified about the problem.
              </EmptyStateDescription>
            </div>
            {hasReset && (
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={this.resetErrorBoundary}>
                  Try again
                </Button>
              </ButtonGroup>
            )}
          </EmptyState>
        );
      }
    }

    return childToRender;
  }
}
