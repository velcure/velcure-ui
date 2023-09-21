import { Meta, Story } from '@storybook/react';
import { Property, PropertyLabel, PropertyList } from '../src';
import { PropertyValue } from '../src/property-value';

const meta = {
  title: 'Components / Data Display / Property',
  component: Property,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Property>;

export default meta;

const Template: Story = (args) => <Property {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  value: 'Elliot Alderson',
  label: 'Name',
};

export const Composed = () => {
  return (
    <Property>
      <PropertyLabel className="justify-end">Status</PropertyLabel>
      <PropertyValue>
        <select value="New">
          <option value="New">New</option>
          <option value="Open">Open</option>
        </select>
      </PropertyValue>
    </Property>
  );
};

export const List = () => {
  return (
    <PropertyList className="min-w-[320px]">
      <Property label="Status" value="Open" />
      <Property label="Assignee" value="Hans Gruber" />
      <Property label="Date" value="Januari 10, 2022" />
    </PropertyList>
  );
};
