import { FormControl, FormLabel } from '#/components/form-control/src';
import { Icon } from '#/components/icons/src';
import { Typography } from '#/components/typography/src';
import { Meta } from '@storybook/react';
import React from 'react';
import { Checkbox, CheckboxGroup, CheckboxProps, useCheckbox } from '../src';

const meta: Meta<typeof Checkbox> = {
  title: 'Components / Forms / Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Basic = () => <Checkbox>Hello</Checkbox>;

export const States = () => (
  <div className="grid gap-2">
    <Checkbox> Default </Checkbox>
    <Checkbox isDisabled> isDisabled </Checkbox>
    <Checkbox isInvalid> isInvalid </Checkbox>
    <Checkbox isReadOnly> isInvalid </Checkbox>
  </div>
);

export const WithHooks = () => {
  const { state, getRootProps, getInputProps, getCheckboxProps } =
    useCheckbox();
  return (
    <label {...getRootProps()}>
      <input {...getInputProps()} />
      <span {...getCheckboxProps()}>{JSON.stringify(state, null, 4)}</span>
      <span>Hello</span>
    </label>
  );
};

export const NotFocusable = () => (
  <>
    <Checkbox isFocusable={false}>not focusable</Checkbox>
    <Checkbox isFocusable={false} isDisabled>
      disabled and not focusable (truly disabled)
    </Checkbox>
    <Checkbox tabIndex={-1} isFocusable={false}>
      Not Focusable with provided tabIndex
    </Checkbox>
  </>
);

const CustomIcon = (props: any) => {
  const { isIndeterminate, ...rest } = props;

  const d = isIndeterminate
    ? 'M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z'
    : 'M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z';

  return (
    <Icon viewBox="0 0 24 24" {...rest}>
      <path fill="currentColor" d={d} />
    </Icon>
  );
};

export const WithCustomIcon = () => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Typography variant="h2">Default </Typography>
      <Checkbox icon={<CustomIcon />}>Hello world</Checkbox>

      <hr />

      <Typography>Indeterminate</Typography>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
        icon={<CustomIcon />}
      >
        Parent Checkbox
      </Checkbox>
      <div className="ml-6 mt-2 flex gap-4">
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          Child Checkbox 1
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Child Checkbox 2
        </Checkbox>
      </div>
    </>
  );
};

export const Sizes = () => {
  const sizes = ['sm', 'md', 'lg'];

  return (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <Checkbox key={size} size={size as CheckboxProps['size']}>
          {size}
        </Checkbox>
      ))}
    </div>
  );
};

export const Indeterminate = () => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
      >
        Parent Checkbox
      </Checkbox>
      <div className="ml-6 mt-2 justify-start flex flex-col">
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          Child Checkbox 1
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Child Checkbox 2
        </Checkbox>
      </div>
    </>
  );
};

export const Controlled = () => {
  const [value, setValue] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
  };

  return <Checkbox isChecked={value} onChange={handleChange} />;
};

export const CheckboxGroupExample = () => {
  return (
    <CheckboxGroup
      defaultValue={['one', 'two']}
      onChange={(value) => console.log(value)}
    >
      <div className="flex flex-col gap-4 justify-start">
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </div>
    </CheckboxGroup>
  );
};

type Value = string | number;
type ArrayOfValue = Value[];

export const ControlledCheckboxGroup = () => {
  const [value, setValue] = React.useState<ArrayOfValue>(['one', 'two']);
  return (
    <CheckboxGroup
      value={value}
      onChange={(value) => {
        console.log(value);
        setValue(value);
      }}
    >
      <div className="flex flex-col gap-4 justify-start">
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </div>
    </CheckboxGroup>
  );
};

export const WithFormControl = () => {
  return (
    <>
      <FormControl id="optIn">
        <FormLabel>Opt-in Example</FormLabel>
        <CheckboxGroup defaultValue={['1', '3']}>
          <div className="flex flex-row gap-4">
            <Checkbox value="1">Opt-in 1</Checkbox>
            <Checkbox value="2">Opt-in 2</Checkbox>
            <Checkbox value="3">Opt-in 3</Checkbox>
          </div>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="optInInvalid" className="mt-4" isInvalid>
        <FormLabel>Invalid Opt-in Example</FormLabel>
        <CheckboxGroup defaultValue={['2', '3']}>
          <div className="flex flex-col gap-2">
            <Checkbox value="1">Invalid Opt-in 1</Checkbox>
            <Checkbox value="2">Invalid Opt-in 2</Checkbox>
            <Checkbox value="3">Invalid Opt-in 3</Checkbox>
          </div>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="optInDisabled" isDisabled className="mt-4">
        <FormLabel>Disabled Opt-in Example</FormLabel>
        <CheckboxGroup defaultValue={['2', '3']}>
          <div className="flex flex-col gap-2">
            <Checkbox value="1">Disabled Opt-in 1</Checkbox>
            <Checkbox value="2">Disabled Opt-in 2</Checkbox>
            <Checkbox value="3">Disabled Opt-in 3</Checkbox>
          </div>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="optInReadonly" isReadOnly className="mt-4">
        <FormLabel>Readonly Opt-in Example</FormLabel>
        <CheckboxGroup defaultValue={['2', '3']}>
          <div className="flex flex-col gap-2">
            <Checkbox value="1">Readonly Opt-in 1</Checkbox>
            <Checkbox value="2">Readonly Opt-in 2</Checkbox>
            <Checkbox value="3">Readonly Opt-in 3</Checkbox>
          </div>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="optInRequired" isRequired className="mt-4">
        <FormLabel>Required Opt-in Example</FormLabel>
        <CheckboxGroup defaultValue={['2', '3']}>
          <div className="flex flex-col gap-2">
            <Checkbox value="1">Required Opt-in 1</Checkbox>
            <Checkbox value="2">Required Opt-in 2</Checkbox>
            <Checkbox value="3">Required Opt-in 3</Checkbox>
          </div>
        </CheckboxGroup>
      </FormControl>
    </>
  );
};
