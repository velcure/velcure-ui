import { useBoolean, useTimeout } from '#/hooks';
import { Meta } from '@storybook/react';
import { ErrorBoundary, ErrorBoundaryProvider } from '../src/error-boundary';

const meta = {
  title: 'Components / Others / Error Boundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;

const Err = () => {
  throw new Error('Test error');

  return null;
};

export const Basic = () => {
  const [err, { toggle }] = useBoolean(false);

  useTimeout(() => {
    toggle();
  }, 5000);

  return (
    <ErrorBoundary onReset={toggle}>
      {err ? <Err /> : <div>In a few seconds, an error will be thrown.</div>}
    </ErrorBoundary>
  );
};

export const WithContext = () => {
  const [err, { toggle }] = useBoolean(false);

  useTimeout(() => {
    toggle();
  }, 5000);

  return (
    <ErrorBoundaryProvider onReset={toggle}>
      <ErrorBoundary>
        {err ? <Err /> : <div>In a few seconds, an error will be thrown.</div>}
      </ErrorBoundary>
    </ErrorBoundaryProvider>
  );
};
