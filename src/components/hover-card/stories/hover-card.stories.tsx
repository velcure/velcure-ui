import { IconButton } from '#/components/button/src';
import { Meta } from '@storybook/react';
import { FaCheckDouble } from 'react-icons/fa';
import { HoverCard } from '../src/hover-card';

const meta = {
  title: 'Components / Overlay / HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>;

export default meta;

const Content = () => {
  return (
    <div className="flex flex-col gap-4">
      <img
        className="w-12 h-12 rounded-full"
        src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
        alt="Velcure"
      />
      <div className="flex flex-col gap-4">
        <div>
          <div className="font-semibold">Velcure</div>
          <div className="text-muted-foreground">@velcure</div>
        </div>
        <div className="Text">
          Components, icons, colors, and templates for building high-quality,
          accessible UI. Free and open-source.
        </div>
        <div style={{ display: 'flex', gap: 15 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <div className="Text bold">0</div>{' '}
            <div className="Text faded">Following</div>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            <div className="Text bold">2,900</div>{' '}
            <div className="Text faded">Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Basic = () => {
  return (
    <HoverCard content={<Content />}>
      <IconButton aria-label="Hover me" isRound icon={<FaCheckDouble />} />
    </HoverCard>
  );
};
