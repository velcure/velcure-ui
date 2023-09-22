import { ToastPosition } from './toast.placement';

export interface UseToastOptions {
  /**
   * The placement of the toast
   *
   * @default "bottom"
   */
  position?: ToastPosition;
  /**
   * The delay before the toast hides (in milliseconds)
   * If set to `null`, toast will never dismiss.
   *
   * @default 5000 ( = 5000ms )
   */
  duration?: ToastOptions['duration'];
  /**
   * Render a component toast component.
   * Any component passed will receive 2 props: `id` and `onClose`.
   */
  render?(props: RenderProps): React.ReactNode;
  /**
   * The title of the toast
   */
  title?: React.ReactNode;
  /**
   * The description of the toast
   */
  description?: React.ReactNode;
  /**
   * If `true`, toast will show a close button
   * @default false
   */
  isClosable?: boolean;
  /**
   * The status of the toast.
   */
  status?: ToastStatus;
  /**
   * The `id` of the toast.
   *
   * Mostly used when you need to prevent duplicate.
   * By default, we generate a unique `id` for each toast
   */
  id?: ToastId;
  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?: () => void;
}

export interface RenderProps extends UseToastOptions {
  /**
   * Function to close the toast
   */
  onClose(): void;
}

export type ToastMessage = (props: RenderProps) => React.ReactNode;

export type ToastId = string | number;

export interface ToastOptions {
  /**
   * The element or component type to render.
   * The component will be passed `id` and `onClose`
   */
  message: ToastMessage;
  /**
   * The toast's id
   */
  id: ToastId;
  /**
   * The duration of the toast
   */
  duration: number | null;
  /**
   * The status of the toast's alert component.
   */
  status: ToastStatus;

  /**
   * Function that removes the toast from manager's state.
   */
  onRequestRemove(): void;

  /**
   * The position of the toast
   */
  position: ToastPosition;

  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?(): void;

  /**
   * Internally used to queue closing a toast. Should probably not be used by
   * anyone else, but documented regardless.
   */
  requestClose?: boolean;
}

export type ToastState = {
  [K in ToastPosition]: ToastOptions[];
};

export type ToastStatus =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'loading';

export type UpdateFn = (state: ToastState) => void;

export type CloseAllToastsOptions = {
  positions?: ToastPosition[];
};
