import { Meta } from '@storybook/react';
import { CircularProgress, CircularProgressLabel } from '../src';

const meta = {
  title: 'Components / Feedback / Circular Progress',
  component: CircularProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CircularProgress>;

export default meta;

export const basic = () => (
  <CircularProgress className="h-10 w-10" value={50} />
);

export const withSize = () => (
  <CircularProgress className="h-40 w-40" value={60} />
);

export const isIndeterminate = () => (
  <CircularProgress
    className="h-10 w-10"
    value={3}
    capIsRound
    isIndeterminate
  />
);

export const withThickness = () => (
  <CircularProgress className="h-10 w-10" value={60} thickness="3px" />
);

export const withLabel = () => (
  <CircularProgress className="h-20 w-20" value={60}>
    <CircularProgressLabel className="text-sm">60%</CircularProgressLabel>
  </CircularProgress>
);
