import { useMemo } from 'react';
import { CreateToastFnReturn, createToastFn } from './toast';
import { useToastOptionContext } from './toast.provider';
import { UseToastOptions } from './toast.types';

/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */
export function useToast(options?: UseToastOptions): CreateToastFnReturn {
  const defaultOptions = useToastOptionContext();

  return useMemo(
    () =>
      createToastFn({
        ...defaultOptions,
        ...options,
      }),
    [options, defaultOptions]
  );
}

export default useToast;
