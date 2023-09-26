import { Button } from '#/components/button/src';
import { useDisclosure } from '#/hooks';
import { Meta } from '@storybook/react';
import { ConfirmationDialog, ConfirmationDialogContent } from '../src';

const meta: Meta = {
  title: 'Components / Overlay / Confirmation Dialog',
  component: ConfirmationDialog,
  parameters: {
    layout: 'centered',
  },
  decorators: [(Story) => <div className="space-y-4">{Story()}</div>],
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Basic = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="destructive" onClick={onOpen}>
        Delete
      </Button>
      <ConfirmationDialog isOpen={isOpen} onClose={onClose} intent="danger">
        <ConfirmationDialogContent title="Deactivate account">
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed from our servers forever. This action
          cannot be undone.
        </ConfirmationDialogContent>
      </ConfirmationDialog>
    </>
  );
};
