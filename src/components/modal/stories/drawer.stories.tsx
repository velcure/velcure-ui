import { Button, ButtonGroup } from '#/components/button/src';
import { FormLabel } from '#/components/form-control/src';
import { Input } from '#/components/input/src';
import { Radio, RadioGroup } from '#/components/radio/src';
import { Textarea } from '#/components/textarea/src';
import { useDisclosure } from '#/hooks';
import { Meta } from '@storybook/react';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { LoremIpsum } from 'react-lorem-ipsum';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPlacement,
} from '../src';

const meta: Meta = {
  title: 'Components / Overlay / Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  decorators: [(Story) => <div className="space-y-4">{Story()}</div>],
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;

export const DrawerExample = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)}>Open</button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <div>This is the drawer content</div>
          <button>This is a button</button>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const WithCustomMotion = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)}>Open</button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerOverlay />
        <DrawerContent
          motionProps={{
            variants: {
              enter: {
                x: '0%',
                transition: { duration: 0.2 },
              },
              exit: {
                x: '100%',
                transition: { duration: 0.1 },
              },
            },
          }}
        >
          <div>This is the drawer content</div>
          <button>This is a button</button>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const WithLongContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>Open</button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader className="border-b">Basic Drawer</DrawerHeader>
            <DrawerBody>
              <input placeholder="Type here..." />
              <LoremIpsum p={20} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export const BasicDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <ButtonGroup>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>Save</Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const Placement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState('right');

  return (
    <>
      <RadioGroup defaultValue={placement} onChange={setPlacement}>
        <div className="flex flex-row mb-4 gap-4">
          <Radio value="top">Top</Radio>
          <Radio value="right">Right</Radio>
          <Radio value="bottom">Bottom</Radio>
          <Radio value="left">Left</Radio>
        </div>
      </RadioGroup>
      <Button onClick={onOpen}>Open</Button>
      <Drawer
        placement={placement as DrawerPlacement}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const FocusOnSpecificElement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Button leftIcon={<FaPlus />} onClick={onOpen}>
        Create user
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader className="border-b">Create a new account</DrawerHeader>

          <DrawerBody>
            <div className="flex flex-col gap-6">
              <div>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder="Please enter user name"
                />
              </div>

              <div>
                <FormLabel htmlFor="url">Url</FormLabel>
                <Input type="url" id="url" placeholder="Please enter domain" />
              </div>

              <div>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea id="desc" />
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter className="border-t">
            <ButtonGroup>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>Submit</Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
