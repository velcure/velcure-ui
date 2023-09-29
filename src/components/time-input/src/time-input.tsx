import { Input, InputProps } from '#/components/input/src';
import { forwardRef } from 'react';

export interface TimeInputProps extends InputProps {
  /**
   * Determines wheter seconds input should be rendered
   * @default false
   */
  withSeconds?: boolean;
}

/**
 * Time input component
 */
export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (props, ref) => {
    const { withSeconds, ...restProps } = props;

    return (
      <Input ref={ref} {...restProps} step={withSeconds ? 1 : 60} type="time" />
    );
  }
);

TimeInput.displayName = 'TimeInput';
