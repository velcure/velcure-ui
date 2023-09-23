import { Button } from '#/components/button/src';
import { useDisclosure } from '#/hooks';
import { Meta } from '@storybook/react';
import React from 'react';
import { LoremIpsum } from 'react-lorem-ipsum';
import { Modal } from '../src/modal';
import { ModalBody } from '../src/modal-body';
import { ModalContent } from '../src/modal-content';
import { ModalFooter } from '../src/modal-footer';
import { ModalHeader } from '../src/modal-header';
import { ModalOverlay } from '../src/modal-overlay';

const meta: Meta = {
  title: 'Components / Overlay / Modal',
  parameters: {
    layout: 'centered',
  },
  decorators: [(Story) => <div className="space-y-4">{Story()}</div>],
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Header</ModalHeader>
          <ModalBody>
            <LoremIpsum />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function NestedModal() {
  const first = useDisclosure();
  const second = useDisclosure();
  const third = useDisclosure();
  return (
    <>
      <button onClick={first.onOpen}>Open</button>
      <Modal isOpen={first.isOpen} onClose={first.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <LoremIpsum />
          </ModalBody>
          <ModalFooter>
            <div className="flex-1" />
            <Button>Button 2</Button>
            <Button onClick={second.onOpen}>Open Nested</Button>
          </ModalFooter>

          <Modal isOpen={second.isOpen} onClose={second.onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal 2 Title</ModalHeader>
              <ModalFooter>
                <div className="flex-1" />
                <Button onClick={third.onOpen}>Open Nested 2</Button>
              </ModalFooter>

              <Modal isOpen={third.isOpen} onClose={third.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader tabIndex={0}>Modal 3 Title</ModalHeader>
                </ModalContent>
              </Modal>
            </ModalContent>
          </Modal>
        </ModalContent>
      </Modal>
    </>
  );
}

export function NestedModalGroup() {
  const first = useDisclosure();
  const second = useDisclosure();
  const third = useDisclosure();
  return (
    <>
      <button onClick={first.onOpen}>Open</button>
      <Modal isOpen={first.isOpen} onClose={first.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <LoremIpsum />
          </ModalBody>
          <ModalFooter>
            <div className="flex-1" />
            <Button>Button 2</Button>
            <Button onClick={second.onOpen}>Open Nested</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={second.isOpen} onClose={second.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal 2 Title</ModalHeader>
          <ModalFooter>
            <div className="flex-1" />
            <Button onClick={third.onOpen}>Open Nested 2</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={third.isOpen} onClose={third.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader tabIndex={0}>Modal 3 Title</ModalHeader>
        </ModalContent>
      </Modal>
    </>
  );
}

export const InsideScroll = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <button onClick={onOpen}>Open</button>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>

          <ModalBody>
            <LoremIpsum p={5} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const FullWithLongContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen}>Open</button>
      <Modal onClose={onClose} isOpen={isOpen} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title2</ModalHeader>

          <ModalBody>
            <LoremIpsum p={30} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export function WithInitialFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = React.useRef(null);
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>

          <ModalBody>
            <p>With just the text it's awesome</p>
            <input
              defaultValue="But with a focussed input it breaks"
              name="name"
              ref={initialFocusRef}
            />
          </ModalBody>

          <ModalFooter>
            <Button>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
