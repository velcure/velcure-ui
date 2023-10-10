import { Meta } from '@storybook/react';
import { FaUser } from 'react-icons/fa';
import { Chip, ChipSize, ChipVariant } from '../src';

const meta = {
  title: 'Components / Data Display / Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;

/**
 * See below our simple Chip component example that you can use for your Tailwind CSS and React project.
 * The example also comes in different styles and colors, so you can adapt it easily to your needs
 */
export const Simple = () => <Chip>Chip</Chip>;

export const Variants = () => {
  const variants: ChipVariant[] = ['filled', 'gradient', 'outlined', 'ghost'];

  return (
    <div className="flex flex-row gap-4">
      {variants.map((variant) => (
        <Chip variant={variant as ChipVariant}>Chip {variant}</Chip>
      ))}
    </div>
  );
};

export const Sizes = () => {
  const sizes: ChipSize[] = ['sm', 'md', 'lg'];

  return (
    <div className="flex items-end gap-2">
      {sizes.map((size) => (
        <Chip size={size}>Chip {size}</Chip>
      ))}
    </div>
  );
};

/**
 * You can add an icon at the beginning of Chip component using the icon prop.
 */
export const Icon = () => {
  const variants: ChipVariant[] = ['filled', 'gradient', 'outlined', 'ghost'];

  return (
    <div className="flex flex-row gap-4">
      {variants.map((variant) => (
        <Chip icon={<FaUser />} variant={variant as ChipVariant}>
          Chip {variant}
        </Chip>
      ))}
    </div>
  );
};

/**
 * You can pass tailwind css classes for the Chip component using the className prop
 * this helps to do any sort of customization for the chip.
 */
export const Pills = () => {
  const variants: ChipVariant[] = ['filled', 'gradient', 'outlined', 'ghost'];

  return (
    <div className="flex flex-row gap-4">
      {variants.map((variant) => (
        <Chip
          icon={<FaUser />}
          variant={variant as ChipVariant}
          className="rounded-full"
        >
          Chip {variant}
        </Chip>
      ))}
    </div>
  );
};

export const WithStatus = () => {
  return (
    <div className="flex flex-row gap-4">
      <Chip
        icon={
          <span className="h-2 w-2 rounded-full bg-green-900 content-['']" />
        }
        variant="ghost"
        className="rounded-full"
        color="red"
      >
        Offline
      </Chip>
      <Chip
        icon={
          <span className="h-2 w-2 rounded-full bg-green-900 content-['']" />
        }
        variant="ghost"
        className="rounded-full"
        color="green"
      >
        Online
      </Chip>
    </div>
  );
};

export const CustomColor = () => (
  <Chip className="bg-purple-500 text-white">Chip</Chip>
);
