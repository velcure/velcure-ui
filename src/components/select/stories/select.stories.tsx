import { Select, SelectProps } from '../src/select';

export default {
  title: 'Components / Forms / Select',
};

export const BasicUsage = () => (
  <Select placeholder="Select option">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </Select>
);

export const SelectStates = () => (
  <div className="flex flex-col gap-4">
    <Select placeholder="Select option" isInvalid>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select>

    <Select placeholder="Select option" isDisabled>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select>
  </div>
);

export const SelectSizes = () => (
  <div className="flex flex-col gap-4">
    {['xs', 'sm', 'md', 'lg'].map((size) => (
      <Select
        placeholder={`${size} size`}
        size={size as SelectProps['size']}
        key={size}
      />
    ))}
  </div>
);
