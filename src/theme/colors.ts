import tailwindColors from 'tailwindcss/colors';

export const colors = {
  initial: 'initial',
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  background: tailwindColors.white,
  foreground: tailwindColors.slate[900],
  primary: tailwindColors.slate[900],
  'primary-foreground': tailwindColors.slate[50],
  secondary: tailwindColors.slate[100],
  'secondary-foreground': tailwindColors.slate[900],
  destructive: tailwindColors.red[500],
  'destructive-foreground': tailwindColors.slate[50],
  accent: tailwindColors.slate[100],
  'accent-foreground': tailwindColors.slate[900],
  muted: tailwindColors.slate[100],
  'muted-foreground': tailwindColors.slate[500],
  ring: tailwindColors.slate[900],
  input: tailwindColors.slate[200],
  border: tailwindColors.slate[200],
};
