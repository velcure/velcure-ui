import { Button, ButtonGroup } from '#/components/button/src';
import { Meta } from '@storybook/react';
import React from 'react';
import { ToastId } from '../src';
import { ToastProvider } from '../src/toast.provider';
import useToast from '../src/use-toast';

const meta: Meta = {
  title: 'Components / Feedback / Toast',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="space-y-4">
        <ToastProvider />
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export function ToastExample() {
  const toast = useToast();
  const id = 'login-error-toast';
  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          if (toast.isActive(id)) return;
          toast({
            id,
            position: 'top-left',
            title: 'Error Connecting...',
            description: 'You do not have permissions to perform this action.',
            status: 'error',
            duration: null,
            isClosable: true,
            onCloseComplete: () => {
              console.log('hello');
            },
          });
        }}
      >
        Show Toast
      </Button>
      <Button onClick={() => toast.closeAll()}>Close all</Button>
      <Button
        onClick={() =>
          toast.update(id, {
            title: 'Hooray 🥳🥳🥳!!!',
            description: 'You now have permissions to perform this action.',
            status: 'success',
            duration: 3000,
          })
        }
      >
        Update
      </Button>
      <Button onClick={() => toast.close(id)}>Close One</Button>
    </ButtonGroup>
  );
}

export const UseToastWithDefaults = () => {
  const toast = useToast({
    position: 'top-right',
    title: 'asdf',
  });

  return <Button onClick={() => toast()}>toast</Button>;
};

export function SuccessToast() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          position: 'bottom',
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          onCloseComplete: () => {
            console.log('close');
          },
        })
      }
    >
      Show Success Toast
    </Button>
  );
}

export function WarningToast() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Warning.',
          description: 'This is a warning.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Warning Toast
    </Button>
  );
}

export function ErrorToast() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: 'An error occurred.',
          description: 'Unable to create user account.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Error Toast
    </Button>
  );
}

export const AllSides = () => {
  const toast = useToast();

  const positions = [
    'top-left',
    'top',
    'top-right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ] as const;

  return (
    <>
      <Button
        onClick={() => {
          positions.forEach((p) => {
            toast({ position: p, title: p });
          });
        }}
      >
        Trigger
      </Button>

      <Button className="ml-10" onClick={() => toast.closeAll()}>
        Close all
      </Button>
    </>
  );
};

export const CloseAllTopLeftToasts = () => {
  const toast = useToast();

  const positions = [
    'top-left',
    'top',
    'top-right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ] as const;

  return (
    <>
      <Button
        onClick={() => {
          positions.forEach((position) => {
            toast({ position, title: position });
          });
        }}
      >
        Trigger
      </Button>

      <hr />
      <Button onClick={() => toast.closeAll({ positions: ['top-left'] })}>
        close all top-left
      </Button>
    </>
  );
};

export const AsyncToast = () => {
  const toast = useToast();

  const getResolve = () =>
    new Promise<string>((resolve) => setTimeout(() => resolve('hello'), 2000));

  const getReject = () =>
    new Promise<string>((_, reject) => setTimeout(() => reject(), 2000));
  const promiseOptions = {
    loading: {
      title: 'Please wait ...',
      description: 'We are fetching your data.',
      duration: null,
    },
    success: {
      title: 'Wait is over you won!',
      description: 'You have won the game.',
    },
    error: {
      title: 'Wait is over you loose',
      description: 'You have lost the game.',
    },
  };

  return (
    <ButtonGroup>
      <Button onClick={() => toast.promise(getResolve(), promiseOptions)}>
        Async toast [success]
      </Button>
      <Button onClick={() => toast.promise(getReject(), promiseOptions)}>
        Async toast [error]
      </Button>
    </ButtonGroup>
  );
};

export function WithDoubleUpdate() {
  const toast = useToast();
  const toastIdRef = React.useRef<ToastId>();

  function updateOne() {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, { description: '1st update' });
    }
  }

  function updateTwo() {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, { description: '2nd update' });
    }
  }

  function addToast() {
    toastIdRef.current = toast({
      position: 'bottom-right',
      description: 'some text',
    });
  }

  return (
    <ButtonGroup>
      <Button onClick={addToast} type="button">
        Toast
      </Button>

      <Button onClick={updateOne} type="button" variant="outline">
        Update last toast
      </Button>

      <Button onClick={updateTwo} type="button" variant="outline">
        Update last toast 2
      </Button>
    </ButtonGroup>
  );
}
