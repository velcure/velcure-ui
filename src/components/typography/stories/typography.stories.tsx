import { Meta } from '@storybook/react';
import { Typography } from '../src';

const meta = {
  title: 'Components / Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;

const ipsum = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.`;

export const Basic = () => <Typography>{ipsum}</Typography>;

export const Variants = () => (
  <div className="grid min-h-[140px] gap-4 w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible max-w-2xl">
    <Typography variant="h1">Velcure UI</Typography>
    <Typography variant="h2">Velcure UI</Typography>
    <Typography variant="h3">Velcure UI</Typography>
    <Typography variant="h4">Velcure UI</Typography>
    <Typography variant="h5">Velcure UI</Typography>
    <Typography variant="h6">Velcure UI</Typography>
    <Typography variant="lead">{ipsum}</Typography>
    <Typography variant="p">{ipsum}</Typography>
    <Typography variant="small">{ipsum}</Typography>
  </div>
);
