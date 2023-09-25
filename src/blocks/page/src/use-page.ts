import { createContext } from '#/hooks';

export interface UsePageOptions {
  onBack?: string | boolean | (() => void);
  /**
   * Use the `isLoading` prop to render a spinner in the middle of the page body.
   * @default false
   */
  isLoading?: boolean;
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
  };
};

export type UsePageReturn = ReturnType<typeof usePage>;
