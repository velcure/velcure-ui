import { useBoolean } from '#/hooks';
import { Meta } from '@storybook/react';
import { Fade, FadeProps } from '../src';

const meta = {
  title: 'Components / Others / Transition / Fade',
  component: Fade,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Fade>;

export default meta;

const Example = (props: FadeProps) => {
  const [open, { toggle }] = useBoolean(false);
  return (
    <>
      <button onClick={toggle}>Toggle Slide</button>
      <Fade
        in={open}
        {...props}
        style={{
          maxWidth: 400,
          background: 'red',
          padding: 30,
          ...props.style,
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Fade>
    </>
  );
};

export const Basic = () => <Example />;

export const WithCustomTransition = () => (
  <Example transition={{ enter: { duration: 0.3 }, exit: { duration: 0.5 } }} />
);

export const WithTransitionEnd = () => (
  <Example
    style={{ display: 'block' }}
    transitionEnd={{ exit: { display: 'none' } }}
  />
);

export const WithTransitionDelay = () => <Example delay={{ enter: 0.2 }} />;
