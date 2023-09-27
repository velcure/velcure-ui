import type { Meta } from '@storybook/react';
import { useEffect } from 'react';
import Frame from 'react-frame-component';
import { Environment, useEnvironmentContext } from '../src';

type EnvironmentType = typeof Environment;

const meta: Meta<EnvironmentType> = {
  title: 'System / Environment',
  component: Environment,
};

export default meta;

const PrintEnvironment = () => {
  const getRootNode = useEnvironmentContext();
  useEffect(() => {
    const rootNode = getRootNode?.();
    console.log(rootNode);
  });

  return <div>Hello!</div>;
};

export const Basic = () => {
  return (
    <Frame>
      <Environment>
        <PrintEnvironment />
      </Environment>
    </Frame>
  );
};
