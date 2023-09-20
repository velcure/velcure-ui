import { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../src';

const meta = {
  title: 'Components / Feedback / Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const basic = () => <Spinner />;
