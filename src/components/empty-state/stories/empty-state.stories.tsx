import { Button } from '#/components/button/src';
import { Meta } from '@storybook/react';
import { LuUsers } from 'react-icons/lu';
import { EmptyState } from '../src';

const meta = {
  title: 'Components / Data Display / EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;

export const Basic = () => {
  return (
    <EmptyState
      icon={<LuUsers />}
      title="No customers yet"
      description="You haven't imported any customers yet."
      actions={
        <>
          <Button variant="primary">Import customers</Button>
          <Button variant="secondary">Create customer</Button>
        </>
      }
    />
  );
};
