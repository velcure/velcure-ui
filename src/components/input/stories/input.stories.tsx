import { Meta } from '@storybook/react';
import React from 'react';
import { MdCheck, MdPhone } from 'react-icons/md';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '../src';
import { SearchInput } from '../src/search-input';

const meta = {
  title: 'Components / Forms / Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

export const Basic = () => <Input placeholder="Basic input" />;

export const Controlled = () => {
  const [value, setValue] = React.useState('Starting...');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Controlled input"
      />
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </>
  );
};

export const WithSizes = () => (
  <div className="flex items-start flex-col gap-4">
    {['xs', 'sm', 'md', 'lg'].map((size) => (
      <Input
        key={size}
        size={size as InputProps['size']}
        placeholder="This is an input component"
      />
    ))}
  </div>
);

export const WithNativeSize = () => <Input htmlSize={4} className="w-auto" />;

export const WithStates = () => (
  <div className="flex items-start flex-col gap-4">
    <Input placeholder="Idle" />
    <Input isInvalid placeholder="isInvalid" />
    <Input isDisabled placeholder="isDisabled" />
    <Input isReadOnly placeholder="isReadonly" />
  </div>
);

export const WithInputElements = () => (
  <div className="flex items-start flex-col gap-4">
    <InputGroup>
      <InputLeftElement className="pointer-events-none">
        <MdPhone color="gray.300" />
      </InputLeftElement>
      <Input type="tel" placeholder="Phone number..." />
      <InputRightElement>
        <MdCheck />
      </InputRightElement>
    </InputGroup>
  </div>
);

export const searchInput = () => {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />

      <button
        onClick={() => {
          setValue('test');
        }}
      >
        Set value
      </button>
      <div>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </div>
    </div>
  );
};
