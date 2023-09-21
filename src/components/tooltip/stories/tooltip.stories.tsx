import { Button } from '#/components/button/src';
import { Portal } from '#/components/portal/src';
import { Typography } from '#/components/typography/src';
import { Meta } from '@storybook/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Tooltip } from '../src/tooltip';
import { useTooltip } from '../src/use-tooltip';

const meta = {
  title: 'Components / Overlay / Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;

const HookTooltip = ({ children }: any) => {
  const {
    getTriggerProps,
    getTooltipPositionerProps,
    getTooltipProps,
    isOpen,
  } = useTooltip({
    openDelay: 100,
    arrowSize: 8,
    placement: 'bottom',
  });

  return (
    <>
      <Button {...getTriggerProps()}>Hover me</Button>
      <div {...getTooltipPositionerProps()}>
        <div
          {...getTooltipProps({
            style: {
              background: 'tomato',
              color: 'white',
              borderRadius: '4px',
              padding: '0.5em 1em',
              visibility: isOpen ? 'visible' : 'hidden',
              ['--popper-arrow-bg' as string]: 'tomato',
            },
          })}
        >
          {children}
          <div data-popper-arrow>
            <div data-popper-arrow-inner />
          </div>
        </div>
      </div>
    </>
  );
};

export const Basic = () => <HookTooltip>This is me</HookTooltip>;

export const MultipleTooltips = () => (
  <>
    <HookTooltip>This is tip 1</HookTooltip>
    <HookTooltip>This is tip 2</HookTooltip>
  </>
);

export const WithTransition = () => {
  const {
    getTriggerProps,
    getTooltipPositionerProps,
    getTooltipProps,
    isOpen,
  } = useTooltip({
    openDelay: 100,
  });

  return (
    <>
      <Button {...getTriggerProps()}>Hover me</Button>
      <AnimatePresence>
        {isOpen && (
          <Portal>
            <div {...getTooltipPositionerProps()}>
              <motion.div
                initial="exit"
                animate="enter"
                exit="exit"
                {...(getTooltipProps() as any)}
              >
                <motion.div
                  transition={{
                    duration: 0.12,
                    ease: [0.4, 0, 0.2, 1],
                    bounce: 0.5,
                  }}
                  variants={{
                    exit: { scale: 0.9, opacity: 0 },
                    enter: { scale: 1, opacity: 1 },
                  }}
                  style={{
                    transformOrigin: 'var(--popper-transform-origin)',
                    background: 'tomato',
                    ['--popper-arrow-bg' as string]: 'tomato',
                    color: 'white',
                    borderRadius: '4px',
                    padding: '0.5em 1em',
                  }}
                >
                  Fade! This is tooltip
                  <div data-popper-arrow>
                    <div data-popper-arrow-inner />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

export const WithButton = () => (
  <Tooltip content="This is a velcure tooltip" placement="bottom" hasArrow>
    <Button>Hover me</Button>
  </Tooltip>
);

export const WithString = () => (
  <Tooltip hasArrow content="This is a chakra tooltip">
    Hover me
  </Tooltip>
);

export const WithAriaLabel = () => (
  <Tooltip hasArrow content="Notifications" aria-label="3 Notifications">
    <Button style={{ fontSize: 25 }}>
      <span role="img" aria-label="notification">
        🔔
      </span>
      <span>3</span>
    </Button>
  </Tooltip>
);

export const WithDisabledButton = () => (
  <Tooltip content="Oh oh oh, oh oh">
    <Button isDisabled>Can't Touch This</Button>
  </Tooltip>
);

export const WithWrappedDisabledButton = () => (
  <Tooltip content="Hello world" shouldWrapChildren>
    <Button isDisabled>Hover me</Button>
  </Tooltip>
);

export const WithIsOpenProp = () => (
  <Tooltip content="Hello world" isOpen hasArrow>
    <Button disabled>Can't Touch This</Button>
  </Tooltip>
);

export const WithDefaultIsOpenProp = () => (
  <Tooltip content="Hello world" defaultIsOpen>
    <Button>Can't Touch This</Button>
  </Tooltip>
);

export const WithDynamicDisabled = () => {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const handleDisabled = () => setIsDisabled(true);
  const handleEnabled = () => setIsDisabled(false);
  return (
    <Tooltip
      content="Disabled after being triggered"
      placement="bottom"
      openDelay={500}
      isDisabled={isDisabled}
      hasArrow
    >
      <span
        draggable
        onDragStart={handleDisabled}
        onDragEnd={handleEnabled}
        className="cursor-grab"
      >
        Drag me, and you won't see
      </span>
    </Tooltip>
  );
};

export const TooltipWithHelperIcon = () => (
  <Tooltip
    content={
      <div>
        <Typography className="font-medium text-white">Velcure UI</Typography>
        <Typography
          variant="small"
          className="font-normal opacity-80 text-white"
        >
          Velcure UI is an easy to use components library using Tailwind CSS.
        </Typography>
      </div>
    }
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5 cursor-pointer text-blue-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  </Tooltip>
);
