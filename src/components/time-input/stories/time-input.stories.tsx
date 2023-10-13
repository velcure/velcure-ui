import { Meta } from '@storybook/react';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { TimeInput } from '../src';

const meta = {
  title: 'Components / Forms / Time Input',
  component: TimeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimeInput>;

export default meta;

export const Default = () => <TimeInput />;

export const Controlled = () => {
  const [value, setValue] = React.useState(new Date());

  return (
    <div>
      <TimeInput value={value} onValueChange={setValue} />

      <div>
        <span>Selected Time:</span> <span>{dayjs(value).format('HH:mm')}</span>
      </div>
    </div>
  );
};

export const MinMax = () => {
  const [value, setValue] = React.useState<Date | undefined>();

  return (
    <div>
      <TimeInput
        minTime={'09:00'}
        maxTime="23:00"
        incrementHours={1}
        incrementMinutes={15}
        value={value}
        onValueChange={setValue}
      />

      <div>
        {value && (
          <Fragment>
            <span>Selected Time:</span>{' '}
            <span>{dayjs(value).format('HH:mm')}</span>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export const IsDisabled = () => <TimeInput isDisabled />;

export const IsInvalid = () => <TimeInput isInvalid />;
