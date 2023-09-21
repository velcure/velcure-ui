import { Button, ButtonGroup } from '#/components/button/src';
import { Input } from '#/components/input/src';
import { Radio, RadioGroup } from '#/components/radio/src';
import { useBoolean, useInterval } from '#/hooks';
import { Meta } from '@storybook/react';
import React from 'react';
import {
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  usePopover,
} from '../src';

const meta = {
  title: 'Components / Overlay / Popover - Click',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;

export function WithHook() {
  const {
    getTriggerProps,
    getPopoverProps,
    getPopoverPositionerProps,
    onClose,
  } = usePopover();

  return (
    <>
      <button type="button" {...getTriggerProps()}>
        Open
      </button>
      <div {...getPopoverPositionerProps()}>
        <div
          {...getPopoverProps({
            style: {
              background: 'tomato',
              color: 'white',
              padding: 30,
            },
          })}
        >
          This is the content <br />
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export const simple = () => (
  <Popover placement="right-start">
    <PopoverTrigger>
      <button>Trigger</button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverHeader>Confirmation!</PopoverHeader>
      <PopoverBody>
        <p>Are you sure you want to have that milkshake?</p>
        <br />
        <button>Yes</button>
        <button>No</button>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

export const basic = () => (
  <>
    <Popover placement="top">
      <PopoverTrigger>
        <button>Welcome home</button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Submit now</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PopoverBody>
      </PopoverContent>
    </Popover>

    <Popover placement="bottom">
      <PopoverTrigger>
        <button>Welcome home</button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Submit now</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  </>
);

export function ControlledUsage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  return (
    <>
      <Button className="mr-5" onClick={open}>
        Trigger
      </Button>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button>Popover Target</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader className="font-semibold">Confirmation</PopoverHeader>

          <PopoverBody>
            Are you sure you want to continue with your action?
          </PopoverBody>
          <PopoverFooter className="flex justify-end">
            <ButtonGroup size="sm">
              <Button variant="outline">Cancel</Button>
              <Button>Apply</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

const Interval = () => {
  const [value, setValue] = React.useState(0);
  useInterval(() => setValue((v) => v + 1), 1000);
  return (
    <span style={{ fontWeight: 'bold', color: 'tomato', padding: 4 }}>
      {value}
    </span>
  );
};

export function WithLazyPopover() {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button>Popover Target</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          Are you sure you want to continue with your action?
          <p>
            Timer: <Interval />
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function WithLazyPopoverMounted() {
  return (
    <Popover isLazy lazyBehavior="keepMounted">
      <PopoverTrigger>
        <Button>Popover Target</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          Are you sure you want to continue with your action?
          <p>
            Timer: <Interval />
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function WithPopoverAnchor() {
  const [isEditing, setIsEditing] = useBoolean();
  const [color, setColor] = React.useState('red');

  return (
    <Popover
      isOpen={isEditing}
      onOpen={setIsEditing.on}
      onClose={setIsEditing.off}
      closeOnBlur={false}
      isLazy
      lazyBehavior="keepMounted"
    >
      <PopoverAnchor>
        <Input
          color={color}
          className="w-auto inline-flex"
          isDisabled={!isEditing}
          defaultValue="Popover Anchor"
        />
      </PopoverAnchor>

      <PopoverTrigger>
        <Button>{isEditing ? 'Save' : 'Edit'}</Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverBody>
          Colors:
          <RadioGroup value={color} onChange={(newColor) => setColor(newColor)}>
            <Radio value="red">red</Radio>
            <Radio value="blue">blue</Radio>
            <Radio value="green">green</Radio>
            <Radio value="purple">purple</Radio>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export const WithMatchWidth = () => (
  <Popover matchWidth>
    <PopoverTrigger>
      <Button
        style={{
          width: '400px',
        }}
      >
        Long Content
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full">
      <PopoverBody>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </PopoverBody>
    </PopoverContent>
  </Popover>
);
