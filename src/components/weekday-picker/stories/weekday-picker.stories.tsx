import { Meta } from '@storybook/react';
import React from 'react';
import { WeekdayPicker } from '../src';
import { ISOWeekday } from '../src/types';

const meta = {
  title: 'Components / Forms / Weekday Picker',
  component: WeekdayPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WeekdayPicker>;

export default meta;

export const Basic = () => <WeekdayPicker />;

export const Controlled = () => {
  const [value, setValue] = React.useState<ISOWeekday[]>([1, 3, 6]);
  const handleChange = (value: ISOWeekday[]) => setValue(value);

  return (
    <>
      <WeekdayPicker value={value} onChange={handleChange} />
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </>
  );
};
