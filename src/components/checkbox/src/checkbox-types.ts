export type EventOrValue =
  | React.ChangeEvent<HTMLInputElement>
  | string
  | number;

export interface CheckboxState {
  isInvalid?: boolean;
  isFocused: boolean;
  isChecked: boolean;
  isActive: boolean;
  isHovered: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}
