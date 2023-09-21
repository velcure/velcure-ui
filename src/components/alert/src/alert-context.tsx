import { createContext } from '#/hooks';

export type AlertStatus = 'info' | 'warning' | 'success' | 'error' | 'loading';

export interface AlertContext {
  status: AlertStatus;
}

export const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: 'AlertContext',
  hookName: 'useAlertContext',
  providerName: '<Alert />',
});
