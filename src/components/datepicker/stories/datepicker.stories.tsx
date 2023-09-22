import { Meta } from '@storybook/react';
import React from 'react';
import { Datepicker } from '../src/datepicker';

const meta = {
  title: 'Components / Forms / Datepicker',
  component: Datepicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Datepicker>;

export default meta;

export const simple = () => <Datepicker />;

const dateFormatter = new Intl.DateTimeFormat('de', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
});

export const WithFormatDate = () => (
  <Datepicker
    formatDate={(date) => dateFormatter.format(date)}
    locale="ar-EG"
  />
);

export const Controlled = () => {
  const [value, setValue] = React.useState<Date | undefined>(undefined);

  return (
    <>
      <Datepicker value={value} onChange={(date) => setValue(date)} />
      <div>value: {value?.toISOString()}</div>
    </>
  );
};

export const DateInPast = () => {
  const [value, setValue] = React.useState<Date | undefined>(
    new Date('2021-01-16')
  );

  return (
    <Datepicker
      value={value}
      onChange={(date) => setValue(date)}
      maxValue={new Date()}
    />
  );
};

export const WithDefaultValue = () => (
  <Datepicker defaultValue={new Date('2021-01-16')} />
);

export const WithMinAndMaxValue = () => (
  <Datepicker
    minValue={new Date('2021-01-16')}
    maxValue={new Date('2021-01-31')}
    defaultValue={new Date('2021-01-16')}
  />
);

export const IsInvalid = () => (
  <Datepicker
    isInvalid
    defaultValue={new Date('2021-01-16')}
    placeholder="DD.MM.YYYY"
  />
);
