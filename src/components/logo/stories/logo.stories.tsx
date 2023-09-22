import { Meta } from '@storybook/react';
import { Logo, Logomark } from '../src';

const meta = {
  title: 'Components / Others / Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;

export const simple = () => <Logo />;

export const Mark = () => <Logomark className="h-10" />;
