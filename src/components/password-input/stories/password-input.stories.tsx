import { Meta } from '@storybook/react';
import { PasswordInput } from '../src';

const meta = {
  title: 'Components / Forms / Password Input',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordInput>;

export default meta;

export const Basic = () => <PasswordInput />;
