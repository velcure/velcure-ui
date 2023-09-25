import { Meta, StoryObj } from '@storybook/react';
import { MdBuild, MdCall, MdSearch } from 'react-icons/md';
import { Button, ButtonGroup, ButtonProps, IconButton } from '../src';

const meta = {
  title: 'Components / Forms / Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonSize = () => {
  const sizes: Array<ButtonProps['size']> = ['xs', 'sm', 'md', 'lg'];

  return (
    <div className="flex w-max items-end gap-4">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          Size: {size}
        </Button>
      ))}
    </div>
  );
};

export const ButtonVariants = () => {
  const variants: Array<ButtonProps['variant']> = [
    'primary',
    'secondary',
    'destructive',
    'outline',
    'ghost',
    'link',
  ];

  return (
    <div className="flex flex-col w-max items-start gap-4">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          Variant: {variant}
        </Button>
      ))}
    </div>
  );
};

export const ButtonLoading = () => {
  const variants: Array<ButtonProps['variant']> = [
    'primary',
    'secondary',
    'destructive',
    'outline',
    'ghost',
    'link',
  ];

  return (
    <div className="flex flex-col w-max items-start gap-4">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} isLoading>
          Variant: {variant}
        </Button>
      ))}
    </div>
  );
};

export const ButtonWithLoadingText = () => {
  const variants: Array<ButtonProps['variant']> = [
    'primary',
    'secondary',
    'destructive',
    'outline',
    'ghost',
    'link',
  ];

  return (
    <div className="flex flex-col w-max items-start gap-4">
      {variants.map((variant) => (
        <Button
          key={variant}
          variant={variant}
          isLoading
          loadingText="Submitting..."
        >
          Variant: {variant}
        </Button>
      ))}
    </div>
  );
};

export const ButtonDisabled = () => {
  const variants: Array<ButtonProps['variant']> = [
    'primary',
    'secondary',
    'destructive',
    'outline',
    'ghost',
    'link',
  ];

  return (
    <div className="flex flex-col w-max items-start gap-4">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} isDisabled>
          Variant: {variant}
        </Button>
      ))}
    </div>
  );
};

export const WithButtonGroup = () => (
  <ButtonGroup>
    <Button>Save</Button>
    <Button>Cancel</Button>
  </ButtonGroup>
);

export const WithHorizontalAttachedButtons = () => (
  <ButtonGroup size="sm" isAttached>
    <Button>Save</Button>
    <Button>Cancel</Button>
  </ButtonGroup>
);

export const WithReactIcons = () => (
  <div className="flex flex-row gap-4 items-center">
    <Button leftIcon={<MdBuild />}>Settings</Button>
    <Button rightIcon={<MdCall />} variant="outline">
      Call us
    </Button>
  </div>
);

export const iconButton = () => (
  <div className="flex flex-row gap-4">
    <IconButton aria-label="Search database" icon={<MdSearch />} />

    <IconButton aria-label="Search database" icon={<MdSearch />} />

    <IconButton isRound aria-label="Call Segun" size="lg">
      <MdCall />
    </IconButton>
  </div>
);

export const AsLink = () => (
  <Button as="a" href="https://www.google.com" target="_blank">
    Google
  </Button>
);
