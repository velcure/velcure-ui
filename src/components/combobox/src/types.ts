export type OptionValue = string | object;

interface ISelectedOption {
  value: OptionValue;
  label?: string;
  disabled?: boolean;
}

export interface IOption extends ISelectedOption {
  selected?: boolean;
}
