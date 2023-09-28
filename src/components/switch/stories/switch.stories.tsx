import { Meta } from '@storybook/react';
import { Switch } from '../src/switch';

const meta: Meta<typeof Switch> = {
  title: 'Components / Forms / Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Basic = () => <Switch />;
