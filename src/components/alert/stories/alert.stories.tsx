import { Button } from '#/components/button/src';
import { Typography } from '#/components/typography/src';
import { useBoolean } from '#/hooks';
import { Meta } from '@storybook/react';
import { Alert, AlertTitle } from '../src';

const meta = {
  title: 'Components / Feedback / Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;

export const WithList = () => (
  <Alert>
    <AlertTitle>Ensure that these requirements are met:</AlertTitle>
    <ul className="mt-2 ml-2 list-inside list-disc">
      <li>At least 10 characters (and up to 100 characters)</li>
      <li>At least one lowercase character</li>
      <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
    </ul>
  </Alert>
);

export const Status = () => {
  const statuses = ['success', 'info', 'warning', 'error', 'loading'] as const;

  return (
    <div className="space-y-4">
      {statuses.map((status) => (
        <Alert key={status} status={status}>
          An {status} alert for showing message.
        </Alert>
      ))}
    </div>
  );
};

export const Animation = () => {
  const [open, { toggle }] = useBoolean(false);

  return (
    <>
      {!open && (
        <Button className="absolute" onClick={toggle}>
          Show Alert
        </Button>
      )}
      <Alert isOpen={open} onClose={toggle}>
        <Typography className="font-medium">
          Ensure that these requirements are met:
        </Typography>
        <ul className="mt-2 ml-2 list-inside list-disc">
          <li>At least 10 characters (and up to 100 characters)</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
        </ul>
      </Alert>
    </>
  );
};
