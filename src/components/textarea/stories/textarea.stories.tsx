import { Meta } from '@storybook/react';
import React from 'react';
import { Textarea } from '../src';

const meta = {
  title: 'Components / Forms / Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;

export const basic = () => <Textarea defaultValue="This is a textarea" />;

export const rows = () => (
  <Textarea defaultValue="This is a textarea" rows={12} />
);

export const disabled = () => (
  <Textarea isDisabled placeholder="A disabled textarea" />
);

export const invalid = () => (
  <Textarea isInvalid placeholder="An invalid textarea" />
);

export const Controlled = () => {
  const [value, setValue] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <p>Value: {value}</p>
      <Textarea
        className="mt-2"
        value={value}
        placeholder="Enter value"
        onChange={onChange}
      />
    </>
  );
};

export const withResize = () => (
  <Textarea placeholder="Here is a sample placeholder" resize="horizontal" />
);
