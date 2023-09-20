import { Meta } from '@storybook/react';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { FormControl, FormHelperText, FormLabel, useFormControl } from '../src';
import { FormErrorMessage } from '../src/form-error-message';

const meta = {
  title: 'Components / Forms / FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormControl>;

export default meta;

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  (props, ref) => {
    const inputProps = useFormControl<HTMLInputElement>(props);

    return (
      <input
        className="peer text-sm p-2 w-80 ring-1 ring-slate-900/10 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 caret-pink-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:focus:ring-2 dark:focus:ring-pink-500 dark:focus:bg-slate-900"
        type="text"
        {...inputProps}
        ref={ref}
      />
    );
  }
);

export const InputExample = () => {
  return (
    <FormControl id="first-name" isRequired isInvalid>
      <FormLabel>First name</FormLabel>
      <Input placeholder="First Name" />
      <FormHelperText>Keep it very short and sweet!</FormHelperText>
      <FormErrorMessage>Your First name is invalid</FormErrorMessage>
    </FormControl>
  );
};

export const FormLabelStandalone = () => (
  <FormLabel className="font-bold">Not wrapped by FormControl</FormLabel>
);
