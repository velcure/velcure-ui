import { Meta } from '@storybook/react';
import { TimeInput } from '../src';

const meta = {
  title: 'Components / Forms / Time Input',
  component: TimeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimeInput>;

export default meta;

export const Default = () => <TimeInput />;

export const WithSeconds = () => <TimeInput withSeconds />;

export const IsDisabled = () => <TimeInput isDisabled />;

export const IsInvalid = () => <TimeInput isInvalid />;
