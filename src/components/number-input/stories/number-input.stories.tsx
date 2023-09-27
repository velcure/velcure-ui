import { Meta } from '@storybook/react';
import { NumberInput } from '../src/number-input';

const meta: Meta<typeof NumberInput> = {
  title: 'Components / Forms / Number Input',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Basic = () => <NumberInput min={0} max={5} />;

export const MouseWheel = () => <NumberInput allowMouseWheel />;

export const FractionDigits = () => (
  <NumberInput
    allowMouseWheel
    formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 4 }}
    defaultValue="1.00"
  />
);

export const WithStates = () => (
  <div className="flex items-start flex-col gap-4">
    <NumberInput placeholder="Idle" />
    <NumberInput isInvalid placeholder="isInvalid" />
    <NumberInput isDisabled placeholder="isDisabled" />
    <NumberInput isReadOnly placeholder="isReadonly" />
  </div>
);
