import { HTMLVelcureProps, velcure } from '#/components/factory';
import { forwardRef } from 'react';

type Omitted = 'disabled' | 'required' | 'readOnly' | 'size';

export interface SelectFieldProps
  extends Omit<HTMLVelcureProps<'select'>, Omitted> {
  /**
   * @default false
   */
  isDisabled?: boolean;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(props, ref) {
    const { children, placeholder, className, ...rest } = props;

    return (
      <velcure.select {...rest} ref={ref} className={className}>
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </velcure.select>
    );
  }
);

SelectField.displayName = 'SelectField';
