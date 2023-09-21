import { Meta } from '@storybook/react';
import { PiArrowBendLeftDownBold, PiArrowBendLeftUpBold } from 'react-icons/pi';
import {
  Timeline,
  TimelineContent,
  TimelineIcon,
  TimelineItem,
  TimelineSeparator,
  TimelineTrack,
} from '../src';

const meta = {
  title: 'Components / Data Display / Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Timeline>;

export default meta;

export const Basic = () => (
  <Timeline>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineIcon />
        <TimelineTrack />
      </TimelineSeparator>
      <TimelineContent>Validate</TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineIcon />
        <TimelineTrack />
      </TimelineSeparator>
      <TimelineContent>Build</TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineIcon />
      </TimelineSeparator>
      <TimelineContent>Iterate</TimelineContent>
    </TimelineItem>
  </Timeline>
);

export const TourList = () => (
  <Timeline>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineIcon />
        <TimelineTrack />
      </TimelineSeparator>
      <TimelineContent>
        <div className="mb-4">
          <h5 className="text-base">
            <span className="font-medium uppercase">Pickup:</span>
            <span className="text-sm ml-1 font-normal text-gray-700 divide-x">
              <span className="px-1">Landsberger Allee 49</span>
              <span className="px-1">10249 Berlin</span>
            </span>
          </h5>
        </div>
        <div className="bg-background rounded-lg border border-border h-20"></div>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineIcon />
      </TimelineSeparator>
      <TimelineContent>
        <div className="mb-4">
          <h5 className="text-base">
            <span className="font-medium uppercase">Dropoff:</span>
            <span className="text-sm ml-1 font-normal text-gray-700 divide-x">
              <span className="px-1">Landsberger Allee 49</span>
              <span className="px-1">10249 Berlin</span>
            </span>
          </h5>
        </div>
        <div className="bg-background rounded-lg border border-border h-20"></div>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

export const TourListIcon = () => (
  <Timeline>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineIcon>
          <PiArrowBendLeftDownBold className="h-6 w-6" />
        </TimelineIcon>
        <TimelineTrack />
      </TimelineSeparator>
      <TimelineContent>
        <div className="mb-4">
          <h5 className="text-base">
            <span className="font-medium uppercase">Pickup:</span>
            <span className="text-sm ml-1 font-normal text-gray-700 divide-x">
              <span className="px-1">Landsberger Allee 49</span>
              <span className="px-1">10249 Berlin</span>
            </span>
          </h5>
        </div>
        <div className="bg-background rounded-lg border border-border h-20"></div>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineIcon>
          <PiArrowBendLeftUpBold className="h-6 w-6" />
        </TimelineIcon>
      </TimelineSeparator>
      <TimelineContent>
        <div className="mb-4">
          <h5 className="text-base">
            <span className="font-medium uppercase">Dropoff:</span>
            <span className="text-sm ml-1 font-normal text-gray-700 divide-x">
              <span className="px-1">Landsberger Allee 49</span>
              <span className="px-1">10249 Berlin</span>
            </span>
          </h5>
        </div>
        <div className="bg-background rounded-lg border border-border h-20"></div>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);
