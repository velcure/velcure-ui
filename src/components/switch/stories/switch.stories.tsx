import { Button } from '#/components/button/src';
import { velcure } from '#/components/factory';
import { FormControl, FormLabel } from '#/components/form-control/src';
import { Input } from '#/components/input/src';
import { Meta } from '@storybook/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Switch } from '../src/switch';

const meta: Meta<typeof Switch> = {
  title: 'Components / Forms / Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Basic = () => <Switch />;

export const Disabled = () => <Switch isDisabled />;

export const Readonly = () => <Switch isReadOnly />;

export const Invalid = () => <Switch isInvalid />;

export const Usage = () => (
  <velcure.div className="flex justify-center items-center">
    <velcure.label htmlFor="email-alerts" className="mr-4">
      Enable email alerts?
    </velcure.label>
    <Switch id="email-alerts" />
  </velcure.div>
);

export const Controlled = () => {
  const [checked, setChecked] = React.useState(true);

  return (
    <>
      <Switch
        isChecked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        {checked ? 'Checked' : 'Unchecked'}
      </Switch>
    </>
  );
};

export const WithReactHookForm = () => {
  const defaultValues = {
    name: 'Hello',
    boolean: true,
    test: true,
  };

  const { handleSubmit, register } = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<any> = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="name" {...register('name')} />
      {/* <input type="Switch" {...register("boolean")} /> */}
      <Switch {...register('boolean')} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const WithFormControl = () => {
  return (
    <>
      <FormControl id="optIn">
        <FormLabel>Opt-in Example</FormLabel>
        <div className="flex flex-row gap-4">
          <Switch value="1">Opt-in 1</Switch>
          <Switch value="2">Opt-in 2</Switch>
          <Switch value="3">Opt-in 3</Switch>
        </div>
      </FormControl>

      <FormControl id="optInInvalid" isInvalid className="mt-4">
        <FormLabel>Invalid Opt-in Example</FormLabel>
        <div className="flex flex-col gap-2">
          <Switch value="1">Invalid Opt-in 1</Switch>
          <Switch value="2">Invalid Opt-in 2</Switch>
          <Switch value="3">Invalid Opt-in 3</Switch>
        </div>
      </FormControl>

      <FormControl id="optInDisabled" isDisabled className="mt-4">
        <FormLabel>Disabled Opt-in Example</FormLabel>
        <div className="flex flex-col gap-2">
          <Switch value="1">Disabled Opt-in 1</Switch>
          <Switch value="2">Disabled Opt-in 2</Switch>
          <Switch value="3">Disabled Opt-in 3</Switch>
        </div>
      </FormControl>

      <FormControl id="optInReadonly" isReadOnly className="mt-4">
        <FormLabel>Readonly Opt-in Example</FormLabel>
        <div className="flex flex-col gap-2">
          <Switch value="1">Readonly Opt-in 1</Switch>
          <Switch value="2">Readonly Opt-in 2</Switch>
          <Switch value="3">Readonly Opt-in 3</Switch>
        </div>
      </FormControl>

      <FormControl id="optInRequired" isRequired className="mt-4">
        <FormLabel>Required Opt-in Example</FormLabel>
        <div className="flex flex-col gap-2">
          <Switch value="1">Required Opt-in 1</Switch>
          <Switch value="2">Required Opt-in 2</Switch>
          <Switch value="3">Required Opt-in 3</Switch>
        </div>
      </FormControl>
    </>
  );
};
