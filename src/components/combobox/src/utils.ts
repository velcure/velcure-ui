import { OptionValue } from './types';

/**
 * Convert the given option value to a label.
 *
 * @param labels A stored record of label key value pairs.
 * @param value The value to convert to a valid key.
 *
 * @returns A label from the `labels` record based on the given value.
 */
export const toLabel = (labels: Record<string, string>, value: OptionValue) => {
  if (value === undefined) {
    return '';
  }

  const key = typeof value === 'string' ? value : JSON.stringify(value);

  return labels[key];
};
