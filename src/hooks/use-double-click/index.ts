import { useCallback, useRef } from 'react';

export interface UseDoubleClickProps {
  onSingleClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   * The maximum time between clicks to be considered a double click.
   * @default 200
   */
  timeout?: number;
}

/**
 * Hook to handle single and double clicks on elements.
 *
 * @param options - The configuration options for handling clicks.
 * @returns A callback function that can be attached to elements to handle single and double clicks.
 *
 * This hook prevents clicks on buttons and links or targets that are
 * within a button or link, as well as elements with interactive roles.
 */
export const useDoubleClick = (options: UseDoubleClickProps = {}) => {
  const { onSingleClick, onDoubleClick, timeout = 200 } = options;

  const clickTimeout = useRef<number | undefined>();

  const clearClickTimeout = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = undefined;
    }
  };

  return useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      // prevent clicks on buttons and links or targets that are
      // within a button or link
      // or of interactive roles
      if (
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLAnchorElement ||
        (e.target as HTMLElement).closest('button') ||
        (e.target as HTMLElement).closest('a') ||
        (e.target as HTMLElement).closest('[role="button"]') ||
        (e.target as HTMLElement).closest('[role="link"]')
      ) {
        return;
      }

      clearClickTimeout();

      if (onSingleClick && e.detail === 1) {
        clickTimeout.current = setTimeout(() => {
          onSingleClick(e);
        }, timeout) as any;
      }

      if (onDoubleClick && e.detail === 2) {
        onDoubleClick(e);
      }
    },
    [onDoubleClick, onSingleClick, timeout]
  );
};
