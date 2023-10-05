import { FormControl, FormLabel } from '#/components/form-control/src';
import { Meta } from '@storybook/react';
import { Combobox } from '../src/combobox';

const meta: Meta = {
  title: 'Components / Forms / Combobox',
  component: Combobox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="space-y-4 max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;

export const Basic = () => {
  return (
    <FormControl>
      <FormLabel>Vehicle</FormLabel>
      <Combobox
        placeholder="Select a vehicle"
        options={[
          {
            label: 'Car',
            value: 'car',
          },
          {
            label: 'Bike',
            value: 'bike',
          },
          {
            label: 'Plane',
            value: 'plane',
          },
        ]}
      />
    </FormControl>
  );
};
