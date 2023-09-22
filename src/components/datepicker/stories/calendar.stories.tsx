import { Meta } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from '../src/calendar';

const meta = {
  title: 'Components / Data Display / Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

export const simple = () => <Calendar />;

export const WithControlledValue = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <div>
      <Calendar value={value} onClick={setValue} />
    </div>
  );
};
