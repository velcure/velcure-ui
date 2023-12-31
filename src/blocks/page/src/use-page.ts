import { createContext } from '#/hooks';

export interface UsePageOptions {
  onBack?: () => void;
  /**
   * Use the `isLoading` prop to render a spinner in the middle of the page body.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Page has a built-in error boundary, but you can use this callback to reset the error state.
   */
  onErrorReset?: () => void;
  /**
   * onError gets called when an error is thrown in a descendant component.
   * We recommend logging error messages to an error reporting service.
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  variant?: 'default' | 'full' | 'text';
}

export const [PageProvider, usePageContext] = createContext<
  Omit<UsePageReturn, 'descendants'>
>({
  strict: false,
  name: 'MenuContext',
});

export const usePage = (options: UsePageOptions = {}) => {
  return {
    onBack: options.onBack,
    isLoading: options.isLoading ?? false,
    onErrorReset: options.onErrorReset,
    onError: options.onError,
    variant: options.variant ?? 'default',
  };
};

export type UsePageReturn = ReturnType<typeof usePage>;
