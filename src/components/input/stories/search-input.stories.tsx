import { Meta } from '@storybook/react';
import React from 'react';
import { SearchInput } from '../src';

const meta = {
  title: 'Components / Forms / Search Input',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;

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
