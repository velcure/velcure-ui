import { useMemo } from 'react';
import {
  CheckboxGroupProvider,
  UseCheckboxGroupProps,
  useCheckboxGroup,
} from './use-checkbox-group';

export interface CheckboxGroupProps extends UseCheckboxGroupProps {
  children?: React.ReactNode;
}

/**
 * Used for multiple checkboxes which are bound in one group,
 * and it indicates whether one or more options are selected.
 *
 */
export function CheckboxGroup(props: CheckboxGroupProps) {
  const { children, isDisabled } = props;
  const { value, onChange } = useCheckboxGroup(props);

  const group = useMemo(
    () => ({
      onChange,

      value,
      isDisabled,
    }),
    [onChange, value, isDisabled]
  );

  return <CheckboxGroupProvider value={group} children={children} />;
}

CheckboxGroup.displayName = 'CheckboxGroup';
