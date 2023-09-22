import { CreateToastFnReturn, createToastFn } from './toast';
import { ToastProvider, ToastProviderProps } from './toast.provider';
import { UseToastOptions } from './toast.types';

const defaults: UseToastOptions = {
  duration: 5000,
};

export interface CreateStandAloneToastParam
  extends Omit<ToastProviderProps, 'children'> {
  defaultOptions: UseToastOptions;
}

export const defaultStandaloneParam: CreateStandAloneToastParam &
  Required<Omit<CreateStandAloneToastParam, keyof ToastProviderProps>> = {
  defaultOptions: defaults,
};

export type CreateStandaloneToastReturn = {
  ToastContainer: () => JSX.Element;
  toast: CreateToastFnReturn;
};

/**
 * Create a toast
 */
export function createStandaloneToast({
  defaultOptions = defaultStandaloneParam.defaultOptions,
  motionVariants,
  component,
}: CreateStandAloneToastParam = defaultStandaloneParam): CreateStandaloneToastReturn {
  const ToastContainer = () => (
    <ToastProvider
      defaultOptions={defaultOptions}
      motionVariants={motionVariants}
      component={component}
    />
  );

  return {
    ToastContainer,
    toast: createToastFn(defaultOptions),
  };
}
