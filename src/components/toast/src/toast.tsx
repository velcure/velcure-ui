import { IconButton } from '#/components/button/src';
import { Typography } from '#/components/typography/src';
import { runIfFn } from '#/utilities';
import { ToastIcon } from './toast-icon';
import { getToastPlacement } from './toast.placement';
import { toastStore } from './toast.store';
import { RenderProps, ToastId, UseToastOptions } from './toast.types';

export interface ToastProps extends UseToastOptions {
  onClose?: () => void;
}

/**
 * The `Toast` component is used to give feedback to users after an action has taken place.
 *
 * @see Docs https://chakra-ui.com/docs/components/toast
 */
export const Toast: React.FC<ToastProps> = (props) => {
  const {
    status = 'default',
    id,
    title,
    isClosable,
    onClose,
    description,
  } = props;

  const ids = id
    ? {
        root: `toast-${id}`,
        title: `toast-${id}-title`,
        description: `toast-${id}-description`,
      }
    : undefined;

  return (
    <div
      className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      data-status={status}
      id={ids?.root}
    >
      <div className="p-4 flex items-start">
        <ToastIcon status={status} />
        {/* <AlertIcon>{icon}</AlertIcon> */}
        <div className="ml-3 w-0 flex-1 pt-0.5">
          {title && (
            <Typography className="text-sm font-medium" id={ids?.title}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography className="mt-1 text-sm" id={ids?.description}>
              {description}
            </Typography>
          )}
        </div>
        {isClosable && (
          <div className="ml-4 flex flex-shrink-0">
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Close"
              onClick={onClose}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
              </svg>
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export function createRenderToast(
  options: UseToastOptions & {
    toastComponent?: React.FC<ToastProps>;
  } = {}
) {
  const { render, toastComponent: ToastComponent = Toast } = options;
  const renderToast: React.FC<RenderProps> = (props) => {
    if (typeof render === 'function') {
      return render({ ...props, ...options }) as JSX.Element;
    }
    return <ToastComponent {...props} {...options} />;
  };
  return renderToast;
}

type UseToastPromiseOption = Omit<UseToastOptions, 'status'>;

export function createToastFn(defaultOptions?: UseToastOptions) {
  const normalizeToastOptions = (options?: UseToastOptions) => ({
    ...defaultOptions,
    ...options,
    position: getToastPlacement(options?.position ?? defaultOptions?.position),
  });

  const toast = (options?: UseToastOptions) => {
    const normalizedToastOptions = normalizeToastOptions(options);
    const Message = createRenderToast(normalizedToastOptions);
    return toastStore.notify(Message, normalizedToastOptions);
  };

  toast.update = (id: ToastId, options: Omit<UseToastOptions, 'id'>) => {
    toastStore.update(id, normalizeToastOptions(options));
  };

  toast.promise = <Result extends any, Err extends Error = Error>(
    promise: Promise<Result>,
    options: {
      success: MaybeFunction<UseToastPromiseOption, [Result]>;
      error: MaybeFunction<UseToastPromiseOption, [Err]>;
      loading: UseToastPromiseOption;
    }
  ) => {
    const id = toast({
      ...options.loading,
      status: 'loading',
      duration: null,
    });

    promise
      .then((data) =>
        toast.update(id, {
          status: 'success',
          duration: 5_000,
          ...runIfFn(options.success, data),
        })
      )
      .catch((error) =>
        toast.update(id, {
          status: 'error',
          duration: 5_000,
          ...runIfFn(options.error, error),
        })
      );
  };

  toast.closeAll = toastStore.closeAll;
  toast.close = toastStore.close;
  toast.isActive = toastStore.isActive;

  return toast;
}

export type CreateToastFnReturn = ReturnType<typeof createToastFn>;

type MaybeFunction<T, Args extends unknown[] = []> = T | ((...args: Args) => T);
