import { Meta } from '@storybook/react';
import React from 'react';
import {
  Radio,
  RadioGroup,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from '../src';

const meta = {
  title: 'Components / Forms / Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;

export const Basic = () => <Radio>Hello</Radio>;

export const Disabled = () => <Radio isDisabled>Disabled</Radio>;

export const Readonly = () => (
  <Radio isChecked isReadOnly>
    I'm a readonly radio
  </Radio>
);

export const _RadioGroup = () => {
  const [value, setValue] = React.useState('');
  return (
    <RadioGroup value={value} onChange={setValue}>
      <div className="flex gap-4 flex-col">
        <Radio value="Option 1">Option 1</Radio>
        <Radio value="Option 2">Option 2</Radio>
        <Radio value="Option 3">Option 3</Radio>
      </div>
      <button onClick={() => setValue('')}>Clear</button>
    </RadioGroup>
  );
};

export const WithHook = () => {
  const options = ['react', 'vue', 'svelte'];

  const { getRadioProps, getRootProps } = useRadioGroup({
    name: 'test',
    defaultValue: 'vue',
    onChange: console.log,
  });

  return (
    <div className="flex flex-row gap-5" {...getRootProps()}>
      {options.map((value) => (
        <Radio key={value} {...getRadioProps({ value })}>
          {value}
        </Radio>
      ))}
    </div>
  );
};

/**
 * Compose a custom RadioCard component using the `useRadio` hook.
 */
function RadioCard(props: UseRadioProps & { children?: React.ReactNode }) {
  const { getInputProps, getRadioProps } = useRadio(props);

  return (
    <label>
      <input {...getInputProps()} />
      <div
        {...getRadioProps()}
        className="inline-block border-2 border-gray-300 rounded-md px-5 py-3 data-checked:bg-red-600 data-checked:text-white data-focus:outline-2 data-focus:outline-dotted"
      >
        {props.children}
      </div>
    </label>
  );
}

export function CustomRadioCard() {
  const options = ['react', 'vue', 'svelte'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'vue',
    onChange: console.log,
  });

  return (
    <div className="gap-4 flex flex-row" {...getRootProps()}>
      {options.map((value) => (
        <RadioCard key={value} {...getRadioProps({ value })}>
          {value}
        </RadioCard>
      ))}
    </div>
  );
}

export function DisabledRadioGroup() {
  return (
    <RadioGroup isDisabled>
      <div className="flex flex-col gap-4">
        <Radio value="one">One</Radio>
        <Radio value="two" isDisabled>
          Two
        </Radio>
        <Radio value="three" isDisabled={false}>
          Three
        </Radio>
      </div>
    </RadioGroup>
  );
}
