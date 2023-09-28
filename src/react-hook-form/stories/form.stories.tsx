import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import { Meta } from '@storybook/react';
import * as yup from 'yup';
import { z } from 'zod';
import {
  Form,
  InputControl,
  SubmitButton,
  SwitchControl,
  TextareaControl,
  useForm,
} from '../src';

const meta: Meta<typeof Form> = {
  title: 'React Hook Form / Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Basic = () => {
  const methods = useForm({
    defaultValues: {
      title: 'Form',
      description: 'A basic layout',
      isPublic: false,
      password: '',
    },
  });

  return (
    <Form
      methods={methods}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      className="space-y-4 min-w-[400px]"
    >
      <InputControl name="title" label="Title" />
      <TextareaControl name="description" label="Description" />
      <SwitchControl
        name="isPublic"
        label="Public"
        helperText="If public, anyone can see this form"
      >
        <InputControl name="password" label="Password" />
        <TextareaControl name="description" label="Description" />
      </SwitchControl>

      <SubmitButton>
        <span>Submit</span>
      </SubmitButton>
    </Form>
  );
};

const yupSchema = yup.object({
  name: yup.string().min(2).max(25, 'Too long').required(),
  description: yup.string().min(2, 'Too short').max(25, 'Too long').required(),
});

export const withYupSchema = () => {
  const methods = useForm<yup.InferType<typeof yupSchema>>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(yupSchema),
  });

  return (
    <Form
      methods={methods}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      className="space-y-4 "
    >
      <InputControl name="name" label="Name" />
      <TextareaControl name="description" label="Description" />

      <SubmitButton>
        <span>Submit</span>
      </SubmitButton>
    </Form>
  );
};

const zodSchema = z.object({
  name: z.string().min(2).max(25, 'Too long').nonempty(),
  description: z.string().min(2, 'Too short').max(25, 'Too long').nonempty(),
});

export const withZodSchema = () => {
  const methods = useForm<z.infer<typeof zodSchema>>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = (_values: z.infer<typeof zodSchema>) => {
    methods.setError('name', {
      type: 'manual',
      message: 'This is a manual error',
    });
  };

  return (
    <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
      <InputControl name="name" label="Name" />
      <TextareaControl name="description" label="Description" />

      <SubmitButton>
        <span>Submit</span>
      </SubmitButton>
    </Form>
  );
};