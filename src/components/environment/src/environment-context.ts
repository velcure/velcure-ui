import { createContext } from '#/hooks';
import { type CommonProperties } from '@zag-js/types';

export type EnvironmentContext = CommonProperties['getRootNode'];

export const [EnvironmentProvider, useEnvironmentContext] =
  createContext<EnvironmentContext>({
    name: 'EnvironmentContext',
    hookName: 'useEnvironmentContext',
    providerName: '<EnvironmentProvider />',
    strict: false,
  });
